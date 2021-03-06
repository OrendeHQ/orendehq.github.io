var $window = $(window);
var $document = $(document);
var windowBot = $window.height() + $window.scrollTop();
var $navBar = $('.nav');
var $animatedElements = $('.animated');
var $3dSection = $('#threedprinters');
var $projectsSection = $('#projects');
var $aboutSection = $('#about');
var aboutSectionTop = $aboutSection.offset().top;
var threedSectionTop = $3dSection.offset().top;
var projectSectionTop = $projectsSection.offset().top;

$document.ready(function() {
  $document.on('mouseover', '.tree .tree__body li', function(event) {
    var $target = $(event.target);
    if ($target.hasClass('active')) return;
    $('.tree .tree__body li').removeClass('active');
    $target.addClass('active');
    var $tab = $('#' + $target.data('tab'));
    $('.long-description').removeClass('active');
    $tab.addClass('active');
  });

  $document.on('scroll', documentScrollHandler);

  $document.on('click', '#toggleMenu', function() {
    $('#toggleMenu .divider').addClass('active');
    $('.navbar-menu').addClass('active');
    $('.navbar-menu .close').addClass('active');
  });

  $document.on('click', '.navbar-menu .close', function() {
    $('#toggleMenu .divider').removeClass('active');
    $('.navbar-menu').removeClass('active');
    $('.navbar-menu .close').removeClass('active');
  });

  $document.on('click', 'a[data-scroll]', function(e) {
    e.preventDefault();
    smoothScroll($(e.currentTarget).attr('href'), 0);
  });

  $document.on('submit', '#footer form', handleFormSubmit);

  // make sure that the position is correctly determined as document is ready
  aboutSectionTop = $aboutSection.offset().top;
  $window.on('scroll', checkIfInView);
  $window.trigger('scroll');

  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (iOS) $('.video').css('display', 'none');
});

function smoothScroll(anchor, offset) {
  console.log($(anchor).offset().top);
  $('html,body').animate(
    { scrollTop: $(anchor).offset().top - offset },
    'slow',
  );
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
    data: { email: email, message: message },
  })
    .done(function() {
      $form[0].reset();
      $form.removeClass('sending');
      alert("Thank you! We've gotten your message!");
    })
    .fail(function(res) {
      alert(res.message);
      $form.removeClass('sending');
    });
}

function checkIfInView() {
  var windowHeight = $window.height();
  var windowTop = $window.scrollTop();
  var windowBot = windowTop + windowHeight;
  $.each($animatedElements, function() {
    var $elem = $(this);
    var elemHeight = $elem.outerHeight();
    var elemTop = $elem.offset().top;
    var elemBot = elemTop + elemHeight;

    if (elemBot >= windowTop && elemTop <= windowBot) {
      $elem.addClass('in-view');
    } else {
      $elem.removeClass('in-view');
    }
  });

  if (
    (threedSectionTop <= windowBot && projectSectionTop >= windowBot) ||
    aboutSectionTop <= windowBot
  ) {
    $3dSection.addClass('inverted');
    $aboutSection.addClass('inverted');
    $projectsSection.addClass('inverted');
  } else {
    $3dSection.removeClass('inverted');
    $aboutSection.removeClass('inverted');
    $projectsSection.removeClass('inverted');
  }
}

function documentScrollHandler() {
  var position = $window.scrollTop();

  if (position > $window.innerHeight()) $navBar.addClass('active');
  else $navBar.removeClass('active');

  var newWindowBot = $window.height() + $window.scrollTop();
  if (newWindowBot > windowBot) $navBar.addClass('hide');
  else $navBar.removeClass('hide');
  windowBot = newWindowBot;
}
