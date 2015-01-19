

module.exports = {

  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {

  	email: {
  		type : 'email',
  		unique : true,
      required:true
  	},

  	sesion_id: {
  		type : 'string',
  		required : true
  	}
  }
};
