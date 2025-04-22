
document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");
  const form = document.getElementById("reservaForm");
  const confirmation = document.querySelector(".confirmation");
  const nextBtns = document.querySelectorAll(".next");
  const prevBtns = document.querySelectorAll(".prev");

  let currentStep = 0;

  function showStep(index) {
    steps.forEach((step, i) => {
      step.classList.toggle("active", i === index);
    });
  }

  nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep < steps.length - 1) {
        steps[currentStep].classList.remove("active");
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep > 0) {
        steps[currentStep].classList.remove("active");
        currentStep--;
        showStep(currentStep);
      }
    });
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

  showStep(currentStep); // Mostrar paso inicial
});
