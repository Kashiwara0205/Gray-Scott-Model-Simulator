<template>
  <div id="gray-scot-model-simulator-container">
    <canvas id="gray_scot_model_canvas" width="500" height="500" class="canvas"></canvas>

    <br>

    <div id="operation" style="padding-top: 5px;">
      <el-row :gutter="20" style="padding-left: 15px; padding-top: 15px;">
        <el-col :span="20">
          <div style="padding-bottom: 5px"> <b> Default Set: </b> </div>
          <el-select v-model="selectedType" filterable placeholder="Select">
            <el-option 
              v-for="item in defaultTypeList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="padding-left: 15px; padding-top: 15px;">
        <el-col :span="20">
          <div style="padding-bottom: 5px"> <b> Feed Value: </b> </div>
          <el-input type="number" size="10" placeholder="Please input Feed" v-model.number="feed"></el-input>
       </el-col>
      </el-row>

      <el-row :gutter="20" style="padding-left: 15px; padding-top: 15px;">
        <el-col :span="20">
          <div style="padding-bottom: 5px"> <b> Kill Value: </b> </div>
          <el-input type="number" size="10" placeholder="Please input Kill" v-model.number="kill"></el-input>
        </el-col>
      </el-row>

      <el-button style="margin-left: 15px; margin-top: 15px;" @click="onStart()" type="primary">
        Start
      </el-button>

      <el-button style="margin-left: 15px; margin-top: 15px;" @click="onStop()" type="warning">
        Stop
      </el-button>

      <el-button style="margin-left: 15px; margin-top: 15px;" @click="onInit()" type="danger">
        Clear
      </el-button>

    </div> 
  </div>
</template>

<script lang="ts">

import { Component, Vue, Watch } from 'vue-property-decorator';
import { GrayScotModelFactory } from "../lib/gray-scott-model/gray-scott-model"
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';

Vue.use(ElementUI);

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

  private selectedType = "stripe"
  private defaultTypeList = [
    { value: "stripe", label: "stripe" },
    { value: "spots", label: "spots" },
    { value: "amorphous", label: "amorphous" },
    { value: "bubbles", label: "bubbles" },
    { value: "waves", label: "waves" }
  ]

  @Watch("selectedType")
  onChangeType(type: string){
    switch(type){
      case "stripe":
        this.$set(this, "feed", 0.022)
        this.$set(this, "kill", 0.051)
        break;
      case "spots":
        this.$set(this, "feed", 0.035)
        this.$set(this, "kill", 0.065)
        break;
      case "amorphous":
        this.$set(this, "feed", 0.04)
        this.$set(this, "kill", 0.06)
        break;
      case "bubbles":
        this.$set(this, "feed", 0.012)
        this.$set(this, "kill", 0.05)
        break;
      case "waves":
        this.$set(this, "feed", 0.025)
        this.$set(this, "kill", 0.05)
        break;
    }

    this.initDraw()
  }

  private mounted(){  
    this.canvas = document.getElementById('gray_scot_model_canvas')
    this.initDraw()
  }

  private onStart(){
    clearInterval(this.interval);
    this.grayScotModel = this.createGrayScotModel(this.feed, this.kill)
    this.draw(this.grayScotModel.materialU)
    this.interval = setInterval(this.onUpdate, 0.001)
  }

  private onStop(){
    clearInterval(this.interval);
  }

  private onUpdate(){
    for(let i = 0; i < VISUALIZATION_STEP; i++){ this.grayScotModel.update() }
    this.draw(this.grayScotModel.materialU)
  }

  private onInit(){
    this.$set(this, "selectedType", "stripe")
    this.$set(this, "feed", 0.022)
    this.$set(this, "kill", 0.051)
    this.initDraw()
  }

  private initDraw(){
    clearInterval(this.interval);
    this.grayScotModel = this.createGrayScotModel(this.feed, this.kill)
    this.draw(this.grayScotModel.materialU)
  }

  private draw(materialU){
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

#gray-scot-model-simulator-container {
  display: grid;
  grid-template-rows: 500px 1fr;
  grid-template-columns: 500px 1fr;
}

#gray_scot_model_canvas{
  grid-row: 1 / 3;
  grid-column: 1 / 2;
  border: 1px solid #000;
}

#operation{
  grid-row: 1 / 3;
  grid-column: 2 / 4;
  border: 1px solid #000;
  padding-left: 10px;
}
</style>
