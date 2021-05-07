import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CustomizedTables from '../components/Table';
import { Typography, Container, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { fetchEmployees } from '../store/actions/employeesAction';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: 20,
    marginBottom: 10,
  },
}));

export default function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const employees = useSelector((state) => state.employees.data);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <>
      <Container styles={classes.root}>
        <Grid container direction='row' justify='center' alignItems='center'>
          <Typography variant='h4' component='h4' style={{ marginTop: 20 }} gutterBottom>
            Data Employee
          </Typography>
        </Grid>
        <Grid container direction='row' justify='flex-end' alignItems='center'>
          <Button style={{ marginBottom: 5 }} variant='contained' color='primary' component='span' onClick={() => history.push('/add')}>
            <PersonAddIcon />
          </Button>
        </Grid>
        <CustomizedTables employees={employees} key={employees.id} />
      </Container>
    </>
  );
}
