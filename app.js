
//Create module 'app'
angular.module('app',['ngRoute'])
       .constant('nrOfPages',18);
      


//routes, ie. slides
angular.module('app').config(function($routeProvider){
  
    $routeProvider.when('/slide/:nr',{
      controller: 'PresentationCtrl',
      templateUrl: function(params){
        console.log(arguments);
        return '/slides/'+nr+'.html';
      }
    }).otherwise({
      controller: 'PresentationCtrl',
      templateUrl: '/slides/1.html'
    });
});




//Our controller
angular.module('app').controller('PresentationCtrl',function($scope,$location,$routeParams,nrOfPages){

  $scope.pageNr = $routeParams.nr || 1;

  $scope.$watch('pageNr',function(value,old){
    if (value >= 0 && value < nrOfPages) {
      $location.path('/slides/'+value);
    }
  });

  $scope.next = function(){
    $scope.pageNr++;
  };

  $scope.prev = function(){
    $scope.pageNr = Math.max(1,$scope.pageNr-1);
  };

});


//figlet directive
angular.module('app').directive('figlet',function(figlet){
  return {
    scope: false,
    link: function(scope,element,attrs){
      attrs.$observe('figlet',function(font){
        if (font) {
          figlet(element.text(),font).then(function(txt){
            element.text(txt);
          });
        }  
      });  
    }
  };
});

//highlightjs directive
angular.module('app').directive('highlight',function(){
  return {
    scope: false,
    link: function(scope,element) {
      hljs.highlightBlock(element[0]);
    }
  };
});


//We construct a Figlet service so we have something to test
angular.module('app').factory('figlet',function($q){
  var defultFont = 'cybermedium';

  return function(txt,font) {
    var deferred = $q.defer();
    font = font || defaultFont;
    
    Figlet.write(txt,font,deferred.resolve);

    return deferred.promise;
  };
});