// script for social circle show and hide

const socialBtnOpen = document.getElementById('social-open')

const socialCircleContainer = document.querySelector('.social-circle-container')

const socialBtnClose = document.getElementById('social-close')

const upperCircle = document.querySelector('.upper-circle')

socialBtnOpen.addEventListener('click', function(){

    socialCircleContainer.classList.add('show-circle-container')

    if(upperCircle.classList.contains('reverse-animation'))
    {
        upperCircle.classList.remove('reverse-animation')
    }

    upperCircle.classList.add('show-social')
})

socialBtnClose.addEventListener('click', function(){

    upperCircle.classList.remove('show-social')
    upperCircle.classList.add('reverse-animation')

    setTimeout(function(){

        socialCircleContainer.classList.remove('show-circle-container')


    }, 500)


})

// script for mobile footer 


