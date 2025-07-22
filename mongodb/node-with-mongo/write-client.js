const { MongoClient } = require("mongodb");

async function main() {
    const client = await MongoClient.connect("mongodb://localhost:27017");
    const db = client.db("replDemo");
    const coll = db.collection("testColl");
    // Insert a document
    let id = 0;
    while(id < 100) {
        const insertResult = await coll.insertOne({_id:id, name: `Alice${id}`, age: 30 + id });
        console.log("Insert Result:", insertResult);
        id++;
    }
    // Close the client connection
    await client.close();
    console.log("Client connection closed.");
    console.log("Data inserted successfully.");
}

main()