
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

let menuImg = document.querySelector('.menu').children[0]
function showmenu() {
    if (menuImg.src.includes('menu')) {
        menuImg.src = `./svg/close.svg`
        document.querySelector('.menu-items').style.display = 'flex'
    }else {
        menuImg.src = `./svg/menu.svg`
        document.querySelector('.menu-items').style.display = 'none'
    }  
}



