const form = document.querySelector('form');
const summary = document.getElementById('summary');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const homePrice = form[0].value;
  const isTFSAorRRSPMaxed = form[1].checked;

  const data = {
    homePrice,
    isTFSAorRRSPMaxed,
  };

  fetch('/api/rent-or-buy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((result) => result.json())
    .then((data) => {
      summary.textContent = `If you can rent a suitable home that meets your needs for less than ${data.rentEquivalent}, then renting might be better.`;
    });
});
