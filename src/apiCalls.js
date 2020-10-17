
export const getAllMovies = () => {
  return fetch("https://rancid-tomatillos.herokuapp.com/api/v2/movies")
  .then(response => response.json())
};

export const getSingleMovie = (movieID) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${movieID}`)
  .then(response => response.json())
};

export const getUser = (login) => {
  return fetch("https://rancid-tomatillos.herokuapp.com/api/v2/login",
  {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(login)
  })
  .then(response => {
    if (response.ok) {
      return response.json()
  }})
};

export const getUserRatings = (id) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${id}/ratings`)
  .then(response => response.json())
};

export const getMovieRatings = (userId, movieId, rating) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${userId}/ratings`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        movie_id: parseInt(movieId),
        rating: parseInt(rating)})
    })
    .then(response => {
      if (response.ok) {
        return response.json()
    }})

}

export const deleteMovieRatings = (userId, ratingID) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${userId}/ratings/${ratingID}`,
    {
      method: 'DELETE'
    })
    
}