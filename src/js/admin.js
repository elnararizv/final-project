let searchBookInput = document.querySelector('.input');
let searchBookbtn = document.querySelector('#searching');
let historyContainer = document.querySelector('.history');

searchBookbtn.addEventListener('click', function () {
    let searchQuery = searchBookInput.value.trim();

    historyContainer.style.display = 'block'

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
            historyContainer.innerHTML = '';

            if (data.items && data.items.length > 0) {
                data.items.forEach(item => {
                    const volumeInfo = item.volumeInfo;
                    const title = volumeInfo.title || 'No title available';
                    const authors = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'No authors available';

                    const bookElement = document.createElement('div');
                    bookElement.classList.add('book-info');
                    bookElement.innerHTML = `
                                <p style="cursor: pointer;"><strong>Title:</strong> ${title}</p>
                            `;

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

function generate_uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
        function (c) {
            const uuid = Math.random() * 16 | 0;
            const v = c == 'x' ? uuid : (uuid & 0x3 | 0x8);
            return v.toString(16);
        });
}

let bookform = document.querySelector('.book-form');
let aboutStore = document.querySelector('.about-store');
let joinUs = document.querySelector('.join-us');
let books = document.querySelector('.books');
let contactUs = document.querySelector('.contact-us');
let header = document.querySelector('.header')
let info = document.querySelector('.info')

document.addEventListener("DOMContentLoaded", function() {
    var burgerMenu = document.querySelector(".burger-menu");
    var sidebar = document.querySelector(".sidebar");

    burgerMenu.addEventListener("click", function() {
        sidebar.classList.toggle("show-sidebar");
        
        if (sidebar.classList.contains("show-sidebar")) {
            bookform.style.display = "none";
            aboutStore.style.display = "none";
            joinUs.style.display = "none";
            books.style.display = "none";
            contactUs.style.display = "none";
            header.style.display = "none";
            info.style.display = "none";

        } else {
            bookform.style.display = "block";
            aboutStore.style.display = "block";
            joinUs.style.display = "block";
            books.style.display = "block";
            contactUs.style.display = "block";
            header.style.display = "block";
            info.style.display = "block";
        }
    });
});

