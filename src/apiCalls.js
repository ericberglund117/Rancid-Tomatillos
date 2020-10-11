
export const getAllMovies = () => {
  return fetch("https://rancid-tomatillos.herokuapp.com/api/v2/movies")
  .then(response => response.json())
};

export const getSingleMovie = (idNumber) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${idNumber}`)
  .then(response => response.json())
};
