
beforeEach(module('app'));

describe('Figlet service',function(){

  it('should be a function',function(done){
    inject(function(figlet){
      expect(figlet).to.be.a('function');
      done();
    });
  });


  it('should return a promise that resolves to a figlet',function(done){
    inject(function($rootScope,figlet){
      
      //Mock Figlet.write
      window.Figlet = { write: function(t,f,fn){ setTimeout(function(){ fn('foobar');},10); } };


      var promise = figlet('text','font'); 

      //Resolve promise and test result 
      promise.then(function(result){
        expect(result).to.be.equal('foobar');
        done();
      });

      //or test with chai-as-promised plugin!
      expect(promise).to.eventually.equal('foobar').and.notify(done);
      
      //AnguarJS promises is hooked to digest cycle, trigger one to resolve promises.
      $rootScope.$apply();
    });
  });

});



// Controller
describe('PresentationCtrls',function(){

  //from the presentation, see below for prev tests as well
  describe('next method',function(){
    it('should increase current pageNr and navigate to next slide',function(){    

     inject(function($rootScope,$controller){
        //Create a new scope for the controller to use.
        scope = $rootScope.$new();

        //Create a spy to spy on $location.path calls.
        pathSpy = sinon.spy();

        //Instantiate the controller, passing along our new scope
        //and overriding $location
        $controller("PresentationCtrl",{ 
          '$scope':scope, 
          '$location': { path: pathSpy },
          'nrOfPages': 3,
        });

        expect(scope.pageNr).to.be.equal(1);
        scope.next();
        
        //scope.$apply works as well
        scope.$digest();

        expect(scope.pageNr).to.be.equal(2);
        expect(pathSpy).to.have.been.calledOnce.and.calledWith('/slides/2');

      });
    });
  });

  describe('scope',function(){

    it('should have two methods and current page nr',function(){
      inject(function($rootScope,$controller){
        //Create a new scope for the controller to use.
        var scope = $rootScope.$new();

        //Instantiate the controller, passing along our new scope.
        $controller("PresentationCtrl",{ '$scope':scope });
        
        //Afterwards check the state of the scope.
        expect(scope.next).to.be.a('function');
        expect(scope.prev).to.be.a('function');
        expect(scope.pageNr).to.be.a('number').and.equal(1);

      });
    });
  });

  describe('next and prev method',function(){
    var scope,pathSpy;

    //We instantiate the controller here in beforeEach since every test
    //will do the same.
    beforeEach(function(done){
      inject(function($rootScope,$controller){
        //Create a new scope for the controller to use.
        scope = $rootScope.$new();

        //Create a spy to spy on $location.path calls.
        pathSpy = sinon.spy();

        //Instantiate the controller, passing along our new scope
        //and overriding $location
        $controller("PresentationCtrl",{ 
          '$scope':scope, 
          '$location': { path: pathSpy },
          'nrOfPages': 3,
        });

        //Since this beforeEach is async we need to let mocha now that we're done.
        done();
      });
    });

    it('should increase current pageNr with each call to next and decrease with prev',function(){
      expect(scope.pageNr).to.be.equal(1);
      scope.next();
      
      //scope.$apply works as well
      scope.$digest();

      expect(scope.pageNr).to.be.equal(2);
      expect(pathSpy).to.have.been.calledOnce.and.calledWith('/slides/2');

      //And back again.
      scope.prev();

      scope.$digest();

      expect(scope.pageNr).to.be.equal(1);
      expect(pathSpy).to.have.been.calledTwice.and.calledWith('/slides/1');

    });

    it('should not go below page 1',function(){
      expect(scope.pageNr).to.be.equal(1);
      scope.prev();
      
      //scope.$apply works as well
      scope.$digest();

      expect(scope.pageNr).to.be.equal(1);
    });

    it('should stop at max nr of pages',function(){
      expect(scope.pageNr).to.be.equal(1);
      scope.pageNr = 2; //we know nrOfPages is set to 3
      
      scope.next();
      scope.$digest();
      expect(scope.pageNr).to.be.equal(3);

      scope.next();
      scope.$digest();
      expect(scope.pageNr).to.be.equal(3);
    });

  });
});




describe('Figlet directive',function(){


  it('should replace the contents of the figlet',function(done){
    
    //mock figlet service
    module('app', function($provide) {
      $provide.provider('figlet', function() {
          this.$get = function($q,$rootScope) {
              return function(){
                var deferred = $q.defer();
                deferred.resolve('foobar'); 
                return deferred.promise;
              };
          };
      });
    });

    //A test template with the directive under testing
    var element = angular.element('<pre figlet="awesomefont">awesome</pre>');

    inject(function($compile,$rootScope){
      
      //Compile the template
      $compile(element)($rootScope);
      //One digest to compile it, triggering link and $observe
      $rootScope.$digest();

      //Then a timeout so we can make a second digest.
      //setTimeout(function(){
        //This digest triggers the promise in the Figlet service
        //$rootScope.$digest();  
        //Let's check that it has transformed the DOM
        expect(element.text()).to.equal('foobar');
        done();
      //},10);
    });
    
  });
});