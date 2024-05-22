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

//Modal

document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById("myModal");
    var btn = document.querySelector(".formBtn");
    var span = document.getElementsByClassName("close")[0];
    var message = document.getElementById("modalMessage");
    btn.onclick = function () {
        var bookName = document.querySelector(".bookName").value;
        var authorName = document.querySelector(".authorName").value;
        var bookDate = document.querySelector(".bookDate").value;
        var bookImage = document.querySelector(".bookImage").value;
        var bookDesc = document.querySelector(".bookDesc").value;
        var bookType = document.querySelector(".bookType").value;
        message.innerHTML = `
            <strong>Book Name:</strong> ${bookName}<br>
            <strong>Author Name:</strong> ${authorName}<br>
            <strong>Release Date:</strong> ${bookDate}<br>
            <strong>Book Image URL:</strong> ${bookImage}<br>
            <strong>Description:</strong> ${bookDesc}<br>
            <strong>Book Type:</strong> ${bookType}
        `;
        modal.style.display = "block";
    }
    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

