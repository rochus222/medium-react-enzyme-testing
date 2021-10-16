import React from "react";
import Component from "./Component";
import { shallow } from "enzyme";
import ComponentTemplate from "./ComponentTemplate";
import * as api from "../api";
import { mount } from "../utils";
import { act } from "react-dom/test-utils";
import { dataFixture } from "../fixtures/data";

jest.mock("./ComponentTemplate", () => () => <div id="component-template" />);
jest.mock("../api", () => ({
    loadData: jest.fn()
}));
jest.spyOn(api, "loadData").mockResolvedValue(dataFixture);

beforeAll(() => {
    api.loadData.mockClear();
});

it("renders mocked ComponentTemplate with correct default props", async () => {
    const wrapper = shallow(<Component />);

    expect(wrapper.find(ComponentTemplate).length).toBe(1);
    expect(wrapper.find(ComponentTemplate).props().items).toEqual([]);
    expect(wrapper.find(ComponentTemplate).props().title).toContain("Items");
    expect(wrapper.find(ComponentTemplate).props().title).toContain("0");
});

it("renders mocked ComponentTemplate with data loaded from api after mount", async () => {
    const wrapper = await mount(<Component />);
    const data = await api.loadData();
    wrapper.update();

    expect(wrapper.find(ComponentTemplate).length).toBe(1);
    expect(wrapper.find(ComponentTemplate).props().items).toEqual(data);
    expect(wrapper.find(ComponentTemplate).props().title).toContain("Items");
    expect(wrapper.find(ComponentTemplate).props().title).toContain(data.length);
});

it("clears data after clear is called", async () => {
    const wrapper = await mount(<Component />);
    wrapper.update();

    act(() => wrapper.find(ComponentTemplate).props().clear());

    wrapper.update();

    expect(wrapper.find(ComponentTemplate).length).toBe(1);
    expect(wrapper.find(ComponentTemplate).props().items).toEqual([]);
    expect(wrapper.find(ComponentTemplate).props().title).toContain("Items");
    expect(wrapper.find(ComponentTemplate).props().title).toContain("0");
});

it("loads data again after refresh is called", async () => {
    const wrapper = await mount(<Component />);
    wrapper.update();

    act(() => wrapper.find(ComponentTemplate).props().clear());

    wrapper.update();

    await act(() => wrapper.find(ComponentTemplate).props().refresh());

    const data = await api.loadData();
    wrapper.update();

    expect(wrapper.find(ComponentTemplate).length).toBe(1);
    expect(wrapper.find(ComponentTemplate).props().items).toEqual(data);
    expect(wrapper.find(ComponentTemplate).props().title).toContain("Items");
    expect(wrapper.find(ComponentTemplate).props().title).toContain(data.length);
});
