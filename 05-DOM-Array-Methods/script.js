const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionaires = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();

// fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };
  addData(newUser);
}

//Double all th emoney
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

//sort by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

//only the millionaires please
function showMils() {
  data = data.filter(x => x.money >= 1000000);
  updateDOM();
}

//total money please
function calculate() {
  const total = data.reduce((x, y) => (x += y.money), 0);

  const totalElement = document.createElement("div");
  totalElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    total
  )}</strong></h3>`;
  main.appendChild(totalElement);
}

//add new obj to data arr
function addData(obj) {
  data.push(obj);

  updateDOM();
}

//update DOM
function updateDOM(providedData = data) {
  // clear main div
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";

  providedData.forEach(item => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

//Format money
function formatMoney(num) {
  return "$" + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"); //from stack overflow
}

//Event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionaires.addEventListener("click", showMils);
calculateBtn.addEventListener("click", calculate);
