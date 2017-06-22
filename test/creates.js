require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);
const nodeTester = require('../lib/trelloApiHelper');

describe('creates', () => {

  describe('do a fake test', () => {
    it('should get my fake json object', (done) => {
      const bundle = {
        inputData: {
          sourceList: '1',
          destinationList: '2',
          filterAction: 'DD'
        }
      };

      appTester(App.creates.cardProcessor.operation.perform, bundle)
        .then((result) => {
          result.should.have.property('test');

          nodeTester.testReviewQueue()
            .then((result) => {
              result.forEach(function (card) {
                if (card.due !== null) {
                  console.log(card.name + " due:" + card.due + " dueComplete:" + card.dueComplete);
                }

              }, this);
              done();
            });
          // done();
        })
        .catch(done);
    });




  });
});