const config = require('./dbConfig') // grab the config file info with express
sqlConnectToServer = require('mssql'); // grab the mssql dependancy

const getEmployees = async() => { /* async function allows the await key word to be permitted; these are 
used in situations where we want to pull a lot of data, we use async to have the data load and block the rest of the
code until the data is loaded in */
    try { // this will try for the promise to be fulfilled
        let pool = await sqlConnectToServer.connect(config); // use the connect method from mssql to connect using the config info given
        let employees = pool.request().query('SELECT * from EmployeeDemographics') // query with sql syntax
        console.log(employees)
        return employees
    }
    catch(error) { // catch catches errors in the case a promsie is rejected
        console.log(error);
    }
}

const createEmployee = async (Employee) => {
  /* async function allows the await key word to be permitted; these are 
used in situations where we want to pull a lot of data, we use async to have the data load and block the rest of the
code until the data is loaded in */
  try {
    // this will try for the promise to be fulfilled
    let pool = await sqlConnectToServer.connect(config);
    let employees = pool
      .request()
      .query(
        `INSERT INTO EmployeeDemographics VALUES (${Employee.EmployeeID}, '${Employee.Firstname}', '${Employee.lastname}', '${Employee.password}', '${Employee.email}', 'No', 'N/A', 'N/A', 'N/A', 'N/A', 'No')` //Here we insert our schema
      ); //this uses the query method to query with SQL
    console.log(employees);
    return employees;
  } catch (error) {
    // catch catches errors in the case a promsie is rejected
    console.log(error);
  }
};

const deleteEmployee = async (Employee) => {
  /* async function allows the await key word to be permitted; these are 
used in situations where we want to pull a lot of data, we use async to have the data load and block the rest of the
code until the data is loaded in */
  try {
    // this will try for the promise to be fulfilled
    let pool = await sqlConnectToServer.connect(config);
    let employees = pool.request().query(
      `DELETE FROM EmployeeDemographics WHERE EmployeeID = ${Employee.EmployeeID}` //Here we insert our schema
    ); //this uses the query method to query with SQL
    console.log(employees);
    return employees;
  } catch (error) {
    // catch catches errors in the case a promsie is rejected
    console.log(error);
  }
};

const updateEmployee = async (Employee) => {
  try {
    let pool = await sqlConnectToServer.connect(config);
    let employees = pool.request().query(
      `UPDATE EmployeeDemographics SET [Reservation] = 'Yes', [Location] = '${Employee.location}', [Cubicle] = '${Employee.cubicle}', [Date] = '${Employee.date}', [Time] = '${Employee.time}' WHERE EmployeeID = ${Employee.userID}`
    )
    console.log(employees)
    return employees
  }
  catch (error) {
    console.log(error.message)
  }
}

module.exports =  { // we then export the function
    getEmployees,
    createEmployee,
    deleteEmployee,
    updateEmployee
}