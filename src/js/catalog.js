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
    
        const splide1 = new Splide('#splide1', {
            type: 'loop',
            perPage: 5,
            perMove: 1, 
            gap: '50px',
            pagination: false,
            autoplay: true,
            interval: 1000,
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
              }
            }
        }).mount();

        function addBooksToSlider() {
            booksData.forEach((e) => {
                const authorName = e.author.length > 8 ? e.author.substring(0, 8) + '...' : e.author;
                const bookName = e.name.length > 15 ? e.name.substring(0, 15) + '...' : e.name;
                const imageUrl = e.image === "No image available" ? '../assets/images/51FWyuIPvAL._AC_UF1000,1000_QL80_.jpg' : e.image;

                const slide = document.createElement('div');
                slide.classList.add('splide__slide');
                slide.innerHTML = `
                    <img class='sliderImg' src="${imageUrl}">
                    <h2 class="bookName">${bookName}</h2>
                    <p class="bookCreator">${authorName}</p>
                    <button id="readBtn"><a href="../pages/book.html?${e.id}">Read more</a></button>
                `;
                splide1.add(slide);

                loader1.style.display = 'none'
            });
            


        }

        addBooksToSlider();

    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error("Error getting data:", error);
});


//-------------------------- Splide2


get(booksRef).then((snapshot) => {
   if (snapshot.exists()) {
       const booksData = [];

       snapshot.forEach((childSnapshot) => {
           const book = childSnapshot.val();
           if (book.category === "Best Seller") {
               booksData.push(book);
           }
       });

       const splide2 = new Splide('#splide2', {
           type: 'loop',
           perPage: 5,
           perMove: 1, 
           gap: '50px',
           pagination: false,
           autoplay: true,
           interval: 1000,
           breakpoints: {
               1100: {
                   perPage: 4
               },
               920: {
                   perPage: 3,
                   arrows: false,
               },
               576: {
                   perPage: 1,
                   arrows: false,
               }
           }
       }).mount();

       function addBooksToSlider() {
           booksData.forEach((e) => {
               const authorName = e.author.length > 8 ? e.author.substring(0, 8) + '...' : e.author;
               const bookName = e.name.length > 15 ? e.name.substring(0, 15) + '...' : e.name;
               const imageUrl = e.image === "No image available" ? '../assets/images/51FWyuIPvAL._AC_UF1000,1000_QL80_.jpg' : e.image;

               const slide = document.createElement('div');
               slide.classList.add('splide__slide');
               slide.innerHTML = `
                   <img class="sliderImg" src="${imageUrl}">
                   <h2 class="bookName">${bookName}</h2>
                   <p class="bookCreator">${authorName}</p>
                   <button id="readBtn"><a href="../pages/book.html?${e.id}">Read more</a></button>
               `;
               splide2.add(slide);
               loader2.style.display = 'none'

           });
       }

       addBooksToSlider();

   } else {
       console.log("No data available");
   }
}).catch((error) => {
   console.error("Error getting data:", error);
});

//---------------------------------- Splide3


get(booksRef).then((snapshot) => {
   if (snapshot.exists()) {
       const booksData = [];

       snapshot.forEach((childSnapshot) => {
           const book = childSnapshot.val();
           if (book.category === "New Realiese") {
               booksData.push(book);
           }
       });

       const splide3 = new Splide('#splide3', {
           type: 'loop',
           perPage: 5,
           perMove: 1, 
           gap: '50px',
           pagination: false,
           autoplay: true,
           interval: 1000,
           breakpoints: {
               1100: {
                   perPage: 4
               },
               920: {
                   perPage: 3,
                   arrows: false,
               },
               576: {
                   perPage: 1,
                   arrows: false,
               }
           }
       }).mount();

       function addBooksToSlider() {
           booksData.forEach((e) => {
               const authorName = e.author.length > 8 ? e.author.substring(0, 8) + '...' : e.author;
               const bookName = e.name.length > 15 ? e.name.substring(0, 15) + '...' : e.name;
               const imageUrl = e.image === "No image available" ? '../assets/images/51FWyuIPvAL._AC_UF1000,1000_QL80_.jpg' : e.image;

               const slide = document.createElement('div');
               slide.classList.add('splide__slide');
               slide.innerHTML = `
                   <div class="newP">
                   <button class="newBtn">NEW</button>
                   </div> 
                   <img class="sliderImg" src="${imageUrl}">
                   <h2 class="bookName">${bookName}</h2>
                   <p class="bookCreator">${authorName}</p>
                   <button id="readBtn"><a href="../pages/book.html?${e.id}">Read more</a></button>
               `;
               splide3.add(slide);
               loader3.style.display = 'none'

           });
       }

       addBooksToSlider();

   } else {
       console.log("No data available");
   }
}).catch((error) => {
   console.error("Error getting data:", error);
});


