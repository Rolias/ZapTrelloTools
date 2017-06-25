// We recommend writing your creates separate like this and rolling them
// into the App definition at the end.
const trelloHelper = require('../lib/trelloApiHelper')

module.exports = {
  key: 'cardProcessor',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'Move Cards To New List',
  display: {
    label: 'Card List Processor',
    description: 'Find any cards on source list that pass filter and move them to destination list.'
  },

  // `operation` is where the business logic goes.
  operation: {
    inputFields: [{
        key: 'sourceList',
        required: true,
        type: 'string',
        helpText: 'The Trello list ID of the the list to search for card. ' +
          'you can open a card and add .json to the URL to find list and board ids'
      },
      {
        key: 'destinationBoard',
        required: true,
        type: 'string',
        helpText: 'The board that houses the list where the card will be moved if it passes the filter test.'
      },
      {
        key: 'destinationList',
        required: true,
        type: 'string',
        helpText: 'Where the card will be moved if it passes the filter test.'
      },
      {
        key: 'filterAction',
        choices: {
          DD: 'Due Date is Past'
        },
        required: true,
        type: 'string',
        helpText: 'Only Due Date filtering available now - more to come.'
      },
    ],
    perform: (z, bundle) => {
      z.console.log("Running the cardProcessor", bundle);
      return trelloHelper.moveCardsByFilter(z, bundle);
    },

  }
};