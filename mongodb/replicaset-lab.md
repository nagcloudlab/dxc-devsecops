

mongod --replSet rs0 --dbpath ~/mongodb/data1 --port 27017
mongod --replSet rs0 --dbpath ~/mongodb/data2 --port 27018
mongod --replSet rs0 --dbpath ~/mongodb/data3 --port 27019



mongosh --port 27017
> rs.initiate()
> rs.add("localhost:27018")
> rs.add("localhost:27019")
> exit