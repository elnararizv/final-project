// Navbar menunun acilib baglanmasi ucun
function toggleMenu() {
  var menu = document.querySelector('.menuRespons');
  if (window.innerWidth > 767) {
    menu.classList.add('d-none');
  } else {
    menu.classList.remove('d-none');
  }
}

function closeMenu() {
  var menu = document.querySelector('.menuRespons');
  menu.classList.add('d-none');
}

// Join Us modalinin acilib baglanmasi
function openModal() {
  var modal = document.querySelector('.joinModal');
  modal.classList.remove('d-none');
}

function closeModal() {
  var modal = document.querySelector('.joinModal');
  modal.classList.add('d-none');
}

//  User Join eden zaman input valuelari yoxlayir
function checkSign() {
  let profileName=document.querySelector('#join-text')
  let fnameInput = document.querySelector('#fnameModal');
  let emailInput = document.querySelector('#emailModal');

  let hasError = false;

  if (!(emailInput.value.includes("@")) || emailInput.value.trim() === "") {
    emailInput.style.border = "1px solid red";
    hasError = true;
    Swal.fire({
      icon: 'error',
      text: 'Please check your email address!'
    });
  } else {
    emailInput.style.border = "1px solid #CECECE";
  }

  if (!/^[a-zA-Z\s]+$/.test(fnameInput.value.trim())) {
    fnameInput.style.border = "1px solid red";
    hasError = true;
    Swal.fire({
      icon: 'error',
      text: 'Please check your name!'
    });
  } else {
    fnameInput.style.border = "1px solid #CECECE";
  }

  // Her sey okeydise:
  if (!hasError) {
    // Başqa elave edilecekler
    Swal.fire({
      icon: 'success',
      text: 'Thank you for joining us!'
    });
    profileName.textContent=fnameInput.value
  }
}
