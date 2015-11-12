define([
	'jquery',
	'angular',
	'./controllerModule'
],function($, angular,module){
    //controllerModule模块，定义editController控制器
	module.controller('editController',['$scope', '$rootScope', '$route', 'dataEdit', 'dataChengList', 'loader',
		function($scope, $rootScope, $route, dataEdit, dataChengList, loader){

			function initData(){
				$scope.remindShow = 'false';
				$scope.remindConfirmShow = 'false';
				if(!dataEdit.data.data.info){
					$scope.info = {};
					$scope.info.initKeyword = '+ 输入关键词';
					$scope.info.delete_flag = 0;

				}else{
					$scope.info = dataEdit.data.data.info;
					var trackData = window.location.hash.substr(1);
					trackData = window.location.hash.substr(1);
					var reg = /\?(.+)/;
					trackData = trackData.match(reg) && trackData.match(reg)[1];
					if(trackData){
						$scope.info.trackCate = decodeURIComponent (trackData.split('&')[1].split('=')[1] );
						$scope.info.trackTid = trackData.split('&')[0].split('=')[1];
					}

					switch( +$scope.info.market_code ){
						case 30:
							$scope.info.marketValue = '沪深股市';
							break;
						case 1:
							$scope.info.marketValue = '香港股市';
							break;
						case 10:
							$scope.info.marketValue = '美国股市';
							break;
					}
					$scope.info.initKeyword = '+ 输入关键词';
				}

				$scope.market = window.location.hash.match(/tid\=\d+/) && window.location.hash.match(/tid\=\d+/)[0] && window.location.hash.match(/tid\=\d+/)[0].split('=')[1];
				if( $scope.market ){
					switch($scope.market.substr(-3,1)){
						case '6':
							$scope.info.market_code = 30;
							break;

						case '0':
							$scope.info.market_code = 1;
							break;

						case '3':
							$scope.info.market_code = 10;
							break;
					}
				}

			}

			function initChengData(dataChengList){
				if( dataChengList.data.code == 0 ){
					$scope.checkCheng = false;
					$scope.selectRecord = [];
					$scope.chengInfo = dataChengList.data.data.rows;
					$scope.list = dataChengList.data.data;
					$scope.page = $scope.list.page;
					$scope.total = $scope.page.totalCount;
	                $scope.total_page = $scope.page.pageCount;
	                $scope.currentPage = $scope.page.page;
	                var page_box={};
	                page_box.page=$scope.page.page;
	                page_box.max_page=$scope.page.pageCount;
	                page_box.start_page=1;
	                page_box.prev=$scope.page.page==1?null:$scope.page.page-1;
	                page_box.next=$scope.page.page==$scope.page.pageCount?null:$scope.page.page+1;
	                page_box.end_page=$scope.page.pageCount;
	                page_box.pages=[];
	                var i = $scope.currentPage -2 > 1 ? $scope.currentPage- 2 : 1;
	                var k = 0;
	                for(;i<=page_box.max_page;i++){
	                	k ++;
	                	if(k>5){
	                		break;
	                	}
	                    page_box.pages.push(i);
	                }
	                $scope.page_box=page_box;
				}else{
					$scope.total = 0;
					$scope.chengInfo = [];
				}
			}

			initData();
			initChengData(dataChengList);

			//序列化
			function serialize(obj){
	            var o = {};
	            var a = obj.serializeArray();
	            $.each(a, function() {
	                if (o[this.name]) {
	                    if (!o[this.name].push) {
	                        o[this.name] = [o[this.name]];
	                    }
	                    o[this.name].push(this.value || '');
	                } else {
	                    o[this.name] = this.value || '';
	                }
	            });
	            return o;
			}

			$scope.triggerKeyword = function(e){
				this.info.initKeyword = '';
			}

			$scope.triggerEnter = function(e){
				if( e.keyCode == 13 ){
					this.info.keyword = this.info.keyword || [];
					this.info.keyword.push( this.info.initKeyword );
				}
			}

			$scope.triggerChangeMarket = function(e, id, boolean){
				if(boolean){
					return ;
				}
				$scope.info.market_code = id;
			}

			$scope.trgggerDelete = function(e, value){
				var index = $scope.info.keyword.indexOf( value );
				$scope.info.keyword.splice(index ,1);
			}

			$scope.triggerFormSubmit = function(e, id){
				if(!id){
					$scope.remindShow = "true";
					$scope.remindInfo = "确认保存么？";
					return false;
				}else{

				}
				$scope.triggerConfirmBtn(e, true);
			}

			$scope.triggerConfirmBtn = function(e, boolean){
				$scope.remindShow = "false";
				if(boolean){
					var $form = $(".j-form-submit");
					var serializeObj = serialize($form);
					serializeObj.pending = $scope.info.pending;
					$.ajax({
					type:"post",
					url: "/plate-man/update-plate",
					data:serializeObj
					}).done(function(result){
						$scope.$apply(function(){
							if (result.code == 0) {
								$scope.remindConfirmShow = "true";
								$scope.remindConfirmInfo = "成功处理";
								if (result.data>0 && !serializeObj.id)
									window.location.hash = "#/edit/"+result.data;
							} else if (result.message == "MISSING_REQUIRED_FIELDS") {
								$scope.remindConfirmShow = "true";
								$scope.remindConfirmInfo = "请补充所有必填项。";
							} else {
								$scope.remindConfirmShow = "true";
								$scope.remindConfirmInfo = "添加失败。错误代号：" + result.code;
							}
						});
					})
				}
			}

			$scope.triggerCloseBtn = function(){
				$scope.remindConfirmShow = "false";
			}




			//版定在document
			$(document).click(function(){
				$scope.$apply(function(){
					$scope.selectContent = false;
				})
			})

            $scope.triggerChangePage = function(e, pageIndex){
                if(!pageIndex || $scope.currentPage == pageIndex){
                    return;
                }
                loader({
                    page:pageIndex,
                    tid :$scope.info.id
                }).then(initChengData).finally(function(){});
            };


            $scope.triggerCheckAll = function(){
				$scope.checkCheng = !$scope.checkCheng;
				if( $scope.checkCheng ){
					$(".j-select-record").each(function(){
						var code = $(this).attr("data-code");
						$scope.selectRecord.push(code);
					})
				}else{
					$scope.selectRecord = [];
				}
			}

			//弹出个股
			$(document).on('click', '.j-open-stock', function(){
				var stock_code = $(this).attr('stock-code');
				window.open('/stock-man/stock-info?stock_code=' + stock_code, '_black');
			})

            $(document).on("click", ".j-select-record", function(e){
            	var self = $(this);
            	var code = self.attr("data-code");
            	e.stopPropagation();
            	$scope.$apply(function(){
            		$scope.selectRecord = $scope.selectRecord || [];
            		if( self.prop("checked") ){
            			$scope.selectRecord.push(code)
            		}else{
            			var index = $scope.selectRecord.indexOf(code);
            			$scope.selectRecord.splice(index, 1);
            		}
            	});

            })


            $scope.triggerDeleteCheng = function(){
            	if( $scope.selectRecord && !$scope.selectRecord.length ){
            		$scope.remindDeleteShow = "true";
					$scope.remindDeleteInfo = "没有选择记录!";
					return;
            	}

            	$scope.remindDeleteShow = "true";
				$scope.remindDeleteInfo = "确定移除选择股票?";



            }

            $scope.triggerDeleteBtn = function(e, boolean){
            	$scope.remindDeleteShow = "false";
            	if( !boolean ){
            		return false;
            	}
             	$.ajax({
            		type:"post",
            		url:"/plate-man/remove-stock",
            		data:{plate_id: $scope.info.id, stock_id:$scope.selectRecord}
            	}).done(function(){
					loader({
	                    page:$scope.currentPage,
	                    tid :$scope.info.id
	                }).then(initChengData).finally(function(){});
            	})
            }







		}
	])
})
