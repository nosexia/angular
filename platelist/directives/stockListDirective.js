define([
	'jquery',
	'angular'
],function($, angular){
	var stockListDirective=angular.module('stockListDirective', []);
	stockListDirective.directive('myStocklist', function(){
		return {
			restrict: 'AE',
			scope:{
				plateId: '@',
				remindConfirmShow: '=',
				chengInfo: '=',
				remindConfirmInfo: '=',
				triggerSelectStock: '&'
			},
			template: '<div class="u-search-cheng fl"   >'+
                			'<input type="text" class="gray01 j-trans-input" placeholder="添加股票" >'+
							'<div  class="selectFloatBox j-selectFloatBox" style="display:none" ></div>'+
						'</div>',
			replace: true,
			link: function($scope, element){
				var $eTransInput = $(element).find('.j-trans-input');
				var $eSelectBox = $(element).find('.j-selectFloatBox');
				$eTransInput.bind('click', function(e){
					e.stopPropagation();
				});

				$eTransInput.bind('keyup', function(e){					
					var keyCode = e.keyCode;
					if(keyCode == 38 || keyCode == 40 || keyCode == 13){
						return false;
					}
					var val = $(this).val();
					var tempStr ='';
					$.ajax({
						url:'/plate-man/search-stock?keyword='+val,
						dataType:'json'
					}).done(function(ret){
						if( ret.data && ret.data.rows && ret.data.rows.length ){
							$.each(ret.data.rows, function(index, item){
								var current = index===0 ? 'class=current' : '';
								tempStr += '<p  item-id="'+ item.id +'" ' + current +'>'+
												'<span  class="span02" >'+ item.code +'</span>'+
    											'<span  class="span01">'+ item.name +'</span>'+
											'</p>';
								if(index>8){
									return false;
								}
							});

							$eSelectBox.html(tempStr).show();
						}else{
							$eSelectBox.hide();
						}						
					});
				});

				$eSelectBox.on('click', 'p', function(e){
					selectStock.call(this, e);
				});

				function selectStock(e){
					e.stopPropagation();
					var stock_id = $(this).attr('item-id');
					$.ajax({
						url: '/plate-man/add-stock?plate_id='+$scope.plateId+'&stock_id='+stock_id,
						dataType: 'json'
					}).done(function(result){
						$scope.$apply(function(){
							$eSelectBox.hide();
							if (result.code === 0) {
								$scope.chengInfo.splice(0, 0, result.data.info);
							} else if (result.message == 'MARKET_NOT_MATCH') {
								$scope.remindConfirmShow = 'true';
								$scope.remindConfirmInfo = '不能添加跨市场的股票。';
							} else if (result.message == 'RELATION_EXIST') {
								$scope.remindConfirmShow = 'true';
								$scope.remindConfirmInfo = '所选股票已存在。';
							} else {
								$scope.remindConfirmShow = 'true';
								$scope.remindConfirmInfo = '添加失败。错误代号：' + result.code;
							}
						});

					});
				}

				$eTransInput.focus(function(e){
	            	$(this).on('keyup.original', function(e){
	            		var keyCode = e.keyCode;
	            		var $p = $eSelectBox.find('p');
	            		if(keyCode == 38){
	            			selectUp($p);
	            		}else if(keyCode == 40){
	            			selectDown($p);
	            		}else if(keyCode == 13){
	            			selectEnter(e);
	            		}
	            	});
	            });

	            $eTransInput.blur(function(){
	            	$(this).unbind('keyup.original');
	            });

	            $eSelectBox.on('mouseover', 'p', function(){
	            	$eSelectBox.find('p').removeClass('current');
	            	$(this).addClass('current');
            	});	            


	            function selectUp($p){	            	
	            	var len = $p.length;
	            	var index = $p.index( $eSelectBox.find('p.current') );
	            	index--;
	            	index = index < 0 ? len-1 : index;
	            	$p.removeClass('current');
	            	$p.eq(index).addClass('current');

	            }

	            function selectDown($p){
	            	var len = $p.length;
	            	var index = $p.index( $eSelectBox.find('p.current') );
	            	index++;
	            	index = index>len-1 ? 0 : index;
	            	$p.removeClass('current');
	            	$p.eq(index).addClass('current');

	            }

	            function selectEnter(e){
	            	var itemId = $eSelectBox.find('p.current').attr('item-id');
	            	selectStock.call($eSelectBox.find('p.current'), e);
	            }

				//版定在document
				$(document).click(function(){					
					$eSelectBox.hide();					
				});

			}
		};
	});
});

