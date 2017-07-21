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

  $(document).on('click', '#toggleMenu', function() {
    $('#toggleMenu .divider').addClass('active');
    $('.navbar-menu').addClass('active');
    $('.navbar-menu .close').addClass('active');
  });
  
  $(document).on('click', '.navbar-menu .close', function() {
    $('#toggleMenu .divider').removeClass('active');
    $('.navbar-menu').removeClass('active');
    $('.navbar-menu .close').removeClass('active');
  });
  
  $(document).on('click', 'a[data-scroll]', function(e) {
    e.preventDefault();
    smoothScroll($(e.currentTarget).attr('href'), 50);
  });
});

function smoothScroll(anchor, offset) {
  $('body').animate({ scrollTop: $(anchor).offset().top - offset }, 'slow');
}