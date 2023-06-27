// We are creating an express server that is a middl ware between node and code
const express = require("express");
dbOperation = require("./dbFiles/dbOperation");
cors = require("cors");
const Employee = require("./dbFiles/employee");
const { createEmployee, updateEmployee } = require("./dbFiles/dbOperation");
let data;

const API_PORT = process.env.PORT || 5500; // the port for the server
const app = express();
app.use(cors()); //allows our frontend to listen to our backend
app.use(express.json()); // allows us to take our json to our server and destructure it
app.use(express.urlencoded());

app.post("/api", function (req, res) {
  //gets the response and sends the result; sends to api
  console.log("Called");
  res.send(data);
});

app.get("/data", function (req, res) {
  //send to quit
  dbOperation.getEmployees().then((res) => {
    // we call the function from the dbOperation file
    data = res.recordset; // grabs the recordset value in the res object
  });
  res.send({
    result: data,
  });
  console.log('hey')
});

dbOperation.getEmployees().then((res) => {
  // we call the function from the dbOperation file
  data = res.recordset; // grabs the recordset value in the res object
});

app.get("/", (req, res) => {
  // we are getting the root location of the port, and sending the html to it so it renders
  res.sendFile(
    "C:/Users/CollinThao/Documents/Coding with Kevin/src/signin.html"
  );
});
app.get("/createUser", (req, res) => {
  // we are getting the root location of the port, and sending the html to it so it renders
    res.sendFile(
      "C:/Users/CollinThao/Documents/Coding with Kevin/src/createUser.html"
    );
});
// app.get("/src/reservationPage.html", (req, res) => {
//   // we are getting the root location of the port, and sending the html to it so it renders
//   const user = data.find(users => {
//     return res.req.query.email === users.Email && res.req.query.Password === users.Password
//   })
//   if (user) {
//     res.sendFile(
//       "C:/Users/CollinThao/Documents/Coding with Kevin/src/reservationPage.html"
//     );
//   } else if (!user) {
//     res.send('User does not exist')
//     console.log('hey')
//   }
// });
let name;
app.post("/data", function (req, res) {
  name =
  new Employee( // we create a new employee from the form data in the req.body
  Math.floor(Math.random() * 1000 + data.length),
  req.body.firstName,
  req.body.lastName,
  req.body.password,
  `${req.body.firstName[0]}${req.body.lastName}@gehealthcare.com`
  );
  dbOperation.createEmployee(name)
  dbOperation.getEmployees().then((res) => {
    // we call the function from the dbOperation file
    data = res.recordset; // grabs the recordset value in the res object
  });
  app.get("/data", function (req, res) {
    //send to quit
    res.send({
      result: data,
    });
    console.log('golly')
  });
});

app.listen(API_PORT, () => {
  console.log(`listening on port ${API_PORT}`);
});

// dbOperation.createEmployee(Pam)

app.get("/submit-student-data", function (req, res) {
  // const focusedData = data.find(dat => {
  //   return dat.EmployeeID === name.EmployeeID
  // })
  // console.log(focusedData)

  dbOperation.deleteEmployee(res.req.query);
  // res.send(data)
  console.log(res);
});

app.put('/data', (req, res) => {
  updateEmployee(req.body)
  dbOperation.getEmployees().then((res) => {
    // we call the function from the dbOperation file
    data = res.recordset; // grabs the recordset value in the res object
  });
  console.log(data)
  app.get("/data", function (req, res) {
    //send to quit
    res.send({
      result: data,
    });
    console.log('hey')
  });
}
)

// app.get("/reservationPage", function (req, res) {
//   // const focusedData = data.find(dat => {
//   //   return dat.EmployeeID === name.EmployeeID
//   // })
//   // console.log(focusedData)
//   console.log('hello')
//   const user = data.find(users => {
//     return res.req.query.email === users.Email
//   })
//   if (user) {
//     res.redirect('/reservationPage')
//     console.log(res)
//   } else if (!user) {
//     res.redirect('/error')
//     console.log(res)
//   }
// });


module.exports = data
