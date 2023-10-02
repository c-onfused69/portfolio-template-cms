/*-----------------------SHOWCASE PAGE--------------------------------------------------------------------*/
const workslider = document.querySelectorAll(".workslider");
        dot = document.querySelectorAll(".dot");

let counter = 1;
slidefun(counter);

let timer = setInterval(autoSlide, 8000);
function autoSlide() {
    counter += 1;
    slidefun(counter);
}
function plusSlides(n) {
    counter += n;
    slidefun(counter);
    resetTimer();
}
function currentSlide(n) {
    counter = n;
    slidefun(counter);
    resetTimer();
}
function resetTimer() {
    clearInterval(timer);
    timer = setInterval(autoSlide, 8000);
}

function slidefun(n) {
    let i;
    for(i = 0;i<workslider.length;i++){
        workslider[i].style.display = "none";
    }
    for(i = 0;i<dot.length;i++){
        dot[i].classList.remove("active");
    }
    if(n > workslider.length){
        counter = 1;
    }
    if(n < 1){
        counter = workslider.length;
    }
    workslider[counter - 1].style.display = "block";
    dot[counter - 1].classList.add("active");
}

/*-----------------------SCRIPT SECTION--------------------------------------------------------------------*/

var tablinks=document.getElementsByClassName("tab-links");
var tabcontents=document.getElementsByClassName("tab-contents");

function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}



/*-----------------------JAVA SCRIPT FOR SIDE MENU--------------------------------------------------------------------*/

var sidemenu = document.getElementById("sidemenu");

function openmenu(){
    sidemenu.style.right = "0";
}

function closemenu(){
    sidemenu.style.right = "-200px";
}