import { render, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';


test('Check header text', () => {
  var mock = new MockAdapter(axios);
  const data = { response: {data: []} };
  mock.onGet('http://localhost:8080/employee/findAll').reply(200, data);

  render(<Provider store={store}><App /></Provider>);
  const linkElement = screen.getByText(/Employee Management System/i);
  expect(linkElement).toBeInTheDocument();
});