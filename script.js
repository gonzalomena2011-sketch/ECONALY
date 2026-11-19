const money = (value) => new Intl.NumberFormat("en-US", {style:"currency", currency:"USD", maximumFractionDigits:2}).format(value);

function calculateGrowth() {
  const principal = Number(document.getElementById("principal").value);
  const monthly = Number(document.getElementById("monthly").value);
  const annualRate = Number(document.getElementById("rate").value) / 100;
  const years = Number(document.getElementById("years").value);

  if (![principal, monthly, annualRate, years].every(Number.isFinite) ||
      principal < 0 || monthly < 0 || annualRate <= -1 || years < 1 || years > 60) {
    alert("Please enter valid values. Time must be between 1 and 60 years, and the annual rate must be greater than -100%.");
    return;
  }

  // Annual compounding for the initial amount; monthly contributions are
  // added at the end of each month and grow monthly at the equivalent rate.
  const months = Math.round(years * 12);
  const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;
  let balance = principal * Math.pow(1 + annualRate, years);
  let contributionValue = 0;

  for (let month = 1; month <= months; month++) {
    const remainingMonths = months - month;
    const futureContribution = monthly * Math.pow(1 + monthlyRate, remainingMonths);
    contributionValue += futureContribution;
  }

  const futureValue = balance + contributionValue;
  const totalContributions = principal + monthly * months;
  const growth = futureValue - totalContributions;

  document.getElementById("futureValue").textContent = money(futureValue);
  document.getElementById("contributions").textContent = money(totalContributions);
  document.getElementById("growth").textContent = money(growth);
}

document.getElementById("calculate").addEventListener("click", calculateGrowth);
["principal", "monthly", "rate", "years"].forEach(id => {
  document.getElementById(id).addEventListener("keydown", event => {
    if (event.key === "Enter") calculateGrowth();
  });
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

document.getElementById("year").textContent = new Date().getFullYear();
calculateGrowth();
