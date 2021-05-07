import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: '#eeebdd',
    fontSize: 14,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
            <PersonPinIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Simply-CRUD
          </Typography>
          <Button color='inherit'>
            <Link to='/' className={classes.link}>
              Home
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
