var splide = new Splide( '.splide' );
var bar = splide.root.querySelector( '.my-carousel-progress-bar' );

// Updates the bar width whenever the carousel moves:
splide.on( 'mounted move', function () {
  var end  = splide.Components.Controller.getEnd() + 1;
  var rate = Math.min( ( splide.index + 1 ) / end, 1 );
  bar.style.width = String( 100 * rate ) + '%';
} );

splide.mount();


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import { getDatabase, set, ref, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
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

const searchCard = document.querySelector(".insideCard")
const searchInp = document.querySelector("#inputSearch")
const searchInputButton = document.querySelector(".searchInputButton")


function searchBook() {
    get(ref(db, "books/"))
        .then((data) => {
            const searching = data.val();
            if (searching) {
                Object.values(searching).forEach((el) => {

                    if (el.name.toLowerCase() === searchInp.value.toLowerCase().trim()) {
                        
                        searchCard.innerHTML = `<div>
                                            <img src="${el.image}" alt="" class="search-img">
                                        </div>
                                        <div class="bookText">
                                            <h2>${el.name}</h2>
                                            <h3>${el.author}</h3>
                                            <p>${el.description}</p>
                                        </div>`;
                    }
                });
            } else {
                console.log("Have a problem.");
            }
        })
        .catch((error) => {
            console.log(error);
        });
}
searchBook()
searchInputButton.addEventListener("click", () => {
    const query = searchInp.value.trim();
    if (query) {
        searchBook(query);
    }
});

