const rows = document.querySelectorAll(".student-row");
const averageEl = document.getElementById("class-average");

function updateAverage() {
  if (!averageEl) return;
  const totals = [...document.querySelectorAll(".total")].map(
    (c) => Number(c.textContent) || 0
  );
  const filled = totals.filter((t) => t > 0);
  if (filled.length === 0) {
    averageEl.textContent = "Class average: –";
    return;
  }
  const avg = filled.reduce((a, b) => a + b, 0) / filled.length;
  averageEl.textContent = `Class average: ${avg.toFixed(1)} (${filled.length}/${totals.length} scored)`;
}

rows.forEach((row) => {
  row.addEventListener("input", (event) => {
    const inputField = event.target;

    // Name edits need no total/grade recalc
    if (inputField.classList.contains("name-input")) return;

    // Bonus: Validation constraints
    if (inputField.classList.contains("ca") && Number(inputField.value) > 10) {
      inputField.value = 10;
    } else if (
      inputField.classList.contains("exam") &&
      Number(inputField.value) > 70
    ) {
      inputField.value = 70;
    }

    // Gather all inputs in the current row
    const caInputs = row.querySelectorAll(".ca");
    const examInput = row.querySelector(".exam");
    const totalCell = row.querySelector(".total");
    const gradeCell = row.querySelector(".grade");

    // Calculate total
    let total = 0;
    caInputs.forEach((ca) => {
      total += Number(ca.value) || 0;
    });
    total += Number(examInput.value) || 0;

    // Update Total DOM
    totalCell.textContent = total;

    // Determine Grade
    let grade = "F";
    if (total >= 70 && total <= 100) grade = "A";
    else if (total >= 60 && total <= 69) grade = "B";
    else if (total >= 50 && total <= 59) grade = "C";
    else if (total >= 45 && total <= 49) grade = "D";
    else if (total >= 40 && total <= 44) grade = "E";
    else if (total >= 0 && total <= 39) grade = "F";

    // Update Grade DOM — rubber-stamp style hook
    const hasScore = [...caInputs, examInput].some((i) => i.value !== "");
    gradeCell.dataset.grade = hasScore ? grade : "none";
    gradeCell.querySelector("span").textContent = hasScore ? grade : "–";

    updateAverage();
  });
});

updateAverage();
