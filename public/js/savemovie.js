const saveClickHandler = async (event) => {
    event.preventDefault();
    if (event.target.type !== "button" && event.target.textContent !== "Saved!") return;
  
    const movieId = event.target.getAttribute("data-id");
    console.log(movieId);
    const posterEl = event.target.previousSibling.previousSibling;
    const posterPath = posterEl.getAttribute('src');
    console.log(posterPath);
    const movieEl = posterEl.previousSibling.previousSibling;
    const movieTitle = movieEl.getAttribute('data-title');
    console.log(movieTitle);
    
    if (movieId && posterPath && movieTitle) {
      const response = await fetch('/api/users/movies', {
        method: 'POST',
        body: JSON.stringify({ movieTitle, posterPath, movieId }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        event.target.textContent = "Saved!";
        event.target.style.backgroundColor = "green";
        event.target.style.color = "white";

      } else {
        alert('Failed to save movie.');
      }
    }
  };

  document
  .querySelector('.movies-wrapper')
  .addEventListener('click', saveClickHandler);