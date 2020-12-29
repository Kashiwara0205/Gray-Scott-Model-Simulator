<template>
  <div id="gray-scot-model-simulator-container">
    <div id="output">
      <canvas id="gray_scot_model_canvas" width="500" height="500" class="canvas"></canvas>
    </div>
    <br>
    <div id="operation" style="padding-top: 5px;">

      <font style="margin-left: 20px; padding-top: 50px;" size="5" color="#333399">feed: </font> 
      <input type="number" size="10" v-model.number="feed" maxlength="10"> 
      <font style="margin-left: 20px;" size="5" color="#333399">kill: </font> 
      <input type="number" size="10" v-model.number="kill" maxlength="10"> 

      <br>

      <button style="margin-left: 20px; margin-top: 10px;" type="button">
        <font size="5" color="#333399" @click="onStart(feed, kill)">Start</font>
      </button>

      <button style="margin-left: 20px;" type="button">
         <font size="5" color="#333399" @click="onStop">Stop</font>
      </button>

      <button style="margin-left: 20px;" type="button">
         <font size="5" color="#333399" @click="onInit">Init</font>
      </button>

    </div> 
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { GrayScotModelFactory } from "../lib/gray-scott-model/gray-scott-model"

const SPACE_GRIDSIZE = 100
const SQUARE_SIZE = 10
const VISUALIZATION_STEP = 15
const CANVAS_WIDTH = 500
const CANVAS_HEIGHT = 500

@Component
export default class GrayScotModelSimulator extends Vue {
  private canvas
  private grayScotModel
  private interval
  private feed = 0.022
  private kill = 0.051

  private mounted(){  
    this.canvas = document.getElementById('gray_scot_model_canvas')
    this.onInit()
  }

  private onStart(feed: number, kill: number){
    clearInterval(this.interval);
    this.grayScotModel = this.createGrayScotModel(feed, kill)
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

  private onInit(){
    clearInterval(this.interval);
    this.$set(this, "feed", 0.022)
    this.$set(this, "kill", 0.051)
    this.grayScotModel = this.createGrayScotModel(0.022, 0.051)
    this.onDraw(this.grayScotModel.materialU)
  }

  private onDraw(materialU){
    const ctx = this.canvas.getContext('2d')
    const cellWidth = Math.floor(CANVAS_WIDTH / SPACE_GRIDSIZE)
    const cellHeight = Math.floor(CANVAS_HEIGHT / SPACE_GRIDSIZE)

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

  private createGrayScotModel(feed: number, kill: number){
    return (new GrayScotModelFactory).create(feed, kill, SPACE_GRIDSIZE, SQUARE_SIZE)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.canvas {
  border: 1px solid #000;
}

#gray-scot-model-simulator-container {
  display: grid;
  grid-template-rows: 500px 1fr;
  grid-template-columns: 500px 1fr;
}

#output{
  grid-row: 1 / 3;
  grid-column: 1 / 2;
}

#operation{
  grid-row: 1 / 3;
  grid-column: 2 / 4;
  background: #8f8;
  padding-left: 10px;
}
</style>
