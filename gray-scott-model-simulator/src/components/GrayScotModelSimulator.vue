<template>
  <div>
    <canvas id="gray_scot_model_canvas" width="500" height="500" class="canvas"></canvas>

    <br>

    <div>

      <button type="button">
        <font size="5" color="#333399" @click="onStart(feed, kill)">start</font>
      </button>

      <button type="button" style="margin-left: 20px;">
         <font size="5" color="#333399" @click="onStop">stop</font>
      </button>

      <font style="margin-left: 20px;" size="5" color="#333399">feed: </font> 
      <input type="number" size="10" v-model.number="feed" maxlength="10"> 

      <font style="margin-left: 20px;" size="5" color="#333399">kill: </font> 
      <input type="number" size="10" v-model.number="kill" maxlength="10"> 

    </div> 

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { GrayScotModelFactory } from "../lib/gray-scott-model/gray-scott-model"

const SPACE_GRIDSIZE = 100
const SQUARE_SIZE = 20
const VISUALIZATION_STEP = 10

@Component
export default class GrayScotModelSimulator extends Vue {
  private canvas
  private grayScotModel
  private interval
  private feed = 0.022
  private kill = 0.051

  private mounted(){  
    this.canvas = document.getElementById('gray_scot_model_canvas')
  }

  private onStart(feed: number, kill: number){
    clearInterval(this.interval);
    this.grayScotModel = (new GrayScotModelFactory).create(feed, kill, SPACE_GRIDSIZE, SQUARE_SIZE)
    this.onDraw(this.grayScotModel.materialU)
    this.interval = setInterval(this.onUpdate, 0.001)
  }

  private onStop(){
    clearInterval(this.interval);
  }

  private onUpdate(){
    for(let i = 0; i < VISUALIZATION_STEP; i++){ this.grayScotModel.update() }
    this.onDraw(this.grayScotModel.materialU)
  }

  private onDraw(materialU){
    const ctx = this.canvas.getContext('2d')
    const cellWidth = Math.floor(this.canvas.width / SPACE_GRIDSIZE)
    const cellHeight = Math.floor(this.canvas.height / SPACE_GRIDSIZE)

    for(let i = 0; i < SPACE_GRIDSIZE; i++){
      for(let j = 0; j < SPACE_GRIDSIZE; j++){

        const x = Math.floor(cellWidth * i)
        const y = Math.floor(cellHeight * j)

        let value = materialU[i][j]

        if(materialU[i][j] < 0){
          value = 0
        }else if(materialU[i][j] > 1){
          value = 1
        }

        const colorParsentage = Math.floor(value * 100)
        ctx.fillStyle = 'hsl(180, 50%,' + colorParsentage + '%)';
        ctx.fillRect(x, y, cellWidth, cellHeight);
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
