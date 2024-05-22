let menu = document.querySelector('.menuRespons'); 
menu.classList.remove('d-none')
// Navbar menunun acilib baglanmasi ucun
function toggleMenu() {
  menu.classList.add('show');

}
function closeMenu() {
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
}

// Firebase de random olaraq Id getirir

function generate_uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
      function (c) {
          const uuid = Math.random() * 16 | 0;
          const v = c == 'x' ? uuid : (uuid & 0x3 | 0x8);
          return v.toString(16);
      });
}