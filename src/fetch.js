const BASE_URL = "http://localhost:3000/api/v1"
const GAMES_URL = `${BASE_URL}/games`
const USERS_URL = `${BASE_URL}/users`

fetch(`${GAMES_URL}`, { method: 'GET'})
  .then(response => response.json())
  .then(console.log)
