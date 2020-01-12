<template>
  <div>
    <div>Home page</div>
    <div>
      <b-form-input v-model="movie" placeholder="Enter your name"></b-form-input>
      <div class="mt-2">Value: {{ movie }}</div>
    </div>
    <div>
      <button @click="submit()">Submit</button>
    </div>
    <div>{{ movies }}</div>
    <div v-for="item in movies" :key="item.imdbID">
      <router-link :to="{ name: 'movieDetails', params: { movieName: cleanTitle(item.Title), id: item.imdbID } }"><img :src="item.Poster" alt=""/></router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      movies: null,
      movie: ""
    };
  },

  methods: {
    getMovies() {
      const apikey = "8cc341a0";
      let movie = this.movie;
      if (!movie) {
        alert("Please type in a movie");
      } else {
        axios
          .get(`http://www.omdbapi.com/?apikey=${apikey}&s=${movie}`)
          .then(response => ((this.movies = response.data.Search), this.noMoviesFound(this.movies)))
          .catch(error => console.log(error));
      }
    },
    cleanTitle(title) {
      return title
        .replace(/ /g, "-")
        .replace(/[:,]/g, "")
        .toLowerCase();
    },
    submit() {
      this.getMovies();
    },
    noMoviesFound(movies) {
      if (!movies) {
        alert("no movies found, try to amend your title");
      }
    }
  },
  created() {
    //this.getMovies();
  }
};
</script>

<style></style>
