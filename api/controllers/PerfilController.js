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
 				Perfil.create(data).exec(function createCB (err, profile) {
 					if (err) {
 						console.log('Error creating profile');
 						res.json({ error:'DB error'},500);
 					} else {	  
 						Usuario.update({email:email},{profile:email}).exec(function updateCB (err, user) {
 							if (err) {
 								console.log('Error attaching profile to user');
 								res.json({ error:'DB error'},500);
 							} else {
 								console.log('Profile created');
 								res.json({perfil:profile});
 							}
 						});
 					}
 				});
 				
 			} else {
 				Perfil.update({email:email},req.params.all()).exec(function updateCB (err, profile) {
 					if (err) {
 						console.log('Error updating profile');
 						res.json({ error:'DB error'},500);
 					} else {
 						console.log('Profile updated');
 						res.json({perfil:profile});
 					}
 					
 				});
 			}
 			
 			
 		});
 	},

 	finder : function (req, res) {
 		var findMatcher = req.param("name");
 		
 		Perfil.find({name:{ 'contains': findMatcher }}).exec(function findCB (err, profiles) {
 			if (err) {
 				console.log('Error retrieving finding results');
 				res.json({ error:'DB error'},500);
 			} else {
 				res.json({matches:profiles});
 			}
 		});
 	}
 };

