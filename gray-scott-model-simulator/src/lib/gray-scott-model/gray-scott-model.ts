class GrayScotModel{
  feed: number
  kill: number
  materialU: number[][]
  materialV: number[][]

  constructor(feed: number, kill: number, materialU: number[][],  materialV: number[][]){
    this.feed = feed
    this.kill = kill
    this.materialU = materialU
    this.materialV = materialV
  }
}

export class GrayScotModelFactory{
  create(feed: number, kill: number, spaceGridSize: number, squareSize: number){
    const materialU: number[][] = Array.from(new Array(spaceGridSize), () => new Array(spaceGridSize).fill(0))
    const materialV: number[][] = Array.from(new Array(spaceGridSize), () => new Array(spaceGridSize).fill(1))

    const fromRange = Math.floor(spaceGridSize / 2) - Math.floor(squareSize / 2);
    const toRange = Math.floor(spaceGridSize / 2) + Math.floor(squareSize / 2);

    for(let i = fromRange; i < toRange; i++){
      for(let j = fromRange; j < toRange; j++){
        materialU[i][j] = 0.5
        materialV[i][j] = 0.25
      }
    }

    for(let i = 0; i < spaceGridSize; i++){
      for(let j = 0; j < spaceGridSize; j++){
        materialU[i][j] += Math.random() * 0.1
        materialV[i][j] += Math.random() * 0.1
      }
    }

    return new GrayScotModel(feed, kill, materialU, materialV) 
  }
}