const fantasticBtn = document.querySelector('#fantastic')
const poemsBtn = document.querySelector('#poems')
const dedectiveBtn = document.querySelector('#dedective')
const kidsBtn = document.querySelector('#kids')


function FantasitcGetData() {
    splide1.style.display = 'none'
    splide5.style.display = 'none'
    splide6.style.display = 'none'
    splide7.style.display = 'none'


    get(booksRef).then((snapshot) => {
        if (snapshot.exists()) {
            const booksData = [];
     
            snapshot.forEach((childSnapshot) => {
                const book = childSnapshot.val();
                if (book.type === "fantastic") {
                    booksData.push(book);
                }
            });
     
            const splide4 = new Splide('#splide4', {
                type: 'loop',
                perPage: 5,
                perMove: 1, 
                gap: '50px',
                pagination: false,
                autoplay: true,
                interval: 1000,
                breakpoints: {
                    1100: {
                        perPage: 4
                    },
                    920: {
                        perPage: 3,
                        arrows: false,
                    },
                    576: {
                        perPage: 1,
                        arrows: false,
                    }
                }
            }).mount();
     
            function addBooksToSlider() {
                booksData.forEach((e) => {
                    const authorName = e.author.length > 8 ? e.author.substring(0, 8) + '...' : e.author;
                    const bookName = e.name.length > 15 ? e.name.substring(0, 15) + '...' : e.name;
                    const imageUrl = e.image === "No image available" ? '../assets/images/51FWyuIPvAL._AC_UF1000,1000_QL80_.jpg' : e.image;
     
                    const slide = document.createElement('div');
                    slide.classList.add('splide__slide');
                    slide.innerHTML = `
                        <button id = 'janr' class="newBtn">Fantastic</button>
                        <img class="sliderImg" src="${imageUrl}">
                        <h2 class="bookName">${bookName}</h2>
                        <p class="bookCreator">${authorName}</p>
                        <button id="readBtn"><a href="../pages/book.html?${e.id}">Read more</a></button>
                    `;
                    splide4.add(slide);
                    
        
                });
            }
     
            addBooksToSlider();
     
        } else {
            console.log("No data available");
        }
     }).catch((error) => {
        console.error("Error getting data:", error);
     });
     
}

fantasticBtn.addEventListener('click', FantasitcGetData)



function PoemsGetData() {
    splide1.style.display = 'none'
    splide4.style.display = 'none'
    splide6.style.display = 'none'
    splide7.style.display = 'none'

    get(booksRef).then((snapshot) => {
        if (snapshot.exists()) {
            const booksData = [];
     
            snapshot.forEach((childSnapshot) => {
                const book = childSnapshot.val();
                if (book.type === "poems") {
                    booksData.push(book);
                }
            });
     
            const splide5 = new Splide('#splide5', {
                type: 'loop',
                perPage: 5,
                perMove: 1, 
                gap: '50px',
                pagination: false,
                autoplay: true,
                interval: 1000,
                breakpoints: {
                    1100: {
                        perPage: 4
                    },
                    920: {
                        perPage: 3,
                        arrows: false,
                    },
                    576: {
                        perPage: 1,
                        arrows: false,
                    }
                }
            }).mount();
     
            function addBooksToSlider() {
                booksData.forEach((e) => {
                    const authorName = e.author.length > 8 ? e.author.substring(0, 8) + '...' : e.author;
                    const bookName = e.name.length > 15 ? e.name.substring(0, 15) + '...' : e.name;
                    const imageUrl = e.image === "No image available" ? '../assets/images/51FWyuIPvAL._AC_UF1000,1000_QL80_.jpg' : e.image;
     
                    const slide = document.createElement('div');
                    slide.classList.add('splide__slide');
                    slide.innerHTML = `
                        <button id = 'janr' class="newBtn">Poems</button>
                        <img class="sliderImg" src="${imageUrl}">
                        <h2 class="bookName">${bookName}</h2>
                        <p class="bookCreator">${authorName}</p>
                        <button id="readBtn"><a href="../pages/book.html?${e.id}">Read more</a></button>
                    `;
                    splide5.add(slide);

                });
            }
     
            addBooksToSlider();
     
        } else {
            console.log("No data available");
        }
     }).catch((error) => {
        console.error("Error getting data:", error);
     });
     
}


poemsBtn.addEventListener('click', PoemsGetData)

