// Navbar menunun acilib baglanmasi ucun
function toggleMenu() {

  let menu = document.querySelector('.menuRespons');
  if (window.innerWidth > 767) {
    menu.classList.add('d-none');
  } else {
    menu.classList.remove('d-none');
  }
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
  menu.classList.add('d-none');
  // Slider yeniden gorunur olsun
  const mySlider1 = document.querySelector('#mySlider1')
  const mySlider2 = document.querySelector('#mySlider2')
  const mySlider3 = document.querySelector('#mySlider3')
  mySlider1.style.display = 'inline-block'
  mySlider2.style.display = 'inline-block'
  mySlider3.style.display = 'inline-block'

}


// Join Us modalinin acilib baglanmasi
function openModal() {
  let modal = document.querySelector('.joinModal');
  modal.classList.remove('d-none');
  // modal acilanda slider gorunmesin
  const mySlider1 = document.querySelector('#mySlider1')
  const mySlider2 = document.querySelector('#mySlider2')
  const mySlider3 = document.querySelector('#mySlider3')
  mySlider1.style.display = 'none'
  mySlider2.style.display = 'none'
  mySlider3.style.display = 'none'
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
    // profileName.textContent=fnameInput.value
  }
}

function generate_uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
      function (c) {
          const uuid = Math.random() * 16 | 0;
          const v = c == 'x' ? uuid : (uuid & 0x3 | 0x8);
          return v.toString(16);
      });
}