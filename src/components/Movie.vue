<template>
  <div>
    <div>
      {{ $route.params.movieName }}
      {{ $route.params.id }}
    </div>

    <div>
      {{ details.Title }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      details: null
    };
  },

  methods: {
    getMovieId(id) {
      const apikey = "8cc341a0";
      axios.get(`http://www.omdbapi.com/?apikey=${apikey}&i=${id}`).then(response => (this.details = response.data));
    }
  },
  mounted() {
    this.getMovieId(this.$route.params.id);
  }
};
</script>

<style></style>
