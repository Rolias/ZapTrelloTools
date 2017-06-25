# Trello Helper Zap App
This is a Zapier App. It provides some additional Trello functionality that is hard (or impossible) to do with the existing Trello actions. 

The first "create" is very specific and therefore quite easy to use. It looks at a particular Trello board list and looks for any cards with due dates that are past due. When it find ones it moves those cards to a different list so that users of the board know they need reviewed. There is a second Zap (just a normal one) that triggers on cards moving to that board and posts messages in a Slack channel designed for those messages.


The second create is more flexible but a bit of a pain to use. It takes four parameters. The first three are the source list id, the destination board id, and the destination board list id. From in Trello you can get to these ids by opening a card and appending .json to the URL in the address board and then scanning the JSON object.

The fourth parameter tells the code what kind of filtering to do. Right now the only implemented option is to filter by Due Date. So it looks at the source list and if it finds any cards in that list that are past due then it moves them to the destination list. It's a more general purpose version of the first create.

The only thing not uploaded into this repo is a _local folder that contains the API key for trello. If you want to use this as a template for  your code you need to create a file named `trello-credentials.js` and add the following code

```javascript
module.exports = {
    appKey: "YourAppKeyHere",
    token: "YourTokenHere",
};
```

Where you replace `YourAppKeyHere` and `YourTokenHere` with your credentials from Trello.