use indexDemo


db.noIndexColl.drop()
db.noIndexColl.insertMany([
  { category: "A", value: 1 },
  { category: "B", value: 2 },
  { category: "C", value: 3 },
  { category: "A", value: 4 }
])
db.noIndexColl.find({ category: "A" }).explain("executionStats")



db.indexedColl.drop()
db.indexedColl.createIndex({ category: 1 })
db.indexedColl.insertMany([
  { category: "A", value: 1 },
  { category: "B", value: 2 },
  { category: "C", value: 3 },
  { category: "A", value: 4 }
])
db.indexedColl.find({ category: "A" }).explain("executionStats")





