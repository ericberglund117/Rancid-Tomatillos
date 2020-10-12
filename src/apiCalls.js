
export const getAllMovies = () => {
  return fetch("https://rancid-tomatillos.herokuapp.com/api/v2/movies")
  .then(response => response.json())
};

export const getSingleMovie = (movieID) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${movieID}`)
  .then(response => response.json())
};
