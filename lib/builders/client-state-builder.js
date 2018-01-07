'use strict'

let Builder = {

	clientState: {},
	keyParams: [],

	key: function(key) {
		this.keyParams = key.split('-');
		return this;
	},

	_populate: function() {
		this.clientState.type = this.keyParams[0];
		this.clientState.id = this.keyParams[1];
		this.clientState.date = this.keyParams[2];
		this.clientState.hour = this.keyParams[3];
		return this;
	},

	build: function() {
		this._populate();
		return this.clientState;
	}
}

exports.Builder = Builder;