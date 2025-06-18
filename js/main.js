document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("formLogin");
  const regForm = document.getElementById("formRegistro");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Inicio de sesión exitoso.");
      window.location.href = "productos.html";
    });
  }

  if (regForm) {
    regForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Registro exitoso.");
      window.location.href = "login.html";
    });
  }
});
