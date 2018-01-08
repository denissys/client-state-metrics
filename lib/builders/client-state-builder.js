'use strict'

let Builder = {

	ClientState: {},
	keyName: null,
	key: [],

	setKey: function(key) {
		this.key = key;
		this.keyParams = key.split('-');
		return this;
	},

	_populate: function() {
		this.ClientState.type = this.keyParams[0];
		this.ClientState.id = this.keyParams[1];
		this.ClientState.date = this.keyParams[2];
		this.ClientState.hour = this.keyParams[3];
		this.ClientState.key = this.key;
		return this;
	},

	build: function() {
		this._populate();
		return this.ClientState;
	}
}

exports.Builder = Builder;