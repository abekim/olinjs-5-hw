$(function() {
  $('body').css('background-color', $('div#bgcolor').text());
  $('body').css('font-size', $('div#textsize').text());
});

$('select').change(function() {
  id = $(this).attr('name');

  current = $('div#' + id).text();
  newVal = $('select[name=' + id + ']').val();

  if (current != newVal) {
    $('div#' + id).html(newVal);
    if (id == 'bgcolor') {
      $.post('/' + id, { userId: $('div#userId').text(), color: $('div#bgcolor').text() });
      $('body').css('background-color', $('div#bgcolor').text());
    } else {
      $.post('/' + id, { userId: $('div#userId').text(), size: $('div#textsize').text() });
      $('body').css('font-size', $('div#textsize').text());
    }
  }
});