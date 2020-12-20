<template>
  <div>
    <canvas id="gray_scot_model_canvas" width="512" height="512" class="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { GrayScotModelFactory } from "../lib/gray-scott-model/gray-scott-model"

const SPAGE_GRIDSIZE = 256
const SQUARE_SIZE = 20

@Component
export default class GrayScotModelCanvas extends Vue {
  private canvas
  private ctx
  private grayScotModel

  private mounted(){  
    this.canvas = document.getElementById('gray_scot_model_canvas')
    this.ctx = this.canvas.getContext('2d')
    this.onInit(0.022, 0.051)
    this.onDraw(this.grayScotModel.materialU)
  }

  private onInit(feed, kill){
    this.grayScotModel = (new GrayScotModelFactory).create(feed, kill, SPAGE_GRIDSIZE, SQUARE_SIZE)
  }

  private onDraw(materialU){
    const cellWidth = Math.floor(this.canvas.width / SPAGE_GRIDSIZE)
    const cellHeight = Math.floor(this.canvas.height / SPAGE_GRIDSIZE)

    for(let i = 0; i < SPAGE_GRIDSIZE; i++){
      for(let j = 0; j < SPAGE_GRIDSIZE; j++){

        const x = Math.floor(cellWidth * i)
        const y = Math.floor(cellHeight * j)

        let value = materialU[i][j]

        if(materialU[i][j] < 0){
          value = 0
        }else if(materialU[i][j] > 1){
          value = 1
        }

        const colorParsentage = Math.floor(value * 100)
        this.ctx.fillStyle = 'hsl(0, 0%,' + colorParsentage + '%)';
        this.ctx.fillRect(x, y, cellWidth, cellHeight);

      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.canvas {
  border: 1px solid #000;
}
</style>
