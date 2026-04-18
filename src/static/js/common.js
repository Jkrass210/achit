/*valod*/
$(function () {

	const DOC = $(document);
	// banner slider swiper

	if ($('.banner_top .swiper').length > 0) {
		const swiper_banner_top = new Swiper('.banner_top .swiper', {
			//loop: true,
			spaceBetween: 16,
			autoHeight: true,
			navigation: {
				nextEl: '.banner_top .swiperPagination__right',
				prevEl: '.banner_top .swiperPagination__left',
			},
		});
	}

	if ($('.home_news_slider .swiper').length > 0) {
		const swiper_banner_top = new Swiper('.home_news_slider .swiper', {
			spaceBetween: 16,
			autoHeight: true,
			navigation: {
				nextEl: '.home_news_slider .swiperPagination__right',
				prevEl: '.home_news_slider .swiperPagination__left',
			},
		});
	}

	if ($('.resources_block .swiper').length > 0) {
		let swiper_resources = null;

		function initSwiper() {
			if ($(window).width() < 768) {
				if (!swiper_resources) {
					swiper_resources = new Swiper('.resources_block .swiper', {
						spaceBetween: 16,
						autoHeight: true,
						pagination: {
							el: '.resources_block .swiperNavigate',
							clickable: true,
						},
					});
				}
			} else {
				if (swiper_resources) {
					swiper_resources.destroy(true, true);
					swiper_resources = null;
					// Убираем свайпер-классы если они остались
					$('.resources_block .swiper').removeClass('swiper-initialized swiper-horizontal swiper-backface-hidden');
					$('.resources_block .swiper-wrapper').removeAttr('style');
					$('.resources_block .swiper-slide').removeAttr('style');
				}
			}
		}

		// Инициализируем при загрузке
		initSwiper();

		// И при изменении размера окна
		$(window).on('resize', function () {
			initSwiper();
		});
	}

	if ($('.partner_block .swiper').length > 0) {
		const swiper_banner_top = new Swiper('.partner_block .swiper', {
			slidesPerView: 'auto',
			spaceBetween: 32,
			autoHeight: true,
			navigation: {
				nextEl: '.partner_block .swiperPagination__right',
				prevEl: '.partner_block .swiperPagination__left',
			},
		});
	}

	// cookie modal policy
	// Проверяем наличие куки, например, 'cookies_accepted'
	function getCookie(name) {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(';').shift();
	}

	// Устанавливаем куку на 30 дней
	function setCookie(name, value, days) {
		const d = new Date();
		d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
		const expires = "expires=" + d.toUTCString();
		document.cookie = name + "=" + value + ";" + expires + ";path=/";
	}

	// Показываем модалку, если куки ещё нет
	if ($('.cookie_modal').length > 0 && !getCookie('cookies_accepted')) {
		setTimeout(function () {
			$('.cookie_modal').fadeIn('300');
		}, 1000);
	}

	// Обработчик клика по кнопке принятия
	DOC.on('click', '.cookie_modal__btn', function (e) {
		e.preventDefault();
		setCookie('cookies_accepted', 'true', 30); // хранится 30 дней
		$(this).closest('.cookie_modal').fadeOut('300');
	});


	var $footerMenu = $('.footer__menu');

	$footerMenu.responsiveDom({
		appendTo: '.footer__top',
		mediaQuery: '(min-width: 768px) and (max-width: 1024px)'
	});

	// search

	DOC.on('click', '.js_search_open', function (e) {
		e.preventDefault();
		if ($('.search_form').length > 0) {
			$('.wrapper').addClass('bgl');
			$('.search_form').addClass('active');
			$('.search_form__close').addClass('open');
		}
	});
	DOC.on('click', '.search_form__close', function (e) {
		$('.wrapper').removeClass('bgl');
		$('.search_form').removeClass('active');
		$('.search_form__close').removeClass('open');
	});

	DOC.on('click', function (e) {
		if ($('.search_form').hasClass('active') && !$(e.target).closest('.search_form, .js_search_open').length) {
			$('.wrapper').removeClass('bgl');
			$('.search_form').removeClass('active');
			$('.search_form__close').removeClass('open');
		}
	});


	DOC.on('click', '.js_burger_open', function (e) {
		e.preventDefault();

		$('.catalog_modal').fadeIn(300);
	});
	DOC.on('click', '.catalog_modal__close', function (e) {
		e.preventDefault();

		$('.catalog_modal').fadeOut(300);
	});

	if ($('.gallery_slider .swiper').length > 0) {
		const swiper_gallery_slider = new Swiper('.gallery_slider .swiper', {
			slidesPerView: 1,
			spaceBetween: 16,
			navigation: {
				nextEl: '.gallery_slider .swiperPagination__right',
				prevEl: '.gallery_slider .swiperPagination__left',
			},

			breakpoints: {
				1024: {
					slidesPerView: 2,
					spaceBetween: 32,
				}
			}
		});
	}
});

