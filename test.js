
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
        $controller("PresentationCtrl",{ '$scope':scope, '$location': { path: pathSpy }});
        done();
      });
    });

    it('should increase current pageNr with each call to next',function(){
      expect(scope.pageNr).to.be.equal(1);
      scope.next();
      scope.$digest();
      expect(scope.pageNr).to.be.equal(2);

      expect(pathSpy).to.have.been.calledOnce.and.calledWith('/slides/2');
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