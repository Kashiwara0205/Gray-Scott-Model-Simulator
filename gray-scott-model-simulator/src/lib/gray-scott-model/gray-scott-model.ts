const SPACE_GRID_SIZE = 256
const SQUARE_SIZE = 20

export class GrayScotModelFactory{
  create(feed: number, kill: number){
    const material_u: number[][] = Array.from(new Array(SPACE_GRID_SIZE), () => new Array(SPACE_GRID_SIZE).fill(0))
    const material_v: number[][] = Array.from(new Array(SPACE_GRID_SIZE), () => new Array(SPACE_GRID_SIZE).fill(1))

    const from_range = Math.floor(SPACE_GRID_SIZE / 2) - Math.floor(SQUARE_SIZE / 2);
    const to_range = Math.floor(SPACE_GRID_SIZE / 2) + Math.floor(SQUARE_SIZE / 2);

    for(let i = from_range; i < to_range; i++){
      for(let j = from_range; j < to_range; j++){
        material_u[i][j] = 0.5
        material_v[i][j] = 0.25
      }
    }

    for(let i = 0; i < SPACE_GRID_SIZE; i++){
      for(let j = 0; j < SPACE_GRID_SIZE; j++){
        material_u[i][j] += Math.random() * 0.1
        material_v[i][j] += Math.random() * 0.1
      }
    }

    return new GrayScotModel(feed, kill, material_u, material_v) 
  }
}

class GrayScotModel{
  feed: number
  kill: number
  material_u: number[][]
  material_v: number[][]

  constructor(feed: number, kill: number, material_u: number[][],  meterial_v: number[][]){
    this.feed = feed
    this.kill = kill
    this.material_u = material_u
    this.material_v = meterial_v
  }
}