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

        const booksRef = ref(db, 'books');

        get(booksRef).then((snapshot) => {
            if (snapshot.exists()) {
                const booksData = [];
        
                snapshot.forEach((childSnapshot) => {
                    booksData.push(childSnapshot.val());
                });
        
                const splide = new Splide('.splide', {
                    type: 'loop',
                    perPage: 5,
                    perMove: 1, 
                    gap: `50px`,
                    pagination: false,
                    autoplay: true,
                    breakpoints: {
                      1100:{
                        perPage: 4
                      },
                      920:{
                        perPage: 3,
                        arrows: false,
                      },
                      576:{
                        perPage: 1,
                        arrows: false,
                      }                    }
                }).mount();
        
                function addBooksToSlider() {
                    booksData.forEach((e) => {
                        const authorName = e.author.length > 8 ? e.author.substring(0, 8) + '...' : e.author;
                        const bookName = e.name.length > 15 ? e.name.substring(0, 15) + '...' : e.name;
        
                        const slide = document.createElement('div');
                        slide.classList.add('splide__slide');
                        slide.innerHTML = `
                            <img calss = 'sliderImg' src="${e.image}">
                            <h2 class="bookName">${bookName}</h2>
                            <p class="bookCreator" >${authorName}</p>
                            <button id="readBtn">Read More</button>
                        `;
                        splide.add(slide);
                    });
                }
        
                addBooksToSlider();
        
                document.getElementById('nextBtn').addEventListener('click', () => {
                    splide.go('+1');
                });
        
                document.getElementById('prevBtn').addEventListener('click', () => {
                    splide.go('-1');
                });
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error("Error getting data:", error);
        });
        