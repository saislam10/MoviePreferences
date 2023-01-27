const deleteClickHandler = async (event) => {
    event.preventDefault();
    if (event.target.type !== "button") return;

    const favoriteId = event.target.getAttribute("data-id");

    if (favoriteId) {
        const response = await fetch('/api/users/movies', {
            method: 'DELETE',
            body: JSON.stringify({ favoriteId }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            window.location.reload();
        } else {
            alert('Failed to delete favorite.');
        }
    }
};

document
    .querySelector('.movies-wrapper')
    .addEventListener('click', deleteClickHandler);