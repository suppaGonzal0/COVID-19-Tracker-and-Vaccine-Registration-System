const express = require('express');
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(express.urlencoded({
  extended: false
}));

const db = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "1234",
  database: "vaxtrak"
});

app.post("/register", (req, res) => {

  const name = req.body.name;
  const NID = req.body.NID;
  const birth = req.body.birth;
  const phone = req.body.phone;
  const gender = req.body.gender;
  const center = req.body.center;
  const address = req.body.address;

  db.query(
    "insert into register (name, NID, birth, phone, gender, center, address) values (?,?,?,?,?,?,?)",
    [name, NID, birth, phone, gender, center, address],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/login", (req, res) => {

  const {NID, phone} = req.body;

  db.query(
    "select * from citizen where NID = ? and phone =?", [NID, phone],
    (err, result) => {
      if (err) {
        res.send(err);
      } else if(result.length>0){
        res.send(result);
      }else {
        res.send({message : "Wrong credentials!"});
      }
    }
  );
});

app.post("/getData", (req, res) => {

  const {NID, phone} = req.body;

  db.query(
    "select * from register where NID = ? and phone =?", [NID, phone],
    (err, result) => {
      if (err) {
        res.send(err);
      } else if(result.length>0){
        res.send(result);
      }else {
        res.send({message : "Not Registered"});
      }
    }
  );
});

app.get("/register", (req, res) => {
  db.query("SELECT * FROM register", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/registerAll", (req, res) => {
  db.query("SELECT * FROM register where doseOneDate is not null and doseTwoDate is not null", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/registerNone", (req, res) => {
  db.query("SELECT * FROM register where doseOne is null and doseTwo is null and doseOneDate is not null and doseTwoDate is not null", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/registerDoseOne", (req, res) => {
  db.query("SELECT * FROM register where doseOne=true and doseTwo is null and doseOneDate is not null and doseTwoDate is not null", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/registerComplete", (req, res) => {
  db.query("SELECT * FROM register where doseOne=true and doseTwo=true and doseOneDate is not null and doseTwoDate is not null", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/assign", (req, res) => {
  const NID = req.body.NID;
  const doseOneDate = req.body.doseOneDate;
  db.query(
    "UPDATE register SET doseOneDate = ?, doseTwoDate = date_add(doseOneDate, interval 30 day)  WHERE NID = ?",
    [doseOneDate,NID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

const port= 3001;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
  });