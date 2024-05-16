//----------------------------------------- Slider Function 

const mySlider1 = new Splide('#mySlider1',{
    type   : 'loop',
    gap: `30px`,
    perPage: 5,
    perMove: 1,
    pagination: false,
    breakpoints:{
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
  })
  
  
  mySlider1.mount()
  
  const mySlider2 = new Splide('#mySlider2',{
    type   : 'loop',
    gap: `30px`,
    perPage: 5,
    perMove: 1,
    pagination: false,
    breakpoints:{
      1100:{
        perPage: 4
      },
      920:{
        arrows: false,
        perPage: 3,
      },
      576:{
        perPage: 1,
        arrows: false,
      }
    }
  })
  
  
  mySlider2.mount()
  
  const mySlider3 = new Splide('#mySlider3',{
    type   : 'loop',
    gap: `30px`,
    perPage: 5,
    perMove: 1,
    pagination: false,
    breakpoints:{
      1100:{
        perPage: 4
      },
      920:{
        arrows: false,
        perPage: 3,
      },
      576:{
        perPage: 1,
        arrows: false,
      }
    }
  })
  
  
  mySlider3.mount()
  
  //-----------------------------------------