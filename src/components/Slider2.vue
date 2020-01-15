<template>
  <div class="col-lg-6 mx-auto mb-5">
    <div>
      <div class="mb-3">
        <h6>Handcoded slider, no frameworks or pluggins, films link to desc page</h6>
      </div>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-input v-model="movie" placeholder="Search for a movie..." required></b-form-input>
        <div class="mt-3">
          <b-button type="submit" variant="primary mr-2">Search</b-button>
          <b-button type="reset" variant="danger">Clear</b-button>
        </div>
      </b-form>
    </div>
    <div v-if="loading" class="mt-4">
      <b-spinner label="Spinning"></b-spinner>
    </div>
    <div v-if="!loading">
      <div id="slide" class="mx-auto mt-4">
        <div v-for="(item, index) in moviesArray" :key="index">
          <router-link
            :to="{ name: 'movieDetails', params: { movieName: cleanTitle(item.title), id: item.filmID } }"
          >
            <img :src="item.poster" height="400" width="280" />
          </router-link>
          <div class="filmText">
            <h6>{{item.title}}</h6>
            <p>{{item.year}} | Dir: {{item.director}}</p>
            <p>{{count}} of {{moviesArray.length}}</p>
            <a></a>
          </div>
        </div>
      </div>
      <div class="control mt-2 mx-auto" v-if="moviesArray.length > 0">
        <div class="col-4 h1" @click="prevButton">
          <b-icon-chevron-left />
        </div>
        <div class="col-4 h1 text-center" v-if="showPause">
          <b-icon-pause @click="stop"></b-icon-pause>
        </div>
        <div class="col-4 h1 text-center" v-if="!showPause">
          <b-icon-play @click="start"></b-icon-play>
        </div>
        <div class="col-4 text-right h1" @click="nextButton">
          <b-icon-chevron-right />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Slider2",
  data() {
    return {
      movie: "",
      loading: false,
      count: 1,
      direction: "forward",
      frame: 1,
      moviesArray: [],
      interval: null,
      showPause: false
    };
  },
  methods: {
    getMovies() {
      this.moviesArray = [];
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
    getDirector(movies) {
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
              director: response.data.Director
            });
          });
      });
      this.timer();
    },

    timer() {
      this.interval = setInterval(() => this.next(), 4000);
      this.interval;
      this.loading = false;
    },
    start() {
      this.next();
      this.timer();
      this.showPause = !this.showPause;
    },
    stop() {
      clearInterval(this.interval);
      this.showPause = !this.showPause;
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.count = 1;
      this.showPause = false;
      this.stop();
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

    /* SLIDER CODE */
    prevButton() {
      if (this.count !== 1) {
        this.count -= 1;
        this.showPause = true;
        this.scroll("previous");
        this.stop();
      }
    },
    nextButton() {
      if (this.count < this.moviesArray.length) {
        this.count += 1;
        this.showPause = true;
        this.scroll("next");
        this.stop();
      }
    },

    previous() {
      if (this.count !== 1) {
        this.count -= 1;
        this.scroll("previous");
        this.showPause = true;
      }
      if (this.count === 1) {
        clearInterval(this.interval);
        this.timer();
      }
    },
    next() {
      if (this.count < this.moviesArray.length) {
        this.count += 1;
        this.scroll("next");
      }
      if (this.count === this.moviesArray.length) {
        clearInterval(this.interval);
        this.interval = setInterval(() => this.previous(), 4000);
        this.interval;
      }
    },
    scroll(position) {
      let el = document.getElementById("slide");
      let pos = 0;
      let id = setInterval(frame, 5);
      let num = this.moviesArray.length - this.frame;
      let width = 280;
      let resize = num * width;
      let check = position == "reset" ? resize : width;
      function frame() {
        if (pos == check) {
          clearInterval(id);
        } else {
          pos += 5;
          if (position == "next") {
            el.scrollLeft += 5;
          } else {
            el.scrollLeft -= 5;
          }
        }
      }
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

<style lang="scss">
.control {
  width: 280px;
  display: flex;
  div {
    cursor: pointer;
  }
}

#slide {
  display: flex;
  overflow: hidden;
  align-items: flex-start;
  width: 280px;
}
.prev {
  display: inline-block;
  margin-right: 50px;
  cursor: pointer;
}
.next {
  display: inline-block;
  cursor: pointer;
}
#slide > div {
  min-width: 280px;
  padding-right: 20px;
  box-sizing: border-box;
  overflow: hidden;
}
#slide > div > img {
  display: block;
}
.filmText {
  color: #ffffff;
  background: #212121;
  width: 280px;
  padding: 15px;
}
#slide > div > div > h6 {
  margin: 0;
  font-size: 16px;
}
#slide > div > div > p {
  margin-top: 10px;
  margin-bottom: 0;
  font-size: 14px;
}
</style>
