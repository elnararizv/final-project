// FireBase Setup------------------------------------------------------
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getDatabase, set, ref, get, child, remove , onValue} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

//Firebase configuration
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
const auth = getAuth(app);
const db = getDatabase(app);

// Generate a UUID (version 4)
function generate_uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Login functionality
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('.login-form');
    const usernameInput = document.querySelector('input[type="text"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const button = document.querySelector('.adminJoin');
    const login = document.querySelector('.admin-login');
    const dashboard = document.querySelector('.panel');

    button.addEventListener('click', function (event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        signInWithEmailAndPassword(auth, username, password)
            .then(() => {
                login.style.display = 'none';
                dashboard.style.display = 'block';
                dashboard.style.display = 'flex';
            })
            .catch(() => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                });
                Toast.fire({
                    icon: "error",
                    title: "Invalid username or password"
                })
            });
    });

    passwordInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            button.click();
        }
    });
});

// Add Book functionality
document.addEventListener("DOMContentLoaded", function () {
    const booknameInp = document.querySelector(".bookName");
    const authorInp = document.querySelector(".authorName");
    const bookDate = document.querySelector(".bookDate");
    const bookimgInp = document.querySelector(".bookImage");
    const descriptInp = document.querySelector(".bookDesc");
    const bookType = document.querySelector(".bookType");
    const addBtn = document.querySelector(".formBtn");
    const bookCat = document.querySelector("#bookCat");
    const bookTable = document.querySelector("#bookTable tbody");

    function truncateDescription(description, wordLimit) {
        const words = description.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return description;
    }

    function sendBooks() {
        const id = generate_uuidv4();
        const timestamp = new Date().toISOString();

        set(ref(db, "books/" + id), {
            name: booknameInp.value,
            author: authorInp.value,
            date: bookDate.value,
            image: bookimgInp.value,
            description: descriptInp.value,
            type: bookType.value,
            id: id,
            category: bookCat.value,
            addedAt: timestamp
        })
            .then(() => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                });
                Toast.fire({
                    icon: "success",
                    title: "Book added successfully"
                });
                fetchBooks();
            })
            .catch((err) => console.log("Error adding book: " + err));

        function clearInputAndHistory() {
            // Clear input values
            searchBookInput.value = '';
            booknameInp.value = '';
            authorInp.value = '';
            bookDate.value = '';
            bookimgInp.value = '';
            descriptInp.value = '';
            bookType.value = '';

            // Hide history
            historyContainer.innerHTML = '';
            historyContainer.style.display = 'none';
        }
        clearInputAndHistory()
    }



    function fetchBooks() {
        const dbRef = ref(db, 'books/');
        onValue(dbRef, (snapshot) => {
            if (snapshot.exists()) {
                const books = snapshot.val();
                bookTable.innerHTML = "";
                Object.keys(books).forEach((key, index) => {
                    const book = books[key];
                    const row = bookTable.insertRow();
                    row.insertCell(0).textContent = index + 1;
                    const imgCell = row.insertCell(1);
                    const img = document.createElement("img");
                    img.src = book.image;
                    img.alt = book.name;
                    imgCell.appendChild(img);
                    row.insertCell(2).textContent = book.name;
                    row.insertCell(3).textContent = truncateDescription(book.description, 30);
                    row.insertCell(4).textContent = book.category;
                    row.insertCell(5).textContent = book.author;
                    const removeCell = row.insertCell(6);
                    const removeButton = document.createElement("button");
                    removeButton.textContent = "Remove";
                    removeButton.classList.add("remove-button");
                    removeButton.addEventListener("click", function () {
                        removeBook(book.id);
                    });
                    removeCell.appendChild(removeButton);
                });
            } else {
                bookTable.innerHTML = "<tr><td colspan='7'>No books available</td></tr>";
            }
        }, (error) => {
            console.error(error);
        });
    }
    

    function removeBook(id) {
        remove(ref(db, 'books/' + id))
            .then(() => {
                alert("Book removed successfully");
                fetchBooks();
            })
            .catch((error) => {
                alert("Error removing book: " + error);
            });
    }

    addBtn.addEventListener('click', function (event) {
        event.preventDefault();
        sendBooks();
    });

    // Fetch books when the page loads
    fetchBooks();
});

// Add About Info 
document.addEventListener("DOMContentLoaded", function () {
    const titleInp = document.querySelector('.bookTitle');
    const imgInp = document.querySelector('.userMail');
    const descripInp = document.querySelector('.aboutDesc');
    const aboutBtn = document.querySelector('.aboutBtn');

    aboutBtn.addEventListener('click', function () {
        const title = titleInp.value.trim();
        const imgUrl = imgInp.value.trim();
        const description = descripInp.value.trim();

        addAboutInfo(title, imgUrl, description);
    });


    function addAboutInfo(title, imgUrl, description) {
        const id = generate_uuidv4();
        set(ref(db, 'aboutInfo/' + id), {
            Title: title,
            Image: imgUrl,
            Description: description,
        })
            .then(() => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                });
                Toast.fire({
                    icon: "success",
                    title: "About information changed"
                });
                titleInp.value = '';
                imgInp.value = '';
                descripInp.value = '';
            })
            .catch((error) => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                });
                Toast.fire({
                    icon: "error",
                    title: "Opss! Have a problem!!"
                });
            });
    }
});


//Google Api++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const searchBookInput = document.querySelector('.search-input')
const searchBookbtn = document.querySelector('.src-btn')
const historyContainer = document.querySelector('.history')

