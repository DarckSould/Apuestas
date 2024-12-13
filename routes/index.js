const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { ErrorMiddleware, NotFoundMiddleware } = require('../middleware');

module.exports = function ({
  BetRoutes,
  SportRoutes,
  ProfitRoutes,
  UserRoutes,
}) {
  const router = express.Router();
  const apiRouter = express.Router();

  apiRouter
    .use(express.json())
    .use(cors())
    .use(morgan('dev'))
    .use(express.urlencoded({ extended: true }));
  apiRouter.use('/bet', BetRoutes);
  apiRouter.use('/sport', SportRoutes);
  apiRouter.use('/profit', ProfitRoutes);
  apiRouter.use('/user', UserRoutes);

  router.use('/v1/api', apiRouter);
  router.use('/', (req, res) => {
    res.send('v.0.1.0.3');
  });
  // router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  router.use(NotFoundMiddleware);
  // router.use(ErrorMiddleware);

  return router;
};
