$(function () {
  const entertainment = [];
  const entertainmentIds = [];
  $('.popover input').change(function (e) {
    const { target } = e;
    const name = target.getAttribute('data-name');
    const id = target.getAttribute('data-id');

    const isChecked = $(`.popover input[data-id='${id}']`).is(':checked');

    if (isChecked) {
      entertainment.push(name);
      entertainmentIds.push(id);
    } else {
      const indexName = entertainment.indexOf(name);
      if (indexName > -1) entertainment.splice(indexName, 1);
      const indexId = entertainmentIds.indexOf(id);
      if (indexId > -1) entertainmentIds.splice(indexId, 1);
    }

    if (entertainment.length > 0) {
      const newText = entertainment.join(', ');
      newText.length >= 37
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
      data.status === 'OK'
        ? $('div#api_status').addClass('available')
        : $('div#api_status').removeClass('available');
    },
    error: function () {
      $('div#api_status').removeClass('available');
    }
  });
  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    data: '{}',
    contentType: 'application/json',
    success: function (data) {
      for (const e of data) {
        $('section.places').append(`
          <article>
	          <div class="title_box">
              <h2>${e.name}</h2>
              <div class="price_by_night">
                ${e.price_by_night}
              </div>
	          </div>
	          <div class="information">
	            <div class="max_guest">
                ${e.max_guest} Guest${e.max_guest !== 1 ? 's' : ''}
              </div>
              <div class="number_rooms">
                ${e.number_rooms} Bedroom${e.number_rooms !== 1 ? 's' : ''}
              </div>
              <div class="number_bathrooms">
                ${e.number_bathrooms} Bathroom${e.number_bathrooms !== 1 ? 's' : ''}
              </div>
	          </div>
	        </article>`);
      }
    },
    dataType: 'json'
  });
  $('button[type="button"]').click(function () {
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:5001/api/v1/places_search/',
      data: JSON.stringify({ amenities: entertainmentIds }),
      contentType: 'application/json',
      success: function (data) {
        $('section.places').empty();
        for (const e of data) {
          $('section.places').append(`
            <article>
              <div class="title_box">
                <h2>${e.name}</h2>
                <div class="price_by_night">
                  ${e.price_by_night}
                </div>
              </div>
              <div class="information">
                <div class="max_guest">
                  ${e.max_guest} Guest${e.max_guest !== 1 ? 's' : ''}
                </div>
                <div class="number_rooms">
                  ${e.number_rooms} Bedroom${e.number_rooms !== 1 ? 's' : ''}
                </div>
                <div class="number_bathrooms">
                  ${e.number_bathrooms} Bathroom${e.number_bathrooms !== 1 ? 's' : ''}
                </div>
              </div>
            </article>`);
        }
      },
      dataType: 'json'
    });
  });
});
