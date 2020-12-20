const Dx = 0.01
const Dt = 0.1
const Du = 2e-5;
const Dv = 1e-5;

class GrayScotModel{
  feed: number
  kill: number
  materialU: number[][]
  materialV: number[][]
  spaceGridSize: number

  constructor(feed: number, kill: number, materialU: number[][],  materialV: number[][], spaceGridSize: number){
    this.feed = feed
    this.kill = kill
    this.materialU = materialU
    this.materialV = materialV
    this.spaceGridSize = spaceGridSize
  }

  update(){
    const laplacianU: number[][] = Array.from(new Array(this.spaceGridSize), () => new Array(this.spaceGridSize))
    const laplacianV: number[][] = Array.from(new Array(this.spaceGridSize), () => new Array(this.spaceGridSize))

    const firstIndex = 0
    const lastIndex = this.spaceGridSize - 1

    // calculateLaplacian
    for(let i = 0; i < this.spaceGridSize; i++){
      for(let j = 0; j < this.spaceGridSize; j++){
        const rollDownIndex = this.isFirstRow(i) ? lastIndex : i - 1
        const rollUpIndex = this.isLastRow(i) ? firstIndex : i + 1
        const rollRightIndex = this.isFirstCol(j) ? lastIndex : j - 1
        const rollLeftIndex =  this.isLastCol(j) ? firstIndex: j + 1

        laplacianU[i][j] = (this.materialU[rollDownIndex][j] + this.materialU[rollUpIndex][j] + this.materialU[i][rollRightIndex] + this.materialU[i][rollLeftIndex] - 4 * this.materialU[i][j]) / (Dx * Dx)
        laplacianV[i][j] = (this.materialV[rollDownIndex][j] + this.materialV[rollUpIndex][j] + this.materialV[i][rollRightIndex] + this.materialV[i][rollLeftIndex] - 4 * this.materialU[i][j]) / (Dx * Dx)
      }
    }

    for(let i = 0; i < this.spaceGridSize; i++){
      for(let j = 0; j < this.spaceGridSize; j++){
        const dudt = Du * laplacianU[i][j] - this.materialU[i][j] * this.materialV[i][j] * this.materialV[i][j] + this.feed * (1 - this.materialU[i][j])
        const dvdt = Dv * laplacianV[i][j] + this.materialU[i][j] * this.materialV[i][j] * this.materialV[i][j] - (this.feed + this.kill) * this.materialV[i][j]
        this.materialU[i][j] += Dt * dudt;
        this.materialV[i][j] += Dv * dvdt;
      }
    }
  }

  private isFirstRow(i: number){ return i === 0 }

  private isLastRow(i: number){ return i === (this.spaceGridSize - 1) }

  private isFirstCol(j: number){ return j === 0 }

  private isLastCol(j: number){ return j === (this.spaceGridSize - 1)}
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

    return new GrayScotModel(feed, kill, materialU, materialV, spaceGridSize)
  }
}