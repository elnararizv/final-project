// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Your web app's Firebase configuration
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

const searchCard = document.querySelector(".carousel-inner");
const searchInp = document.querySelector("#inputSearch");
const searchInputButton = document.querySelector("#searchBtn");

function searchBook(query) {
    get(ref(db, "books/"))
        .then((data) => {
            const searching = data.val();
            if (searching) {
                let found = false;
                searchCard.innerHTML = '';  // Clear previous results
                let isActive = true;  // Set the first item as active
                Object.values(searching).forEach((el) => {
                    if (el.name.toLowerCase().includes(query.toLowerCase())) {
                        searchCard.innerHTML += 
                        `
                        <div class="carousel-item ${isActive ? 'active' : ''}">
                            <div  class="card mx-auto" style="display: flex;padding: 60px 30px; width: 750px; height: 500px; background: #FFFFFF; box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25); border-radius: 8px;">
                                <div style="display:flex" >
                                <img src="${el.image}" alt="${el.name}" class="search-img" style="width: 200px; height: 300px; border-radius: 8px 0 0 8px; object-fit: cover;">
                                <div class="card-body" style="padding: 20px; display: flex; flex-direction: column; justify-content: center; text-align: left;">
                                    <h2 class="card-title" style="margin: 0 0 10px; color: #241400;">${el.name}</h2>
                                    <h3 class="card-subtitle mb-2 text-muted" style="margin: 0 0 10px; color: #4b4137;">${el.author}</h3>
                                    <p class="card-text" style="margin: 0 0 10px; color: #120a00; white-space: wrap; overflow: hidden; width: 90%; font-size: 14px; ">${el.description}</p>
                                </div></div>
                            </div>
                        </div>
                        `;
                        isActive = false;
                        found = true;
                    }
                });
                if (!found) {
                    searchCard.innerHTML = "<p class='text-center'>No results found</p>";
                }
            } else {
                console.log("No data available.");
            }
        })
        .catch((error) => {
            console.log(error);
        });
}


searchInputButton.addEventListener("click", () => {
    const query = searchInp.value.trim();
    if (query) {
        searchBook(query);
    }
});