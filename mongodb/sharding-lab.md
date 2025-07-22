

Ref : https://www.digitalocean.com/community/tutorials/how-to-use-sharding-in-mongodb

mkdir -p ~/mongodb/config
mongod --configsvr --replSet configRs --dbpath ~/mongodb/config --port 27019 --bind_ip localhost

mongosh --port 27019
rs.initiate({_id: "configRs", configsvr: true, members: [{_id:0, host:"localhost:27019"}]})

//---------------------------------------------------------------------

mkdir -p ~/mongodb/shard1
mongod --shardsvr --replSet shard1Rs --dbpath ~/mongodb/shard1 --port 27018 --bind_ip localhost

mongosh --port 27018
rs.initiate({_id:"shard1Rs", members:[{_id:0, host:"localhost:27018"}]})

//---------------------------------------------------------------------

mkdir -p ~/mongodb/shard2
mongod --shardsvr --replSet shard2Rs --dbpath ~/mongodb/shard2 --port 27017 --bind_ip localhost

mongosh --port 27017
rs.initiate({_id:"shard2Rs", members:[{_id:0, host:"localhost:27017"}]})

//---------------------------------------------------------------------

mongos --configdb configRs/localhost:27019 --bind_ip localhost --port 27020
mongosh --port 27020

sh.status(); // Should show no shards yet

sh.addShard("shard1Rs/localhost:27018");
sh.addShard("shard2Rs/localhost:27017");

sh.status(); // Confirm both shards are added



use demoDB
db.demoCollection.drop()


sh.enableSharding("demoDB")
db.demoCollection.createIndex({ _id: "hashed" })
sh.shardCollection("demoDB.demoCollection", { _id: "hashed" })
for (let i = 1; i <= 10000; i++) {
  db.demoCollection.insert({ _id: i, value: "val" + i });
}
db.demoCollection.getShardDistribution()
sh.status()



----------------------------------------------------------------------

use populations
sh.enableSharding("populations")
sh.shardCollection("populations.cities", { "country": "hashed" })

db.cities.insertMany([
    {"name": "Seoul", "country": "South Korea", "continent": "Asia", "population": 25.674 },
    {"name": "Mumbai", "country": "India", "continent": "Asia", "population": 19.980 },
    {"name": "Lagos", "country": "Nigeria", "continent": "Africa", "population": 13.463 },
    {"name": "Beijing", "country": "China", "continent": "Asia", "population": 19.618 },
    {"name": "Shanghai", "country": "China", "continent": "Asia", "population": 25.582 },
    {"name": "Osaka", "country": "Japan", "continent": "Asia", "population": 19.281 },
    {"name": "Cairo", "country": "Egypt", "continent": "Africa", "population": 20.076 },
    {"name": "Tokyo", "country": "Japan", "continent": "Asia", "population": 37.400 },
    {"name": "Karachi", "country": "Pakistan", "continent": "Asia", "population": 15.400 },
    {"name": "Dhaka", "country": "Bangladesh", "continent": "Asia", "population": 19.578 },
    {"name": "Rio de Janeiro", "country": "Brazil", "continent": "South America", "population": 13.293 },
    {"name": "São Paulo", "country": "Brazil", "continent": "South America", "population": 21.650 },
    {"name": "Mexico City", "country": "Mexico", "continent": "North America", "population": 21.581 },
    {"name": "Delhi", "country": "India", "continent": "Asia", "population": 28.514 },
    {"name": "Buenos Aires", "country": "Argentina", "continent": "South America", "population": 14.967 },
    {"name": "Kolkata", "country": "India", "continent": "Asia", "population": 14.681 },
    {"name": "New York", "country": "United States", "continent": "North America", "population": 18.819 },
    {"name": "Manila", "country": "Philippines", "continent": "Asia", "population": 13.482 },
    {"name": "Chongqing", "country": "China", "continent": "Asia", "population": 14.838 },
    {"name": "Istanbul", "country": "Turkey", "continent": "Europe", "population": 14.751 }
])
