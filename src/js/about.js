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
import { getDatabase, ref, get} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
const db = getDatabase();
const about=document.querySelector(".about")

function aboutData() {
    get(ref(db, "aboutInfo/"))
    .then((data) => {
        const aboutInfo = data.val();
        if (aboutInfo) {
            // about.innerHTML = "";
            Object.values(aboutInfo).forEach((el) => {
                console.log(el);
                about.innerHTML += ` 
                <div class="pages">
                    <h1>${el.Title}</h1>
                    <p class="text">${el.Description}</p>
                </div>
                <div class="image">
                    <img src="${el.Image}" alt="">
                </div>`;
            });
        } else {
            console.log("Not found.");
        }
    })
    .catch((error) => {
        console.error(error);
    });
}