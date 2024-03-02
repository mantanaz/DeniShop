const signupEl = document.querySelector('.signup');

const submitForm = (e) => {
    e.preventDefault();

    const formData = new FormData(signupEl);
    const fromProps = Object.fromEntries(formData);    
    const user = {
        id:Date.now()
        // ...fromProps
    };
    localStorage.setItem('user', JSON.stringify(fromProps));

}
signupEl.addEventListener('submit', submitForm)