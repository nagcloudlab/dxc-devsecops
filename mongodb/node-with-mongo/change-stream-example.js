const { MongoClient } = require("mongodb");

async function main() {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  const db = client.db("changeDemo");
  const coll = db.collection("testColl");

  const changeStream = coll.watch();

  changeStream.on("change", (change) => {
    console.log("Change detected:", change);
  });

  // Keep the process alive
  setInterval(() => {}, 1000);
}

main();
