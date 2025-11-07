// src/pages/__tests__/AdminRegisterPage.test.jsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import AdminRegisterPage from "../AdminRegisterPage.js";

const mockStore = configureStore([]);

describe("AdminRegisterPage", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        status: "",
        currentUser: null,
        response: "",
        error: null,
        currentRole: "",
      },
    });
  });

  test("renders registration form fields", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AdminRegisterPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/Enter your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Create your school name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Create a password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Register/i })).toBeInTheDocument();
  });

  test("shows error message when submitting empty form", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AdminRegisterPage />
        </MemoryRouter>
      </Provider>
    );

    const submitButton = screen.getByRole("button", { name: /Register/i });
    fireEvent.click(submitButton);

    // ✅ Use findByText instead of waitFor + getByText
    expect(await screen.findByText(/Please fill all required fields/i)).toBeInTheDocument();
  });

  test("dispatches registerUser when form filled correctly", async () => {
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AdminRegisterPage />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter your name/i), { target: { value: "John", name: "name" } });
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), { target: { value: "john@example.com", name: "email" } });
    fireEvent.change(screen.getByPlaceholderText(/Create your school name/i), { target: { value: "MySchool", name: "schoolName" } });
    fireEvent.change(screen.getByPlaceholderText(/Create a password/i), { target: { value: "123456", name: "password" } });

    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});
