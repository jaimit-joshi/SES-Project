"use client"

import { useState } from "react"
import { StyledTableCell, StyledTableRow } from "./styles"
import { Table, TableBody, TableContainer, TableHead, TablePagination, Paper, Box } from "@mui/material"
import styled from "styled-components"

const StyledTableContainer = styled(TableContainer)`
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 20px;
  
  @media (max-width: 428px) {
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`

const StyledPaper = styled(Paper)`
  border-radius: 10px;
  overflow: hidden;
  
  @media (max-width: 428px) {
    border-radius: 8px;
  }
`

const StyledTablePagination = styled(TablePagination)`
  .MuiTablePagination-selectLabel,
  .MuiTablePagination-displayedRows {
    margin-bottom: 0;
  }

  .MuiTablePagination-select {
    padding-top: 8px;
    padding-bottom: 8px;
  }
  
  @media (max-width: 428px) {
    .MuiTablePagination-selectLabel {
      display: none;
    }
    
    .MuiTablePagination-select {
      padding: 4px;
    }
    
    .MuiTablePagination-displayedRows {
      font-size: 0.75rem;
    }
    
    .MuiToolbar-root {
      padding-left: 8px;
      padding-right: 8px;
    }
  }
`

const ActionButtonsContainer = styled(Box)`
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  padding: 4px 0;
  
  @media (max-width: 428px) {
    gap: 4px;
  }
`

const ResponsiveTableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`

const TableTemplate = ({ buttonHaver: ButtonHaver, columns, rows }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  return (
    <>
      <StyledPaper>
        <ResponsiveTableContainer>
          <StyledTableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <StyledTableRow>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.id}
                      align={column.align || "left"}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id]
                        return (
                          <StyledTableCell key={column.id} align={column.align || "left"}>
                            {column.format && typeof value === "number" ? column.format(value) : value}
                          </StyledTableCell>
                        )
                      })}
                      <StyledTableCell align="center">
                        <ActionButtonsContainer>
                          <ButtonHaver row={row} />
                        </ActionButtonsContainer>
                      </StyledTableCell>
                    </StyledTableRow>
                  )
                })}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </ResponsiveTableContainer>
        <StyledTablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(Number.parseInt(event.target.value, 10))
            setPage(0)
          }}
        />
      </StyledPaper>
    </>
  )
}

export default TableTemplate
