import { GrayScotModelFactory } from "../../src/lib/gray-scott-model/gray-scott-model"

describe('GrayScotModel', () => {

  // outline: should create new gray-scot-model object
  // expected value: 
  //   - materialU array size is 100, 100
  //   - materialV array size is 100, 100
  //   - check each initValue
  it('should create new gray-scot-model object', () => {
    const mockMath = Object.create(Math);
    mockMath.random = () => 0.5;
    Math = mockMath;

    const factory = new GrayScotModelFactory
    const f = 0.022
    const k = 0.051
    const gray_scot_model = factory.create(f, k, 100, 12)
    expect(gray_scot_model.feed).toBe(0.022);
    expect(gray_scot_model.kill).toBe(0.051);

    expect(gray_scot_model.materialU.length).toBe(100);
    expect(gray_scot_model.materialU[0].length).toBe(100);
    expect(gray_scot_model.materialU[0][0]).toBe(1.05);
    expect(gray_scot_model.materialU[99][99]).toBe(1.05);
    expect(gray_scot_model.materialU[50][50]).toBe(0.55);
    expect(gray_scot_model.materialU[45][45]).toBe(0.55);

    expect(gray_scot_model.materialV.length).toBe(100);
    expect(gray_scot_model.materialV[0].length).toBe(100);
    expect(gray_scot_model.materialV[0][0]).toBe(0.05);
    expect(gray_scot_model.materialV[99][99]).toBe(0.05);
    expect(gray_scot_model.materialV[50][50]).toBe(0.3);
    expect(gray_scot_model.materialV[45][45]).toBe(0.3);
  })

  // outline: should update gray-scot-model object
  // expected value: 
  //   - materialU array size is 100, 100
  //   - materialV array size is 100, 100
  //   - check each updateValue
  it('should update gray-scot-model object', () => {
    const mockMath = Object.create(Math);
    mockMath.random = () => 0.5;
    Math = mockMath;

    const factory = new GrayScotModelFactory
    const f = 0.022
    const k = 0.051
    const gray_scot_model = factory.create(f, k, 100, 12)
    gray_scot_model.update()
    expect(gray_scot_model.feed).toBe(0.022);
    expect(gray_scot_model.kill).toBe(0.051);

    expect(gray_scot_model.materialU.length).toBe(100);
    expect(gray_scot_model.materialU[0].length).toBe(100);
    expect(gray_scot_model.materialU[0][0]).toBe(1.046275);
    expect(gray_scot_model.materialU[99][99]).toBe(1.046275);
    expect(gray_scot_model.materialU[50][50]).toBe(0.5104000000000001);
    expect(gray_scot_model.materialU[45][45]).toBe(0.5104000000000001);

    expect(gray_scot_model.materialV.length).toBe(100);
    expect(gray_scot_model.materialV[0].length).toBe(100);
    expect(gray_scot_model.materialV[0][0]).toBe(0.048975000000000005);
    expect(gray_scot_model.materialV[99][99]).toBe(0.048975000000000005);
    expect(gray_scot_model.materialV[50][50]).toBe(0.3276);
    expect(gray_scot_model.materialV[45][45]).toBe(0.3276);
  })
})
