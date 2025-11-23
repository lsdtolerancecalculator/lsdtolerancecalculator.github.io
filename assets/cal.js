function calculate() {
  const lastDoseInput = document.getElementById("lastdose");
  const desiredDoseInput = document.getElementById("desiredose");
  const daysSinceInput = document.getElementById("daysince");

  const x = parseFloat(lastDoseInput.value);
  const y = parseFloat(desiredDoseInput.value);
  const n = parseFloat(daysSinceInput.value);

  if (isNaN(x) || isNaN(y) || isNaN(n)) {
    alert("Please fill in all fields with valid numbers.");
    return;
  }

  if (n > 12) {
    alert(
      '"Days Since" must be 12 or lower (tolerance resets after ~12-14 days).'
    );
    return;
  } else if (n < 0) {
    alert('"Days Since" must be 0 or greater.');
    return;
  }

  let dose = 280.059565 * Math.pow(n, -0.412565956) * (x / 100) - x;


  if (n === 0) {

  }

  const dose1 = y + dose; // Needed for desired effect
  const dose2 = y - dose; // Effectiveness of desired dose

  const resultsContainer = document.getElementById("results-container");
  const placeholderText = document.getElementById("placeholder-text");
  const resultEffectiveness = document.getElementById("result-effectiveness");
  const resultNeeded = document.getElementById("result-needed");

 
  resultsContainer.classList.remove("hidden");
  placeholderText.classList.add("hidden");

 
  if (dose2 < 0) {
    resultEffectiveness.innerHTML = `If you take <strong>${y}μg</strong>, it will have <span class="text-red-500">little to no effect</span>.`;
  } else {
    resultEffectiveness.innerHTML = `If you take <strong>${y}μg</strong>, it will feel like <strong>${Math.round(
      dose2
    )}μg</strong>.`;
  }

  resultNeeded.innerHTML = `Take <strong>${Math.round(dose1)}μg</strong>`;
}
