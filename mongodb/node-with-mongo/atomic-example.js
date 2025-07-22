const { MongoClient } = require("mongodb");

async function transferFunds() {
  const client = new MongoClient("mongodb://localhost:27017/?replicaSet=rs0");

  try {
    await client.connect();
    const db = client.db("bankDemo");
    const accounts = db.collection("accounts");
    const transactions = db.collection("transactions");

    // Start a session
    const session = client.startSession();

    // Transaction options (optional)
    const transactionOptions = {
      readConcern: { level: "local" },
      writeConcern: { w: "majority" }
    };

    // Start transaction
    let result;
    await session.withTransaction(async () => {
      // 1. Debit Alice if she has enough funds
      result = await accounts.updateOne(
        { _id: 1, balance: { $gte: 200 } },
        { $inc: { balance: -200 } },
        { session }
      );
      if (result.modifiedCount === 0) {
        throw new Error("Insufficient funds in Alice's account.");
      }

      // 2. Credit Bob
      await accounts.updateOne(
        { _id: 2 },
        { $inc: { balance: 200 } },
        { session }
      );

      // 3. Log the transaction
      await transactions.insertOne(
        {
          from: "Alice",
          to: "Bob",
          amount: 200,
          ts: new Date()
        },
        { session }
      );
    }, transactionOptions);

    console.log("✅ Transaction successful!");
  } catch (err) {
    console.error("❌ Transaction aborted:", err.message);
  } finally {
    await client.close();
  }
}

transferFunds();
