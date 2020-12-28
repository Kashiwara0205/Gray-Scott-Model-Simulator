<template>
  <div id="app">
    <h1>Gray-Scot-Model Simulator</h1>
    <GrayScotModelSimulator></GrayScotModelSimulator>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GrayScotModelSimulator from './components/GrayScotModelSimulator.vue';

@Component({
  components: {
    GrayScotModelSimulator
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}

</style>
