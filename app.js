                                                                                                                  
/*
                                                            dddddddd                                              
MMMMMMMM               MMMMMMMM                             d::::::d                  lllllll                     
M:::::::M             M:::::::M                             d::::::d                  l:::::l                     
M::::::::M           M::::::::M                             d::::::d                  l:::::l                     
M:::::::::M         M:::::::::M                             d:::::d                   l:::::l                     
M::::::::::M       M::::::::::M   ooooooooooo       ddddddddd:::::d uuuuuu    uuuuuu   l::::l     eeeeeeeeeeee    
M:::::::::::M     M:::::::::::M oo:::::::::::oo   dd::::::::::::::d u::::u    u::::u   l::::l   ee::::::::::::ee  
M:::::::M::::M   M::::M:::::::Mo:::::::::::::::o d::::::::::::::::d u::::u    u::::u   l::::l  e::::::eeeee:::::ee
M::::::M M::::M M::::M M::::::Mo:::::ooooo:::::od:::::::ddddd:::::d u::::u    u::::u   l::::l e::::::e     e:::::e
M::::::M  M::::M::::M  M::::::Mo::::o     o::::od::::::d    d:::::d u::::u    u::::u   l::::l e:::::::eeeee::::::e
M::::::M   M:::::::M   M::::::Mo::::o     o::::od:::::d     d:::::d u::::u    u::::u   l::::l e:::::::::::::::::e 
M::::::M    M:::::M    M::::::Mo::::o     o::::od:::::d     d:::::d u::::u    u::::u   l::::l e::::::eeeeeeeeeee  
M::::::M     MMMMM     M::::::Mo::::o     o::::od:::::d     d:::::d u:::::uuuu:::::u   l::::l e:::::::e           
M::::::M               M::::::Mo:::::ooooo:::::od::::::ddddd::::::ddu:::::::::::::::uul::::::le::::::::e          
M::::::M               M::::::Mo:::::::::::::::o d:::::::::::::::::d u:::::::::::::::ul::::::l e::::::::eeeeeeee  
M::::::M               M::::::M oo:::::::::::oo   d:::::::::ddd::::d  uu::::::::uu:::ul::::::l  ee:::::::::::::e  
MMMMMMMM               MMMMMMMM   ooooooooooo      ddddddddd   ddddd    uuuuuuuu  uuuullllllll    eeeeeeeeeeeeee  

*/

//Create module 'app'
angular.module('app',['ngRoute'])
       .constant('nrOfPages',31);
      


//routes, ie. slides
angular.module('app').config(function($routeProvider){
  
    $routeProvider.when('/slides/:nr',{
      templateUrl: function(params){
        return '/slides/'+params.nr+'.html';
      }
    }).otherwise({
      templateUrl: '/slides/1.html'
    });
});






