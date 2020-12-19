<template>
  <div id="app">
    <h1>Gray-Scot-Model Simulator</h1>
    <GrayScotModelCanvas></GrayScotModelCanvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GrayScotModelCanvas from './components/GrayScotModelCanvas.vue';

@Component({
  components: {
    GrayScotModelCanvas
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
