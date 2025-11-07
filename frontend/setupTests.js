import '@testing-library/jest-dom';
jest.mock('../assets/designlogin.jpg', () => 'mock-image');

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));
