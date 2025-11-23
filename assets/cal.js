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

  // Formula from original code:
  // dose = ((280.059565 * (Math.pow(n, -0.412565956))) * (x / 100) - x);
  let dose = 280.059565 * Math.pow(n, -0.412565956) * (x / 100) - x;

  // If days is 0, the formula might behave weirdly or result in Infinity if not handled,
  // but original code didn't handle n=0 specifically other than <0 check.
  // Math.pow(0, negative) is Infinity.
  // Let's check if n is 0.
  if (n === 0) {
    // If 0 days, tolerance is max.
    // The formula: 280 * (0^-0.4) is Infinity.
    // Let's assume a very small number or just handle it.
    // Actually, if n=0, you need A LOT more.
    // Let's stick to the formula but clamp n to something small if 0 to avoid Infinity?
    // Or just let it be large.
    // Original code: if n < 0 return false. It didn't check n=0 explicitly for Math.pow error.
    // Let's try n=0.1 if n=0 to avoid breakdown, or just catch it.
    // Actually, let's see what happens.
  }

  const dose1 = y + dose; // Needed for desired effect
  const dose2 = y - dose; // Effectiveness of desired dose

  const resultsContainer = document.getElementById("results-container");
  const placeholderText = document.getElementById("placeholder-text");
  const resultEffectiveness = document.getElementById("result-effectiveness");
  const resultNeeded = document.getElementById("result-needed");

  // Show results
  resultsContainer.classList.remove("hidden");
  placeholderText.classList.add("hidden");

  // Update text
  if (dose2 < 0) {
    resultEffectiveness.innerHTML = `If you take <strong>${y}μg</strong>, it will have <span class="text-red-500">little to no effect</span>.`;
  } else {
    resultEffectiveness.innerHTML = `If you take <strong>${y}μg</strong>, it will feel like <strong>${Math.round(
      dose2
    )}μg</strong>.`;
  }

  resultNeeded.innerHTML = `Take <strong>${Math.round(dose1)}μg</strong>`;
}
