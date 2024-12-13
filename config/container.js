//Configurar nuestro contenedor de injección de depencia
const { createContainer, asClass, asValue, asFunction } = require('awilix');

//Config
const config = require('.');

//Routes
const Routes = require('../routes');

//Services
const {
  BetService,
  ProfitService,
  SportService,
  UserService,
} = require('../services');
//Controllers
const {
  BetController,
  ProfitController,
  SportController,
  UserController,
} = require('../controllers');

//Startup
const { Database, Server } = require('../startup');

//Routes
const {
  BetRoutes,
  ProfitRoutes,
  SportRoutes,
  UserRoutes,
} = require('../routes/api/index');

//Models
const { Bet, Profit, Sport, User } = require('../models');

const { protect } = require('../middleware/authMiddleware');
const AuthUtils = require('../utils/auth');
const container = createContainer();
container
  .register({
    //Configuración principal
    router: asFunction(Routes).singleton(),
    config: asValue(config),
    AuthUtils: asClass(AuthUtils).singleton(),
    Database: asClass(Database).singleton(),
    Server: asClass(Server).singleton(),
  })
  .register({
    //Configuración de los servicios
    BetService: asClass(BetService).singleton(),
    ProfitService: asClass(ProfitService).singleton(),
    SportService: asClass(SportService).singleton(),
    UserService: asClass(UserService).singleton(),
  })
  .register({
    //Configuración de los controladores
    BetController: asClass(BetController.bind(BetController)).singleton(),
    ProfitController: asClass(
      ProfitController.bind(ProfitController)
    ).singleton(),
    SportController: asClass(SportController.bind(SportController)).singleton(),
    UserController: asClass(UserController.bind(UserController)).singleton(),
  })
  .register({
    //Configuración de rutas
    BetRoutes: asFunction(BetRoutes).singleton(),
    ProfitRoutes: asFunction(ProfitRoutes).singleton(),
    SportRoutes: asFunction(SportRoutes).singleton(),
    UserRoutes: asFunction(UserRoutes).singleton(),
  })
  .register({
    //Configuración de modelos
    Bet: asValue(Bet),
    Profit: asValue(Profit),
    Sport: asValue(Sport),
    User: asValue(User),
  })
  .register({
    //middlewares
    AuthMiddleware: asFunction(protect).singleton(),
  });

module.exports = container;
