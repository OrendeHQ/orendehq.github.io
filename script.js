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
  
  $(document).on('submit', '#footer form', handleFormSubmit);
});

function smoothScroll(anchor, offset) {
  $('body').animate({ scrollTop: $(anchor).offset().top - offset }, 'slow');
}

function handleFormSubmit(e) {
  e.preventDefault();
  var $form = $(e.currentTarget);
  var email = $form.find('input[name="email"]').val();
  var message = $form.find('textarea[name="message"]').val();
  $form.addClass('sending');
  $.ajax({
    url: 'https://orende-form.herokuapp.com',
    method: 'POST',
    data: { email: email, message: message }
  }).done(function() {
    $form[0].reset();
    $form.removeClass('sending');
    alert('Thank you! We\'ve gotten your message!')
  }).fail(function(res) {
    alert(res.message);
    $form.removeClass('sending');
  })
}