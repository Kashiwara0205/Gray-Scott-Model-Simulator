import { GrayScotModelFactory } from "../../src/lib/gray-scott-model/gray-scott-model"

describe('GrayScotModel', () => {
  it('should create new gray-scot-model object', () => {
    const mockMath = Object.create(Math);
    mockMath.random = () => 0.5;
    Math = mockMath;

    const factory = new GrayScotModelFactory
    const f = 0.022
    const k = 0.051
    const gray_scot_model = factory.create(f, k, 256, 20)
    expect(gray_scot_model.feed).toBe(0.022);
    expect(gray_scot_model.kill).toBe(0.051);

    expect(gray_scot_model.materialU.length).toBe(256);
    expect(gray_scot_model.materialU[0].length).toBe(256);
    expect(gray_scot_model.materialU[0][0]).toBe(0.05);
    expect(gray_scot_model.materialU[255][255]).toBe(0.05);
    expect(gray_scot_model.materialU[118][118]).toBe(0.55);
    expect(gray_scot_model.materialU[137][137]).toBe(0.55);

    expect(gray_scot_model.materialV.length).toBe(256);
    expect(gray_scot_model.materialV[0].length).toBe(256);
    expect(gray_scot_model.materialV[0][0]).toBe(1.05);
    expect(gray_scot_model.materialV[255][255]).toBe(1.05);
    expect(gray_scot_model.materialV[118][118]).toBe(0.3);
    expect(gray_scot_model.materialV[137][137]).toBe(0.3);
  })
})
