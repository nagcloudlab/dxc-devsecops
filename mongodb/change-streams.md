mongod --replSet rs0 --dbpath ~/mongodb/data --port 27017
mongosh --port 27017
> rs.initiate()
> exit


use changeDemo
db.testColl.insertOne({ name: "Alice", age: 30 })
db.testColl.updateOne({ name: "Alice" }, { $set: { age: 31 } })
db.testColl.deleteOne({ name: "Alice" })

