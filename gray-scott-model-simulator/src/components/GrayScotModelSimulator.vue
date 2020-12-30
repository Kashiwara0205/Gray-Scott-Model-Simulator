<template>
  <div id="gray-scot-model-simulator-container">
    <canvas id="gray_scot_model_canvas" width="800" height="600" class="canvas"></canvas>

    <br>

    <div id="introductions">
      <div>
          <h2 style="margin-left: 5px; padding-left: 15px;"> <i class="el-icon-warning-outline"></i>  Instructions </h2>
          <div style="margin-left: 20px; margin-botoom: 20px; padding-top: 10px; padding-bottom: 10px; background-color: #c0c0c0;">
          <b style="padding-left: 15px; "> 1. select preset or input feed rate and kill rate </b> 
          
          <div style="margin-top: 10px;">
            <b style="padding-left: 15px;">2. select your favorite color</b>
          </div>
          <div style="margin-top: 10px;">
           <b style="padding-left: 15px;">3. at last, push start button</b>
          </div>
        </div>
      </div>
    </div>

    <div id="setting">

      <h2 style="padding-left: 20px;"> <i class="el-icon-setting"></i>  Setting </h2>
      <el-row :gutter="20" style="padding-left: 20px; padding-top: 5px;">
        <el-col :span="10">
          <div style="padding-bottom: 5px"> <b> Preset </b> </div>
          <el-select v-model="selectedType" filterable placeholder="Select">
            <el-option 
              v-for="item in defaultTypeList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="10">
          <div style="padding-bottom: 5px"> <b> Color </b> </div>
          <el-color-picker v-model="hexColor"></el-color-picker>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="padding-left: 20px; padding-top: 15px;">
        <el-col :span="20">
          <div style="padding-bottom: 5px"> <b> Feed rate </b> </div>
          <el-input size="10" placeholder="Please input Feed" v-model.number="feed"></el-input>
       </el-col>
      </el-row>

      <el-row :gutter="20" style="padding-left: 20px; padding-top: 15px;">
      </el-row>

      <el-row :gutter="20" style="padding-left: 20px; padding-top: 15px;">
        <el-col :span="20">
          <div style="padding-bottom: 5px"> <b> Kill rate </b> </div>
          <el-input size="10" placeholder="Please input Kill" v-model.number="kill"></el-input>
        </el-col>
      </el-row>

      <el-button style="margin-left: 20px; margin-top: 25px;" @click="onStart()" type="primary">
        <i class="el-icon-video-play"></i> 
        Start
      </el-button>

      <el-button style="margin-left: 20px; margin-top: 25px;" @click="onStop()" type="warning">
        <i class="el-icon-video-pause"></i> 
        Stop
      </el-button>

      <el-button style="margin-left: 20px; margin-top: 25px;" @click="onClear()" type="danger">
        Clear
      </el-button>
    </div>

  </div>
</template>

<script lang="ts">

import { Component, Vue, Watch } from 'vue-property-decorator';
import { GrayScotModelFactory } from "../lib/gray-scott-model/gray-scott-model"
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import ElementUI from 'element-ui';
import ColorConvert from "color-convert"

Vue.use(ElementUI, { locale });

const SPACE_GRIDSIZE = 100
const SQUARE_SIZE = 12
const VISUALIZATION_STEP = 20
const INTERVAL_TIME = 0.001

@Component
export default class GrayScotModelSimulator extends Vue {
  private canvas
  private grayScotModel
  private interval
  private feed = 0.022
  private kill = 0.051
  private hexColor = "#15B9C5"
  private hslColor = [184, 81, 43]

  private selectedType = "stripe"
  private defaultTypeList = [
    { value: "stripe", label: "stripe" },
    { value: "spots", label: "spots" },
    { value: "moving_spots", label: "moving_spots" },
    { value: "amorphous", label: "amorphous" },
    { value: "bubbles", label: "bubbles" },
    { value: "waves", label: "waves" },
    { value: "slotions", label: "slotions" }
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
      case "moving_spots":
        this.$set(this, "feed", 0.014)
        this.$set(this, "kill", 0.054)
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
      case "slotions":
        this.$set(this, "feed", 0.03)
        this.$set(this, "kill", 0.062)
        break;
    }

    this.initDraw()
  }

  @Watch("hexColor")
  onChangeColor(hexColor){
    this.$set(this, "hslColor", ColorConvert.hex.hsl(hexColor.slice(1)))
    this.initDraw()
  }

  private mounted(){  
    this.canvas = document.getElementById('gray_scot_model_canvas')
    this.initDraw()
  }

  private onStart(){
    this.grayScotModel = this.createGrayScotModel(this.feed, this.kill)
    clearInterval(this.interval);
    this.draw(this.grayScotModel.materialU)
    this.interval = setInterval(this.onUpdate, INTERVAL_TIME)
  }

  private onStop(){
    clearInterval(this.interval);
  }

  private onUpdate(){
    for(let i = 0; i < VISUALIZATION_STEP; i++){ this.grayScotModel.update() }
    this.draw(this.grayScotModel.materialU)
  }

  private onClear(){
    this.$set(this, "state", "stop")
    this.$set(this, "selectedType", "stripe")
    this.$set(this, "feed", 0.022)
    this.$set(this, "kill", 0.051)
    this.$set(this, "hexColor", "#15D6E4")
    this.$set(this, "hslColor", [184, 81, 43])

    this.initDraw()
  }

  private initDraw(){
    clearInterval(this.interval);
    this.grayScotModel = this.createGrayScotModel(this.feed, this.kill)
    this.draw(this.grayScotModel.materialU)
  }

  private draw(materialU){
    const ctx = this.canvas.getContext('2d')
    const cellWidth = Math.floor(this.canvas.width / SPACE_GRIDSIZE)
    const cellHeight = Math.floor(this.canvas.height / SPACE_GRIDSIZE)
    const hslColor = this.hslColor

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
        ctx.fillStyle = 'hsl(' + hslColor[0] + ',' + hslColor[1] + '%' + ',' + colorParsentage + '%)';
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
  grid-template-rows: 550px 300px fr;
  grid-template-columns: 790px 350px;
}

#gray_scot_model_canvas{
  grid-row: 1 / 5;
  grid-column: 1 / 2;
  border: 1px solid #000;
  background-color: #000;
}

#introductions{
  grid-row: 1 / 2;
  grid-column: 2 / 4;
  border-top: 1px solid #000;
  border-right: 1px solid #000;
  padding-left: 10px;
}

#setting{
  grid-row: 2 / 5;
  grid-column: 2 / 4;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  padding-left: 10px;
}
</style>
