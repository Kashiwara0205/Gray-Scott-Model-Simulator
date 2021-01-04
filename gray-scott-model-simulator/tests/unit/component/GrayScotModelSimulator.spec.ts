import { mount } from '@vue/test-utils'
import GrayScotModelSimulator from '../../../src/components/GrayScotModelSimulator.vue';

document.body.innerHTML =
'<canvas id="gray_scot_model_canvas" width="800" height="500" class="canvas">' +
'</canvas>';

describe('GrayScotModelSimulator', () => {
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
})