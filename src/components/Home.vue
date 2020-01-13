<template>
  <div class="col-lg-6 mx-auto">
    <div>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-input v-model="movie" placeholder="Search for a movie..." required></b-form-input>
        <div class="mt-3">
          <b-button type="submit" variant="primary mr-2">Search</b-button>
          <b-button type="reset" variant="danger">Clear</b-button>
        </div>
      </b-form>
    </div>
    <div>
      <table class="table table-striped table-hover mt-4">
        <tbody>
          <tr v-for="item in movies" :key="item.imdbID">
            <td>
              <router-link :to="{ name: 'movieDetails', params: { movieName: cleanTitle(item.Title), id: item.imdbID } }"><img :src="item.Poster" alt="" class="imgPoster" /> </router-link>
            </td>
            <td class="noLinkStyle">
              <router-link :to="{ name: 'movieDetails', params: { movieName: cleanTitle(item.Title), id: item.imdbID } }">
                <h5 class="font-weight-bold mt-4">{{ item.Title }}</h5>
                <p class="mb-0">Year: {{ item.Year }}</p>
                <p>Type: {{ item.Type | capitalize }}</p>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
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
    onSubmit(evt) {
      evt.preventDefault();
      this.getMovies();
    },
    onReset(evt) {
      evt.preventDefault();
      this.movie = null;
    },
    noMoviesFound(movies) {
      if (!movies) {
        alert("no movies found, try the title");
      }
    }
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>

<style></style>
