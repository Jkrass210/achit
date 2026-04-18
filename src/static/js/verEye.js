$(document).ready(function () {

  /* ===============================
    ВКЛЮЧЕНИЕ / ВЫКЛЮЧЕНИЕ РЕЖИМА
  =============================== */

  $(document).on('click', '.eye_active', function () {

    if (!$(this).hasClass('active')) {

      // Стартовые значения по умолчанию
      var defaultClasses = ['white', 'type1', 'size1', 'interval1', 'switcher1'];

      $('body').attr('class', defaultClasses.join(' '));
      $('.ver_eye').addClass('active');
      $('.eye_active').addClass('active');

    } else {

      $('body').removeAttr('class');
      $('.ver_eye').removeClass('active');
      $('.eye_active').removeClass('active');

      resetVersionStyles();

      $.cookie('version_class', '', { path: '/' });
    }

    setVersion();
  });


  /* ===============================
    КЛИК ПО НАСТРОЙКАМ
  =============================== */

  $('.ver_eye__item').on('click', function () {

    var bodyClass = $('body').attr('class') || '';
    var cl = bodyClass ? bodyClass.split(' ') : ['white', 'type1', 'size1', 'interval1', 'switcher1'];

    if ($(this).data('color')) {
      cl[0] = $(this).data('color');
    }

    if ($(this).data('type')) {
      cl[1] = $(this).data('type');
    }

    if ($(this).data('size')) {
      cl[2] = $(this).data('size');
    }

    if ($(this).data('interval')) {
      cl[3] = $(this).data('interval');
    }

    if ($(this).data('img')) {
      cl[4] = $(this).data('img');
    }

    $('body').attr('class', cl.join(' '));
    setVersion();
  });


  /* ===============================
    ЗАКРЫТИЕ ПАНЕЛИ
  =============================== */

  $(document).on('click', '.ver_eye__close', function () {
    $('.ver_eye').removeClass('active');
    $('.eyeMobileBtn').removeClass('active');
  });

  $(document).on('click', '.eye-normallink', function () {
    $('.eye_active').trigger('click');
  });


  /* ===============================
    ЗАГРУЗКА СОХРАНЕННОЙ ВЕРСИИ
  =============================== */

  var savedClass = $.cookie('version_class');

  if (savedClass) {
    $('body').attr('class', savedClass);
    $('.ver_eye').addClass('active');
    $('.eye_active').addClass('active');
  }

  setVersion();
});


/* ==================================
  ОСНОВНАЯ ФУНКЦИЯ СИНХРОНИЗАЦИИ
================================== */

function setVersion() {

  $('.ver_eye__item').removeClass('sel');

  var bodyClass = $('body').attr('class');

  if (!bodyClass) {
    $.cookie('version_class', '', { path: '/' });
    $('.eye_active').removeClass('active');
    return;
  }

  var cl = bodyClass.split(' ');

  $('.ver_eye__item').each(function () {

    var $item = $(this);

    if (
      ($item.data('color') && $item.data('color') === cl[0]) ||
      ($item.data('type') && $item.data('type') === cl[1]) ||
      ($item.data('size') && $item.data('size') === cl[2]) ||
      ($item.data('interval') && $item.data('interval') === cl[3]) ||
      ($item.data('img') && $item.data('img') === cl[4])
    ) {
      $item.addClass('sel');
    }
  });

  $.cookie('version_class', cl.join(' '), {
    expires: 30,
    path: '/'
  });

  $('.eye_active').addClass('active');

  /* ===============================
    Управление размером
  =============================== */

  if ($('body').hasClass('size1')) {
    verSize(0);
  }

  if ($('body').hasClass('size2')) {
    verSize(1);
  }

  if ($('body').hasClass('size3')) {
    verSize(2);
  }

  /* ===============================
    Управление межбуквенным интервалом
  =============================== */

  if ($('body').hasClass('interval1')) {
    verLetterSpacing(-0.5);
  }

  if ($('body').hasClass('interval2')) {
    verLetterSpacing(0.5);
  }

  if ($('body').hasClass('interval3')) {
    verLetterSpacing(1);
  }
}

function verSize(size) {

  document.querySelectorAll('h1,h2,h3,h4,h5,h6,span,p,a,li').forEach(e => {
    e.style = null;
    setTimeout(() => {
      const sizeStyle = window.getComputedStyle(e);
      const sizeParse = sizeStyle.getPropertyValue('font-size');
      const newSize = sizeParse.replace('px', '');
      e.style.fontSize = (Number(newSize) + size) + 'px';
    }, 300);

  });
}

function verLetterSpacing(space) {

  document.querySelectorAll('h1,h2,h3,h4,h5,h6,span,p,a,li').forEach(e => {
    e.style.letterSpacing = space + 'px';
  });

}

function resetVersionStyles() {

  document.querySelectorAll('h1,h2,h3,h4,h5,h6,span,p,a,li').forEach(e => {
    e.style.fontSize = '';
    e.style.letterSpacing = '';
  });

}
