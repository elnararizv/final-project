// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import {
  getDatabase,
  set,
  ref,
  get,
  onValue
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

const bookId = window.location.search.substring(1);
const currentTime = new Date();
const options = { timeZone: 'Asia/Baku' };
const timestamp = currentTime.toLocaleString('en-US', options);
console.log(timestamp)


function CommentSetData() {
  const commentValue = commentInp.value.trim();
  if (commentValue !== "") {
    const id = generate_uuidv4();
    set(ref(db, "books/" + bookId + "/comments/" + id), {
      Comment: commentValue,
      time: timestamp,
      Id: id
    })
      .then(() => {
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
          title: "Your anonim comment is sent",
        });
        commentInp.value = "";
      })
      .catch(() => {
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
          icon: "error",
          title: "Comment couldn't be sent",
        });
      });
  } else {
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
      icon: "error",
      title: "Please enter a comment",
    });
  }
}
send.addEventListener("click", CommentSetData);


commentInp.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    CommentSetData();
  }
});

function CommentGetData() {
  const bookId = window.location.search.substring(1);
  onValue(ref(db, "books/" + bookId + "/comments/"), (snapshot) => {
    const comments = snapshot.val();
    if (comments) {
      Object.values(comments).forEach((el) => {
        const commentDate = new Date(el.time);
        const currentDate = new Date();
        const oneDay = 24 * 60 * 60 * 1000;
        const timeDiff = Math.abs(currentDate - commentDate);
        const daysDiff = Math.round(timeDiff / oneDay);

        let timeString = "";
        if (daysDiff === 0) {
          timeString = "Today " + commentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (daysDiff === 1) {
          timeString = "Yesterday " + commentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (daysDiff <= 7) {
          timeString = daysDiff + " day(s) ago";
        } else {
          timeString = "Added " + daysDiff / 7 + " week(s) ago";
        }

        bookText.innerHTML += `<li class="book-container">
          <span class="fw-bold">anonim</span>
          <span>${timeString}</span>
          <p>${el.Comment}</p>
          </li>`;
      });
    } else {
      console.log('ERROR')
    }
  });
}


CommentGetData();
const bookInfo = document.querySelector(".book-info");

BookGetData();

function BookGetData() {
  onValue(ref(db, "books/" + bookId), (snapshot) => {
    const data = snapshot.val();
    const bookInfo = document.querySelector(".book-info");

    if (data) {
      const currentDate = new Date();
      const addedDate = new Date(data.addedAt);
      const oneDay = 24 * 60 * 60 * 1000;
      const timeDiff = Math.abs(currentDate - addedDate);
      const daysDiff = Math.floor(timeDiff / oneDay);

      let timeString = "";
      if (daysDiff === 0) {
        timeString = "Today";
      } else if (daysDiff === 1) {
        timeString = "Yesterday";
      } else if (daysDiff <= 7) {
        timeString = daysDiff + " day(s) ago";
      } else {
        timeString = addedDate.toLocaleDateString();
      }

      bookInfo.innerHTML = `
        <div class="book-details">
          <span class="year">${data.date.substring(0, 4)}</span>
          <h1 class="bookName">${data.name}</h1>
          <h4 class="day">${timeString}</h4>
          <h2 class="book-author">${data.author}</h2>
          <p class="description">${data.description}</p>
          <span class="moreDetails">More details</span>
        </div>
        <div class="book-img">
          <img src="${data.image}" alt="">
        </div>
      `;

      const description = document.querySelector(".description");
      const moreDetails = document.querySelector(".moreDetails");
      const shortText = description.textContent.substring(0, 500);
      const fullText = description.textContent;

      description.textContent = shortText;
      moreDetails.textContent = "More Details";

      let isLong = true;
      moreDetails.addEventListener("click", function () {
        if (isLong) {
          description.textContent = fullText;
          moreDetails.textContent = "Hide Details";
        } else {
          description.textContent = shortText;
          moreDetails.textContent = "More Details";
        }
        isLong = !isLong;
      });
    }
  });
}






