1.函数分阶段，已angular.bootStrap(document.body, 'myApp')为分界线
1-1.本地注册器

预先准备需要注册本地服务localeProvider
angularModule('ngLocale', []).provider('locale', $localProvider);

angularModule('ngLocale') = {
	_invokeQueue : invokeQueue;
	provider : invokeLater('$provider', 'provider');
}

function invokeLater(provider, method){	
	return function(){
		invokeQueue.push(provider, method, arguments);
	}
}

//执行完成之后
modules.ngLocale = {
	_invokeQueue : ['$provider', 'provider', ['local', $localProvider]]
}


angularModule('ng', ['ngLocale'], ['$provider', function ngModule($provider){
	// 编译用的指令
	$provider.provider('compile', $compileProvider)
	.directive({
		a : htmlAnchorDirective
	})
}])

var modules = {};
return function ngModule(name, require, configFn){
	return ensure(name, modules, function(){
		config = invokeLater('$inject', 'invoke');
		invokeQueue = [];
		var moduleInstance = {
			_invokeQueue: invokeQueue,
			config : config
			require : ['ngLocale'],		
		};
		if(configFn){
			config(configFn)
		}
		function invokeLater(name, method){
			return function(){
				invokeQueue.push(name, method, arguments);
			}
		}
		return moduleInstance;
	})
}


//完成在
modules.ng = {
	_invokeQueue : ['$inject', 'invoke', ['$provider', function ngModule('$provider'){}]],
	require : ['ngLocale']
}


//第二个阶段，执行
app.js，绑定控制器阶段
var myApp = angular.module('myApp', []);
var invokeQueue = [];
moduleInstance = {
	_invokeQueue : invokeQueue,
	controller : invokeLater('$controller', register)
}

function invokeLater(name, method){
	return function(){
		invokeQueue.push(name, method, arguments);
	}
} 

myApp.controller('indexController', ['$rootScope', function($rootScope){
	
}])

modules.myApp = {
	_invokeQueue :['$controllerProvider', register, ['indexController', ['$rootScope', function($rootScope){
	
}]]
}


//第三阶段执行
angular.bootStrap(document.body, myApp);
往下执行
function loadModules(loadToModules){
	var runBlocks = [];
	forEach(loadToModules, function(module){
		if(module.isString()){
			var moduleFn = angularModule(module);
			var runBlocks = runBlocks.concat(loadModules(moduleFn.require).concat(moduleFn._runBlocks));
			for(var _invokeQueue = moduleFn._invokeQueue; i=0; i<_invokeQueue.length; i++){
				invokeArgs = _invokeQueue[i];
				var provider = providerInjector.get(invokeArgs[0]);
				// 第一次执行module = 'ngLocale',
				// 执行完的结果providerCache['$localeProvider'] = $this.get;
				//还是的执行结果也是这个
				provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
			}
		}
	})
}





//执行module为ng的情况
angularModule['ng', ['ngLocale'], ['$provider', function ngModule($provider){
	// 返回一个指令的this;
	var registerDirective = $provider.provider('$compile', 'compileProvider')
	// ng内部的html指令定义
	registerDirective.directive({
		'a' : htmlAnchorDirective,
		'ngBind' : ngBindDirective,
		'ngController' :　ngControllerProvider
	});
	// 绑定了一些列的指令到providerCache上面，后面再解析html的时候，可能会用到
	//结果是providerCache[aDirectiveProvider] = {$get: ['$injector', '$exception', function(){}]}
	//结果是providerCache['ngControllerDirectiveProvider'] = {$get: ['$injector', '$exception', function(){}]};

	// 所有的指令都加入到hasDirective对象中，表示这个指令已经注册过。
	hasDirecitve['ngController'] = [];

	$provider.provider({'$controller': $ControllerProvider});
	// 执行完$controller的结果是, $controllerDirective
	providerCache.$controllerProvider = {
		register : fn,
		$get : fn
	},


}]]

// 上面的比那里registerDirective指向这里
this.directive = function registerDirective(name, directiveFactory){
	return provider.factory(name + 'directive', ['$injector,' '$exception', function($injector, $exception){

	}]);
}

function factory(name, provider_){
	return provider(name, {$get: provider_})
}

function provider(name, provider_){
	if(isArray(provider_) || isFunction(provider_)){
		provider_ = providerInjector.instantiate(provider_)
	}
	return providerCache[name] = provider_;

}

function instantiate(provider_){
	var Consturctor = function(){};
	Consturctor.prototype = provider_.prototype;
	var instance = new Consturctor();
	var returnedValue = invoke(provider_, instance);
	return isObject(returnedValue) || isFunction(returnedValue) ? returnedValue : instance; 
}

function invoke(){

}

function value(name, value){
	return factory(name, vlaueFn(value))
}

function valueFn(value){
	return function(){ return value  }
}


// module为数组的情况，为了获取到开启的元素，就是element
module = ['$provider', function($provider){
	$provider.value('$rootElement', element)
}]

providerInjector.invoke(['$provider', function($provider){
	$provider.value('$rootElement', element)
}])

$providerCache.$rootElementProvider = {
	$get : function(){ return element}
}

// module为'myApp'的情况
// 执行结果为把indexController加入到controllers对象中。
function $ControllerProvider(){
	var controllers = {};
	this.register = function(name, controller){
		if(isObject(name)){

		}else{
			controllers[name] = controller;
		}
	}
}


//执行在html中找默认绑定过的指令

