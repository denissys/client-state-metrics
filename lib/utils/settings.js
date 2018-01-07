/* load yaml settings file */

'use strict'

const path = require('path'),
      config = require('yaml-config'), 
      configFile=path.resolve('./config/config.yml');

/**
 * Read yaml file.
 *
 * param env: select environment
 * return: config object
 */
function load(env) {
	return {
		read: function() {
			return config.readConfig(configFile, env)
		}
	}
}

exports.load = load;