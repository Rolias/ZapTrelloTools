'use strict'
const AUTH = require('../_local/trello-credentials.js'),
    nodeTrello = require('node-trello'),
    PATH_ASSESSMENTS_PIPELINE_BOARD = "58f5123b3fdb2c196c2b7f7a",
    REVIEW_QUEUE_LIST = "594adba5b62037fcf43ec486",
    UPDATE_REVIEW_NEEDED_LIST = "594b1005773d6cb678ac8c51",

    _trello = new nodeTrello(AUTH.appKey, AUTH.token);

let _z,
    _listToSearch,
    _destinationBoard,
    _destinationList,
    _filterAction;


function movePastDuePathCards(z) {
    _z = z;
    _listToSearch = REVIEW_QUEUE_LIST;
    _destinationList = UPDATE_REVIEW_NEEDED_LIST;
    _destinationBoard = PATH_ASSESSMENTS_PIPELINE_BOARD;
    return movePastDueCards();
}

function moveCardsByFilter(z, bundle) {
    let inputs = bundle.inputData;
    logBoth("Inputs in moveCardsByFilter", inputs);
    _listToSearch = inputs.sourceList.trim();
    _destinationList = inputs.destinationList.trim()
    _destinationBoard = inputs.destinationBoard.trim();
    _filterAction = inputs.filterAction.trim();
    let msg = "Action:" + _filterAction + +" List To Search:" + _listToSearch + " DestinationList:" + _destinationList + " DestinationBoard:" + _destinationBoard;
    //logBoth("Final Message " + msg);
    if (_filterAction === "DD") {
        return movePastDueCards();
    } else {
        logBoth("Unknown filter action");
        return new Promise.reject("Only the DD filter action is currently supported");
    }

}

function movePastDueCards() {
    return getCardsFromList(_listToSearch)
        .then(foundCards => {

            // console.log("Number of cards found " + foundCards.size());
            for (let card of foundCards) {
                //console.log(card.name);
                if (card.due !== null) {
                    let card_due = new Date(card.due);
                    const today = Date.now();
                    if (card_due > today) {
                        console.log(card.name + ' not due');
                    } else {
                        logBoth(card.name + ' is due')
                        return _moveCard(card.id)
                            .then(result => {
                                console.log(result);
                            })
                    }
                }
            }
        })

        .catch(error => {
            console.log(error);
        })
}

function getCardsFromList(listId) {
    const cardsCmd = `/1/lists/${listId}/cards`;
    return new Promise((resolve, reject) => {
        logBoth("Getting cards from list " + listId + " in Trello");
        _trello.get(cardsCmd, (err, response) => {
            if (err) {
                console.log("ERROR: " + err);
                return reject(err);
            } else {
                return resolve(response);
            }
        });
    });
}

function testReviewQueue() {
    return getCardsFromList(REVIEW_QUEUE_LIST);
}


function _moveCard(cardIdToMove) {
    var move_card = `/1/cards/${cardIdToMove}`,
        params = {
            "idBoard": _destinationBoard,
            "idList": _destinationList
        };

    return new Promise((resolve, reject) => {

        _trello.put(move_card, params, (err, response) => {
            if (err) {
                let err_msg = "error moving card" + err;
                // logBoth(err_msg);
                reject(err_msg);
            } else {
                let msg = "The card " + move_card + " has been moved. " + response;
                // logBoth(msg);
                return resolve(msg);
            }
        });
    });
}

function logBoth(msg) {
    if (_z !== undefined) {
        if (_z.console !== undefined) {
            _z.console.log(msg);
        }

    }
    // _z.console.log(msg);
    console.log(msg)
}


module.exports = {
    testReviewQueue,
    moveCardsByFilter,
    movePastDuePathCards
};