// We are creating an express server that is a middl ware between node and code
const express = require("express");
dbOperation = require("./dbFiles/dbOperation");
cors = require("cors");
const Employee = require("./dbFiles/employee");
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
  console.log("Called quit");
  res.send({
    result: data,
  });
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
app.post("/submit-student-data", function (req, res) {
  /* this alters what will happen in this page when a post request is sent to it
in the post request, we are sending the data over to the server */ name =
    new Employee( // we create a new employee from the form data in the req.body
      Math.floor(Math.random() * 1000 + data.length),
      req.body.Firstname,
      req.body.Lastname,
      req.body.Password,
      `${req.body.Firstname[0]}${req.body.Lastname}@gehealthcare.com`
    );
  if (
    !data.find((dat) => {
      return dat.EmployeeID === name.EmployeeID;
    })
  ) {
    if (req.body.Password === req.body.retypedPassword) {
      dbOperation.createEmployee(name); // Here we use this data that was put in to a variable to create a new employee and send the info to ssms
      // res.send(name.Firstname +  ' ' + name.lastname +  " successfully created!");
      dbOperation.getEmployees().then((res) => {
        // we call the function from the dbOperation file
        data = res.recordset; // grabs the recordset value in the res object
      });
      res.redirect('/')
    } else {
      console.log('must be same')
    }
  } else {
    name.EmployeeID = Math.floor(Math.random() * 1000 + data.length);
    dbOperation.createEmployee(name);
  }
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