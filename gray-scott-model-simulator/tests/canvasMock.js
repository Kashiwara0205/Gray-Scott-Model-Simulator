class ContextMock{
  fillStyle

  fillRect(x, y, cellWidth, cellHeight){ }
}
HTMLCanvasElement.prototype.getContext = () => { 
  return new ContextMock
};