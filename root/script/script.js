
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


/*-----------------------SCRIPT FOR GOOGLE SHEETS CONTACT--------------------------------------------------------------------*/
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwzlB5D1dcQ4kwp40w99TYnOzRG1-qiIn5Vj8ips4ivHkG9icxqb5Njb1e1MluKI-NA/exec'
    const form = document.forms['submit-to-google-sheet']
    const msg = document.getElementById("msg")
  
    form.addEventListener('submit', e => {
      e.preventDefault()
      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            msg.innerHTML = "Message sent successfully"
            setTimeout(function(){
                msg.innerHTML = ""
            },5000)
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
    })
