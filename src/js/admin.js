let searchBookInput = document.querySelector('.input');
let searchBookbtn = document.querySelector('#searching');
let historyContainer = document.querySelector('.history');

searchBookbtn.addEventListener('click', function () {
    let searchQuery = searchBookInput.value.trim();

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
                                <p><strong>Title:</strong> ${title}</p>
                                <p><strong>Authors:</strong> ${authors}</p>
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