/*

                                                                                                                                                                            
        CCCCCCCCCCCCC                                            tttt                                               lllllll lllllll                                         
     CCC::::::::::::C                                         ttt:::t                                               l:::::l l:::::l                                         
   CC:::::::::::::::C                                         t:::::t                                               l:::::l l:::::l                                         
  C:::::CCCCCCCC::::C                                         t:::::t                                               l:::::l l:::::l                                         
 C:::::C       CCCCCC   ooooooooooo   nnnn  nnnnnnnn    ttttttt:::::ttttttt    rrrrr   rrrrrrrrr      ooooooooooo    l::::l  l::::l     eeeeeeeeeeee    rrrrr   rrrrrrrrr   
C:::::C               oo:::::::::::oo n:::nn::::::::nn  t:::::::::::::::::t    r::::rrr:::::::::r   oo:::::::::::oo  l::::l  l::::l   ee::::::::::::ee  r::::rrr:::::::::r  
C:::::C              o:::::::::::::::on::::::::::::::nn t:::::::::::::::::t    r:::::::::::::::::r o:::::::::::::::o l::::l  l::::l  e::::::eeeee:::::eer:::::::::::::::::r 
C:::::C              o:::::ooooo:::::onn:::::::::::::::ntttttt:::::::tttttt    rr::::::rrrrr::::::ro:::::ooooo:::::o l::::l  l::::l e::::::e     e:::::err::::::rrrrr::::::r
C:::::C              o::::o     o::::o  n:::::nnnn:::::n      t:::::t           r:::::r     r:::::ro::::o     o::::o l::::l  l::::l e:::::::eeeee::::::e r:::::r     r:::::r
C:::::C              o::::o     o::::o  n::::n    n::::n      t:::::t           r:::::r     rrrrrrro::::o     o::::o l::::l  l::::l e:::::::::::::::::e  r:::::r     rrrrrrr
C:::::C              o::::o     o::::o  n::::n    n::::n      t:::::t           r:::::r            o::::o     o::::o l::::l  l::::l e::::::eeeeeeeeeee   r:::::r            
 C:::::C       CCCCCCo::::o     o::::o  n::::n    n::::n      t:::::t    tttttt r:::::r            o::::o     o::::o l::::l  l::::l e:::::::e            r:::::r            
  C:::::CCCCCCCC::::Co:::::ooooo:::::o  n::::n    n::::n      t::::::tttt:::::t r:::::r            o:::::ooooo:::::ol::::::ll::::::le::::::::e           r:::::r            
   CC:::::::::::::::Co:::::::::::::::o  n::::n    n::::n      tt::::::::::::::t r:::::r            o:::::::::::::::ol::::::ll::::::l e::::::::eeeeeeee   r:::::r            
     CCC::::::::::::C oo:::::::::::oo   n::::n    n::::n        tt:::::::::::tt r:::::r             oo:::::::::::oo l::::::ll::::::l  ee:::::::::::::e   r:::::r            
        CCCCCCCCCCCCC   ooooooooooo     nnnnnn    nnnnnn          ttttttttttt   rrrrrrr               ooooooooooo   llllllllllllllll    eeeeeeeeeeeeee   rrrrrrr            

*/                                                                                                                                                                          

angular.module('app').controller('PresentationCtrl',function($scope,$location,$routeParams,nrOfPages){

  $scope.pageNr = $routeParams.nr || 1;

  $scope.$watch('pageNr',function(value,old){
    if (value >= 0 && value < nrOfPages) {
      $location.path('/slides/'+value);
    }
  });

  $scope.next = function(){
    $scope.pageNr = Math.min(nrOfPages,$scope.pageNr+1);
  };

  $scope.prev = function(){
    $scope.pageNr = Math.max(1,$scope.pageNr-1);
  };

  $scope.keypress = function(event) {
    if (event.charCode === 32) {
      $scope.next();
      event.preventDefault();
    } else if (event.keyCode === 13) {
      $scope.prev();
      event.preventDefault();
    }

  };


});







/*                                                                                                                                    
                                                                                                                                    
   SSSSSSSSSSSSSSS                                                                    iiii                                          
 SS:::::::::::::::S                                                                  i::::i                                         
S:::::SSSSSS::::::S                                                                   iiii                                          
S:::::S     SSSSSSS                                                                                                                 
S:::::S                eeeeeeeeeeee    rrrrr   rrrrrrrrr   vvvvvvv           vvvvvvviiiiiii     cccccccccccccccc    eeeeeeeeeeee    
S:::::S              ee::::::::::::ee  r::::rrr:::::::::r   v:::::v         v:::::v i:::::i   cc:::::::::::::::c  ee::::::::::::ee  
 S::::SSSS          e::::::eeeee:::::eer:::::::::::::::::r   v:::::v       v:::::v   i::::i  c:::::::::::::::::c e::::::eeeee:::::ee
  SS::::::SSSSS    e::::::e     e:::::err::::::rrrrr::::::r   v:::::v     v:::::v    i::::i c:::::::cccccc:::::ce::::::e     e:::::e
    SSS::::::::SS  e:::::::eeeee::::::e r:::::r     r:::::r    v:::::v   v:::::v     i::::i c::::::c     ccccccce:::::::eeeee::::::e
       SSSSSS::::S e:::::::::::::::::e  r:::::r     rrrrrrr     v:::::v v:::::v      i::::i c:::::c             e:::::::::::::::::e 
            S:::::Se::::::eeeeeeeeeee   r:::::r                  v:::::v:::::v       i::::i c:::::c             e::::::eeeeeeeeeee  
            S:::::Se:::::::e            r:::::r                   v:::::::::v        i::::i c::::::c     ccccccce:::::::e           
SSSSSSS     S:::::Se::::::::e           r:::::r                    v:::::::v        i::::::ic:::::::cccccc:::::ce::::::::e          
S::::::SSSSSS:::::S e::::::::eeeeeeee   r:::::r                     v:::::v         i::::::i c:::::::::::::::::c e::::::::eeeeeeee  
S:::::::::::::::SS   ee:::::::::::::e   r:::::r                      v:::v          i::::::i  cc:::::::::::::::c  ee:::::::::::::e  
 SSSSSSSSSSSSSSS       eeeeeeeeeeeeee   rrrrrrr                       vvv           iiiiiiii    cccccccccccccccc    eeeeeeeeeeeeee  

*/                                                                                                                                    
                                                                                                                                    
            
//We construct a Figlet service so we have something to test
angular.module('app').factory('figlet',function($q,$rootScope,$timeout){
  var defaultFont = 'cybermedium';

  return function(txt,font) {
    var deferred = $q.defer();
    font = font || defaultFont;
    
    Figlet.write(txt,font,function(result){

      //Some fonts have lots of empty rows att the end and start.
      result = result.replace(/^\s*[\n]*$/gm,'');
      deferred.resolve(result);

      //asciimo sometimes returns async (when loading font)
      //but not when font is loaded. 
      if (!$rootScope.$$phase) {
        $rootScope.$apply();
      }
      
    });

    return deferred.promise;
  };
});











