import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
  });
  test('should create instance with provided base url', async () => {
    const axiosInstanceMock = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi('/posts');

    expect(axiosInstanceMock).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const responseData = [{ id: 0, name: 'Alex' }];
    const axiosGet = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(() => Promise.resolve({ data: responseData }));

    await throttledGetDataFromApi('/posts');

    expect(axiosGet).toHaveBeenCalledWith('/posts');
  });

  test('should return response data', async () => {
    const responseData = [{ id: 0, name: 'Alex' }];

    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(() => Promise.resolve({ data: responseData }));

    const result = await throttledGetDataFromApi('/posts');

    expect(result).toBe(responseData);
  });
});
