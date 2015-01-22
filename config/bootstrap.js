/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  var experience = '5 años hasta el presente blablablabla';	

  Usuario.create({email:"alumno@alumno.com", password: "abcde", rol:'Usuario'}).exec(function createCB (err, user) {
    if (!err) console.log('Created initial user');
  });

	Perfil.create({name:"Alumno", username:"Onmula", age:20}).exec(function createdCB (err, perfil) {
    	Usuario.update({email:'alumno@alumno.com'},{profile:perfil}).exec(function updateCB (err, updated) {

    	});
    });
  

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
