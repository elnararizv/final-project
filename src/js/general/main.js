function toggleMenu() {
    var menu = document.querySelector('.menuRespons');
    if (window.innerWidth > 767) {
      menu.classList.add('d-none');
  } else {
      menu.classList.remove('d-none');
  }
    // menu.classList.remove('d-none');
}

function closeMenu(){
    var menu = document.querySelector('.menuRespons');
    menu.classList.add('d-none');
  }
  function openModal() {
    var modal = document.querySelector('.joinModal');
    modal.classList.remove('d-none');
}

  function closeModal(){
    var modal = document.querySelector('.joinModal');
    modal.classList.add('d-none');
  }

