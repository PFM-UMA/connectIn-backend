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

  var perfil = [{email:'alumno@alumno.com',name:'Alumno', surname:'Onmula', age:20}];
  var usuario = [{email:'alumno@alumno.com', password: 'abcde', rol:'Usuario',profile:'alumno@alumno.com',empresas:['1','2']}];
  var empresa = [{CIF:'1',name:'Empresa de alumno'},{CIF:'2',name:'Empresa de alumno2'}];
  
  Empresa.create(empresa).exec(console.log);
  Perfil.create(perfil).exec(console.log);
  Usuario.create(usuario).exec(console.log);
  
  
  Usuario.findOne('alumno@alumno.com').exec(function relationCB (err, user) {
     user.empresas.add('1');
     Usuario.update({email:'alumno@alumno.com'},user).exec(console.log);
  });
  
  /*
  Usuario.create({email:"alumno@alumno.com", password: "abcde", rol:'Usuario'}).exec(function createCB (err, user) {
    if (!err) console.log('Created initial user');
  });

	Perfil.create({name:"Alumno", username:"Onmula", age:20}).exec(function createdCB (err, perfil) {
    	Usuario.update({email:'alumno@alumno.com'},{profile:perfil}).exec(function updateCB (err, updated) {

    	});
    });*/
  

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
