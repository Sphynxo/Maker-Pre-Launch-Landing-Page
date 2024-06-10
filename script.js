"use strict";

const btn = document.querySelector(".button");
const emailInput = document.querySelector(".mail-input");
const errorMessage = document.querySelector(".error-msg");
const mailContainer = document.querySelector(".mail-container");
const successMsg = document.querySelector(".completed");
const blur = document.querySelector(".blur");

btn.addEventListener('click', async function() {
    const mail = emailInput.value;

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async function sendEmail(email) {
        try {
            const response = await fetch('http://localhost:3000/mails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            });

            if (!response.ok) {
                throw new Error('Failed to send email. Please try again.');
            }

            return await response.json();
        } catch (error) {
            throw new Error(error.message === 'Failed to fetch' ? 'Failed to send email. Please try again.' : error.message);
        }
    }

    try {
        if (!isValidEmail(mail)) {
            throw new Error('Oops! That doesn’t look like an email address');
        }

        await sendEmail(mail);
        mailContainer.classList.add('hide');
        successMsg.classList.remove('hide');
    } catch (error) {
        emailInput.style.borderColor = '#ff2965';
        errorMessage.textContent = error.message;
    }
});
