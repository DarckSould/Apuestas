//Configurar nuestro contenedor de injección de depencia
const { createContainer, asClass, asValue, asFunction } = require("awilix");

//Config
const config = require(".");

//Routes
const Routes = require("../routes");

//Services
const { ExampleService, FaqsService } = require("../services");
//Controllers
const { ExampleController, FaqsController } = require("../controllers");

//Startup
const { Database, Server } = require("../startup");

//Routes

const { ExampleRoutes, FaqsRoutes } = require("../routes/api/index");

//Models
const { Example, Faqs } = require("../models");

//Funtions
const { FaqsFunctions } = require("../functions");

const { protect } = require("../middleware/authMiddleware");
const AuthUtils = require("../utils/auth");
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
    ExampleService: asClass(ExampleService).singleton(),
    FaqsService: asClass(FaqsService).singleton(),
  })
  .register({
    //Configuración de los controladores
    ExampleController: asClass(
      ExampleController.bind(ExampleController)
    ).singleton(),
    FaqsController: asClass(FaqsController.bind(FaqsController)).singleton(),
  })
  .register({
    //Configuración de rutas
    ExampleRoutes: asFunction(ExampleRoutes).singleton(),
    FaqsRoutes: asFunction(FaqsRoutes).singleton(),
  })
  .register({
    //Configuración de modelos
    Example: asValue(Example),
    Faqs: asValue(Faqs),
  })
  .register({
    //middlewares
    AuthMiddleware: asFunction(protect).singleton(),
  })
  .register({
    //Configuración de funciones
    FaqsFunctions: asClass(FaqsFunctions).singleton(),
  });

module.exports = container;
