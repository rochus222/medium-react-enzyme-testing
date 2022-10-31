import React from "react";
import { render, screen, within, fireEvent } from "@testing-library/react";

import ComponentTemplate from "./ComponentTemplate";
import { dataFixture } from "../fixtures/data";

const TEST_TITLE = "title";
const TEST_ITEMS = dataFixture;
const TEST_REFRESH = jest.fn();
const TEST_CLEAR = jest.fn();

const setup = (delta) =>
  render(
    <ComponentTemplate
      items={TEST_ITEMS}
      title={TEST_TITLE}
      refresh={TEST_REFRESH}
      clear={TEST_CLEAR}
      {...delta}
    />
  );

it("renders article", () => {
  setup();

  expect(screen.getByRole("article")).not.toBeNull();
});
it("renders article with correct title", () => {
  setup();

  expect(
    within(screen.getByRole("article")).getByRole("heading")
  ).not.toBeNull();
  expect(
    within(within(screen.getByRole("article")).getByRole("heading")).getByText(
      TEST_TITLE
    )
  ).not.toBeNull();
});
it("renders article with two buttons", () => {
  setup();

  expect(
    within(screen.getByRole("article")).getAllByRole("button").length
  ).toBe(2);
});
it("renders article with first button performing refresh", () => {
  const refresh = jest.fn();
  const wrapper = setup({ refresh });

  expect(
    within(
      within(screen.getByRole("article")).getAllByRole("button")[0]
    ).getByText("Refresh")
  ).not.toBeNull();
  expect(refresh).not.toBeCalled();

  fireEvent.click(
    within(screen.getByRole("article")).getAllByRole("button")[0]
  );

  expect(refresh).toBeCalled();
});
it("renders article with second button performing clear", () => {
  const clear = jest.fn();
  const wrapper = setup({ clear });

  expect(
    within(
      within(screen.getByRole("article")).getAllByRole("button")[1]
    ).getByText("Clear")
  ).not.toBeNull();
  expect(clear).not.toBeCalled();

  fireEvent.click(
    within(screen.getByRole("article")).getAllByRole("button")[1]
  );

  expect(clear).toBeCalled();
});
it("renders article list", () => {
  const wrapper = setup();

  expect(within(screen.getByRole("article")).getByRole("list")).not.toBeNull();
  expect(
    within(within(screen.getByRole("article")).getByRole("list")).getAllByRole(
      "listitem"
    ).length
  ).toBe(TEST_ITEMS.length);
  TEST_ITEMS.forEach((item, index) => {
    expect(
      within(
        within(
          within(screen.getByRole("article")).getByRole("list")
        ).getAllByRole("listitem")[index]
      ).getByText(item)
    ).not.toBeNull();
  });
});
it("renders empty list if empty array is provided", () => {
  const wrapper = setup({ items: [] });

  expect(
    within(
      within(screen.getByRole("article")).getByRole("list")
    ).queryAllByRole("listitem").length
  ).toBe(0);
});
