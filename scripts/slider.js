/*==========INITIALIZE==============*/
let imgIndex = 2; // Global counter of images
if (sessionStorage.getItem("imgIndexSlider") !== null)
    imgIndex = parseInt(sessionStorage.getItem("imgIndexSlider"));
let images = []; // Array of urls of images
const slideTimer  = 7000; // Delay
const heroPage = document.getElementById("Hero-PageJS"); // Hero Page reference
const radioBtn = document.getElementsByName("Slider"); // Array of Buttons
/*==================================*/

/*=========IMAGES==============*/
images[0] = '/images/HeroFood1.png';
images[1] = '/images/HeroFood2.png';
images[2] = '/images/HeroFood3.png';
images[3] = '/images/HeroFood4.png';
images[4] = '/images/HeroFood5.png';
/*=============================*/

/*==========Set Event=============*/
for (let i = 0; i < radioBtn.length; i++){
    radioBtn[i].addEventListener('change', function () {
            imgIndex = i;
            sessionStorage.setItem("imgIndexSlider", imgIndex.toString(10));
            heroPage.style.backgroundImage = "url(" + images[imgIndex] + ")";
            imgIndex = ++imgIndex % images.length;
        }
    );
}
/*=================================*/

/*=============Auto Play===============*/
function changePicture() {

    sessionStorage.setItem("imgIndexSlider", imgIndex.toString(10));
    radioBtn[imgIndex].checked = true;
    heroPage.style.backgroundImage = "url(" + images[imgIndex] + ")";

    imgIndex = ++imgIndex % images.length;
    setTimeout("changePicture()", slideTimer);

}
window.onload = changePicture;
