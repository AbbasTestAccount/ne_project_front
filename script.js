import { loginRequest } from "./requests.js";

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("here");
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const selectedRole = document.querySelector(
      'input[name="role"]:checked'
    ).value;
    console.log(username, password, selectedRole);
    loginRequest(username, password, selectedRole).then((result) => {
      result.message && showErrors(result.message);
      if (!result.message && selectedRole === "admin") {
        window.location.href = "adminView.html";
      }
    });
  });

function showErrors(errorMessage) {
  let errorsEl = document.getElementById("errors");
  errorsEl.innerHTML = errorMessage;
}
