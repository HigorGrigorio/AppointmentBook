import validator from 'validator';

export default class Register {
    /**
     * 
     * @param {string} selectClass 
     */
    constructor(selectClass) {
        if (typeof selectClass !== 'string') {
            throw new Error("selectClass must be a string");
        }

        this.selectClass = selectClass;
    }

    /**
     *  initialize the login validator.
     */
    init() {
        this.form = document.querySelector(this.selectClass);

        if (this.form) {
            // regiter event listener
            this.form.addEventListener("submit", this.onSubmit);
        }
    }

    /**
     * 
     * @param {Event} event 
     */
    onSubmit(event) {
        event.preventDefault();

        /**
         * @param {EventTarget} target
        */
        const { target } = event;

        /**
        * @param {HTMLInputElement} name
        */
        const name = target.querySelector('input[name="name"]');

        /**
        * @param {HTMLInputElement} email
        */
        const email = target.querySelector('input[name="email"]');

        /**
        * @param {HTMLInputElement} password
        */
        const password = target.querySelector('input[name="password"]');

        /**
        * @param {HTMLInputElement} password
        */
        const confirmPassword = target.querySelector('input[name="confirm_password"]');

        // input's not found
        if (!name || !email || !password || !confirmPassword) {
            return;
        }
        

        if (!name.value || !email.value || !password.value || !confirmPassword.value) {
            alert('Fill in all form fields.');
            return;
        }

        if (!validator.isEmail(email.value)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (password.value.length < 3 && password.value.length > 50) {
            alert('Please enter a valid password.');
            return;
        }

        if (password.value !== confirmPassword.value) {
            alert("password's must be equals");
        }
        target.submit();
    }
};