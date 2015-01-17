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
  				return created;
  			} else {
  				console.log('Error creating user');
  				return res.badRequest();
  			}
  		});
	},
	
	signin : function (req, res) {
	  var bcrypt = require('bcrypt');

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
		      req.session.sesion_id = user.password;
		      req.session.email = user.email;
		      req.session.rol = user.rol;
		      res.json(user);
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
	}

};

