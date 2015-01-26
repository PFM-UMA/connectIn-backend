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
          Perfil.create(data).exec(function createCB (err, profile) {
           if (err) {
             console.log('Error creating profile');
             res.json({ error:'DB error'},500);
           } else {
             console.log('Profile created');
             res.json({perfil:profile});
           }
         });
        } else {
          Perfil.update({email:req.param('email')},req.params.all()).exec(function updateCB (err, updatedProfile) {
            if (err) {
             console.log('Error updating profile');
             res.json({ error:'DB error'},500);
           } else {
             console.log('Profile updated');
             res.json({perfil:updatedProfile});
           }
         });
        }
      });
    }
  };

