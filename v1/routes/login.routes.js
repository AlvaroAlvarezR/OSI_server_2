const express = require("express");
const loginController = require("../../controllers/login.controller");
const router = express.Router();

module.exports = (app) => {
  router.route("/login").post(loginController.login);
  router.route("/login-client").post(loginController.loginClient);

  app.use(process.env.URI_API, router);
};
