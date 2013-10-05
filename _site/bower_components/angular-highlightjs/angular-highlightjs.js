angular.module('hljs', [])

.factory('$hljsCache', [
         '$cacheFactory',
function ($cacheFactory) {
  return $cacheFactory('$hljsCache');
}])

.controller('HljsCtrl', [
                  '$hljsCache',
function HljsCtrl ($hljsCache) {
  var ctrl = this;

  var _elm = null,
      _lang = null,
      _code = null,
      _hlCb = null;

  ctrl.init = function (codeElm) {
    _elm = codeElm;
  };

  ctrl.setLanguage = function (lang) {
    _lang = lang;

    if (_code) {
      ctrl.highlight(_code);
    }
  };

  ctrl.highlightCallback = function (cb) {
    _hlCb = cb;
  };

  ctrl.highlight = function (code) {
    if (!_elm) {
      return;
    }

    var res, cacheKey;

    _code = code;

    if (_lang) {
      // language specified
      cacheKey = ctrl._cacheKey(_lang, _code);
      res = $hljsCache.get(cacheKey);

      if (!res) {
        res = hljs.highlight(_lang, _code, true);
        $hljsCache.put(cacheKey, res);
      }
    }
    else {
      // language auto-detect
      cacheKey = ctrl._cacheKey(_code);
      res = $hljsCache.get(cacheKey);

      if (!res) {
        res = hljs.highlightAuto(_code);
        $hljsCache.put(cacheKey, res);
      }
    }

    _elm.html(res.value);

    if (_hlCb !== null && angular.isFunction(_hlCb)) {
      _hlCb();
    }
  };

  ctrl.clear = function () {
    if (!_elm) {
      return;
    }
    _code = null;
    _elm.text('');
  };

  ctrl.release = function () {
    _elm = null;
  };

  ctrl._cacheKey = function () {
    var args = Array.prototype.slice.call(arguments),
        glue = "!angular-highlightjs!";
    return args.join(glue);
  };
}])

.directive('hljs', [function () {
  return {
    restrict: 'EA',
    controller: 'HljsCtrl',
    compile: function(tElm, tAttrs, transclude) {
      // get static code
      // strip the starting "new line" character
      var staticCode = tElm[0].innerHTML.replace(/^\r\n|\r|\n/, '');

      // put template
      tElm.html('<pre><code></code></pre>');

      return function postLink(scope, iElm, iAttrs, ctrl) {
        ctrl.init(iElm.find('code'));

        if (iAttrs.onhighlight) {
          ctrl.highlightCallback(function () {
            scope.$eval(iAttrs.onhighlight);
          });
        }

        if (staticCode) {
          ctrl.highlight(staticCode);
        }

        scope.$on('$destroy', function () {
          ctrl.release();
        });
      };
    }
  };
}])

.directive('language', [function () {
  return {
    require: 'hljs',
    restrict: 'A',
    link: function (scope, iElm, iAttrs, ctrl) {

      iAttrs.$observe('language', function (lang) {
        if (angular.isDefined(lang)) {
          ctrl.setLanguage(lang);
        }
      });
    }
  };
}])

.directive('source', [function () {
  return {
    require: 'hljs',
    restrict: 'A',
    link: function(scope, iElm, iAttrs, ctrl) {

      scope.$watch(iAttrs.source, function (newCode, oldCode) {
        if (newCode) {
          ctrl.highlight(newCode);
        }
        else {
          ctrl.clear();
        }
      });
    }
  };
}])

.directive('include', [
         '$http', '$templateCache', '$q',
function ($http,   $templateCache,   $q) {
  return {
    require: 'hljs',
    restrict: 'A',
    compile: function(tElm, tAttrs, transclude) {
      var srcExpr = tAttrs.include;

      return function postLink(scope, iElm, iAttrs, ctrl) {
        var changeCounter = 0;

        scope.$watch(srcExpr, function (src) {
          var thisChangeId = ++changeCounter;

          if (src && angular.isString(src)) {
            var templateCachePromise, dfd;

            templateCachePromise = $templateCache.get(src);
            if (!templateCachePromise) {
              dfd = $q.defer();
              $http.get(src, {cache: $templateCache}).success(function (code) {
                if (thisChangeId !== changeCounter) {
                  return;
                }
                dfd.resolve(code);
              }).error(function() {
                if (thisChangeId === changeCounter) {
                  ctrl.clear();
                }
                dfd.resolve();
              });
              templateCachePromise = dfd.promise;
            }
            
            $q.when(templateCachePromise)
            .then(function (code) {
              if (!code) {
                return;
              }

              // $templateCache from $http
              if (angular.isArray(code)) {
                // 1.1.5
                code = code[1];
              }
              else if (angular.isObject(code)) {
                // 1.0.7
                code = code.data;
              }

              code = code.replace(/^\r\n|\r|\n/, '');
              ctrl.highlight(code);
            });
          }
          else {
            ctrl.clear();
          }
        });
      };
    }
  };
}]);
