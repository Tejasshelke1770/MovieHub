import axios from "axios";

const instance = axios.create({
    baseURL:"https://api.themoviedb.org/3",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTlmYzdkMmNlN2Y0ZGI1YjBkZTMzMjRlYWE4YjM3MSIsIm5iZiI6MTcyNTI4MTQ2MS43NzMzNjUsInN1YiI6IjY2ZDQwZWE3MGU5YTRiYzk4MjBlNDZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._cOAVzqe-Hb3NTbGqDqQTZP7EluQ9MMz26azOcUQjdY'
      }
});

export default instance; 