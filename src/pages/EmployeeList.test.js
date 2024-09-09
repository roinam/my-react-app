import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from "react-redux";
import { EmployeeList } from "./EmployeeList";
import { store } from '../store/store';
import renderer from 'react-test-renderer';

  jest.mock('react-router-dom', () => {
      // Require the original module to not be mocked...
      const originalModule = jest.requireActual('react-router-dom');
    
      return {
        __esModule: true,
        ...originalModule,
        useParams: jest.fn(),
        useHistory: jest.fn(),
        useNavigate: jest.fn()
      };
  });

  const data = {data: [
    {empId: 2, empName:"Test User 2", designation:"test designation", department:"test dept", salary:"20000"}
  ]};
  jest.mock('axios', () => {
    return {
      create: jest.fn((parm) => {
        return {
          get: () => Promise.resolve(data)
        }
      })
    };
  });

beforeAll(() => {
    
});

describe('EmployeeList Test Suit', () => {
  test('should create component with axios', async () => {
    render(<Provider store={store}><EmployeeList></EmployeeList></Provider>);

    await waitFor(() => {
      const theElement = screen.getByText(/Test User 2/i);
      expect(theElement).toBeInTheDocument();
    },
    {
      timeout: 3000
    });    
  });

  test('snapshot renders correctly', () => {
    const tree = renderer
      .create(<Provider store={store}><EmployeeList></EmployeeList></Provider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});