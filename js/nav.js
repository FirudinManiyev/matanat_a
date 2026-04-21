const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const dropdownItems = Array.from(document.querySelectorAll('.main-nav .has-dropdown'));

if (navToggle && mainNav) {
	navToggle.addEventListener('click', () => {
		const isOpen = mainNav.classList.toggle('is-open');
		navToggle.setAttribute('aria-expanded', String(isOpen));
	});

	dropdownItems.forEach((item) => {
		const trigger = item.querySelector(':scope > a');
		if (!trigger) {
			return;
		}

		trigger.addEventListener('click', (event) => {
			if (window.innerWidth > 900) {
				return;
			}

			event.preventDefault();
			const willOpen = !item.classList.contains('is-open');

			dropdownItems.forEach((otherItem) => {
				otherItem.classList.remove('is-open');
			});

			if (willOpen) {
				item.classList.add('is-open');
			}
		});
	});

	window.addEventListener('resize', () => {
		if (window.innerWidth > 900) {
			mainNav.classList.remove('is-open');
			navToggle.setAttribute('aria-expanded', 'false');
			dropdownItems.forEach((item) => {
				item.classList.remove('is-open');
			});
		}
	});
}
