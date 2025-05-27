document.addEventListener('DOMContentLoaded', function () {
  /* Updated EmailJS credentials and added console logs for debugging */
  (function(){
      emailjs.init("Vjudi8YZkoADdjaNb");
  })();

  const form = document.forms['submit-to-google-sheet'];
  const msg = document.getElementById("msg");

  form.addEventListener('submit', e => {
      e.preventDefault();
      console.log("Form submit event triggered");

      const name = form['Name'].value;
      const email = form['Email'].value;
      const contactNumber = form['Contact Number'].value;
      const message = form['Message'].value;

      if (!name || !email || !message) {
          alert("Please fill in all required fields.");
          return;
      }

      emailjs.send("service_bjsczxb", "template_0jl2emp", {
          from_name: name,
          from_email: email,
          contact_number: contactNumber,
          message: message,
          to_email: "nniloy888@gmail.com"
      })
      .then(() => {
          // Show animated message
          msg.innerText = "✅ Message has been sent!";
          msg.style.opacity = 1;
          msg.style.transition = "opacity 0.5s ease-in-out";

          // Clear form fields
          form.reset();

          // Disable submit button temporarily to prevent multiple sends
          const submitButton = form.querySelector('button[type="submit"]');
          submitButton.disabled = true;

          // Fade out message after 3 seconds and re-enable button
          setTimeout(() => {
              msg.style.opacity = 0;
              submitButton.disabled = false;
          }, 3000);

          console.log("EmailJS: Email sent successfully");
      }, (error) => {
          alert("Failed to send email. Please try again later.");
          console.error("EmailJS error:", error);
      });
  });
});
