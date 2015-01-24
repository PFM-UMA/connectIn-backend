/**
 * EmpresaController
 *
 * @description :: Server-side logic for managing empresas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  updateOrCreate : function (req, res) {
    Empresa.findOne(req.param('CIF')).exec(function (err, perfil) {
      if (!perfil) {
	var data = req.params.all();
	data['owner'] = 'alumno@alumno.com';
	Perfil.create(data).exec(console.log);
      } else {
	Perfil.update({email:req.param('email')},req.params.all()).exec(console.log);
      }
      
    });
  }
};

