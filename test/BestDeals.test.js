import BestDeals from '../client/components/BestDeals.jsx';

describe('<BestDeals/> component Testing', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BestDeals />);
  });

  it('<BestDeals/> component renders properly', () => {
    expect(wrapper.exists()).toBe(true);
  });

});