// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBU0sULZYB6-mZdPwFsWw-teB5STW0xBoc",
    authDomain: "bookstore-44df6.firebaseapp.com",
    databaseURL: "https://bookstore-44df6-default-rtdb.firebaseio.com",
    projectId: "bookstore-44df6",
    storageBucket: "bookstore-44df6.appspot.com",
    messagingSenderId: "520272877168",
    appId: "1:520272877168:web:0245c151c6b0c41c62c6b5",
    measurementId: "G-WKRXPCNFEL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();


const name = document.querySelector('#name')
const email = document.querySelector('#email')
const adress = document.querySelector('#adress')
const phone = document.querySelector('#phone')
const text = document.querySelector('#text')
const sendBtn = document.querySelector('#sendBtn')
//---------------------------------------------------

function SetData() {
    const id = generate_uuidv4()
    set(ref(db, 'ContactUs/' + id), {
        Name: name.value,
        Email: email.value,
        Adress: adress.value,
        Phone: phone.value,
        Text: text.value
    })
        .then(() =>{
             console.log('Data send')
              name.value=""
            email.value=""
            adress.value=""
            phone.value=""
            text.value=""
        }
          
           )
        .catch(err => (console.log(err)))
}



//----------------------------------------------------

function checkContact() {

    let hasError = false;
    let errors = [];

    if (!/^[a-zA-Z\s]+$/.test(name.value.trim())) {
        name.style.border = "1px solid red";
        errors.push('Please check your name!');
    } else {
        name.style.border = "1px solid #CECECE";
    }

    if (!(email.value.includes("@")) || email.value.trim() === "") {
        email.style.border = "1px solid red";
        errors.push('Please check your email address!');
    } else {
        email.style.border = "1px solid #CECECE";
    }

    let phoneValue = phone.value.trim();
    if (!/^[0-9]+$/.test(phoneValue)) {
        phone.style.border = "1px solid red";
        errors.push('Please check your number!');
    } else if (phoneValue.length < 6) {
        phone.style.border = "1px solid red";
        errors.push('Please check your number! It should be at least 6 digits long.');
    } else {
        phone.style.border = "1px solid #CECECE";
    }

    if (adress.value.trim() === '') {
        adress.style.border = "1px solid red";
        errors.push('Please check your address!');
    } else {
        adress.style.border = "1px solid #CECECE";
    }

    if (text.value.trim() === '') {
        text.style.border = "1px solid red";
        errors.push('Please check your note!');
    } else {
        text.style.border = "1px solid #CECECE";
    }

    if (errors.length > 0) {
        Swal.fire({
            icon: 'error',
            text: errors[0]
        });
    } else {
        SetData();
        Swal.fire({
            icon: 'success',
            text: 'Thank you for contacting us!'
        });
    }
}

sendBtn.addEventListener('click', checkContact);


document.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        checkContact();
    }
});