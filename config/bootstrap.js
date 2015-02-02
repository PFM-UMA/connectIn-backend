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
  
  /* DATOS DE LOS PERFILES */

  var education = ['Columbia University in the City of New York Master of Business Administration (M.B.A.) 1998 – 2004',
  'Universidad de Catalunya',
  'Carnegie Mellon University',
  'Universidad de Sevilla',
  'George Washington University'];
  
  var summary = ['Senior level recruiting and staffing professional with expertise in information technology as well as all major disciplines specializing in contract assignments. Previous corporate experience includes Director of Staffing and HR management positions. Specialties:Expert recruiter in technical, management, marketing, retail, customer care, and all major disciplines Responsible for staffing merchandising, sales reps and management positions across the US',
  '',
  'Senior business and marketing manager with +20 years of experience creating leading brands, turning-around ailing businesses and generating break-through growth through innovation. Strong focus in the consumer and industrial markets, operating in +7 LATAM countries, with experience in more than +40 different product categories and sectors (including food and beverages, home and personal care, telecommunications, industrial markets, OTC, health, plastics, etc)',
  'Me gusta conectar personas, apasionado de Internet y las redes sociales, en redes telemáticas desde 1992, hoy en el mundo de los negocios digitales como emprendedor, formador e inversor.',
  'Comunicar puede ser para muchos una palabra. Para otros es una forma de vida. Y para mí, un valor incalculable. Me convertí en periodista y documentalista (U. Carlos III de Madrid) por vocación desde que comprendí siendo niña que la herramienta de mi futuro trabajo era la misma que la que conformaba mi vida: la palabra. Mi pasión y devoción por la política hizo que me formase como consultora (Master Comunicación Política y Corporativa, U. Navarra & George Washington University), un mundo que me ha hecho vibrar, emocionarme, sentir que una está viva por algún motivo y por y para un fin. Tengo más de seis años de experiencia, primero trabajando en los medios de comunicación más importantes en España, informando desde el pedestal de la política (El País, Antena 3 TV, ABC.es y Público.es). He vidido, y vivo, siempre #DeCerca para poder contarlo. Un segundo periodo, ya en consultoría, lo viví en la firma de comunicación LLORENTE & CUENCA, donde descubrí el mundo de la comunicación online a nivel corporativo. Asentada en la política, he participado activamente en diversas campañas a nivel internacional. En España: primarias, autonómicas y municipales, y las últimas generales del 20N. Campañas donde he podido desarrollar mi ímpetu por la comunicación online, por el mensaje estratégico off/on y el discurso político. Desde hace cuatro años, hasta abril de 2014, he sido Editora, Subeditora y colaboradora de la revista americana Campaigns & Elections en español con un alcance de 17 países. Soy doctoranda en Análisis y Evaluación de Procesos Políticos y Sociales en la Universidad Carlos III de Madrid cuya tesis está relacionada con la iconografía, discurso y liderazgo femenino. Soy autora de “Se llamaba Alfredo… Las claves de una derrota electoral inevitable” (LAERTES, 2013, www.sellamabaalfredo.com). Y en estos momentos trabajo en el despacho de Antoni Gutiérrez-Rubí en Ideograma. Además,colaboro en medios de comunicación como El País o Sesión de Control.'];
  
  var experience = ['Senior Recruitment Officer EY agosto de 2010 – actualidad (4 años 6 meses)',
  'Worked as a photojournalist for ten years, five in El Periódico de Catalunya and five in El Mundo, covering from sports and politics to international documentary work (Mongolia, Pakistan, Nepal, Siberia, Antartica, Cuba, Argentina, Egypt, France, Great Britain, Russia, Norway and the Artic regions). Now fully dedicated to advertising photography, with some occasional editorial portrait and reportage done (Rolling Stone, GQ). Worked with agencies such as McCann Erikson, J. Walter Thompson, Delvico, BBDO, Grey, Publicis, Sra. Rushmore... and clients including Coca-Cola, MasterCard, Smirnoff, Repsol, Mitsubishi, Springfield, Iberia, Toyota, Mazda... Awarded with several international prizes (New York, Cannes, D&AD, to list a few of the most relevant). Highly skilled in managing production and post production, coordinating teams, retouching, preparing accurate and competitive budgets, adhering to them, and meeting deadlines.',
  'CEO and Managing Director at a corporate consulting boutique specialized in business and marketing strategy, innovation and new product development for several fast-growing sectors: consumer packaged goods & b2b products, telecommunications & internet, agro-business, retail & home improvement, healthcare services, etc. ',
  'Profesor del programa Google Activate para la digitalizacion de titulados universitarios en busqueda de empleo en toda España.',
  'Universidad Ramon Llul de Barcelona.'];
  var skills = ['Creativity, Marketing, Creative Strategy, Social Media',
  'Photography, Photoshop,Post Production, Digital Photography',
  'Business Strategy, New Business Development, Strategic Planning, Product Innovation, Marketing Strategy, Marketing Management',
  'Entrepreneur, Investments, Social Networking, Social Media Marketing, Speaker',
  'Comunicación','Marketing'];
       

   /* DATOS DE LOS USUARIOS */

  var email = ['alfonsoperez@gmail.com','xavier145@gmail.com','mariohernandez@gmail.com','juanjose@gmail.com','mariahurtado@gmail.com']
  var password = ['123456','123456','123456','123456','123456']
  var rol = ['Usuario','Usuario','Usuario','Usuario','Usuario']

  var avatar = ['https://asignaturadelengua.files.wordpress.com/2011/05/foto-carnet-traje.jpg', 'https://lh5.googleusercontent.com/-L6Ju2KLtKRc/AAAAAAAAAAI/AAAAAAAACQE/VVZVSIgPZpQ/photo.jpg', 'https://lh6.googleusercontent.com/-Gt8wCv0Zqbg/AAAAAAAAAAI/AAAAAAAAAAA/kDtKdB45tSU/photo.jpg', 'https://lh6.googleusercontent.com/-WMM_-iZIgiE/AAAAAAAAAAI/AAAAAAAAAMI/JOP0JuVzMm0/photo.jpg', 'http://d13pix9kaak6wt.cloudfront.net/background/users/n/t/s/ntsilvia_1419886730_72.jpeg']
  var name = ['Alfonso', 'Xavier', 'Mario', 'Juanjo', 'Maria']
  var surname = ['Perez','Vilches','Hernandez','Matanza','Hurtado']
  var edad = [25,40,30,27,35]


  /*
    DATOS DE AMISTAD
  */
  
  for (var i = 0; i < email.length; i++) {
    Perfil.create({avatar:avatar[i],email:email[i],name:name[i],surname:surname[i], age:edad[i], summary:summary[i], education: education[i],experience:experience[i], skills: skills[i] }).exec(console.log)
    var elementoInvitacion = (i+1)%email.length
    var invitacion = [{'nombre':name[elementoInvitacion], 'avatar':avatar[elementoInvitacion],'email':email[elementoInvitacion]}] 
    if (i == 0) {
      var amistad = [{'nombre':name[2], 'avatar':avatar[2],'email':email[2]},{'nombre':name[3], 'avatar':avatar[3],'email':email[3]},{'nombre':name[4], 'avatar':avatar[4],'email':email[4]}];      
      Usuario.create({email:email[i],password:password[i],rol:rol[i],profile:email[i],invitaciones:invitacion,amigos:amistad}).exec(console.log)
    } else if (i == 1) {
      Usuario.create({email:email[i],password:password[i],rol:rol[i],profile:email[i],invitaciones:invitacion}).exec(console.log)
    } else if (i == 4) {
      Usuario.create({email:email[i],password:password[i],rol:rol[i],profile:email[i],amigos:amistad}).exec(console.log)
    } else {
      var amistad = [{'nombre':name[0], 'avatar':avatar[0],'email':email[0]}];      
      Usuario.create({email:email[i],password:password[i],rol:rol[i],profile:email[i],invitaciones:invitacion,amigos:amistad}).exec(console.log)
    }
  }


  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};