(function () {
	console.log('Form validation module loaded');

	$('.js-phone-mask').inputmask('+7 999 999-99-99');

	let doc = $(document);

	// Валидация файлов
	doc.on('change', '.js-file', function () {

		const input = this;
		const $input = $(this);
		const $parent = $input.closest('.input-file');

		const allowedExtensions = ['doc', 'docx', 'pdf'];
		const maxSize = 5 * 1024 * 1024; // 5MB

		const newFiles = Array.from(input.files);

		if (!newFiles.length) return;

		// Берём уже существующие файлы (если были)
		const existingFiles = input._files ? input._files : [];

		let dt = new DataTransfer();
		let hasError = false;

		// Объединяем старые + новые
		const allFiles = [...existingFiles, ...newFiles];

		allFiles.forEach(file => {

			const extension = file.name.split('.').pop().toLowerCase();

			if (!allowedExtensions.includes(extension)) {
				hasError = true;
				return;
			}

			if (file.size > maxSize) {
				hasError = true;
				return;
			}

			dt.items.add(file);
		});

		if (hasError || dt.files.length === 0) {
			$input.addClass('error');
			input.value = '';
			return;
		}

		$input.removeClass('error');

		input.files = dt.files;

		// сохраняем текущее состояние файлов
		input._files = Array.from(dt.files);

		renderFileList($parent, input);

	});

	function renderFileList($parent, input) {

		$parent.find('.input-file__files').remove();

		let files = Array.from(input.files);

		if (!files.length) return;

		const $filesBlock = $('<div class="input-file__files"></div>');

		files.forEach((file, index) => {

			const $fileItem = $(`
				<div class="input-file__item" data-index="${index}">
					<span class="input-file__name">${file.name}</span>
					<button type="button" class="input-file__remove">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path d="M12 12L16 8M12 12L8 16M12 12L16 16M12 12L8 8" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</button>
				</div>
			`);

			$filesBlock.append($fileItem);
		});

		$parent.find('.input-file__wrapp').after($filesBlock);
	}

	doc.on('click', '.input-file__remove', function () {

		const $item = $(this).closest('.input-file__item');
		const indexToRemove = $item.data('index');

		const $parent = $(this).closest('.input-file');
		const input = $parent.find('.js-file')[0];

		let dt = new DataTransfer();
		let files = input._files ? input._files : [];

		files.forEach((file, index) => {
			if (index !== indexToRemove) {
				dt.items.add(file);
			}
		});

		input.files = dt.files;
		input._files = Array.from(dt.files);

		renderFileList($parent, input);

	});

//файлы

	// Отправка формы
	doc.on('submit', '.js-form', function (e) {

		console.log('Form submit');

		let errors = 0;
		let form = $(this);
		let requireds = form.find('.required');
		

		requireds.removeClass('error');
		

		requireds.each(function (idx, input) {
			let $input = $(input);
			let val = $input.val();
			let type = input.type;

			// Чекбоксы
			if (type === 'checkbox' && $input.hasClass('required-checkbox')) {
				if (!input.checked) {
					$input.addClass('error');
					errors++;
				}
				return;
			}

			// Радио
			if (type === 'radio' && $input.hasClass('required-radio')) {
				let name = input.name;
				let isRadioChecked = form.find(`input[name="${name}"]:checked`).length > 0;

				if (!isRadioChecked) {
					form.find(`input[name="${name}"]`).addClass('error');
					errors++;
				}
				return;
			}

			// Пустое значение
			if (!val || val.length === 0) {
				$input.addClass('error');
				errors++;
			}

			// Телефон
			if ($input.hasClass('required-phone')) {
				let phone = val.replace(/\D+/g, "");
				if (phone.length < 11) {
					$input.addClass('error');
					errors++;
				}
			}

			// Email
			if ($input.hasClass('required-mail')) {
				let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailReg.test(val)) {
					$input.addClass('error');
					errors++;
				}
			}

			// Оценка 1–5
			if ($input.hasClass('required-evaluation')) {
				if (!/^[1-5]$/.test(val)) {
					$input.addClass('error');
					errors++;
				}
			}
		});

		if (errors > 0) {
			e.preventDefault();
			if (typeof BX !== 'undefined') {
				BX.closeWait();
			}
		}
	});

	// Снятие ошибки с чекбокса
	doc.on('change', '.required-checkbox', function () {
		if (this.checked) {
			$(this).removeClass('error');
		}
	});

	// Снятие ошибки с radio
	doc.on('change', '.required-radio', function () {
		let name = this.name;
		$(`input[name="${name}"]`).removeClass('error');
	});

})();
/*valod*/
/*соавтор*/
(function () {
  const $wrapper = $('.js-wrapp-add');
  const $copyTemplate = $('.js-copy'); // только оригинальный блок-шаблон
  const $btnCopy = $('.js-btn-copy');

  if (!$wrapper.length || !$copyTemplate.length || !$btnCopy.length) return;

  let authorCount = 0;

  $btnCopy.on('click', function (e) {
		e.preventDefault();

		authorCount++;

		const $newBlock = $copyTemplate.clone();
		$newBlock.removeClass('js-copy');

		const $h3 = $(`<h3>Соавтор №${authorCount}</h3>`);
		const $closeBtn = $('<button type="button" class="nested__close"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 12L16 8M12 12L8 16M12 12L16 16M12 12L8 8" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>');

		$newBlock.prepend($closeBtn);
		$newBlock.prepend($h3);

		$newBlock.find('input').val('');

		// Вставляем перед родителем кнопки
		$(this).closest('.form-type-1__btn-add').before($newBlock);
	});

  // Удаление блока по кнопке закрытия
  $wrapper.on('click', '.nested__close', function () {
    $(this).closest('.nested').remove(); // удаляем весь блок соавтора

    // Пересчёт номеров
    authorCount = 0;
    $wrapper.find('h3').each(function () {
      authorCount++;
      $(this).text(`Соавтор №${authorCount}`);
    });
  });
})();
/*соавтор*/
/*якоря*/
(function initSyncNavigation() {
  const navLinks = document.querySelectorAll('.js-nav-link-1');
  const points = document.querySelectorAll('.js-point-box');

  if (!navLinks.length || !points.length) return;

  const pointsMap = new Map();

  points.forEach(point => {
    const id = point.dataset.id;
    if (id) pointsMap.set(id, point);
  });

  // ===== КЛИК ПО НАВИГАЦИИ =====
  document.addEventListener('click', (e) => {
    const link = e.target.closest('.js-nav-link-1');
    if (!link) return;

    e.preventDefault();

    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    const targetId = href.slice(1);
    const target = pointsMap.get(targetId);
    if (!target) return;

    const offset = 20;

    const top =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      offset;

    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  });

  // ===== ACTIVE ПРИ СКРОЛЛЕ =====
  const onScroll = () => {
    let currentPoint = null;

    points.forEach(point => {
      const rect = point.getBoundingClientRect();

      if (rect.top <= 150) {
        currentPoint = point;
      }
    });

    if (!currentPoint) return;

    const id = currentPoint.dataset.id;

    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${id}`
      );
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
/*якоря*/