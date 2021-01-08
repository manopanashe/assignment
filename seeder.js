const fs = require("fs");
const mongodb = require("mongodb").MongoClient;
const fastcsv = require("fast-csv");

// let url = "mongodb://username:password@localhost:27017/";
let url = "mongodb+srv://admin:ZU1yK7Xg1yJ9yKpN@cluster0.7xp97.mongodb.net/jclarke_db?retryWrites=true&w=majority";
/**
 * feature collection
 */
let stream = fs.createReadStream("stores-data-set.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push({
      province: data[0],
      store_number: data[1],
      type: data[2],
      size: data[3],
      
    });
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();

    console.log(csvData);

    mongodb.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) throw err;

        client
          .db("jclarke_db")
          .collection("stores")
          .insertMany(csvData, (err, res) => {
            if (err) throw err;

            console.log(`Inserted: ${res.insertedCount} rows`);
            client.close();
          });
      }
    );
  });
  
/**
 * store data collection
 */
let stream2 = fs.createReadStream("Features_data_set.csv");
let csvData2 = [];
let csvStream2 = fastcsv
  .parse()
  .on("data", function(data) {
    csvData2.push({
      store_number: data[0],
      Date: data[1],
      Temperature: data[2],
      Fuel_price:data[3],
      MarkDown_1:data[4],
      MarkDown_2:data[5],
      MarkDown_3:data[6],
      MarkDown_4:data[7],
      MarkDown_5:data[8],
      CPI:data[9],
      Unemployed:data[10],
      isHoliday:data[11],

      
    });
  })
  .on("end", function() {
    // remove the first line: header
    csvData2.shift();

    console.log(csvData2);

    mongodb.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) throw err;

        client
          .db("jclarke_db")
          .collection("features")
          .aggregate([{$group:{_id:"MarkDowns"}},
          {$project:{name: "$_id","_id":0}},
          {$out:"MarkDowns"}]).toArray()
          .insertMany(csvData2, (err, res) => {
            if (err) throw err;

            console.log(`Inserted: ${res.insertedCount} rows`);
            client.close();
          });
      }
    );
  });
  /**
   * sales collection
   */
let stream3 = fs.createReadStream("sales-data-set.csv");
let csvData3 = [];
let csvStream3 = fastcsv
  .parse()
  .on("data", function(data) {
    csvData3.push({
      store_number: data[0],
      Dept: data[1],
      Date: data[2],
      Weekly_sales:data[3],
      isHoliday:data[4],

      
    });
  })
  .on("end", function() {
    // remove the first line: header
    csvData3.shift();

    console.log(csvData3);

    mongodb.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) throw err;

        client
          .db("jclarke_db")
          .collection("sales")
          .insertMany(csvData3, (err, res) => {
            if (err) throw err;

            console.log(`Inserted: ${res.insertedCount} rows`);
            client.close();
          });
      }
    );
  }); 
  stream.pipe(csvStream);
  stream2.pipe(csvStream2);
  stream3.pipe(csvStream3);
