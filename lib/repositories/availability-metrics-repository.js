'use strict'

const mongoose = require('mongoose');

async function save(ClientAvailability) {

  ClientAvailability.save(function(err, doc) {
    if (err) {
      console.log('error on save [ClientAvailability] --> ' + err);
    } else {
      console.log('Saved --> ' + doc);
    }
  });
}

module.exports = {
	save: save
}