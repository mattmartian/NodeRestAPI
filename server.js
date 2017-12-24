/*
StAuth10065: I Matthew Martin, 000338807 certify that this material is my original work.
 No other person's work has been used without due acknowledgement. 
I have not made my work available to anyone else.
*/

const express = require("express");
const fs = require("fs");
const app = express();
const sqlite3 = require("sqlite3").verbose();
var stmt = "";
const parser = require("body-parser");
var file = "api.db";
var db = new sqlite3.Database(file);

app.use(parser.json());

if (fs.existsSync(file)) {
  db.serialize(function() {
    db.run("DROP TABLE IF EXISTS Users");
    db.run(
      "CREATE TABLE if not exists Users (userID INTEGER PRIMARY KEY, name TEXT, phone TEXT, email TEXT)"
    );
  });
} else {
  fs.openSync(file, "rs+");

  db.serialize(function() {
    db.run(
      "CREATE TABLE if not exists Users (userID INTEGER PRIMARY KEY, name TEXT, phone TEXT, email TEXT)"
    );
  });
}

/*COLLECTION */
app.get("/api", function(req, res) {
  db.all("SELECT * FROM Users", function(err, rows) {
    res.send(JSON.stringify(rows));
  });
});

app.post("/api", function(req, res) {
  db.serialize(function() {
    db.run(
      `INSERT INTO Users(name,phone,email) VALUES(?,?,?)`,
      [req.body.name, req.body.phone, req.body.email],
      function(err) {
        if (err) {
          return console.log(err.message);
        }
      }
    );
    res.send("CREATE ENTRY SUCCESSFUL");
  });
});

app.put("/api", function(req, res) {
  db.serialize(function() {
    let data = req.body;
    db.run("DELETE FROM Users");
    for (i = 0; i < data.length; i++) {
      db.run(
        `INSERT INTO Users(name,phone,email) VALUES(?,?,?)`,
        [data[i].name, data[i].phone, data[i].email],
        function(err) {
          if (err) {
            return console.log(err.message);
          }
        }
      );
    }
    res.send("REPLACE COLLECTION SUCCESSFUL");
  });
});

app.delete("/api", function(req, res) {
  db.serialize(function() {
    db.run(`DELETE FROM Users`, function(err) {
      if (err) {
        return console.log(err.message);
      }
    });
    res.send("DELETE COLLECTION SUCCESSFUL");
  });
});

/*RECORD */
app.get("/api/:id", function(req, res) {
  db.serialize(function() {
    db.all(`SELECT * FROM Users WHERE userID = ?`, req.params.id, function(
      err,
      rows
    ) {
      res.send(JSON.stringify(rows));
    });
  });
});

app.put("/api/:id", function(req, res) {
  db.serialize(function() {
    db.run(
      "UPDATE Users SET name = '" +
        req.body.name +
        "', email = '" +
        req.body.email +
        "', phone = '" +
        req.body.phone +
        "' WHERE userid = " +
        req.params.id,
      function(err) {
        if (err) {
          return console.log(err.message);
        }
      }
    );
    res.send("UPDATE ITEM SUCCESSFUL");
  });
});

app.delete("/api/:id", function(req, res) {
  db.serialize(function() {
    db.run(`DELETE FROM Users WHERE userID = ?`, req.params.id, function(err) {
      if (err) {
        return console.log(err.message);
      }
    });
    res.send("DELETE ITEM SUCCESSFUL");
  });
});

var server = app.listen(8085, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Lab 2 listening at http://%s:%s", host, port);
});
