/**
* Perfil.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

 autoPK: false,
 autoCreatedAt: false,
 autoUpdatedAt: false,

 types: {
  is_valid_age: function(age){
    return age > 0 && age < 100
  }
},

attributes: {

  avatar: {
    type : 'String'
  },

  email: {
    primaryKey: true,
    type : 'string',
    required : true
  },

  name: {
    type : 'string',
    required : true
  },

  surname: {
    type : 'string',
    required : true
  },

  sex: {
    type : 'string',
    enum : ['Male','Female']
  },

  age: {
    type : 'integer',
    is_valid_age : true
  },

  education: {
    type : 'string',
  },

  location: {
    type : 'string',
      //required : true
    },

    summary: {
      type : 'string',
      //required : true	
    }, 

    experience: {
      type : 'string',
      //required : true	
    }, 

    skills: {
      type : 'string',
      //required : true	
    },

    owner:{
     model:'Usuario'
   }
 }
};

