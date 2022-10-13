async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#user-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        // check the response status
        if (response.ok) {
            console.log('success');
        } else {
            alert(response.statusText);
        }
    }

    if (username && password) {
        const response = await fetch('/api/profiles', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
        });

        // check the response status
        if (response.ok) {
            document.location.replace(`/profile-page/`);
            console.log('success');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);