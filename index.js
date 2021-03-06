const moveCardByFilter = require('./creates/moveCardByFilter'),
  movePastDuePathCards = require('./creates/movePastDuePathCards')

// Now we can roll up all our behaviors in an App.
const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  beforeRequest: [],

  afterResponse: [],

  resources: {},

  // If you want your trigger to show up, you better include it here!
  triggers: {},

  // If you want your searches to show up, you better include it here!
  searches: {},

  // If you want your creates to show up, you better include it here!
  creates: {
    [moveCardByFilter.key]: moveCardByFilter,
    [movePastDuePathCards.key]: movePastDuePathCards
  }
};

// Finally, export the app.
module.exports = App;