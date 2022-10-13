async function editFormHandler(event) {
    event.preventDefault();

    const display_name = document
        .querySelector('input[name="display-name"]')
        .value.trim();
    const birthday = document
        .querySelector('input[name="birthday"]')
        .value.trim();
    const location = document
        .querySelector('input[name="location"]')
        .value.trim();
    const bio = document
        .querySelector('textarea[name="bio"]')
        .value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (validator.isEmpty(display_name) || !(validator.isDate(birthday)) || validator.isEmpty(location)) {
        if (validator.isEmpty(display_name)) {
            document.querySelector('input[name="display-name"]').style.border = '2px solid #FF7B93';
        } else {
            document.querySelector('input[name="display-name"]').style.border = '1px solid #CAABDD';
        }
        if (!(validator.isDate(birthday))) {
            document.querySelector('input[name="birthday"]').style.border = '2px solid #FF7B93';
        } else {
            document.querySelector('input[name="birthday"]').style.border = '1px solid #CAABDD';
        }
        if (validator.isEmpty(location)) {
            document.querySelector('input[name="location"]').style.border = '2px solid #FF7B93';
        } else {
            document.querySelector('input[name="location"]').style.border = '1px solid #CAABDD';
        }
    } 
    else {
        const response = await fetch(`/api/profiles/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                display_name,
                birthday,
                location,
                bio,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        if (response.ok) {
            document.location.replace(`/profile-page/${id}`);
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#edit-profile-form').addEventListener('submit', editFormHandler);