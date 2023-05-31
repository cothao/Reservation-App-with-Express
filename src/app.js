const myForm = document.querySelector('#myForm')
const createUser = document.querySelector('#create-user-form')
const firstName = document.querySelector('#firstName')
const lastName = document.querySelector("#lastName");
const userPassword = document.querySelector('#password')
const greetingName = document.querySelector('#username')
const logout = document.querySelector('#logout')

async function logJSONData() {
  const response = await fetch("http://localhost:5500/data");
  const jsonData = await response.json();
  return jsonData
}

let currentUser = localStorage.getItem('currentUser')
window.addEventListener('load', () => {
  if (
    currentUser &&
    window.location.href === "http://127.0.0.1:5501/src/signin.html"
  ) {
    window.location.replace("http://127.0.0.1:5501/src/reservationPage.html");
  }
}, false)

window.addEventListener('DOMContentLoaded', () => {
  logJSONData()
  console.log(currentUser)
})

// myForm.addEventListener("submit", async (e) => {
//   e.preventDefault()
// });
//2944.52
// LOGIN FORM
myForm?.addEventListener('submit', async(e) => {
  e.preventDefault()
  
  let uso = await logJSONData() /* this function returns json data that
  we await for, we then await the data in this function call so that it may return */
  
  let user = uso.result?.find(data => {
    return (data.Email === e.target[0].value) && data.Password === e.target[1].value
  })
  if (user) {
    e.target.submit()
    localStorage.setItem('currentUser', JSON.stringify(user))
  } else {
    alert('Email or Password is incorrect')
  }
})

createUser?.addEventListener('submit', (e) => {
  const nameInput = firstName.value
  const nameInputLast = lastName.value
  const usersPassword = userPassword.value
  fetch("http://localhost:5500/signin", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      firstName:nameInput,
      lastName: nameInputLast,
      password: usersPassword
      }) // the body property allows for putting things into here through post methods
  }).then(res => {
    return res.json()
  }).then(data => {
    return data
  }) // like above, this is why we put it in json format; then grabs a fulfilled promise
})

logout.addEventListener('click', () => {
  localStorage.clear()
})

greetingName.textContent = `Hello ${JSON.parse(currentUser).Firstname}!`

class Employee {
  constructor(EmployeeID, Firstname, lastname, Age, Gender) {
    this.EmployeeID = EmployeeID;
    this.Firstname = Firstname;
    this.lastname = lastname;
    this.Age = Age;
    this.Gender = Gender;
  }
}

console.log("hey");

const getData = async (url) => {
  // we use an async function to grab the data into the url
  const newData = await fetch(url, {
    //fetch api has a config and in the config you can set GET in an obj param
    method: "GET",
    headers: {
      //headers help us tell the response how we are accepting the data; in this case, json format
      "content-type": "application/json",
      "Accept": "application/json",
    },
  }).then((res) => res.json()); // like above, this is why we put it in json format; then grabs a fulfilled promise
  console.log(newData); // then we are console logging it
};

getData("/"); // we call the function with the root as the parameter
