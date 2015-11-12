define([
	"angular",
	"./controllerModule",
	"underscore.min",
	'app/common/dialog',
	"angular-route"
],function(angular, module, _, Dialog){
    //controllerModule模块下，定义listController控制器
	module.controller("listController", ["$scope", "$route", "$rootScope", '$route', "dataList", "loader", 'searchPlateLoader', 'deletePalteLoader',
		function($scope, $route, $rootScope, $route, dataList, loader, searchPlateLoader, deletePalteLoader){
            $scope.info = {};
		    var initData = function(ret){
                $scope.rows = ret.data.data && ret.data.data.rows;
                $scope.currentId = $route.current.params.tid;
                if( !$scope.rows ){
                	$scope.plateList = {};
                	$scope.total = 0;
                	return;
                }

				$scope.rows = $.map($scope.rows, function(value, attr){
					return value;
				});
				$scope.plateList = $scope.rows;
				$scope.list = ret.data.data;
				$scope.set = $scope.list.set;
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
                //总页数不能超过5页
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
            };
            initData(dataList);

			$scope.changeDisplay = function(tid){
				var plateItem = _.findWhere($scope.plateList, {plate_id: tid} );
				plateItem.delete_flag = +plateItem.delete_flag ? 0 : 1 ;
			}

            $scope.triggerChangePage = function(e, pageIndex){
                if(!pageIndex || $scope.currentPage == pageIndex){
                    return;
                }
                loader({
                    page: pageIndex,
                    tid: $scope.currentId
                }).then(initData).finally(function(){});
            };


			//显示隐藏
			$scope.triggerChangeDisplay = function(e,tid, boolean){
				e.stopPropagation();
				$.ajax({
					type:"post",
					url: boolean ? "enable-plate" : "disable-plate",
					data:{id:tid},
					dataType:"json"
				}).done(function(resulte){
					if( resulte.result===0 ){
						$scope.$apply(function(){
							$scope.changeDisplay( tid );
						});
					}
				}).fail(function(){

				})
			}

			// 启动计算
			$scope.triggerCompute = function(e, id){
                $scope.remindShow = true;
                $scope.remindTitle = "是否启动计算？";
                $scope.remindBody = "此操作会启动板块指数实时计算，请将所有成份股添加完毕后再执行操作。";
                $scope.info.currentPlateId = id;
				e.stopPropagation();
			}
            $scope.triggerConfirmBtn = function(e, boolean){
                $scope.remindShow = false;

                if(!boolean){
                    return
                }else{
                    $.ajax({
                        url: "/plate-man/start-calculation?id="+ $scope.info.currentPlateId,
                    }).then(function(ret){
                        $scope.$apply(function(){
                            $scope.remindConfirmShow = true;
                            if(ret.code == 0) {
                                $scope.remindConfirmInfo = "处理成功";
                                var plateItem = _.findWhere($scope.plateList, {plate_id: $scope.info.currentPlateId} );
                                plateItem.start_cal = 0;
                            } else if (ret.message == 'CONNECTION_FAILED') {
                                $scope.remindConfirmInfo = "连接失败，请重试。";
                            } else if (ret.message == 'START_CALCULATION_FAILED') {
                                $scope.remindConfirmInfo = "处理失败。原因："+ret.data;
                            } else {
                                $scope.remindConfirmInfo = "处理失败。错误代号："+ret.code;
                            }
                        })
                    },function(){})
                }
            }

            $scope.triggerCloseBtn = function(){
                $scope.remindConfirmShow = false;
            }

			//前往详情页
			$scope.triggerGetInfo = function(e, id){
				var tid = $route.current.params.tid;
				var cate = $(".g-sd-plate-list").find("dd").filter("[class=current]").text();
				window.location.hash = "/edit/"+id+"?tid="+tid+"&cate="+encodeURIComponent(cate);
			}

			//左边导航
			$scope.triggerChangeSet = function(e, set){
				window.location.hash = "#/cate/"+set;
			}

			// 搜索关键字
			$scope.triggerSearchPlate = function(e){
				var keywords = $('.j-search-input').val();
				if(!keywords){
					initData(dataList);
					return false;
				}
				var market;
				switch($route.current.params.tid.substr(-3, 1)){
					case '6':
						market = 1;
						break;

					case '0':
						market = 2
						break;

					case '3':
						market = 4;
						break;
				}
				var params = {keywords: keywords, market: market};
				searchPlateLoader(params).success(function(ret){
					var translateData = {};
					translateData.data = ret;
					initData(translateData);
				})

			};


			//删除板块
			$scope.triggerDelete = function(e, plateId){
				e.stopPropagation();
				var dialog = new Dialog({
					messageTitle: '确认删除么',
					messageBody: '',
					onBtnClick: function(event){
						if(event == 'submit'){
							deletePalteLoader(plateId).success(function(ret){
								$('tr').filter('[data-plateId=' +plateId+ ']').remove();
							})
						}
					}
				});
			};

		}
	])
})
