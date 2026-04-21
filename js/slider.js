const slides = Array.from(document.querySelectorAll('.hero-slider .slide'));
const dots = Array.from(document.querySelectorAll('.hero-slider .dot'));

if (slides.length > 0 && dots.length === slides.length) {
	const slider = document.querySelector('.hero-slider');
	let currentIndex = 0;
	let timerId;
	let startX = null;
	const swipeThreshold = 45;

	const setActiveSlide = (index) => {
		slides.forEach((slide, i) => {
			slide.classList.toggle('is-active', i === index);
		});

		dots.forEach((dot, i) => {
			dot.classList.toggle('is-active', i === index);
		});

		currentIndex = index;
	};

	const showNextSlide = () => {
		const nextIndex = (currentIndex + 1) % slides.length;
		setActiveSlide(nextIndex);
	};

	const showPreviousSlide = () => {
		const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
		setActiveSlide(prevIndex);
	};

	const startAutoplay = () => {
		clearInterval(timerId);
		timerId = setInterval(showNextSlide, 4200);
	};

	dots.forEach((dot, index) => {
		dot.addEventListener('click', () => {
			setActiveSlide(index);
			startAutoplay();
		});
	});

	if (slider) {
		const beginDrag = (clientX) => {
			startX = clientX;
			slider.classList.add('is-dragging');
		};

		const endDrag = (clientX) => {
			if (startX === null) {
				return;
			}

			const delta = clientX - startX;
			startX = null;
			slider.classList.remove('is-dragging');

			if (Math.abs(delta) < swipeThreshold) {
				return;
			}

			if (delta < 0) {
				showNextSlide();
			} else {
				showPreviousSlide();
			}

			startAutoplay();
		};

		slider.addEventListener('mousedown', (event) => {
			if (event.target.closest('.dot')) {
				return;
			}
			beginDrag(event.clientX);
		});

		slider.addEventListener('mouseup', (event) => {
			endDrag(event.clientX);
		});

		slider.addEventListener('mouseleave', () => {
			startX = null;
			slider.classList.remove('is-dragging');
		});

		slider.addEventListener('touchstart', (event) => {
			if (event.target.closest('.dot') || event.touches.length === 0) {
				return;
			}
			beginDrag(event.touches[0].clientX);
		}, { passive: true });

		slider.addEventListener('touchend', (event) => {
			if (event.changedTouches.length === 0) {
				return;
			}
			endDrag(event.changedTouches[0].clientX);
		}, { passive: true });
	}

	setActiveSlide(0);
	startAutoplay();
}
