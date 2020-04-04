import React from "react";
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json';
import App from "../App";

jest.mock('../Board', () => (props: any) => <mock-board {...props} />);

it("should render App correctly", () => {
  const tree = mount(<App />);
  expect(toJSON(tree)).toMatchSnapshot();
});