function DetectiveGetData() {
    splide1.style.display = 'none'
    splide4.style.display = 'none'
    splide5.style.display = 'none'
    splide7.style.display = 'none'


    get(booksRef).then((snapshot) => {
        if (snapshot.exists()) {
            const booksData = [];
     
            snapshot.forEach((childSnapshot) => {
                const book = childSnapshot.val();
                if (book.type === "detective") {
                    booksData.push(book);
                }
            });
     
            const splide6 = new Splide('#splide6', {
                type: 'loop',
                perPage: 5,
                perMove: 1, 
                gap: '50px',
                pagination: false,
                autoplay: true,
                interval: 1000,
                breakpoints: {
                    1100: {
                        perPage: 4
                    },
                    920: {
                        perPage: 3,
                        arrows: false,
                    },
                    576: {
                        perPage: 1,
                        arrows: false,
                    }
                }
            }).mount();
     
            function addBooksToSlider() {
                booksData.forEach((e) => {
                    const authorName = e.author.length > 8 ? e.author.substring(0, 8) + '...' : e.author;
                    const bookName = e.name.length > 15 ? e.name.substring(0, 15) + '...' : e.name;
                    const imageUrl = e.image === "No image available" ? '../assets/images/51FWyuIPvAL._AC_UF1000,1000_QL80_.jpg' : e.image;
     
                    const slide = document.createElement('div');
                    slide.classList.add('splide__slide');
                    slide.innerHTML = `
                        <button id = 'janr' class="newBtn">Detective</button>
                        <img class="sliderImg" src="${imageUrl}">
                        <h2 class="bookName">${bookName}</h2>
                        <p class="bookCreator">${authorName}</p>
                        <button id="readBtn"><a href="../pages/book.html?${e.id}">Read more</a></button>
                    `;
                    splide6.add(slide);

                });
            }
     
            addBooksToSlider();
     
        } else {
            console.log("No data available");
        }
     }).catch((error) => {
        console.error("Error getting data:", error);
     });
     
}


dedectiveBtn.addEventListener('click', DetectiveGetData)

function ForKidsGetData() {
    splide1.style.display = 'none'
    splide4.style.display = 'none'
    splide5.style.display = 'none'
    splide6.style.display = 'none'


    get(booksRef).then((snapshot) => {
        if (snapshot.exists()) {
            const booksData = [];
     
            snapshot.forEach((childSnapshot) => {
                const book = childSnapshot.val();
                if (book.type === "for kids") {
                    booksData.push(book);
                }
            });
     
            const splide7 = new Splide('#splide7', {
                type: 'loop',
                perPage: 5,
                perMove: 1, 
                gap: '50px',
                pagination: false,
                autoplay: true,
                interval: 1000,
                breakpoints: {
                    1100: {
                        perPage: 4
                    },
                    920: {
                        perPage: 3,
                        arrows: false,
                    },
                    576: {
                        perPage: 1,
                        arrows: false,
                    }
                }
            }).mount();
     
            function addBooksToSlider() {
                booksData.forEach((e) => {
                    const authorName = e.author.length > 8 ? e.author.substring(0, 8) + '...' : e.author;
                    const bookName = e.name.length > 15 ? e.name.substring(0, 15) + '...' : e.name;
                    const imageUrl = e.image === "No image available" ? '../assets/images/51FWyuIPvAL._AC_UF1000,1000_QL80_.jpg' : e.image;
     
                    const slide = document.createElement('div');
                    slide.classList.add('splide__slide');
                    slide.innerHTML = `
                        <button id = 'janr' class="newBtn">For Kids</button>
                        <img class="sliderImg" src="${imageUrl}">
                        <h2 class="bookName">${bookName}</h2>
                        <p class="bookCreator">${authorName}</p>
                        <button id="readBtn"><a href="../pages/book.html?${e.id}">Read more</a></button>
                    `;
                    splide7.add(slide);

                });
            }
                 addBooksToSlider();
        } else {
            console.log("No data available");
        }
     }).catch((error) => {
        console.error("Error getting data:", error);
     });
     
}


kidsBtn.addEventListener('click', ForKidsGetData)



const allBtn = document.querySelector('.allBtn');

function allBtnFun() {
    const splides = document.querySelectorAll('.splide');
    splides.forEach(splide => {
        splide4.style.display = 'none';
        splide5.style.display = 'none';
        splide6.style.display = 'none';
        splide7.style.display = 'none';

    });
    const splide1 = document.querySelector('#splide1');
    if (splide1) {
        splide1.style.display = 'block';
    }
}

allBtn.addEventListener('click', allBtnFun);





const loader1 = document.querySelector('#load1')
const loader2 = document.querySelector('#load2')
const loader3 = document.querySelector('#load3')