searchBookbtn.addEventListener('click', function () {
    let searchQuery = searchBookInput.value.trim();
    historyContainer.style.display = 'block';
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
            historyContainer.innerHTML = '';
            if (data.items && data.items.length > 0) {
                data.items.forEach(item => {
                    const volumeInfo = item.volumeInfo;
                    const title = volumeInfo.title || 'No title available';
                    const authors = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'No authors available';
                    const description = volumeInfo.description || 'No description available';
                    const imageLink = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : 'No image available';
                    const categories = volumeInfo.categories ? volumeInfo.categories.join(', ') : 'No categories available';
                    const bookElement = document.createElement('div');
                    bookElement.classList.add('book-info');
                    bookElement.innerHTML = `
                        <div class="book-info">
                            <img src="${imageLink}" alt="Book Cover">
                            <div>
                            <p><strong>Title:</strong> ${title}</p>
                            <p><strong>Author:</strong> ${authors}</p>
                            </div>
                        </div> `;

                    bookElement.addEventListener('click', function () {
                        document.querySelector('.bookName').value = title;
                        document.querySelector('.authorName').value = authors;
                        document.querySelector('.bookDate').value = volumeInfo.publishedDate;
                        document.querySelector('.bookImage').value = imageLink;
                        document.querySelector('.bookDesc').value = description;
                        document.querySelector('.bookType').value = categories;

                    });
                    historyContainer.appendChild(bookElement);
                });
                historyContainer.classList.remove('overflow');
            } else {
                historyContainer.innerHTML = '<p>No books found.</p>';
                historyContainer.classList.add('overflow');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});




// Burger Menu +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
document.addEventListener('DOMContentLoaded', function () {
    const contentDash = document.querySelector('.content')
    const bookForm = document.querySelector('.book-form')
    const aboutStore = document.querySelector('.about-store')
    const dashTables = document.querySelector('.dash-table')
    const sidebar = document.getElementById('sidebar')
    const burgerMenu = document.getElementById('burgerMenu')
    const burgerClose = document.querySelector('.burger-close')
    const mobileLogo = document.querySelector('.mobile-logo')

    burgerClose.style.display = 'none';

    burgerMenu.addEventListener('click', function () {
        sidebar.style.display = 'block'
        burgerMenu.style.display = 'none'
        burgerClose.style.display = 'block'
        contentDash.style.display = 'none'
        bookForm.style.display = 'none'
        aboutStore.style.display = 'none'
        dashTables.style.display = 'none'
        mobileLogo.style.display = 'none'
    });

    burgerClose.addEventListener('click', function () {
        sidebar.style.display = 'none'
        burgerMenu.style.display = 'block'
        burgerClose.style.display = 'none'
        contentDash.style.display = 'block'
        bookForm.style.display = 'block'
        aboutStore.style.display = 'block'
        dashTables.style.display = 'block'
        mobileLogo.style.display = 'block'
    });

});
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Sidebar Scroll 
document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll('.menu li a');
    const logoutBtn = document.querySelector('a[href="#logout"]');

    menuItems.forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                smoothScrollTo(targetElement);
            }
        });
    });

    logoutBtn.addEventListener('click', function (event) {
        event.preventDefault();
        location.reload();
    });

    function smoothScrollTo(target) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        window.requestAnimationFrame(step);

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            window.scrollTo(0, easeInOutQuad(progress, startPosition, distance, duration));
            if (progress < duration) window.requestAnimationFrame(step);
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const sidebarLinks = document.querySelectorAll('.menu a');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});


//Join Us
const joinTable = document.querySelector("#joinUsTable tbody")

function sendUser() {
    const dbRef = ref(db, "JoinUs/");
    onValue(dbRef, (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
            joinTable.innerHTML = '';
            Object.values(userData).forEach((user, index) => {
                joinTable.innerHTML += `<tr>
                                            <td>${index + 1}</td>
                                            <td>${user.FullName}</td>
                                            <td>${user.Email}</td>
                                        </tr>`;
            });
        } else {
            console.log("No users found.");
        }
    }, (error) => {
        console.error("Error getting users:", error);
    });
}

sendUser()



//Contact Us 
const contactUs = document.querySelector('#contactUs')
function ContactUsData() {
    const dbRef = ref(db, 'ContactUs/');
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            contactUs.innerHTML = '';
            Object.values(data).forEach((user, index) => {
                contactUs.innerHTML +=
                    `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${user.Name}</td>
                        <td>${user.Adress}</td>
                        <td>${user.Email}</td>
                        <td>${user.Phone}</td>
                    </tr>
                    `;
            });
        } else {
            console.log('No Data');
        }
    }, (err) => {
        alert(err);
    });
}

ContactUsData()
///////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('.login-form');
    const usernameInput = document.querySelector('input[type="text"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const button = document.querySelector('.adminJoin');
    const login = document.querySelector('.admin-login');
    const dashboard = document.querySelector('.panel');
    const adminText = document.querySelector('.admin-text'); // Get the admin-text element

    button.addEventListener('click', function (event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        signInWithEmailAndPassword(auth, username, password)
            .then(() => {
                login.style.display = 'none';
                dashboard.style.display = 'block';
                dashboard.style.display = 'flex';
                let displayName = username.split('@')[0];
                displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
                adminText.textContent = displayName;
            })
            .catch(() => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                });
                Toast.fire({
                    icon: "error",
                    title: "Invalid password or username"
                });
            });
    });

    passwordInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            button.click();
        }
    });
});


   




