/**
* Usuario.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
module.exports = {

  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {

  	email: {
  		type : 'email',
  		unique : true,
  	},

  	password: {
  		type : 'string',
  		required : true
  	},

  	name: {
  		type : 'string',
  		//required : true
  	},

  	surname: {
  		type : 'string',
  		//required : true	
  	}, 

  	toJSON: function () {
   	  var usuario = this.toObject();
      delete usuario.password;
      return usuario;
  	}

  }

  

};


