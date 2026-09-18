// Simple Functions
function tickUp() {
    let counter = document.getElementById("counter");
    counter.textContent = parseInt(counter.textContent) + 1;
}

function tickDown() {
    let counter = document.getElementById("counter");
    counter.textContent = parseInt(counter.textContent) - 1;
}

// Simple For Loop
function runForLoop() {
    let counter = parseInt(document.getElementById("counter").textContent);
    let result = "";
    for (let i = 0; i <= counter; i++) {
        result += i;
        if (i < counter) result += ", ";
    }
    document.getElementById("forLoopResult").textContent = result;
}

// Repetition with Condition
function showOddNumbers() {
    let counter = parseInt(document.getElementById("counter").textContent);
    let result = "";
    for (let i = 1; i <= counter; i++) {
        if (i % 2 !== 0) {
            result += i + " ";
        }
    }
    document.getElementById("oddNumberResult").textContent = result.trim();
}

// Arrays
function addMultiplesToArray() {
    let counter = parseInt(document.getElementById("counter").textContent);
    let multiplesArray = [];
    for (let i = 5; i <= counter; i += 5) {
        multiplesArray.unshift(i);
    }
    console.log(multiplesArray);
}

// Objects and Form Fields
function printCarObject() {
    let carObj = {
        cType: document.getElementById("carType").value,
        cMPG: document.getElementById("carMPG").value,
        cColor: document.getElementById("carColor").value
    };
    console.log(carObj);
}

// Objects and Form Fields pt. 2
function loadCar(carNum) {
    let car;
    if (carNum === 1) car = carObject1;
    else if (carNum === 2) car = carObject2;
    else if (carNum === 3) car = carObject3;

    document.getElementById("carType").value = car.cType;
    document.getElementById("carMPG").value = car.cMPG;
    document.getElementById("carColor").value = car.cColor;
}

// Changing Styles
function changeColor(colorNum) {
    let p = document.getElementById("styleParagraph");
    if (colorNum === 1) p.style.color = "red";
    else if (colorNum === 2) p.style.color = "green";
    else if (colorNum === 3) p.style.color = "blue";
}