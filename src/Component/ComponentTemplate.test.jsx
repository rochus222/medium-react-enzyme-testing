import React from "react";
import { shallow } from "enzyme";

import ComponentTemplate from "./ComponentTemplate";
import { dataFixture } from "../fixtures/data";

const TEST_TITLE = "title";
const TEST_ITEMS = dataFixture
const TEST_REFRESH = jest.fn();
const TEST_CLEAR = jest.fn();

const setup = (delta) => {
    return shallow(
        <ComponentTemplate
            items={TEST_ITEMS}
            title={TEST_TITLE}
            refresh={TEST_REFRESH}
            clear={TEST_CLEAR}
            {...delta}
        />
    );
};

it("renders article", () => {
    const wrapper = setup();

    expect(wrapper.find("article").length).toBe(1);
});

it("renders article with correct title", () => {
    const wrapper = setup();

    expect(wrapper.find("article").find("h1").length).toBe(1);
    expect(wrapper.find("article").find("h1").text()).toContain(TEST_TITLE);
});
it("renders article with two buttons", () => {
    const wrapper = setup();

    expect(wrapper.find("article").find("button").length).toBe(2);
});

it("renders article with first button performing refresh", () => {
    const wrapper = setup();

    expect(wrapper.find("article").find("button").at(0).text()).toContain("Refresh");
    expect(wrapper.find("article").find("button").at(0).props().onClick).toBe(TEST_REFRESH);
});

it("renders article with second button performing clear", () => {
    const wrapper = setup();

    expect(wrapper.find("article").find("button").at(1).text()).toContain("Clear");
    expect(TEST_CLEAR).not.toBeCalled();

    wrapper.find("article").find("button").at(1).props().onClick();

    expect(TEST_CLEAR).toBeCalled();
});

it("renders article list", () => {
    const wrapper = setup();

    expect(wrapper.find("article").find("ul").length).toBe(1);
    expect(wrapper.find("article").find("ul").find("li").length).toBe(TEST_ITEMS.length);
    const items = wrapper.find("article").find("ul").find("li")
    TEST_ITEMS.forEach((item, index) => {
        expect(items.at(index).text()).toContain(item)
    })
});

it("renders empty list if empty array is provided", () => {
    const wrapper = setup({ items: [] });

    expect(wrapper.find("article").find("ul").find("li").length).toBe(0);
});
