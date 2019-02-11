import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

import register from 'ignore-styles';
register(['.css', '.sass', '.scss']);
