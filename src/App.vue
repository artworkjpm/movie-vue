<template>
  <div id="app">
    <NavBarTop />
    <div class="container">
      <div class="row">
        <div class="col-sm-6 mx-auto mt-4">
          <keep-alive>
            <router-view />
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBarTop from "./components/NavBarTop";
export default {
  name: "app",
  components: { NavBarTop }
};
</script>
