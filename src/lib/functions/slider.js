export const createSlider = (classname) => {
	const slider = document.querySelector(classname);
	let isDown = false;
	let startX;
	let scrollLeft;

	const handleMousedown = (e) => {
		isDown = true;
		slider.classList.add('active');
		startX = e.pageX - slider.offsetLeft;
		scrollLeft = slider.scrollLeft;
	};

	const handleMouseleave = () => {
		isDown = false;
		slider.classList.remove('active');
	};

	const handleMouseup = (e) => {
		isDown = false;
		slider.classList.remove('active');
	};

	const handleMousemove = (e) => {
		if (!isDown) return;
		e.preventDefault();
		const x = e.pageX - slider.offsetLeft;
		const walk = (x - startX) * 3; //scroll-fast
		slider.scrollLeft = scrollLeft - walk;
	};

	slider.addEventListener('mousedown', handleMousedown);
	slider.addEventListener('mouseleave', handleMouseleave);
	slider.addEventListener('mouseup', handleMouseup);
	slider.addEventListener('mousemove', handleMousemove);

	return function () {
		slider.removeEventListener('mousedown', handleMousedown);
		slider.removeEventListener('mouseleave', handleMouseleave);
		slider.removeEventListener('mouseup', handleMouseup);
		slider.removeEventListener('mousemove', handleMousemove);
	};
};
