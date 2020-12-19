import { GrayScotModelFactory } from "../../src/lib/gray-scott-model/gray-scott-model"

describe('GrayScotModel', () => {
  it('should create new gray-scot-model object', () => {
    const mockMath = Object.create(Math);
    mockMath.random = () => 0.5;
    Math = mockMath;

    let factory = new GrayScotModelFactory
    let f = 0.022
    let k = 0.051
    let gray_scot_model = factory.create(f, k)
    expect(gray_scot_model.feed).toBe(0.022);
    expect(gray_scot_model.kill).toBe(0.051);

    expect(gray_scot_model.material_u.length).toBe(256);
    expect(gray_scot_model.material_u[0].length).toBe(256);
    expect(gray_scot_model.material_u[0][0]).toBe(0.05);
    expect(gray_scot_model.material_u[255][255]).toBe(0.05);
    expect(gray_scot_model.material_u[118][118]).toBe(0.55);
    expect(gray_scot_model.material_u[137][137]).toBe(0.55);

    expect(gray_scot_model.material_v.length).toBe(256);
    expect(gray_scot_model.material_v[0].length).toBe(256);
    expect(gray_scot_model.material_v[0][0]).toBe(1.05);
    expect(gray_scot_model.material_v[255][255]).toBe(1.05);
    expect(gray_scot_model.material_v[118][118]).toBe(0.3);
    expect(gray_scot_model.material_v[137][137]).toBe(0.3);
  })
})
