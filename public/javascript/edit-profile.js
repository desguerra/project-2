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

document.querySelector('#edit-profile-form').addEventListener('submit', editFormHandler);