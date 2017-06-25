const trelloHelper = require('../lib/trelloApiHelper');
module.exports = {
    key: 'movePastDuePathCards',

    noun: 'Move Past Due Path Cards ',
    display: {
        label: 'Paths Past Due Card Processor',
        description: 'Find any past due cards on Review Queue list and move to Update Review Needed List.'
    },

    // `operation` is where the business logic goes.
    operation: {
        perform: (z, bundle) => {
            return trelloHelper.movePastDuePathCards(z, bundle);

        }
    }

}