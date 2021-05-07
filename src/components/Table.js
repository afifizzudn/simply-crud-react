import React from 'react';
import { useDispatch } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@material-ui/core';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import { deleteEmployee } from '../store/actions/employeesAction';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables({ employees }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  let newArr = employees.filter((data) => data.id.length > 15); //Filter data yang bisa di get by id

  function deleteHandler(id) {
    dispatch(deleteEmployee(id));
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>No.</StyledTableCell>
            <StyledTableCell>Nama</StyledTableCell>
            <StyledTableCell>Jenis Kelamin</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Alamat</StyledTableCell>
            <StyledTableCell>Kecamatan</StyledTableCell>
            <StyledTableCell>Kota</StyledTableCell>
            <StyledTableCell>Provinsi</StyledTableCell>
            <StyledTableCell>Aksi</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newArr.map((row, index) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component='th' scope='row'>
                {index + 1}.
              </StyledTableCell>
              <StyledTableCell>{row.nama}</StyledTableCell>
              <StyledTableCell>{row.jenisKelamin}</StyledTableCell>
              <StyledTableCell>{row.email}</StyledTableCell>
              <StyledTableCell>{row.alamat}</StyledTableCell>
              <StyledTableCell>{row.kecamatan.nama}</StyledTableCell>
              <StyledTableCell>{row.kota.nama}</StyledTableCell>
              <StyledTableCell>{row.provinsi.nama}</StyledTableCell>
              <StyledTableCell>
                <IconButton edge='start' color='inherit' aria-label='menu'>
                  <EditSharpIcon />
                </IconButton>
                <IconButton edge='start' color='secondary' aria-label='menu' onClick={() => deleteHandler(row.id)}>
                  <DeleteSharpIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
