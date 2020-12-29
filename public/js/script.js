$(() => {
  // Add Stripe to record list
  document.querySelectorAll('.records-wrap .record').forEach((val, key) => {
    if (key % 2 === 1) {
      val.classList.remove('bg-light');
      val.classList.add('bg-secondary');
    }
  });

  // Set selected for pre-defined option for category in edit/new
  if (document.querySelector('input[name=category]') !== null) {
    const defaultCategoryId = document.querySelector('input[name=category]').value;
    document.querySelector(`#categorySelect option[value="${defaultCategoryId}"]`).setAttribute('selected', true);
  }

  // Add event listener to categorySelect
  if (document.querySelector('#categorySelect') !== null) {
    document.querySelector('#categorySelect').addEventListener('change', (event) => {
      document.querySelector('input[name=category]').value = event.target.value;
    });
  }

  // Filtering Dropdown box handling
  if (document.querySelectorAll('.expenseFilter .dropdown-menu .dropdown-item').length > 0) {
    document.querySelectorAll('.expenseFilter .dropdown-menu .dropdown-item').forEach((item) => {
      const searchParams = new URLSearchParams(window.location.search);

      // Set selected sorting option
      if (item.dataset.categoryid === searchParams.get('recordFilterCategory')) {
        item.classList.add('active');
      }

      // Hook click event for page reload
      item.addEventListener('click', (event) => {
        searchParams.set('recordFilterCategory', item.dataset.categoryid);
        window.location.search = searchParams.toString();
      });
    });
  }
});
