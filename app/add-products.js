document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = document.getElementById('productTitle').value;
      alert(`Product "${title}" has been added!`);
    });
  });
  