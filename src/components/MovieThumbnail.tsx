const MovieThumbnail = () => {
  return (
    <div className="movie-thumbnail">
      <img
        src="https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_QL75_UX380_CR0,4,380,562_.jpg"
        alt="Movie Poster"
        className="movie-poster"
      />
      <div className="movie-info">
        <h3 className="movie-title">Movie Title</h3>
        <p className="movie-year">2023</p>
        <p className="movie-rating">PG-13</p>
      </div>
    </div>
  );
};

export default MovieThumbnail;
