const form = document.querySelector('form');
const increaseInSalary = document.getElementById('increaseInSalary');
const returnOnInvestment = document.getElementById('returnOnInvestment');
const yearsForEducationToPayForItself = document.getElementById(
  'yearsForEducationToPayForItself'
);
const preEl = document.querySelector('pre');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const [
    programLengthYears,
    annualTuition,
    currentSalary,
    medianExpectedSalary,
  ] = Array.from(form).map((input) => input.value);

  const isPartTime = form[4];

  const data = {
    programLengthYears,
    annualTuition,
    currentSalary,
    medianExpectedSalary,
    isPartTime: isPartTime.checked,
  };

  const response = fetch('/api/education-roi', {
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
      increaseInSalary.textContent = data.increaseInSalary;
      returnOnInvestment.textContent = data.returnOnInvestmentPercentage;
      yearsForEducationToPayForItself.textContent =
        data.yearsForEducationToPayForItself;
    });
});
