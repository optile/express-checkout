/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import fetchMock from "jest-fetch-mock";
import '@babel/polyfill';
global.fetch = fetchMock;
window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
  });
Enzyme.configure({ adapter: new Adapter() });
