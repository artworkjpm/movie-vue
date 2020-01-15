<template>
  <div id="app">
    <NavBarTop />
    <div class="container">
      <div class="row">
        <div class="col mx-auto mt-4">
          <keep-alive :include="['Home', 'Slider1', 'Slider2']">
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
