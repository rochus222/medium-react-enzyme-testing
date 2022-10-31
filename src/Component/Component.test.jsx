import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import Component from "./Component";
import * as api from "../api";
import { dataFixture } from "../fixtures/data";
import { getPropForComponent, wait, clearPropsStorage } from "../utils";

jest.mock("./ComponentTemplate", () => {
  const { mockComponent } = require("../utils");
  return mockComponent("ComponentTemplate");
});
jest.mock("../api", () => ({
  loadData: jest.fn(),
}));
jest.spyOn(api, "loadData").mockResolvedValue(dataFixture);

beforeAll(() => {
  api.loadData.mockClear();
});

beforeEach(() => {
  clearPropsStorage();
});

it("renders mocked ComponentTemplate with correct default props", async () => {
  render(<Component />);

  await waitFor(async () => {
    expect(await screen.findByTestId("ComponentTemplate")).not.toBeNull();
    expect(
      getPropForComponent(
        await screen.findByTestId("ComponentTemplate"),
        "ComponentTemplate",
        "title"
      )
    ).toContain("Items");
    expect(
      getPropForComponent(
        await screen.findByTestId("ComponentTemplate"),
        "ComponentTemplate",
        "title"
      )
    ).toContain("0");
    expect(
      getPropForComponent(
        await screen.findByTestId("ComponentTemplate"),
        "ComponentTemplate",
        "items"
      )
    ).toEqual([]);
  });
});

it("renders mocked ComponentTemplate with data loaded from api after mount", async () => {
  render(<Component />);

  await waitFor(async () => {
    const data = await api.loadData();
    expect(await screen.findByTestId("ComponentTemplate")).not.toBeNull();
    expect(
      getPropForComponent(
        await screen.findByTestId("ComponentTemplate"),
        "ComponentTemplate",
        "title"
      )
    ).toContain(`${data.length}`);
    expect(
      getPropForComponent(
        await screen.findByTestId("ComponentTemplate"),
        "ComponentTemplate",
        "items"
      )
    ).toEqual(data);
  });
});

it("clears data after clear is called", async () => {
  render(<Component />);

  await waitFor(async () => {
    const data = await api.loadData();
    getPropForComponent(
      await screen.findByTestId("ComponentTemplate"),
      "ComponentTemplate",
      "clear"
    )();

    expect(await screen.findByTestId("ComponentTemplate")).not.toBeNull();
    expect(
      getPropForComponent(
        await screen.findByTestId("ComponentTemplate"),
        "ComponentTemplate",
        "title"
      )
    ).toContain("0");
    expect(
      getPropForComponent(
        await screen.findByTestId("ComponentTemplate"),
        "ComponentTemplate",
        "items"
      )
    ).toEqual([]);
  });
});

it("loads data again after refresh is called", async () => {
  render(<Component />);

  await waitFor(async () => {
    const data = await api.loadData();

    getPropForComponent(
      await screen.findByTestId("ComponentTemplate"),
      "ComponentTemplate",
      "clear"
    )();
    getPropForComponent(
      await screen.findByTestId("ComponentTemplate"),
      "ComponentTemplate",
      "refresh"
    )();

    expect(await screen.findByTestId("ComponentTemplate")).not.toBeNull();
    expect(
      getPropForComponent(
        await screen.findByTestId("ComponentTemplate"),
        "ComponentTemplate",
        "title"
      )
    ).toContain(`${data.length}`);
    expect(
      getPropForComponent(
        await screen.findByTestId("ComponentTemplate"),
        "ComponentTemplate",
        "items"
      )
    ).toEqual(data);
  });
});
