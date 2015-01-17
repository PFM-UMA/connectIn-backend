

module.exports = {

  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {

  	email: {
  		type : 'email',
  		unique : true,
      required:true,
  	},

  	id: {
  		type : 'string',
  		required : true
  	},
  },
};
