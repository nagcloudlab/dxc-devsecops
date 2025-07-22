use bankDemo

db.accounts.drop()
db.transactions.drop()

db.accounts.insertMany([
  { _id: 1, name: "Alice", balance: 1000 },
  { _id: 2, name: "Bob",   balance: 500 }
]);


// Start a session

const session = db.getMongo().startSession();
const accountsColl = session.getDatabase("bankDemo").accounts;
const transactionsColl = session.getDatabase("bankDemo").transactions;



// Start transaction
session.startTransaction();

try {
    
    // 1. Debit Alice (should have enough funds!)
    accountsColl.updateOne(
        { _id: 1, balance: { $gte: 200 } },
        { $inc: { balance: -200 } }
    );

    // 2. Credit Bob
    accountsColl.updateOne(
        { _id: 2 },
        { $inc: { balance: 200 } }
    );

    // 3. Log transaction
    transactionsColl.insertOne({
        from: "Alice",
        to: "Bob",
        amount: 200,
        ts: new Date()
    });

    // Commit transaction (all-or-nothing)
    session.commitTransaction();
    print("✅ Transaction successful!");

} catch (e) {
    print("❌ Transaction aborted: " + e);
    session.abortTransaction();
}

session.endSession();

db.accounts.find()
db.transactions.find()
