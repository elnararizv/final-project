// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import {
  getDatabase,
  set,
  ref,
  get,
  update,
  push,
  child,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

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
  measurementId: "G-WKRXPCNFEL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

const commentInp = document.querySelector("#comment-inp");
const send = document.querySelector("#send-button");
const bookText = document.querySelector(".bookText");
function generate_uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const uuid = (Math.random() * 16) | 0;
    const v = c == "x" ? uuid : (uuid & 0x3) | 0x8;
    return v.toString(16);
  });
}

function CommentSetData() {
  const id = generate_uuidv4();

  set(ref(db, "books/Comment/" + id), {
    Comment: commentInp.value,
    Id: id,
  })
    .then(() => {
      // alert('Data Push');
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
      commentInp.value = "";
      commentInp.placeholder = "Your anonim comment";
    })
    .catch((err) => errorAlert("Error"));
}


send.addEventListener("click", CommentSetData);

const time = new Date();
const day = time.getDate();
const hours = time.getHours();
const minutes = time.getMinutes();
const formattedTime = `${day} ${hours}:${
  minutes < 10 ? "0" + minutes : minutes
}`;

function CommentGetData() {
  get(ref(db, "books/Comment/")).then((data) => {
    const comments = data.val();
    console.log(comments);
    Object.values(comments).forEach((el) => {
      console.log(el);
      bookText.innerHTML += `<li class="book-container">
                    <span class="fw-bold">anonim</span> 
                    <span>${formattedTime}</span>
                    <p>${el.Comment}</p>
                    </li>`;
    });
  });
}

CommentGetData();

const bookId = window.location.search.substring(1)
        const bookInfo = document.querySelector('#section1')
        function BookGetData() {
            get(ref(db, 'books/' + bookId ))
            .then(data => {
                bookInfo.innerHTML =
                `
                <div class="buttons">
        <button class="back">< BACK</button>
      </div>
      <div class="book">
        <div class="div1">
          <h4 class="year">${data.val().date}</h4>
          <h6 class="order">${data.val().name}</h6>
          <h5 class="day">Gelen vaxt</h5>
          <h1 class="text-title">${data.val().author}</h1>
          <p class="text">${data.val().description}</p>
        </div>
        <div class="div2">
          <img class = 'bokImg' src="${data.val().image}"/>
        </div>
                `
            })
        }
        BookGetData()