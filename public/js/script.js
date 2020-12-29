$(() => {
  // Add Stripe to record list
  document.querySelectorAll('.records-wrap .record').forEach((val, key) => {
    if (key % 2 === 1) {
      val.classList.remove('bg-light');
      val.classList.add('bg-secondary');
    }
  });

  // Set selected for pre-defined option for category in edit/new
  const defaultCategoryId = document.querySelector('input[name=category]').value;
  if (document.querySelector('input[name=category]').value !== '') {
    document.querySelector(`#categorySelect option[value="${defaultCategoryId}"]`).setAttribute('selected', true);
  }

  // Add event listener to categorySelect
  document.querySelector('#categorySelect').addEventListener('change', (event) => {
    document.querySelector('input[name=category]').value = event.target.value;
  });
});
