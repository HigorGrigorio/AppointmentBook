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
        * @param {HTMLInputElement} telephone
        */
        const telephone = target.querySelector('input[name="telephone"]');


        // input's not found
        if (!name || !email || !telephone) {
            return;
        }

        if (!name.value) {
            alert('Name is required');
            return;
        }

        if (!email.value && !telephone.value) {
            alert('Fill in all form fields.');
            return;
        }

        if (!validator.isEmail(email.value)) {
            alert('Please enter a valid email address.');
            return;
        }

        target.submit();
    }
};