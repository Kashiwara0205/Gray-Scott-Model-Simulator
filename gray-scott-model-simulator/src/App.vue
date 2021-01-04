<template>
  <div id="app">
    <h2> Gray-Scot-Model Simulator made by Vue + Ts </h2>
    <GrayScotModelSimulator></GrayScotModelSimulator>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GrayScotModelSimulator from './components/GrayScotModelSimulator.vue';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';

Vue.use(ElementUI);

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
}

</style>
