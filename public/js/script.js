$(() => {
  document.querySelectorAll('.records-wrap .record').forEach((val, key) => {
    if (key % 2 === 1) {
      val.classList.remove('bg-light');
      val.classList.add('bg-secondary');
    }
  });
});
