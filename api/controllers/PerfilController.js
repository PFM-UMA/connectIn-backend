/**
 * PerfilController
 *
 * @description :: Server-side logic for managing perfils
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	 updateOrCreate : function (req, res) {
	   var email = req.param('email');   
	   Perfil.findOne(email).exec(function (err, perfil) {
	      if (!perfil) {
		var data = req.params.all();
		Perfil.create(data).exec(console.log);
		Usuario.update({email:email},{profile:email}).exec(console.log);
	      } else {
		Perfil.update({email:email},req.params.all()).exec(console.log);
	      }
      
	      });
	 }
};

