
document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const form = document.getElementById("reservaForm");
  const confirmation = document.querySelector(".confirmation");

  let currentStep = 0;

  nextBtn.addEventListener("click", () => {
    steps[currentStep].classList.remove("active");
    currentStep++;
    steps[currentStep].classList.add("active");
  });

  prevBtn.addEventListener("click", () => {
    steps[currentStep].classList.remove("active");
    currentStep--;
    steps[currentStep].classList.add("active");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());

    fetch("https://script.google.com/macros/s/AKfycbxPJE6HzKPSvrAMUH_3lSIZaoOnGzdHViDZoTr9AlNJh_skVkmKwTOwAMYGatoFLYuO/exec", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    form.classList.add("hidden");
    confirmation.classList.remove("hidden");
  });
});
