//Phantomjs doesn't have bind, chai-as-promised need it.
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
                                 ? this
                                 : oThis,
                               aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}








beforeEach(module('app'));

// Controller
describe('PresentationCtrls',function(){

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
      expect(promise).to.be.fulfilled.and.eventually.equal('foobar').and.notify(done);
      
      //AnguarJS promises is hooked to digest cycle, trigger one to resolve promises.
      $rootScope.$apply();
    });
  });

});




describe('Figlet directive',function(){


  it('should replace the contents of the figlet',function(done){
    
    //Mock Figlet.write
    window.Figlet = { write: function(t,f,fn){ setTimeout(function(){ fn('foobar');},10); } };

    //A test template with the directive under testing
    var element = angular.element('<pre figlet="awesomefont">awesome</pre>');

    inject(function($compile,$rootScope){
     
      //Compile the template
      $compile(element)($rootScope);
      //One digest to compile it, triggering link and $observe
      $rootScope.$digest();

      //Then a timeout so we can make a second digest.
      setTimeout(function(){
        //This digest triggers the promise in the Figlet service
        $rootScope.$digest();  
        //Let's check that it has transformed the DOM
        expect(element.text()).to.equal('foobar');
        done();
      },10);
    });
    
  });
});


/*

describe('foobar service',function(){
  
  beforeEach(module('foobar',function($provide){
    $provide.value()
  }));

  it('should have a method foobar',function(){
    inject(function(FoobarService){
      expect(FoobarService).to.have.a.property('foobar').and.is.a('function');
    });
  });

  it('should add things togheter',function(){
    inject(function(FoobarService){
      var result = FoobarService.foobar(1,2);
      expect(result).to.be.equal(3);
    });
  });


});

*/