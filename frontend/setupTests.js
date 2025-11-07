import '@testing-library/jest-dom';

jest.mock('.*\\.(jpg|jpeg|png|gif|svg)$', () => 'mock-image');
jest.mock('.*\\.(css|less)$', () => ({}));

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));
