const express = require("express");
const getForm = require("../controllers/form/getForm");
const showResponse = require("../controllers/form/showResponse");
const submitResponse = require("../controllers/form/submitResponse");
const isLogged = require("../middlewares/isLogged");
const showFormResponses = require("../controllers/form/showFormResponses");
const formRouter = express.Router();

formRouter.get("/:id", getForm);

formRouter.get("/r/:id", showResponse);
formRouter.get("/fr/:id", isLogged, showFormResponses);
formRouter.post("/submit/:id", isLogged, submitResponse);

module.exports = formRouter;
