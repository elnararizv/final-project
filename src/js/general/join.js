// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import { getDatabase, set, ref} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase()
const userIcon=document.querySelector('.navbar .d-flex img');

let fnameModal = document.querySelector('#fnameModal')
let userMail = document.querySelector('#emailModal')
let btnSend = document.querySelector('.modalCard button')
let joinText = document.querySelector('#join-text');


function infoSend(){
  const id = generate_uuidv4();
  const fullName = fnameModal.value;
  const email = userMail.value; 

  set(ref(db, 'JoinUs/' + id), {
    FullName: fullName,
    Email: email
  })
  .then(() => {
    Swal.fire({
      icon: 'success',
      text: 'Thank you for joining us!'
    });
    fnameModal.value=""
    userMail.value=""
    joinText.textContent = fullName; 
     
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({
      fullName: fullName,
      email: email
    });
    localStorage.setItem('users', JSON.stringify(users));
  })
  .catch(err => {
    console.error("Firebase error:", err);
  });
 
}

let modal = document.querySelector('.joinModal');
function checkSign() {
  let fnameInput = document.querySelector('#fnameModal');
  let emailInput = document.querySelector('#emailModal');
  const userIcon=document.querySelector('.navbar .d-flex img');

  let hasError = false;

  if (!(emailInput.value.includes("@")) || emailInput.value.trim() === "") {
    emailInput.style.border = "1px solid red";
    hasError = true;
    Swal.fire({
      icon: 'error',
      text: 'Please check your email address!'
    });
  } else {
    emailInput.style.border = "1px solid #CECECE";
  }

  if (!/^[a-zA-Z\s]+$/.test(fnameInput.value.trim())) {
    fnameInput.style.border = "1px solid red";
    hasError = true;
    Swal.fire({
      icon: 'error',
      text: 'Please check your name!'
    });
  } else {
    fnameInput.style.border = "1px solid #CECECE";
  }
  if (!hasError) {
    infoSend(); 
    modal.style.display="none";
    userIcon.style.display="none";
    document.querySelector('.logOut').style.display='block'
  }
}

btnSend.addEventListener('click', checkSign);


function logOut() {
  Swal.fire({
      title: "Are you sure you want to Log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
  }).then((result) => {
      if (result.isConfirmed) {
          userIcon.style.display = "block";
          modal.style.display = "block";
          document.querySelector('.logOut').style.display = 'none';
          joinText.textContent = 'Join us';
      }
  });
}
document.querySelector('.logOut').addEventListener('click', logOut)