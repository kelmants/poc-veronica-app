const admin = require("firebase-admin");

// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   databaseURL: "https://poc-veronica-app.firebaseio.com",
// });

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

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
    return db
      .collection(collection)
      .get()
      .then((snapshot) => {
        let docs = [];
        snapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
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
