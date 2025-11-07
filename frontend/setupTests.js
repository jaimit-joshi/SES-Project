import '@testing-library/jest-dom';

// ✅ Mock image imports individually
jest.mock('../assets/designlogin.jpg', () => 'mock-image');
jest.mock('../assets/img1.png', () => 'mock-image');
jest.mock('../assets/img2.png', () => 'mock-image');
jest.mock('../assets/img3.png', () => 'mock-image');
jest.mock('../assets/img4.png', () => 'mock-image');
jest.mock('../assets/backg.jpg', () => 'mock-image');
jest.mock('../assets/classroom.png', () => 'mock-image');
jest.mock('../assets/assignment.svg', () => 'mock-image');
jest.mock('../assets/subjects.svg', () => 'mock-image');
jest.mock('../assets/time.svg', () => 'mock-image');


// ✅ Mock axios to prevent real network calls
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));
