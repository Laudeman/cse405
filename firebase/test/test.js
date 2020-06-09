const firebase = require("@firebase/testing");
const fs = require("fs");

const projectId = "cse405";
const firebasePort = 8080;

const rules = fs.readFileSync("firestore.rules", "utf-8");

describe("firebase rules test", () => {
    it("non-authenticated users can access nothing", async () => {
        const app = firebase.initializeTestApp({ projectId: projectId, auth: null });
        const db = app.firestore();
    })
})