/*                                                                                                                                                                     
                                                                                                                                                                     
DDDDDDDDDDDDD          iiii                                                                       tttt            iiii                                               
D::::::::::::DDD      i::::i                                                                   ttt:::t           i::::i                                              
D:::::::::::::::DD     iiii                                                                    t:::::t            iiii                                               
DDD:::::DDDDD:::::D                                                                            t:::::t                                                               
  D:::::D    D:::::D iiiiiii rrrrr   rrrrrrrrr       eeeeeeeeeeee        ccccccccccccccccttttttt:::::ttttttt    iiiiiii vvvvvvv           vvvvvvv    eeeeeeeeeeee    
  D:::::D     D:::::Di:::::i r::::rrr:::::::::r    ee::::::::::::ee    cc:::::::::::::::ct:::::::::::::::::t    i:::::i  v:::::v         v:::::v   ee::::::::::::ee  
  D:::::D     D:::::D i::::i r:::::::::::::::::r  e::::::eeeee:::::ee c:::::::::::::::::ct:::::::::::::::::t     i::::i   v:::::v       v:::::v   e::::::eeeee:::::ee
  D:::::D     D:::::D i::::i rr::::::rrrrr::::::re::::::e     e:::::ec:::::::cccccc:::::ctttttt:::::::tttttt     i::::i    v:::::v     v:::::v   e::::::e     e:::::e
  D:::::D     D:::::D i::::i  r:::::r     r:::::re:::::::eeeee::::::ec::::::c     ccccccc      t:::::t           i::::i     v:::::v   v:::::v    e:::::::eeeee::::::e
  D:::::D     D:::::D i::::i  r:::::r     rrrrrrre:::::::::::::::::e c:::::c                   t:::::t           i::::i      v:::::v v:::::v     e:::::::::::::::::e 
  D:::::D     D:::::D i::::i  r:::::r            e::::::eeeeeeeeeee  c:::::c                   t:::::t           i::::i       v:::::v:::::v      e::::::eeeeeeeeeee  
  D:::::D    D:::::D  i::::i  r:::::r            e:::::::e           c::::::c     ccccccc      t:::::t    tttttt i::::i        v:::::::::v       e:::::::e           
DDD:::::DDDDD:::::D  i::::::i r:::::r            e::::::::e          c:::::::cccccc:::::c      t::::::tttt:::::ti::::::i        v:::::::v        e::::::::e          
D:::::::::::::::DD   i::::::i r:::::r             e::::::::eeeeeeee   c:::::::::::::::::c      tt::::::::::::::ti::::::i         v:::::v          e::::::::eeeeeeee  
D::::::::::::DDD     i::::::i r:::::r              ee:::::::::::::e    cc:::::::::::::::c        tt:::::::::::tti::::::i          v:::v            ee:::::::::::::e  
DDDDDDDDDDDDD        iiiiiiii rrrrrrr                eeeeeeeeeeeeee      cccccccccccccccc          ttttttttttt  iiiiiiii           vvv               eeeeeeeeeeeeee  
                                                                                                                                                                     
*/                                                                                                                                                                                                                                                                                                                                        
          
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


