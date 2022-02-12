const form = document.querySelector('form');
const investmentVehicle = document.getElementById('investmentVehicle');
const amountToContribute = document.getElementById('amountToContribute');
const preEl = document.querySelector('pre');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const annualIncome = form[0].value;
  const isTFSAContributionMaxed = form[1].checked;
  const isRRSPContributionMaxed = form[2].checked;

  const data = {
    annualIncome,
    isTFSAContributionMaxed,
    isRRSPContributionMaxed,
  };

  const response = fetch('/api/investment-vehicle', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((result) => result.json())
    .then((data) => {
      if (data.error) {
        preEl.innerText = JSON.stringify(data, null, 2);
        return;
      }
      investmentVehicle.textContent = data.investmentVehicle;
      amountToContribute.textContent = data.amountToContribute;
    });
});
