import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import fetchMock from "jest-fetch-mock";

global.fetch = fetchMock;
Enzyme.configure({ adapter: new Adapter() });
