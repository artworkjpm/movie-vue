<template>
  <div class="col-lg-6 mx-auto mb-5">
    <div>
      <div class="mb-3">
        <h6>Handcoded slider, no frameworks or pluggins</h6>
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
    <div v-if="!loading" id="slide" class="mx-auto mt-4">
      <div v-for="(item, index) in moviesArray" :key="index">
        <img :src="item.poster" height="400" width="280" />
        <div class="filmText">
          <h6>{{item.title}}</h6>
          <p>{{item.year}}, Dir: {{item.director}}</p>
          <p>{{count}} | {{moviesArray.length}}</p>
          <a></a>
        </div>
      </div>
    </div>
    <div class="control mt-2 mx-auto" v-if="moviesArray.length > 0">
      <div class="col-6" @click="previous">PREVIOUS</div>
      <div class="col-6 text-right" @click="next">NEXT</div>
      <div @click="stop">stop</div>
      <div @click="timer">start</div>
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
      interval: null
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
              director: response.data.Director
            });
          }, (this.loading = false));
      });
      this.timer();
      console.log(this.moviesArray);
    },

    timer() {
      if (this.count !== this.moviesArray.length) {
        this.interval = setInterval(() => this.next(), 4000);
        this.interval();
      } else {
        clearInterval(this.interval);
      }
    },
    stop() {
      clearInterval(this.interval);
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

    /* SLIDER CODE */
    previous() {
      if (this.count !== 1) {
        this.count -= 1;
        this.scroll("previous");
        this.stop();
      }
    },
    next() {
      if (this.count < this.moviesArray.length) {
        this.count += 1;
        this.scroll("next");
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
    }
    /* slideLoop() {
      console.log(this.direction);

      if (
        this.direction === "forward" &&
        this.count !== this.moviesArray.length
      ) {
        this.next();
      } else if (this.count !== 1) {
        this.direction = "backward";
        this.previous();
      } else {
        this.direction = "forward";
        this.next();
      }
    },
    resetScroll() {
      this.count = 0;
      this.direction = "forward";
      this.scroll("reset");
    } */
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
