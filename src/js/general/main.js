// Navbar menunun acilib baglanmasi ucun
function toggleMenu() {
  let menu = document.querySelector('.menuRespons'); 
  menu.classList.add('show');
  // Slider gorunmesin
  const mySlider1 = document.querySelector('#mySlider1')
  const mySlider2 = document.querySelector('#mySlider2')
  const mySlider3 = document.querySelector('#mySlider3')
  mySlider1.style.display = 'none'
  mySlider2.style.display = 'none'
  mySlider3.style.display = 'none'

}

function closeMenu() {
  let menu = document.querySelector('.menuRespons');
    menu.classList.remove('show');

}


// Join Us modalinin acilib baglanmasi
function openModal() {
  let modal = document.querySelector('.joinModal');
  modal.classList.remove('d-none');

}

function closeModal() {
  let modal = document.querySelector('.joinModal');
  modal.classList.add('d-none');
  // Modal baglananda slider yeniden gorunsun
  const mySlider1 = document.querySelector('#mySlider1')
  const mySlider2 = document.querySelector('#mySlider2')
  const mySlider3 = document.querySelector('#mySlider3')
  mySlider1.style.display = 'inline-block'
  mySlider2.style.display = 'inline-block'
  mySlider3.style.display = 'inline-block'
}


function generate_uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
      function (c) {
          const uuid = Math.random() * 16 | 0;
          const v = c == 'x' ? uuid : (uuid & 0x3 | 0x8);
          return v.toString(16);
      });
}