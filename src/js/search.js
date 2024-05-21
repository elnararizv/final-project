import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

const searchCard = document.querySelector(".carousel-inner");
const searchInp = document.querySelector("#inputSearch");
const searchInputButton = document.querySelector("#searchBtn");
const nextBtn = document.querySelector("#nex");
const prevBtn = document.querySelector("#pre");
//---------------
function searchBook(query) {
  get(ref(db, "books/"))
    .then((data) => {
      const searching = data.val();
      if (searching) {
        let found = false;
        searchCard.innerHTML = "";
        let isActive = true;
        Object.values(searching).forEach((el) => {
          if (el.name.toLowerCase().includes(query.toLowerCase())) {
            searchCard.innerHTML += `
                          <div class="carousel-item ${
                            isActive ? "active" : ""
                          }">
                              <div class="card mx-auto">
                                  <img src="${el.image}" alt="${el.name}" class="search-img">
                                  <div class="card-body">
                                      <h2 class="card-title">${el.name}</h2>
                                      <h3 class="card-subtitle mb-2 text-muted">${
                                        el.author
                                      }</h3>
                                      <p class="card-text">${el.description}</p>
                                  </div>
                              </div>
                          </div>
                          `;
            isActive = false;
            found = true;
          }
        });
        if (!found) {
          searchCard.innerHTML = "<p class='text-center'>No results found</p>";
          nextBtn.style.display = "none";
          prevBtn.style.display = "none";
        } else {
          nextBtn.style.display = "inline-block";
          prevBtn.style.display = "inline-block";
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
    setTimeout(()=>{
      // nextBtn.style.display = "inline-block";
      // prevBtn.style.display = "inline-block";
  
    },1000) 

  } else {
    nextBtn.style.display = "none";
    prevBtn.style.display = "none";
  }
});

searchInp.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchInputButton.click();
  }
});
