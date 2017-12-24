/*
StAuth10065: I Matthew Martin, 000338807 certify that this material is my original work.
 No other person's work has been used without due acknowledgement. 
I have not made my work available to anyone else.
*/

const http = require("http");
var flag = false;
var testsPassed = "";
var testsFailed = "";

//#region Start Tests
function startTests() {
  getCollectionTest();
}

//Get Collection Tests

function getCollectionTest() {
  var options = {
    host: "localhost",
    path: "/api",
    port: "8085",
    method: "GET"
  };

  callback = function(response) {
    var str = "";
    response.on("data", function(chunk) {
      str += chunk;
    });
    response.on("end", function() {
      var expectedGet = "[]";
      if (str == expectedGet) {
        flag = true;
        testsPassed += "\nGet Collection Test Passed";
      } else {
        flag = false;
        testsFailed += "\nGet Collection Test Failed";
      }
      createFirstEntry();
    });
  };

  http.request(options, callback).end();
}

//#region Create First Entry Test
function createFirstEntry() {
  var options = {
    host: "localhost",
    path: "/api",
    port: "8085",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  };
  callback = function(response) {
    var str = "";
    response.on("data", function(chunk) {
      str += chunk;
    });
    response.on("end", function() {
      if (str == "CREATE ENTRY SUCCESSFUL") {
        flag = true;
        testsPassed += "\nCreate First Entry Passed";
      } else {
        flag = false;
        testsFailed += "\nCreate First Entry Failed";
      }
      createSecondEntry();
    });
  };

  var req = http.request(options, callback);
  var info =
    '{"name":"Matt Martin","email":"mmartin7064@gmail.com","phone":"289-244-3008"}';
  req.write(info);
  req.end();
}
//#region Create Second Entry Test

function createSecondEntry() {
  var options = {
    host: "localhost",
    path: "/api",
    port: "8085",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  };
  callback = function(response) {
    var str = "";
    response.on("data", function(chunk) {
      str += chunk;
    });
    response.on("end", function() {
      if (str == "CREATE ENTRY SUCCESSFUL") {
        flag = true;
        testsPassed += "\nCreate Second Entry Passed";
      } else {
        flag = false;
        testsFailed += "\nCreate Second Entry Failed";
      }
      replaceCollection();
    });
  };

  var req = http.request(options, callback);
  req.write(
    '{"name":"Alex Ridha","email":"alexridha@bnr.com","phone":"905-567-9876"}'
  );
  req.end();
}

//#region Replace Collection Test

function replaceCollection() {
  var options = {
    host: "localhost",
    path: "/api",
    port: "8085",
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    }
  };
  callback = function(response) {
    var str = "";
    response.on("data", function(chunk) {
      str += chunk;
    });
    response.on("end", function() {
      if (str == "REPLACE COLLECTION SUCCESSFUL") {
        flag = true;
        testsPassed += "\nReplace Collection Passed";
      } else {
        flag = false;
        testsFailed += "\nReplace Collection Failed";
      }
      getRecord();
    });
  };

  var req = http.request(options, callback);
  req.write(
    '[{"name":"Sonny Moore","email":"sonnymoore@owsla.com","phone":"123-456-790"},{"name":"Joel Zimmerman","email":"jzimmer@mau5trap.com","phone":"905-786-967"}]'
  );
  req.end();
}

//#region get Record Test

function getRecord() {
  var options = {
    host: "localhost",
    path: "/api/1",
    port: "8085",
    method: "GET"
  };

  callback = function(response) {
    var str = "";
    response.on("data", function(chunk) {
      str += chunk;
    });
    response.on("end", function() {
      if (
        str ==
        '[{"userID":1,"name":"Sonny Moore","phone":"123-456-790","email":"sonnymoore@owsla.com"}]'
      ) {
        flag = true;
        testsPassed += "\nGet Record Passed";
      } else {
        flag = false;
        testsFailed += "\nGet Record Failed";
      }
      updateRecord();
    });
  };

  http.request(options, callback).end();
}

//#region Update Record Test
function updateRecord() {
  var options = {
    host: "localhost",
    path: "/api/1",
    port: "8085",
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    }
  };
  callback = function(response) {
    var str = "";
    response.on("data", function(chunk) {
      str += chunk;
    });
    response.on("end", function() {
      if (str == "UPDATE ITEM SUCCESSFUL") {
        flag = true;
        testsPassed += "\nUpdate Record Passed";
      } else {
        flag = false;
        testsFailed += "\nUpdate Record Failed";
      }
      deleteRecord();
    });
  };

  var req = http.request(options, callback);
  req.write(
    '{"name":"Darth Revan","email":"drevan@dsideforce.com","phone":"289-430-9876"}'
  );
  req.end();
}

//#region Delete Record Test
function deleteRecord() {
  var options = {
    host: "localhost",
    path: "/api/1",
    port: "8085",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  };
  callback = function(response) {
    var str = "";
    response.on("data", function(chunk) {
      str += chunk;
    });
    response.on("end", function() {
      if (str == "DELETE ITEM SUCCESSFUL") {
        flag = true;
        testsPassed += "\nDelete Item Passed";
      } else {
        flag = false;
        testsFailed += "\nDelete Item Failed";
      }
      deleteColletion();
    });
  };

  var req = http.request(options, callback);

  req.end();
}

//#region deleteCollection Test

function deleteColletion() {
  var options = {
    host: "localhost",
    path: "/api",
    port: "8085",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  };
  callback = function(response) {
    var str = "";
    response.on("data", function(chunk) {
      str += chunk;
    });
    response.on("end", function() {
      if (str == "DELETE COLLECTION SUCCESSFUL") {
        flag = true;
        testsPassed += "\nDelete Collection Passed";
      } else {
        flag = false;
        testsFailed += "\nDelete Collection Failed";
      }
    });
  };

  var req = http.request(options, callback);

  req.end();
}

//Start The Tests
startTests();

//If all the tests have passed, let the user know. If not display which tests passed and which did not
if ((flag = true)) {
  console.log("ALL TESTS PASSED");
} else {
  console.log(testsPassed);
  console.log(testsFailed);
}
