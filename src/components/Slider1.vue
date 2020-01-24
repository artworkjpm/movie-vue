<template>
  <div class="col-lg-6 mx-auto">
    <div>
      <div class="mb-3">
        <h6>
          Bootstrap carousel ( not looking good on mobile so I made
          <a href="/slider2">Slider2</a>)
        </h6>
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
        <div class="mt-4">
          <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="4000"
            controls
            indicators
            background="#000000"
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
            <b-carousel-slide v-for="item in moviesArray" :key="item.filmID">
              <template v-slot:img>
                <router-link
                  :to="{ name: 'movieDetails', params: { movieName: cleanTitle(item.title), id: item.filmID } }"
                >
                  <div>
                    <div>
                      <img :src="item.poster" alt="image slot" height="300px" />
                    </div>
                    <div class="innerText">
                      <p class="font-weight-bold mb-0">{{ item.title }}</p>
                      <p class="mb-0">{{ item.year }}</p>
                      <p>Dir: {{item.director}}</p>
                    </div>
                  </div>
                </router-link>
              </template>
            </b-carousel-slide>
          </b-carousel>

          <p class="mt-4" v-if="moviesArray.length > 0">
            Results: {{moviesArray.length}}
            <br />
            Slide #: {{ slide }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Slider1",
  data() {
    return {
      movie: "",
      loading: false,
      slide: 0,
      sliding: null,
      moviesArray: []
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
              movies && this.getDirector(movies)
            )
          )
          .catch(error => console.log(error));
      }
    },
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    getDirector(movies) {
      //console.log(movies);
      movies.forEach(id => {
        const apikey = process.env.VUE_APP_JPM_MOVIE_TOKEN;
        axios
          .get(`https://www.omdbapi.com/?apikey=${apikey}&i=${id.imdbID}`)
          .then(response => {
            return this.moviesArray.push({
              title: response.data.Title,
              poster: response.data.Poster,
              year: response.data.Year,
              filmID: response.data.imdbID,
              director: response.data.Director
            });
          }, (this.loading = false));
      });

      //console.log(this.moviesArray);
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.getMovies();
    },
    onReset(evt) {
      evt.preventDefault();
      this.movie = null;
    },
    noMoviesFound() {
      alert("no movies found, is your movie title correct?");
      this.loading = false;
    },
    cleanTitle(title) {
      return title
        .replace(/ /g, "-")
        .replace(/[:,]/g, "")
        .toLowerCase();
    }
  }
};
</script>

<style>
.innerText {
  position: relative;
  bottom: 250px;
  left: 250px;
  color: white;
  width: 260px;
}

@media only screen and (max-width: 1200px) {
  .innerText {
    width: 180px;
  }
}
@media only screen and (max-width: 400px) {
  .innerText {
    width: 250px;
    bottom: 40px;
    left: 30px;
    text-align: right;
  }
}
</style>
