var inputDirective = ['$browser', '$sniffer', function($browser, $sniffer) {
  return {
    restrict: 'E',
    require: '?ngModel',
    link: function(scope, element, attr, ctrl) {
      if (ctrl) {
        (inputType[lowercase(attr.type)] || inputType.text)(scope, element, attr, ctrl, $sniffer,
                                                            $browser);
      }
    }
  };
}];

var directive1 = {
    restrict : 'E',
    require : '?ngModel',
    priority : 0,
    index :0,
    name : 'input',
    link : function(scope, element, attr, ctrl) {
      if (ctrl) {
        (inputType[lowercase(attr.type)] || inputType.text)(scope, element, attr, ctrl, $sniffer,
                                                            $browser);
      }
    },
    compile : function(){ return directive1.link; }
};



var ngModelDirective = function() {
  return {
    require: ['ngModel', '^?form'],
    controller: NgModelController,
    link: function(scope, element, attr, ctrls) {
      // notify others, especially parent forms

      var modelCtrl = ctrls[0],
          formCtrl = ctrls[1] || nullFormCtrl;

      formCtrl.$addControl(modelCtrl);

      scope.$on('$destroy', function() {
        formCtrl.$removeControl(modelCtrl);
      });
    }
  };
};

var directive2 = {
    compile : function(){ return directive.link; },
    link : function(scope, element, attr, ctrls) {
      // notify others, especially parent forms

      var modelCtrl = ctrls[0],
          formCtrl = ctrls[1] || nullFormCtrl;

      formCtrl.$addControl(modelCtrl);

      scope.$on('$destroy', function() {
        formCtrl.$removeControl(modelCtrl);
      });
    },
    require: ['ngModel', '^?form'],
    controller: NgModelController,
    priority : 0,
    index : 0,
    name : 'ngModel',
    restrict : 'E'
};





function nodeLinkFn(){
  var locals = {
    $scope: directive === newIsolateScopeDirective || directive.$$isolateScope ? isolateScope : scope,
    $element: $element,
    $attrs: attrs,
    $transclude: transcludeFn
  };
  controller = directive.controller;
  // 结果返回NgModelController注入函数的实例。
  controllerInstance = $controller(controller, locals);
  // elementControllers = {
  //   'ngModel' : 实例
  // }
  elementControllers[directive.name] = controllerInstance;
    // getControllers函数的执行结果, NgModelController实例
    var attrs = templateAttrs;
      linkFn(linkFn.isolateScope ? isolateScope : scope, $element, attrs,
      linkFn.require && getControllers(linkFn.require, $element, elementControllers), transcludeFn);   
}


// 在$element加入data
// jqLite.prototype.data = function fn();
function getControllers(require, $element, elementControllers){
    var retrievalMethod = 'data';
    if (elementControllers && retrievalMethod === 'data') {
      value = elementControllers[require];
    }   
}

function $controller(){
  instance = $injector.instantiate(expression, locals);
  return instance;
}

function instantiate(provider_, locals){
    var Constructor = function(){};
    var instance = new Constructor();
    var returnedValue = invoke(provider_, instance, locals);
    return returnedValue;
}


// 调用compile方法
// inputType[lowercase(attr.type)](scope, element, attr, ctrl, $sniffer,$browser)

function textInputType(){
    var listener = function() {
        if (composing) return;
        var value = element.val();
        // By default we will trim the value
        // If the attribute ng-trim exists we will avoid trimming
        // e.g. <input ng-model="foo" ng-trim="false">
        if (toBoolean(attr.ngTrim || 'T')) {
          value = trim(value);
        }

        if (ctrl.$viewValue !== value) {
          if (scope.$$phase) {
            ctrl.$setViewValue(value);
          } else {
            scope.$apply(function() {
                // 进行脏值
              ctrl.$setViewValue(value);
            });
          }
        }
    };
    // 进行事件监听
    element.on('input', listener);
    ctrl.$render = function() {
        element.val(ctrl.$isEmpty(ctrl.$viewValue) ? '' : ctrl.$viewValue);
    };
}



var parentForm = $element.inheritedData('$formController') || nullFormCtrl
this.$pristine = true;
this.$dirty = false;
ctrl.setViewValue = function(value) {
    this.$viewValue = value;

    // change to dirty
    if (this.$pristine) {
      this.$dirty = true;
      this.$pristine = false;
      $element.removeClass(PRISTINE_CLASS).addClass(DIRTY_CLASS);
      // @todo
      parentForm.$setDirty();
    }

    forEach(this.$parsers, function(fn) {
      value = fn(value);
    });

    if (this.$modelValue !== value) {
      this.$modelValue = value;
      // 设置value属性值;
      ngModelSet($scope, value);
      forEach(this.$viewChangeListeners, function(listener) {
        try {
          listener();
        } catch(e) {
          $exceptionHandler(e);
        }
      });
    }
  };

function setter(obj, path, setValue, fullExp, options) {
  //needed?
  options = options || {};

  var element = path.split('.'), key;
  for (var i = 0; element.length > 1; i++) {
    key = ensureSafeMemberName(element.shift(), fullExp);
    var propertyObj = obj[key];
    if (!propertyObj) {
      propertyObj = {};
      obj[key] = propertyObj;
    }
    obj = propertyObj;
    if (obj.then && options.unwrapPromises) {
      promiseWarning(fullExp);
      if (!("$$v" in obj)) {
        (function(promise) {
          promise.then(function(val) { promise.$$v = val; }); }
        )(obj);
      }
      if (obj.$$v === undefined) {
        obj.$$v = {};
      }
      obj = obj.$$v;
    }
  }
  key = ensureSafeMemberName(element.shift(), fullExp);
  obj[key] = setValue;
  return setValue;
}


  var ngModelGet = $parse($attr.ngModel) = function(self, locals) {
        return (getter(self, locals));
      }
      ngModelSet = ngModelGet.assign = function(self, value) {
          return setter(self, ident, value, parser.text, parser.options);
        };


var NgModelController =['$scope', function(scope){
    scope.$watch(function ngModelWatch() {
        var value = ngModelGet($scope);

        // if scope model value and ngModel value are out of sync
        if (ctrl.$modelValue !== value) {

          var formatters = ctrl.$formatters,
              idx = formatters.length;

          ctrl.$modelValue = value;
          while(idx--) {
            value = formatters[idx](value);
          }

          if (ctrl.$viewValue !== value) {
            ctrl.$viewValue = value;
            ctrl.$render();
          }
        }
        return value;
    });
}];