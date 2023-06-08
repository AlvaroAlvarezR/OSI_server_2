const express = require("express");
const paginator = require('../../middlewares/paginator'); 
const clientController = require("../../controllers/client.controller");
const router = express.Router();

module.exports = (app) => {
  router
    .route("/client")
    .get([paginator.pageable, clientController.getClient, paginator.headers])
    .post(clientController.addClient);

  router
    .route("/client/:idClient")
    .put(clientController.editClient)
    .delete(clientController.deleteClient);

  app.use(process.env.URI_API, router);
};
