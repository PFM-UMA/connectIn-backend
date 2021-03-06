/**
* Usuario.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt-nodejs');

module.exports = {

  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {

    email: {
      primaryKey: true,
      type : 'email',
      unique : true
    },

    password: {
      type : 'string',
      required : true
    },

    rol: {
      type : 'string',
      enum : ['Administrador','Usuario'],
      defaultsTo : 'Usuario',
      required : true
    },
    
    profile: {
      model:'Perfil'
    },
    
    empresas:{
      collection:'Empresa',
      via: 'owner'
    },

    invitaciones:{
      type:'array'
    },

    amigos:{
      type:'array'
    },

    toJSON: function () {
      var usuario = this.toObject();
      delete usuario.password;
      return usuario;
    }

  },

  beforeCreate: function(user, cb) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    cb(null, user);
  }

};


