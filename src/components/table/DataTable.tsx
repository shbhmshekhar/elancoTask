import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';
import TableFooter from '@mui/material/TableFooter';
import TablePaginationActions from './TablePaginationActions';
import CustomTableHead from './TableHead';


import {ROOT, DATA, Order } from './models';

const DataTable = () => {

  const tableHeaders:string[] = [
    "ConsumedQuantity",
    "Cost",
    "Date",
    "InstanceId",
    "MeterCategory",
    "ResourceGroup",
    "ResourceLocation",
    "Tags",
    "UnitOfMeasure",
    "Location",
    "ServiceName"
  ]

  const [data, setData] = useState<DATA>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState('Cost');
  


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    const getData = async () => {
      const response = await fetch('https://engineering-task.elancoapps.com/api/raw');
      const data = await response.json();
      setData(data);
    }
    getData();
  }, []);
  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  function stableSort<T>(array: DATA, comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
  ) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ROOT,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const visibleRows =  stableSort(data, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      );
  console.log("visibleRows", visibleRows)
  //TODO DISPLAY TAGS

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        {/* <TableHead sx={{ backgroundColor: '#98FFF4', fontStyle: 'bold' }}>
          <TableRow>
            {tableHeaders.map((tableHeader, i) => (
              <TableCell align={i != 0 ? "right" : 'inherit'}>{tableHeader}</TableCell>
            ))}
          </TableRow>
        </TableHead> */}
         <CustomTableHead
              // numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              // onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
        <TableBody>
          {/* {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ) */
          visibleRows.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {row.ConsumedQuantity}
              </TableCell>
              <TableCell align="right">{row.Cost}</TableCell>
              <TableCell align="right">{row.Date}</TableCell>
              <TableCell align="right">{row.InstanceId}</TableCell>
              <TableCell align="right">{row.MeterCategory}</TableCell>
              <TableCell align="right">{row.ResourceGroup}</TableCell>
              <TableCell align="right">{row.ResourceLocation}</TableCell>
              <TableCell align="right">{row.UnitOfMeasure}</TableCell>
              <TableCell align="right">{row.Location}</TableCell>
              <TableCell align="right">{row.ServiceName}</TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={6}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default DataTable;