$(function () {
  const entertainment = [];
  $('.popover input').change(function (e) {
    const { target } = e;
    const name = target.getAttribute('data-name');
    const id = target.getAttribute('data-id');

    const isChecked = $(`.popover input[data-id="${id}"]`).is(':checked');

    if (isChecked) {
      entertainment.push(name);
    } else {
      const index = entertainment.indexOf(name);
      if (index > -1) entertainment.splice(index, 1);
    }

    if (entertainment.length > 0) {
      const newText = entertainment.join(', ');
      (newText.length >= 37)
        ? $('.amenities h4').text(`${newText.slice(0, 37)}...`)
        : $('.amenities h4').text(newText);
    } else {
      $('.amenities h4').html('&nbsp;');
    }
  });
});
