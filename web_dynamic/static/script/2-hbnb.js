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
  $.ajax({
    type: 'GET',
    url: 'http://127.0.0.1:5001/api/v1/status/',
    success: function (data) {
      (data.status === 'OK')
        ? $('div#api_status').addClass('available')
        : $('div#api_status').removeClass('available');
    },
    error: function () {
      $('div#api_status').removeClass('available');
    }
  });
}
);
