const express =  require('express');
const crypto = require('crypto');

const connection = require('./database/connection');


// Requisição dos Controllers
const OngController = require('./controller/OngController'); 
const IncidentController = require('./controller/IncidentController');
const ProfileController = require('./controller/ProfileController');
const SessionController = require('./controller/SessionController');

// Desacoplando o modulo de rotas do Express 
const routes = express.Router(); 

// ============================ || - ROTAS - || ============================ // 

// Session 

routes.post('/session' , SessionController.create )

// Gerenciamento de ONG 

routes.get('/ongs' , OngController.index );
routes.post('/ongs' , OngController.create ); 

// Gerenciamento de Incident

routes.get('/incidents' , IncidentController.index );
routes.post('/incidents' , IncidentController.create );
routes.delete('/incidents/:id' , IncidentController.delete );

routes.get('/profile' , ProfileController.index )



module.exports = routes;