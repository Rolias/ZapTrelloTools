 //require('should');
 var chai = require('chai'),
   sinon = require('sinon')
 chai.should();

 const zapier = require('zapier-platform-core');

 const App = require('../index');
 const appTester = zapier.createAppTester(App);


 describe('creates', () => {

   describe('do a mocked Trello call', function () {
     beforeEach(function () {

     });
     it('should return the mocked object', function () {

     });
     afterEach(function () {

     })
   });

   describe('do an actual API call', () => {

     it.only('should parse the Trello list', (done) => {
       const bundle = {
         inputData: {
           sourceList: '573d1cf7468fb5973738232e',
           destinationList: '594f15976bcb5bcdc05647fd',
           destinationBoard: '573d1ac198b5262f04442743',
           filterAction: 'DD'
         }
       };

       appTester(App.creates.moveCardByFilter.operation.perform, bundle)
         .then((result) => {
           //TODO I could write some real tests but really the tests are to 
           //watch the console.logs - i.e. integration tests. 
           done();
         });

     });
   });

   describe('move past due cards', function () {
     it('should move the cards', function (done) {
       appTester(App.creates.movePastDuePathCards.operation.perform)
         .then((result) => {
           console.log("In the then clause in the test.");
           console.log(result);
           // if (typeof result !== undefined) {
           //   throw "Ooops got back something other than undefined.";
           // }
           done();
         })
     });
   });

 });