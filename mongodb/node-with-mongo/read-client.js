const { MongoClient } = require("mongodb");

async function main() {
    // prefered reaplica reading
    const client = await MongoClient.connect("mongodb://localhost:27017?replicaSet=rs0&readPreference=secondaryPreferred");
    const db = client.db("replDemo");
    const coll = db.collection("testColl");
    // Read documents
    let id = 0;
    while(id < 100) {
        const doc = await coll.findOne({_id: id});
        console.log("Document:", doc);
        id++;
    }
    // Close the client connection
    await client.close();
    console.log("Client connection closed.");
    console.log("Data read successfully.");
}

main()