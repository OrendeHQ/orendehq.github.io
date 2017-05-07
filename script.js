$(document).ready(function() {
  $(document).on('mouseover', '.tree .tree__body li', function() {
    var $target = $(event.target);
    if ($target.hasClass('active')) return;
    $('.tree .tree__body li').removeClass('active');
    $target.addClass('active');
    var $tab = $('#' + $target.data('tab'));
    $('.long-description').removeClass('active');
    $tab.addClass('active');
  });
  
  $(document).on('scroll', function() {
    var position = $(window).scrollTop();
    if (position > $(window).innerHeight()) $('.nav').addClass('active');
    else $('.nav').removeClass('active');
  });
});