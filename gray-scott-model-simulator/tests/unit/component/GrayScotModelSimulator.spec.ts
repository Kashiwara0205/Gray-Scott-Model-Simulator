import { mount } from '@vue/test-utils'
import GrayScotModelSimulator from '../../../src/components/GrayScotModelSimulator.vue';
import { GrayScotModelFactory } from '../../../src/lib/gray-scott-model/gray-scott-model'

document.body.innerHTML =
'<canvas id="gray_scot_model_canvas" width="800" height="500" class="canvas">' +
'</canvas>';

describe('GrayScotModelSimulator', () => {

  // outline: Check set initialize value to each variables
  it('should set initialize value', () => {
    const wrapper: any = mount(GrayScotModelSimulator)

    expect(wrapper.vm.$data.interval).toBe(0);
    expect(wrapper.vm.$data.hexColor).toBe("#15B9C5"); 
    expect(wrapper.vm.$data.hslColor).toMatchObject([184, 81, 43]); 
    expect(wrapper.vm.$data.selectedType).toBe("stripe"); 
    expect(wrapper.vm.$data.feed).toBe(0.022); 
    expect(wrapper.vm.$data.kill).toBe(0.051); 
    expect(wrapper.vm.$data.defaultTypeList[0]).toMatchObject({value: "stripe", label: "stripe"}); 
    expect(wrapper.vm.$data.defaultTypeList[1]).toMatchObject({value: "spots", label: "spots"}); 
    expect(wrapper.vm.$data.defaultTypeList[2]).toMatchObject({value: "moving_spots", label: "moving_spots"}); 
    expect(wrapper.vm.$data.defaultTypeList[3]).toMatchObject({value: "amorphhous", label: "amorphhous"}); 
    expect(wrapper.vm.$data.defaultTypeList[4]).toMatchObject({value: "bubbles", label: "bubbles"}); 
    expect(wrapper.vm.$data.defaultTypeList[5]).toMatchObject({value: "waves", label: "waves"}); 
    expect(wrapper.vm.$data.defaultTypeList[6]).toMatchObject({value: "solitions", label: "solitions"}); 
    expect(wrapper.vm.$data.defaultTypeList[7]).toMatchObject({value: "worm", label: "worm"}); 
  })

  // outline: Check change pattern paramter when run onChangeType
  it('should change patternType', () => {
    const wrapper: any = mount(GrayScotModelSimulator)

    wrapper.vm.onChangeType("stripe")
    expect(wrapper.vm.$data.feed).toBe(0.022); 
    expect(wrapper.vm.$data.kill).toBe(0.051);

    wrapper.vm.onChangeType("spots")
    expect(wrapper.vm.$data.feed).toBe(0.035); 
    expect(wrapper.vm.$data.kill).toBe(0.065);

    wrapper.vm.onChangeType("moving_spots")
    expect(wrapper.vm.$data.feed).toBe(0.014); 
    expect(wrapper.vm.$data.kill).toBe(0.054);

    wrapper.vm.onChangeType("amorphhous")
    expect(wrapper.vm.$data.feed).toBe(0.04); 
    expect(wrapper.vm.$data.kill).toBe(0.06);

    wrapper.vm.onChangeType("bubbles")
    expect(wrapper.vm.$data.feed).toBe(0.012);
    expect(wrapper.vm.$data.kill).toBe(0.05);

    wrapper.vm.onChangeType("waves")
    expect(wrapper.vm.$data.feed).toBe(0.025); 
    expect(wrapper.vm.$data.kill).toBe(0.05);

    wrapper.vm.onChangeType("solitions")
    expect(wrapper.vm.$data.feed).toBe(0.03)
    expect(wrapper.vm.$data.kill).toBe(0.062);

    wrapper.vm.onChangeType("worm")
    expect(wrapper.vm.$data.feed).toBe(0.03);
    expect(wrapper.vm.$data.kill).toBe(0.059);
  })

  // outline: Check draw timing when run onCler
  it('should draw when call onClear', () => {
    const wrapper: any = mount(GrayScotModelSimulator)
    wrapper.vm.draw = jest.fn();
    wrapper.vm.onClear()
    
    expect(wrapper.vm.draw.mock.calls.length).toBe(1);
    expect(wrapper.vm.draw.mock.calls[0][0].length).toBe(100);
    expect(wrapper.vm.draw.mock.results[0]["type"]).toBe("return");
  })

  // outline: Check draw timing when run onUpdate
  it('should draw when call onUpdate', () => {
    const wrapper: any = mount(GrayScotModelSimulator)
    wrapper.vm.draw = jest.fn();
    wrapper.vm.onUpdate()
    
    expect(wrapper.vm.draw.mock.calls.length).toBe(1);
    expect(wrapper.vm.draw.mock.calls[0][0].length).toBe(100);
    expect(wrapper.vm.draw.mock.results[0]["type"]).toBe("return");
  })

  // outline: Check draw timing when run onStart
  it('should draw when call onStart', () => {
    const wrapper: any = mount(GrayScotModelSimulator)
    wrapper.vm.draw = jest.fn();
    wrapper.vm.onStart()
    
    expect(wrapper.vm.draw.mock.calls.length).toBe(1);
    expect(wrapper.vm.draw.mock.calls[0][0].length).toBe(100);
    expect(wrapper.vm.draw.mock.results[0]["type"]).toBe("return");
  })

  // outline: Check arguments when run createGrayScotModel
  it('should create gray-scott-model with expected arguments', () => {
    const createMethodMock = jest.fn()
    GrayScotModelFactory.prototype.create = createMethodMock.mockReturnValue({
      materialU: Array.from(new Array(100), () => new Array(100).fill(0)),
      update: () => {}
    })

    const wrapper: any = mount(GrayScotModelSimulator)

    expect(createMethodMock.mock.calls.length).toBe(1);
    expect(createMethodMock.mock.calls[0]).toMatchObject([ 0.022, 0.051, 100, 12 ])
    expect(createMethodMock.mock.results[0]["type"]).toBe("return");
    
    wrapper.vm.createGrayScotModel(0.035, 0.065)

    expect(createMethodMock.mock.calls.length).toBe(2);
    expect(createMethodMock.mock.calls[1]).toMatchObject([ 0.035, 0.065, 100, 12 ])
    expect(createMethodMock.mock.results[1]["type"]).toBe("return");
  })

})