function calculate() {
  const lastDoseInput = document.getElementById("lastdose");
  const desiredDoseInput = document.getElementById("desiredose");
  const daysSinceInput = document.getElementById("daysince");
  const hoursSinceInput = document.getElementById("hourssince");
  const consecutiveDaysInput = document.getElementById("consecutivedays");

  // Parse inputs
  const x = parseFloat(lastDoseInput.value); // Last Dose (Not used in new formula magnitude, but good to have)
  const y = parseFloat(desiredDoseInput.value); // Desired Dose
  const days = parseFloat(daysSinceInput.value) || 0;
  const hours = parseFloat(hoursSinceInput.value) || 0;
  const consecutiveDays = parseFloat(consecutivedays.value) || 1;

  if (isNaN(y)) {
    alert("Please enter a valid Desired Dose.");
    return;
  }

  // Step 1: Calculate Exact Time (TotalDays)
  // TotalDays = Days + (Hours / 24)
  const totalDays = days + (hours / 24);

  // Step 2: Determine the "Spike" (Initial Tolerance)
  // Base Spike = 0.5
  // Streak Load = (ConsecutiveDays - 1) * 0.25 (if ConsecutiveDays > 1)
  let streakLoad = 0;
  if (consecutiveDays > 1) {
    streakLoad = (consecutiveDays - 1) * 0.25;
  }
  const totalSpike = 0.5 + streakLoad;

  // Step 3: Apply the Decay (The "Fade Out")
  // 5-Day Reset Window
  // DecayFactor = ((5 - TotalDays) / 5) ^ 1.5
  // If TotalDays >= 5, DecayFactor = 0
  let decayFactor = 0;
  if (totalDays < 5) {
    decayFactor = Math.pow((5 - totalDays) / 5, 1.5);
  }

  // Step 4: Final Dosage Calculation
  // Required Dose = Desired Dose * (1 + (TotalSpike * DecayFactor))
  const requiredDose = y * (1 + (totalSpike * decayFactor));

  // Calculate "Effectiveness" (Inverse)
  // If I take Y (Desired Dose), what does it feel like?
  // Effective Dose = Y / (1 + (TotalSpike * DecayFactor))
  const effectiveDose = y / (1 + (totalSpike * decayFactor));

  const resultsContainer = document.getElementById("results-container");
  const placeholderText = document.getElementById("placeholder-text");
  const resultEffectiveness = document.getElementById("result-effectiveness");
  const resultNeeded = document.getElementById("result-needed");

  // Show results
  resultsContainer.classList.remove("hidden");
  placeholderText.classList.add("hidden");

  // Update text
  // Logic: If I take 'y', it feels like 'effectiveDose'.
  resultEffectiveness.innerHTML = `If you take <strong>${y}g</strong>, it will feel like <strong>${effectiveDose.toFixed(2)}g</strong>.`;

  // Logic: To feel like 'y', I need 'requiredDose'.
  resultNeeded.innerHTML = `Take <strong>${requiredDose.toFixed(2)}g</strong>`;
}
