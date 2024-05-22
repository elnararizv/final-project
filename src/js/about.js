// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
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
// const analytics = getAnalytics(app);
import { getDatabase, ref, get , onValue} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
const db = getDatabase();
const about=document.querySelector(".about")
  
function aboutData() {
    onValue(ref(db, "aboutInfo/"), (snapshot) => {
      const aboutInfo = snapshot.val();
      if (aboutInfo) {
        console.log(aboutInfo);
        about.innerHTML = `
          <div class="pages">
            <h1>${aboutInfo.Title}</h1>
            <p class="text">${aboutInfo.Description}</p>
          </div>
          <div class="image">
            <img src="${aboutInfo.Image}" alt="">
          </div>`;
      } else {
        console.log("Not found.");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  
aboutData()
