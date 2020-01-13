<template>
  <div>
    <!-- <pre v-html="origArray"></pre> -->
    <div class="row">
      <div class="col-lg-4">
        <img :src="poster[1]" alt="" />
      </div>
      <div class="col-lg-8">
        <b-table striped hover :items="details" small thead-class="hidden_header"> </b-table>
        <b-table striped hover :items="ratings[1]" small :fields="fields">
          <template v-slot:cell(name)="data"> Source Value </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      origArray: null,
      details: null,
      poster: "",
      ratings: Array,
      fields: [
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
      const apikey = "8cc341a0";
      axios.get(`http://www.omdbapi.com/?apikey=${apikey}&i=${id}`).then(response => this.makeArray(response.data));
    },
    makeArray(object) {
      this.origArray = object;
      this.details = Object.entries(object);
      this.poster = this.details[13];
      this.ratings = this.details[14];
      this.details.splice(13, 2);
      console.log(this.poster, this.ratings);
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
</style>
