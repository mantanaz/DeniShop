const signupFormEl = document.getElementById('signupForm');
const signinFormEl = document.getElementById('signinForm');
const textToggleFormEls = document.querySelectorAll('.text-toggle-form');
let IsActiveForm = true;

const toggleForm = (e) => {
    console.log(signinFormEl)
    if(IsActiveForm) {
        signinFormEl.style.display = 'none';
        signupFormEl.style.display = 'flex';
    } else {
        signinFormEl.style.display = 'flex';
        signupFormEl.style.display = 'none';
    }

    IsActiveForm = !IsActiveForm;
};

const submitSignUpForm = (e) => {
    e.preventDefault();
    const formData = new FormData(signupFormEl);
    const newUser = Object.fromEntries(formData);    

    const users = JSON.parse(localStorage.getItem('users') ?? '[]');

    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('users', JSON.stringify([...users], newUser));

    window.location.href = 'home.html';

    alert('Form data submitted successfully!')

};

const submitSignInForm = (e) => {
    e.preventDefault();
    const formData = new FormData(signupFormEl);
    const newUser = Object.fromEntries(formData);    

    const users = JSON.parse(localStorage.getItem('users') ?? '[]');

    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('users', JSON.stringify([...users], newUser));

    const userMatchesCredentials = (user) => {
        return user.email === newUser.email && user.password === newUser.password
    };

    const foundedUser = users.find(userMatchesCredentials);
    if (foundedUser) {
        localStorage.setItem('user', JSON.stringify(newUser));
        console.log('User found:', foundedUser)
    } else {
        console.log('User not found');
        alert('User not found!')
    }

    window.location.href = 'home.html';
};

textToggleFormEls.forEach((item) => item.addEventListener('click', toggleForm));

// textToggleFormEls.addEventListener('click', toggleForm)

signupFormEl.addEventListener('submit', submitSignUpForm);

signinFormEl.addEventListener('submit', submitSignInForm);
