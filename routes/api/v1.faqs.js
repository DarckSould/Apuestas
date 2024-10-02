const { Router } = require("express");

module.exports = function ({ FaqsController, AuthMiddleware }) {
  const router = Router();

  router.get("/get-all", FaqsController.getAll);

  router.get("/get/:id", FaqsController.getOne);

  router.get("/get-title/:title", FaqsController.getTitle);

  router.get("/find-faqs-filter", FaqsController.findAllFaqsFilters);

  router.post("/create", FaqsController.create);

  router.patch("/update/:id", FaqsController.update);

  router.delete("/delete/:id", FaqsController.delete);



  return router;
};
