<template>
  <div>
    <canvas id="gray_scot_model_canvas" width="500" height="500" class="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class GrayScotModelCanvas extends Vue {
  private ctx: {}

  private mounted(){
    const canvas = document.getElementById('gray_scot_model_canvas') as HTMLCanvasElement
    this.ctx = canvas.getContext('2d')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.canvas {
  border: 1px solid #000;
}
</style>
