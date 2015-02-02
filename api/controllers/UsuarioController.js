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
 				console.log(created);
 				return res.json(created);
 			} else {
 				console.log('Error creating user');
 				return res.badRequest();
 			}
 		});
 	},
 	
 	signin : function (req, res) {
 		var bcrypt = require('bcrypt-nodejs');

 		var username = req.param("username");
 		var password = req.param("password");
 		
 		Usuario.findOne({email:username}).exec(function findCB (err, user) {
 			if (err) {
 				console.log('Error on database on signin');
 				res.json({ error:'DB error'},500);
 			}
 			
 			if (user) {
 				console.log(user);
 				console.log(user.password);
 				bcrypt.compare(password, user.password, function(err, match) {
 					if (match) {
		  // password match
		  Sesion.create({email:username, sesion_id:user.password}).exec(function createCB (err, sesion) {
		  	if (err) {
		  		console.log('Error on database on signin');
		  		console.log(err);
		  		res.json({ error:'DB error'},500);
		  	} else {
		  		console.log('Logged in');
		  		console.log('{ id:'+user.password+',email:'+user.email+',rol:'+user.rol+'}');
		  		res.json({ id:user.password,email:user.email,rol:user.rol, usuario:user  });
		  	}
		  });
		} else {
		  // invalid password
		  if (req.session.user) req.session.user = null;
		  res.json({ error: 'Invalid password' }, 400);
		}
	});
 				
 				
 			} else {
 				console.log('User not found');
 				res.json({error:'User not found'},404);
 			}
 		});
},

signout : function (req,res) {
	var email = req.param('email');
	var sesion_id = req.param('sesion_id');
	
	console.log('LOGGING OUT');

	Sesion.find({email:email,sesion_id:sesion_id}).exec(function (err, sesion) {
		if (err) {
			console.log('Error on database on signout');
			res.json({ error:'DB error'},500);
		} else if (sesion) {
			Sesion.destroy({email:email}).exec(function destroyCB (err) {
				if (err) {
					console.log('Error on signout');
					res.json({ error:'DB error'},500);
				}
				res.json({sesion:sesion});
			});
		}
	});
},


invite: function (req, res) {
		var invitador = req.param('email');
		var invitado = req.param('invite');

		Usuario.findOne({email:invitador}).populateAll().exec(function findCB (err, usuario) {
			var invitacion={};
			if (usuario.profile){
				var nombre = usuario.profile.name;
				var avatar = usuario.profile.avatar;
				invitacion['nombre'] = nombre;
				invitacion['avatar'] = avatar;
			}
			var email = invitador;					
			invitacion['email'] = email;

			Usuario.findOne({email:invitado}).populateAll().exec(function findCB2 (err, usuario2) {				
				if (!usuario2.invitaciones) usuario2.invitaciones=[];
				usuario2.invitaciones.push(invitacion);//al conjunto invitaciones le añado 

				Usuario.update({email:invitado},{invitaciones:usuario2.invitaciones}).exec(console.log);
				//console.log(usuario2.invitaciones);
			});
		});
	},


acceptInvitation: function (req, res) {
		  var invitador = req.param('email');
		  var invitado = req.param('invite');

		  Usuario.findOne({email:invitado}).populateAll().exec(function findCB (err, usuario) {
		  	var amistad = {};
		    if (usuario.profile) {
		    	var nombre = usuario.profile.name;
		    	var avatar = usuario.profile.avatar;

		    	amistad['nombre'] = nombre;
		    	amistad['avatar'] = avatar;
		    }	
		    var email = invitado;		    		   
		    amistad['email'] = email;
		    
		    var nuevasInvitaciones=[];

		    for(var i=0;i<usuario.invitaciones.length;i++) {
		      if(usuario.invitaciones[i].email == invitador){
		        var amigo = usuario.invitaciones[i];
		       }else{ 
		        nuevasInvitaciones.push(usuario.invitaciones[i]);
		       }		        
		    }		    
		    //actualizar invitaciones  
		    Usuario.findOne({email:invitador}).populateAll().exec(function findCB (err, user) {	
		      if (!user.amigos) user.amigos =[];		      		   
		      	user.amigos.push(amistad);
		      	if (!usuario.amigos) usuario.amigos=[];	
		      		usuario.amigos.push(amigo);
		      Usuario.update({email:invitado},{invitaciones:nuevasInvitaciones,amigos:usuario.amigos}).exec(console.log);
		      Usuario.update({email:invitador},{amigos:user.amigos}).exec(console.log);		    
		     });
		 });
	},	

	refuseInvitation: function (req, res) {		  	
		var invitador = req.param('email');
		var invitado = req.param('invite');	    


		Usuario.findOne({email:invitado}).populateAll().exec(function findCB (err, usuario) {
			var nuevasInvitaciones=[];
			for(var i=0;i<usuario.invitaciones.length;i++) {
		      if(usuario.invitaciones[i].email != invitador){
		        nuevasInvitaciones.push(usuario.invitaciones[i]);
		       }		        
		    }	
		    Usuario.update({email:invitado},{invitaciones:nuevasInvitaciones}).exec(console.log);	
		});
	}
};

