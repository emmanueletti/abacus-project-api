const form = document.querySelector('form');
const finalAmoutWithoutFees = document.getElementById('finalAmoutWithoutFees');
const finalAmoutWithFees = document.getElementById('finalAmoutWithFees');
const amountLostToFees = document.getElementById('amountLostToFees');
const percentageLostToFees = document.getElementById('percentageLostToFees');
const preEl = document.querySelector('pre');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const [
    principalInvestment,
    annualInterestRate,
    monthlyContributions,
    managementExpenseRatio,
    startingAge,
    retirementAge,
  ] = Array.from(form).map((input) => input.value);

  const data = {
    principalInvestment,
    annualInterestRate,
    monthlyContributions,
    managementExpenseRatio,
    startingAge,
    retirementAge,
  };

  fetch('/api/investment-fees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((result) => result.json())
    .then((data) => {
      if (!data.error) {
        finalAmoutWithoutFees.textContent =
          data.finalInvestmentAmountWithOutFees;
        finalAmoutWithFees.textContent = data.finalInvestmentAmountWithFees;
        amountLostToFees.textContent = data.amountLostToFees;
        percentageLostToFees.textContent = data.percentageLostToFees;
      }
      preEl.innerText = JSON.stringify(data, null, 2);
    });
});
