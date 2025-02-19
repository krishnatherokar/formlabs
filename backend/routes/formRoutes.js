const express = require("express");
const getForm = require("../controllers/form/getForm");
const showResponse = require("../controllers/form/showResponse");
const submitResponse = require("../controllers/form/submitResponse");
const isLogged = require("../middlewares/isLogged");
const showFormResponses = require("../controllers/form/showFormResponses");
const createForm = require("../controllers/form/createForm");
const formRouter = express.Router();

formRouter.get("/:id", getForm);
formRouter.get("/r/:id", showResponse);

formRouter.use(isLogged);
// all the routes that need user data, place them below

formRouter.post("/create", createForm);
formRouter.post("/submit/:id", submitResponse);
formRouter.get("/fr/:id", showFormResponses);

module.exports = formRouter;
