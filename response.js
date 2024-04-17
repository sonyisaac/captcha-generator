document.addEventListener("DOMContentLoaded", () => {
  // Select necessary DOM elements
  const captchaTextBox = document.querySelector(".captch_box input");
  const refreshButton = document.querySelector(".refresh_button");
  const captchaInputBox = document.querySelector(".captch_input input");
  const message = document.querySelector(".message");
  const submitButton = document.querySelector(".button");

  // Variable to store the generated captcha
  let captchaText = null;

  // Function to generate the captcha
  const generateCaptcha = () => {
    const randomString = Math.random().toString(36).substring(2, 7);
    const randomStringArray = randomString.split("");
    const changeString = randomStringArray.map((char) =>
      Math.random() > 0.5 ? char.toUpperCase() : char
    );
    captchaText = changeString.join("   ");
    captchaTextBox.value = captchaText;
  };

  // Event handler for the refresh button
  const refreshBtnClick = () => {
    generateCaptcha();
    captchaInputBox.value = "";
    captchaKeyUpValidate();
  };

  // Event handler for input field keyup event
  const captchaKeyUpValidate = () => {
    submitButton.classList.toggle("disabled", !captchaInputBox.value);

    if (!captchaInputBox.value) message.classList.remove("active");
  };

  // Event handler for the submit button
  const submitBtnClick = () => {
    captchaText = captchaText
      .split("")
      .filter((char) => char !== " ")
      .join("");
    message.classList.add("active");

    if (captchaInputBox.value === captchaText) {
      message.innerText = "Entered captcha is correct";
      message.style.color = "#222620";
    } else {
      message.innerText = "Entered captcha is not correct";
      message.style.color = "#FF2525";
    }
  };

  // Add event listeners to the elements
  refreshButton.addEventListener("click", refreshBtnClick);
  captchaInputBox.addEventListener("keyup", captchaKeyUpValidate);
  submitButton.addEventListener("click", submitBtnClick);

  // Generate a captcha when the page loads
  generateCaptcha();
});
