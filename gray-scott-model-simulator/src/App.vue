<template>
  <div id="app">
    <h1> <i class="el-icon-s-platform"></i>  Gray-Scot-Model Simple Simulator </h1>
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
