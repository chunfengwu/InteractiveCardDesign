const cardHolder = document.getElementById("cardholder-name");
const cardNumber = document.getElementById("card-number");
const expiryMonth = document.getElementById("expiry-month");
const expiryYear = document.getElementById("expiry-year");
const cvc = document.getElementById("cvc")
const form = document.getElementById("myForm")
const thankYou = document.getElementById("thank-you")

cardHolder.oninput = () =>{
    document.querySelector(".cardholder-display").innerHTML = 
    cardHolder.value;
}

cardNumber.addEventListener('input', function (e) {
    e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    document.querySelector(".card-number-display").innerHTML = 
        cardNumber.value;
})

expiryMonth.oninput = () =>{
    // expiryMonth.value = ('0' + expiryMonth.value).slice(-2);
    document.querySelector(".expiry-month-display").innerHTML = 
    expiryMonth.value
    // ('0' + expiryMonth.value).slice(-2);
    
}

// expiryMonth.onkeyup = () =>{
//     expiryMonth.value = 
//     ('0' + expiryMonth.value).slice(-2);
// }


expiryYear.oninput = () =>{
    document.querySelector(".expiry-year-display").innerHTML = 
    expiryYear.value;
}

cvc.oninput = () =>{
    document.querySelector(".cvc-display").innerHTML = 
        cvc.value;
}


form.addEventListener('submit', function (e) {
    e.preventDefault()

    checkInputs();
})

function checkInputs() {
    // trim to remove whitespaces
    const ownerValue = cardHolder.value.trim();
    const cardValue = cardNumber.value.trim();
    const monthValue = expiryMonth.value.trim();
    const yearValue = expiryYear.value.trim();
    const cvcValue = cvc.value.trim(); 
    const small = document.querySelector("small")


    if(ownerValue === "") {
        setErrorFor(cardHolder, "Can't be blank")
    } else {
        setSuccessFor(cardHolder)
    }

    if(cardValue === "") {
        setErrorFor(cardNumber, "Can't be blank")
    } else if(!isCardNumber(cardValue)) {
        setErrorFor(cardNumber,"length much be 16")
    } else {
        setSuccessFor(cardNumber)
    }

    if (monthValue === "") {
        setErrorFor(expiryMonth, "Can't be blank");
    } else if (!isMonth(monthValue)) {
        setErrorFor(expiryMonth, "Invalid format");
    } else {
        setSuccessFor(expiryMonth);
    }

    if (cvcValue === "") {
        setErrorFor(cvc, "Can't be blank");
    } else if (!isCvc(cvcValue)) {
        setErrorFor(cvc, "Invalid format");
    } else {
        setSuccessFor(cvc);
    }

    if (yearValue === "") {
        setErrorFor(expiryYear, "Can't be blank");
    } else if (!isYear(yearValue)) {
        setErrorFor(expiryYear, "Invalid format");
    } else {
        setSuccessFor(expiryYear);
    }

    if (ownerValue && isCardNumber(cardValue) && isMonth(monthValue) && isYear(yearValue) && isCvc(cvcValue)) {
        form.style.display = "none";
        thankYou.style.display="block"
    }
    
};

document.getElementById("continute").addEventListener("click", function () {
    window.location.reload();
});


function setErrorFor(input, message) {
    const formControl = input.parentElement     
    const small = formControl.querySelector("small")

    formControl.className = "form-control error"
    small.innerHTML = message
}

function setSuccessFor(input){
    const formControl = input.parentElement;
    formControl.className = "form-control success"
}

function isCardNumber(card) {
    let number = /^[0-9_ ]{19}$/;
    return number.test(card)
}

function isYear(year) {
    let yearNumber =  /^[0-9]{2}$/g;
    return yearNumber.test(year);
}

function isMonth(month) {
    let monthNumber = /^(0?[1-9]|1[012])$/;
    return monthNumber.test(month);
}

function isCvc(cvc) {
    let digits = /^[0-9]{3}$/;
    return digits.test(cvc);
}








