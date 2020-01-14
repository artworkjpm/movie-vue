<template>
  <div class="col-lg-6 mx-auto">
    <div>
      <div class="mb-3">
        <h6>Standard search (my original design and favourite, films link to more details)</h6>
      </div>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-input v-model="movie" placeholder="Search for a movie..." required></b-form-input>
        <div class="mt-3">
          <b-button type="submit" variant="primary mr-2">Search</b-button>
          <b-button type="reset" variant="danger">Clear</b-button>
        </div>
      </b-form>
    </div>
    <div>
      <div v-if="loading" class="mt-4">
        <b-spinner label="Spinning"></b-spinner>
      </div>
      <div v-if="!loading">
        <table class="table table-striped table-hover mt-4">
          <tbody>
            <tr v-for="item in moviesArray" :key="item.filmID">
              <td>
                <router-link
                  :to="{ name: 'movieDetails', params: { movieName: cleanTitle(item.title), id: item.filmID } }"
                >
                  <img :src="item.poster" alt class="imgPoster" />
                </router-link>
              </td>
              <td class="noLinkStyle">
                <router-link
                  :to="{ name: 'movieDetails', params: { movieName: cleanTitle(item.title), id: item.filmID } }"
                >
                  <h5 class="font-weight-bold mt-4">{{ item.title }}</h5>
                  <p class="mb-0">Year: {{ item.year }}</p>
                  <p>Type: {{ item.type | capitalize }}</p>
                  <p>Dir: {{item.director}}</p>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      moviesArray: [],
      movie: "",
      loading: false
    };
  },

  methods: {
    getMovies() {
      const apikey = "8cc341a0";
      let movie = this.movie;
      if (!movie) {
        alert("Please type in a movie");
      } else {
        this.loading = true;
        axios
          .get(`https://www.omdbapi.com/?apikey=${apikey}&s=${movie}`)
          .then(response => response.data.Search)
          .then(
            movies => (
              !movies && this.noMoviesFound(movies),
              movies && this.getDirector(movies),
              (this.loading = false)
            )
          )
          .catch(error => console.log(error));
      }
    },
    getDirector(movies) {
      //console.log(movies);
      movies.forEach(id => {
        const apikey = "8cc341a0";
        axios
          .get(`https://www.omdbapi.com/?apikey=${apikey}&i=${id.imdbID}`)
          .then(response => {
            return this.moviesArray.push({
              title: response.data.Title,
              poster: response.data.Poster,
              year: response.data.Year,
              filmID: response.data.imdbID,
              director: response.data.Director,
              type: response.data.Type
            });
          });
      });
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
