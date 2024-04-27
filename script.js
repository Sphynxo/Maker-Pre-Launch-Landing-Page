"use strict";

const btn = document.querySelector(".button");
const emailInput = document.querySelector(".mail-input");
const errorMessage = document.querySelector(".error-msg");
const mailContainer = document.querySelector(".mail-container");
const successMsg = document.querySelector(".completed");
const blur = document.querySelector(".blur");

btn.addEventListener('click', function() {
    const mail = emailInput.value;

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    try {
        if (!isValidEmail(mail)) {
            throw new Error('Oops! That doesn’t look like an email address');
        }

        mailContainer.classList.add('hide');
        successMsg.classList.remove('hide');
    } catch (error) {
        emailInput.style.borderColor = '#ff2965';
        errorMessage.textContent = error.message;
    }
});

