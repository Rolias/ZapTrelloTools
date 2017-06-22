'use strict'
const AUTH = require('../_local/trello-credentials.js'),
    nodeTrello = require('node-trello'),
    PATH_ASSESSMENTS_PIPELINE_BOARD = "58f5123b3fdb2c196c2b7f7a",
    REVIEW_QUEUE_LIST = "594adba5b62037fcf43ec486",
    UPDATE_REVIEW_NEEDED_LIST = "594b1005773d6cb678ac8c51",

    _trello = new nodeTrello(AUTH.appKey, AUTH.token);


function getCardsFromList(listId) {
    const cardsCmd = `/1/lists/${listId}/cards`;
    return new Promise((resolve, reject) => {
        console.log("doing trello get");
        _trello.get(cardsCmd, (err, response) => {
            if (err) {
                reject(err);
            } else {
                resolve(response);
            }
        });
    });
}

function testReviewQueue() {
    return getCardsFromList(REVIEW_QUEUE_LIST);
}

function processCardsForDueDate(cards) {
    getCardsFromList(REVIEW_QUEUE_LIST)
        .then(response => {
            response.forEach(card => {
                if (card.due !== null) {
                    const today = Date.now();
                    if (card.due > today) {
                        console.log(card.name + ' not due');
                    } else {
                        console.log(card.name + ' is due');
                        _moveCard(card.id)
                    }
                }
            });
        })
        .catch(error => {
            console.log(error);
        })
}

function _moveCard(cardIdToMove) {
    var move_card = `/1/cards/${cardIdToMove}`,
        params = {
            "idBoard": PATH_ASSESSMENTS_PIPELINE_BOARD,
            "idList": UPDATE_REVIEW_NEEDED_LIST
        };

    _trello.put(move_card, params, (err, response) => {
        if (err) {
            let err_msg = "error moving card" + err;
            z.console.log(err_msg);
        } else {
            z.console.log("The card has been moved. ");
        }
    });
}



module.exports = {
    testReviewQueue: testReviewQueue,

};