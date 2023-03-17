// modal
const modal = document.querySelector("#sign-in-success-modal");
const modalMessage = document.querySelector(".modal-message");
const modalContent = document.querySelector(".modal-content");
const closeModalBtn = document.querySelector(".close");
const openModalBtn = document.querySelector("#open-modal");

closeModalBtn.addEventListener("click", () => {
	modal.classList.remove("active-modal");
});

openModalBtn.addEventListener("click", () => {
	modal.classList.add("active-modal");
	modalMessage.innerText = "modal open from button click";
});

modal.addEventListener("click", (e) => {
	console.log(e.target);

	if (e.target === modal) {
		modal.classList.remove("active-modal");
	}
});

// form
const form = document.querySelector("form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

function addError(parent) {
	parent.classList.remove("success");
	parent.classList.add("error");
}

function checkPassword() {
	const parent = passwordInput.parentElement;
	if (passwordInput.value.length < 8) {
		addError(parent);
		parent.querySelector(".error-message").innerText =
			"password must be at least 8 char";
		return false;
	} else {
		parent.classList.remove("error");
		parent.classList.add("success");
		parent.querySelector(".error-message").innerText = "";
		return true;
	}
}

function checkEmail() {
	const parent = emailInput.parentElement;
	// console.log(emailInput.validity);

	// console.log(/[ა-ჰ]/.test(emailInput.value));
	if (emailInput.value == "") {
		addError(parent);
		parent.querySelector(".error-message").innerText = "email is required";
		return false;
	} else if (!/@academy.edu.ge$/.test(emailInput.value)) {
		addError(parent);
		parent.querySelector(".error-message").innerText =
			"email ending must be 'academy.edu.ge'";
		return false;
	} else {
		parent.classList.remove("error");
		parent.classList.add("success");
		parent.querySelector(".error-message").innerText = "";
		return true;
	}
}

emailInput.addEventListener("input", checkEmail);
passwordInput.addEventListener("input", checkPassword);

form.addEventListener("submit", (e) => {
	e.preventDefault();
	// console.log("submit");
	const isPasswordCorrect = checkPassword();
	const isEmailCorrect = checkEmail();
	// console.log(emailInput.validity.valid);
	// console.log(passwordInput.value);
	// console.log(isPasswordCorrect, isEmailCorrect);
	if (isEmailCorrect && isPasswordCorrect) {
		// form.submit();
		modalMessage.innerText = "form sent successfully";
		modal.classList.add("active-modal");
	}
});
