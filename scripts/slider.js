let imgIndex = 0;
let images = [];
let slideTimer  = 3000;

images[0] = '/images/HeroFood.png';
images[1] = '/images/HeroFood2.png';
images[2] = '/images/HeroFood3.png';
images[3] = '/images/HeroFood4.png';
images[4] = '/images/HeroFood5.png';

function changePicture() {
    let heroPage = document.getElementById("Hero-PageJS")
    heroPage.style.backgroundImage = "url(" + images[imgIndex] + ")"

    if (imgIndex < images.length - 1) {
        imgIndex++;
    } else {
        imgIndex = 0;
    }
    setTimeout("changePicture()", slideTimer);
}
window.onload = changePicture;