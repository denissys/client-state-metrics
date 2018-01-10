'use strict'

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator')

var Schema = mongoose.Schema, 
		id = Schema.ObjectId;

var ClientAvailabilitySchema = new Schema({

  type:                 {type: String, required: [true, "type can't be blank"], index: true},
  clientId:             {type: String, required: [true, "clientId can't be blank"], index: true},
  date:                 {type: Date,   required: [true, "date can't be blank"], index: true},
  hour:                 {type: Number, required: [true, "hour can't be blank"], index: true},
  maxHits:              {type: Number, required: [true, "maxHitsPerHour can't be blank"], index: false},
  clientHits:           {type: Number, required: [true, "clientHitsPerHour can't be blank"], index: false},
  percentOnlineTime:    {type: Number, required: [true, "percentOnlinePerHour can't be blank"], index: false},
  onlineTimeInMin:      {type: Number, required: [true, "onlineTimeInMin can't be blank"], index: false},
  offlineTimeInMin:     {type: Number, required: [true, "offlineTimeInMin can't be blank"], index: false}

}, { versionKey: false });

function newInstance() {
	var ClientAvailability = mongoose.model('ClientAvailability');
	return new ClientAvailability();
}

module.exports = mongoose.model('ClientAvailability', ClientAvailabilitySchema);
module.exports.newInstance = newInstance;