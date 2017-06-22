// We recommend writing your creates separate like this and rolling them
// into the App definition at the end.
const trelloHelper = require('../lib/trelloApiHelper');
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
        type: 'string'
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
          DD: 'Due Date'
        },
        required: true,
        type: 'string',
        helpText: 'Available for future expansion.'
      },
    ],
    perform: (z, bundle) => {
      // const promise = z.request({
      //   url: 'http://57b20fb546b57d1100a3c405.mockapi.io/api/recipes',
      //   method: 'POST',
      //   body: JSON.stringify({
      //     name: bundle.inputData.name,
      //     directions: bundle.inputData.directions,
      //     authorId: bundle.inputData.authorId,
      //     style: bundle.inputData.style,
      //   }),
      //   headers: {
      //     'content-type': 'application/json'
      //   }
      // });


      const fake_data = {
          "test": "This is my fake result"
        },
        promise = Promise.resolve(fake_data);
      return promise.then(response => {
        console.log(response);
        return response;

      });
    },
    //   const promise = Promise.resolve({
    //     content: {

    //     }
    //   });
    //   console.log(promise);
    //   return promise.then((response) => JSON.parse(response.content));
    // },

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obviously dummy values that we can show to any user.
    sample: {
      id: 1,
      createdAt: 1472069465,
      name: 'Best Spagetti Ever',
      authorId: 1,
      directions: '1. Boil Noodles\n2.Serve with sauce',
      style: 'italian'
    },

    // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
    // field definitions. The result will be used to augment the sample.
    // outputFields: () => { return []; }
    // Alternatively, a static field definition should be provided, to specify labels for the fields
    outputFields: [{
        key: 'id',
        label: 'ID'
      },
      {
        key: 'createdAt',
        label: 'Created At'
      },
      {
        key: 'name',
        label: 'Name'
      },
      {
        key: 'directions',
        label: 'Directions'
      },
      {
        key: 'authorId',
        label: 'Author ID'
      },
      {
        key: 'style',
        label: 'Style'
      }
    ]
  }
};