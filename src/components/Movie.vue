<template>
  <div>
    <div v-if="loading" class="mt-4">
      <b-spinner label="Spinning"></b-spinner>
    </div>
    <!-- <pre v-html="origArray"></pre> -->
    <div class="row" v-if="!loading">
      <div class="col-lg-4">
        <img :src="poster[1]" alt="details.Title" />
      </div>
      <div class="col-lg-8">
        <b-table striped hover :items="details" small bordered :fields="fields1" thead-class="hidden_header"> </b-table>
        <b-table striped hover :items="ratings[1]" small bordered :fields="fields2"> </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      origArray: null,
      details: null,
      poster: "",
      ratings: Array,
      fields1: [
        {
          key: "0",
          label: "",
          tdClass: "firstTD"
        },
        {
          key: "1",
          label: ""
        }
      ],
      fields2: [
        {
          key: "Source",
          label: "Ratings Source"
        },
        {
          key: "Value",
          label: "Rating"
        }
      ]
    };
  },

  methods: {
    getMovieId(id) {
      this.loading = true;
      const apikey = "8cc341a0";
      axios.get(`https://www.omdbapi.com/?apikey=${apikey}&i=${id}`).then(response => this.makeArray(response.data), (this.loading = false));
    },
    makeArray(object) {
      this.origArray = object;
      this.details = Object.entries(object);
      this.poster = this.details[13];
      this.ratings = this.details[14];
      this.details.splice(13, 2);
      //console.log(this.poster, this.ratings);
    }
  },
  mounted() {
    this.getMovieId(this.$route.params.id);
  }
};
</script>

<style>
.hidden_header {
  display: none;
}
.firstTD {
  font-size: 0.8rem;
  padding-right: 20px !important;
}
</style>
