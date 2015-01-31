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
  var education = 'Columbia University in the City of New York \n Master of Business Administration (M.B.A.) \n 1998 – 2004';

  var summary = 'Senior level recruiting and staffing professional with expertise in information technology as well as all major disciplines specializing in contract assignments. Previous corporate experience includes Director of Staffing and HR management positions. \n Specialties:Expert recruiter in technical, management, marketing, retail, customer care, and all major disciplines \n Responsible for staffing merchandising, sales reps and management positions across the US';

   var experience = 'Senior Recruitment Officer EY \n agosto de 2010 – actualidad (4 años 6 meses)';

   var skills = 'Creativity, Marketing, Creative Strategy, Social Media';
       
  
  var perfil = [{avatar:'https://asignaturadelengua.files.wordpress.com/2011/05/foto-carnet-traje.jpg',email:'alumno@alumno.com',name:'Alumno', surname:'Onmula', age:45, summary:summary, education: education,experience:experience, skills: skills }];
  var usuario = [{email:'alumno@alumno.com', password: 'abcde', rol:'Usuario',profile:'alumno@alumno.com',empresas:['1','2']}];
  var usuario2 = [{email:'alumno2@alumno.com', password: 'abcde', rol:'Usuario', invitaciones:[{email: 'tacata@tacaton.com', nombre: 'taca taca'},{email:'nometoqueslowebos', nombre:'webinho'}]}];
  var empresa = [{CIF:'1',name:'Empresa de alumno'},{CIF:'2',name:'Empresa de alumno2'}];

  Usuario.create(usuario2).exec(console.log);  
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
