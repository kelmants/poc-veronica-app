var admin = require("firebase-admin");
const functions = require("firebase-functions");
const Service = require("./service");
const express = require("express");
const cors = require("cors");

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
// app.use(myMiddleware);

// build multiple CRUD interfaces:
app.get("/:id", (req, res) => {
  res.send(Service.getById(req.params.id));
});
app.post("/", (req, res) => {
  res.send(Service.create(req.body));
});
app.put("/:id", (req, res) =>
  res.send(Service.update(req.params.id, req.body))
);
app.delete("/:id", (req, res) => {
  res.send(Service.delete(req.params.id));
});
app.get("/", (req, res) => {
  res.send(Service.list());
});

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);
