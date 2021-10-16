import { mount as mountEnzyme } from "enzyme";
import { act } from 'react-dom/test-utils';

export const waitForComponentToPaint = async (wrapper) => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
    wrapper.update();
  });
};

export const mount = async (Component) => {
  const wrapper = mountEnzyme(Component);
  await waitForComponentToPaint(wrapper);
  return wrapper;
}