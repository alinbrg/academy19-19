// setTimeout ან setInterval - ის გამოყენებით გააკეთეთ საათი რომელიც იმუშავებს როგორც ნამდვილი სააათი. გამოიყენეთ ქვემოთ მობმული სურათი (საათი.png).

const clock = document.querySelector(".clock-block");

function createClock() {
	const day = new Date();

	const hour = day.getHours();
	const min = day.getMinutes();
	const sec = day.getSeconds();

	// console.log(`${sec}`.padStart(2, "0"));

	if (hour < 12) {
		clock.innerHTML = `${hour} : ${min} : ${sec} AM`;
	} else {
		clock.innerHTML = `${hour - 12} : ${min} : ${sec} PM`;
	}
}

createClock();
setInterval(createClock, 1000);

// slider
const slides = document.querySelectorAll(".slide");
const leftArr = document.querySelector(".left");
const rightArr = document.querySelector(".right");

let activeSlideIndex = 0;

function renderSlides() {
	slides.forEach((slide, index) => {
		if (activeSlideIndex === index) {
			slide.classList.add("active-slide");
		} else {
			slide.classList.remove("active-slide");
		}
	});
}

function nextSlide() {
	if (activeSlideIndex === slides.length - 1) {
		activeSlideIndex = 0;
	} else {
		activeSlideIndex++;
	}

	renderSlides();

	changeBtnClasses();
}

function prevSlide() {
	if (activeSlideIndex === 0) {
		activeSlideIndex = slides.length - 1;
	} else {
		activeSlideIndex--;
	}
	renderSlides();

	changeBtnClasses();
}

let slideIntervalId = null;
const slidesWrapper = document.querySelector(".slides-wrapper");
const sliderBtns = document.querySelector(".slider-btns");

function startAutoSliderFn() {
	slideIntervalId = setInterval(nextSlide, 5000);
}
function stopAutoSliderFn() {
	if (slideIntervalId) {
		clearInterval(slideIntervalId);
		slideIntervalId = null;
	}
}

function renderBullets() {
	slides.forEach((slide, index) => {
		const btn = document.createElement("button");
		btn.classList.add("slide-btn", "btn");
		sliderBtns.append(btn);
		btn.addEventListener("click", (e) => {
			activeSlideIndex = index;
			renderSlides();
			changeBtnClasses();
		});
	});
}

function changeBtnClasses() {
	const btns = document.querySelectorAll(".slide-btn");
	// console.log(btns);

	btns.forEach((btn, index) => {
		if (activeSlideIndex === index) {
			btn.classList.add("active");
		} else {
			btn.classList.remove("active");
		}
	});
}

function createSlider() {
	renderSlides();

	renderBullets();
	changeBtnClasses();

	rightArr.addEventListener("click", nextSlide);
	leftArr.addEventListener("click", prevSlide);

	document.addEventListener("keyup", (e) => {
		// console.log(e.code);
		if (e.code === "ArrowRight") {
			nextSlide();
		}
		if (e.code === "ArrowLeft") {
			prevSlide();
		}
	});

	// startAutoSliderFn();
	// slidesWrapper.addEventListener("mouseenter", stopAutoSliderFn);
	// slidesWrapper.addEventListener("mouseleave", startAutoSliderFn);
}

createSlider();

// დავამატოთ მარტივი countdown რომელიც გვიჩვენებს მომდევნო ლექციამდე (17 მარტი, 20:00)დარჩენილ დროს (დღე, საათი, წუთი)

const countdown = document.querySelector(".countdown");

function countdownFn() {
	const deadline = new Date("Mar 21, 2023 20:00:00").getTime();
	const now = new Date().getTime();
	const gap = deadline - now;
	// console.log((gap % (1000 * 60)) / 1000);

	const second = 1000;
	const minute = second * 60; // 1000 * 60
	const hour = minute * 60; // 1000 * 60 * 60
	const day = hour * 24; // 1000 * 60 * 60 *24

	const daysLeft = Math.floor(gap / day);
	const hoursLeft = Math.floor((gap % day) / hour);
	const minutesLeft = Math.floor((gap % hour) / minute);
	const secondsLeft = Math.floor((gap % minute) / second);

	countdown.innerHTML = `${daysLeft} days, ${hoursLeft} hours, ${minutesLeft} minutes and ${secondsLeft} seconds left until next lecture`;
}

countdownFn();
setInterval(countdownFn, 1000);
