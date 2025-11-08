import { render, screen, within } from "@testing-library/react";
import React from "react";

const MarksView = ({ marks }) => (
  <table data-testid="marks-table">
    <thead>
      <tr>
        <th>Subject</th>
        <th>Marks</th>
      </tr>
    </thead>
    <tbody>
      {marks.map((item, index) => (
        <tr key={index} data-testid="marks-row">
          <td>{item.subject}</td>
          <td>{item.marks}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const mockMarks = [
  { subject: "Math", marks: 95 },
  { subject: "Science", marks: 88 },
  { subject: "History", marks: 76 },
];

test("renders student marks correctly", () => {
  render(<MarksView marks={mockMarks} />);
  expect(screen.getByText("Math")).toBeInTheDocument();
  expect(screen.getByText("95")).toBeInTheDocument();
});

test("renders all subjects with corresponding marks in correct order", () => {
  render(<MarksView marks={mockMarks} />);
  const rows = screen.getAllByTestId("marks-row");
  expect(rows).toHaveLength(mockMarks.length); // ✅ total rows match input

  rows.forEach((row, index) => {
    const cells = within(row).getAllByRole("cell");
    expect(cells[0].textContent).toBe(mockMarks[index].subject);
    expect(Number(cells[1].textContent)).toBe(mockMarks[index].marks);
  });
});
