/**
* Empresa.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  
  attributes: {
    CIF: {
      primaryKey: true,
      type : 'string', 
      required : true,
      unique : true
    },
    
    domiciliofiscal: {
      type : 'string',
      unique : true
    },
    
    name: {
      primaryKey: true,
      type : 'string',
      unique : true,
      required : true
    },
    
    description: {
      type : 'string',
      //required : true
    },
    
    owner:{
      model:'Usuario'
    }
  }
};

