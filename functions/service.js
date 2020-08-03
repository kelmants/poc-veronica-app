const functions = require("firebase-functions");
const admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://poc-veronica-app.firebaseio.com",
});

// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
// });

const db = admin.firestore();

const collection = "projects";

const Service = {
  getById(param) {
    return param;
  },
  create(body) {
    return "param";
  },
  update(param, body) {
    return param;
  },
  delete(param) {
    return param;
  },
  async list() {
    functions.logger.log("list enter to request");
    return db
      .collection(collection)
      .get()
      .then((snapshot) => {
        let docs = [];
        snapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
          functions.logger.log("list", {
            id: doc.id,
            doc: doc.data(),
          });
          docs.push({
            id: doc.id,
            doc: doc.data(),
          });
        });
        return docs;
      })
      .catch((err) => {
        console.log("Error getting documents", err);
        return { message: "error" };
      });
  },
};

module.exports = Service;
