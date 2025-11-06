import { render, screen, within } from "@testing-library/react";
import React from "react";

const AttendanceView = ({ records }) => (
  <table data-testid="attendance-table">
    <thead>
      <tr>
        <th>Subject</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {records.map((rec, index) => (
        <tr key={index} data-testid="attendance-row">
          <td>{rec.subject}</td>
          <td>{rec.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const mockData = [
  { subject: "Math", status: "Present" },
  { subject: "Science", status: "Absent" },
  { subject: "English", status: "Present" },
];

test("renders attendance records", () => {
  render(<AttendanceView records={mockData} />);
  expect(screen.getByText("Math")).toBeInTheDocument();
  expect(screen.getByText("Absent")).toBeInTheDocument();
});

test("renders correct number of rows and matching data", () => {
  render(<AttendanceView records={mockData} />);
  const rows = screen.getAllByTestId("attendance-row");
  expect(rows).toHaveLength(mockData.length); // ✅ same number of rows as records

  // ✅ verify each row's content
  rows.forEach((row, index) => {
    const cells = within(row).getAllByRole("cell");
    expect(cells[0].textContent).toBe(mockData[index].subject);
    expect(cells[1].textContent).toBe(mockData[index].status);
  });
});
