/**
 * UsuarioController
 *
 * @description :: Server-side logic for managing Usuarios
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	signup : function (req, res) {
		
		var username = req.param("username");
		var password = req.param("password");

		Usuario.create({email:username,password:password}).exec(function createCB(err,created) {
  			if (created) {
  				console.log('Created user with name ' + created.email);
  				return created;
  			} else {
  				console.log('Error creating user');
  				return res.badRequest();
  			}
  		});
	}

};

