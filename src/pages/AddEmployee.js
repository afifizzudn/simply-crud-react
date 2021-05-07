import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import { fetchProvinces, fetchCity, fetchDistrict } from '../store/actions/locationsAction';
import { createEmployee } from '../store/actions/employeesAction';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  formControl: {
    marginTop: theme.spacing(1),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddEmployee() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const provinces = useSelector((state) => state.locations.dataProvinces);
  const city = useSelector((state) => state.locations.dataCity);
  const district = useSelector((state) => state.locations.dataDistrict);
  const loading = useSelector((state) => state.locations.loading);

  const [input, setInput] = useState({
    nama: '',
    jenisKelamin: '',
    email: '',
    alamat: '',
    kecamatan: '',
    kota: '',
    provinsi: '',
  });

  useEffect(() => {
    dispatch(fetchProvinces());
  }, [dispatch]);

  const getCity = (id) => {
    dispatch(fetchCity(id));
  };

  const getDistrict = (id) => {
    dispatch(fetchDistrict(id));
  };

  console.log(input);
  // console.log(provinces);
  // console.log(city);
  // console.log(district);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createEmployee(input));
    history.push('/');
  };

  if (!provinces || provinces.length === 0 || loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonAddOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Add Employee
          </Typography>
          <form className={classes.form} onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField autoComplete='nama' name='nama' value={input.nama} onChange={handleChange} variant='outlined' required fullWidth id='name' label='Nama' autoFocus />
              </Grid>
              <Grid item xs={12}>
                <TextField variant='outlined' required fullWidth id='email' value={input.email} onChange={handleChange} label='Email' name='email' autoComplete='email' />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant='outlined' className={classes.formControl}>
                  <InputLabel htmlFor='outlined-jenisKelamin'>Jenis Kelamin</InputLabel>
                  <Select id='outlined-jenisKelamin' required value={input.jenisKelamin} onChange={handleChange} label='Jenis Kelamin' name='jenisKelamin'>
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value='Laki-laki'>Laki-laki</MenuItem>
                    <MenuItem value='Perempuan'>Perempuan</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField autoComplete='alamat' name='alamat' value={input.alamat} onChange={handleChange} variant='outlined' required fullWidth id='alamat' label='Alamat' autoFocus />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  name='provinsi'
                  value={input.provinsi}
                  getOptionLabel={(option) => option.nama}
                  getOptionSelected={(option, value) => option.nama === value.name}
                  onChange={(event, newInputValue) => {
                    setInput({ ...input, provinsi: newInputValue });
                    if (!newInputValue) {
                      return null;
                    } else {
                      getCity(newInputValue.id);
                    }
                  }}
                  id='controllable-states-demo'
                  options={provinces}
                  renderInput={(params) => <TextField {...params} label='Provinsi' variant='outlined' name='provinsi' fullWidth />}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant='outlined' className={classes.formControl}>
                  <InputLabel htmlFor='outlined-city'>Kabupaten/Kota</InputLabel>
                  <Select
                    id='outlined-city'
                    required
                    value={input.kota}
                    onChange={async (e) => {
                      await setInput({ ...input, kota: e.target.value });
                      await getDistrict(e.target.value.id);
                    }}
                    label='Kabupaten/Kota'
                    name='kota'>
                    {!input.provinsi ? (
                      <MenuItem value=''>-- Pilih Provinsi Dulu --</MenuItem>
                    ) : (
                      city.map((e) => (
                        <MenuItem key={e.id} value={e}>
                          {e.nama}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant='outlined' className={classes.formControl}>
                  <InputLabel htmlFor='outlined-district'>Kecamatan</InputLabel>
                  <Select id='outlined-district' required value={input.kecamatan} onChange={handleChange} label='Kecamatan' name='kecamatan'>
                    {!input.kota ? (
                      <MenuItem value=''>-- Pilih Kabupaten/Kota Dulu-</MenuItem>
                    ) : (
                      district.map((e) => (
                        <MenuItem key={e.id} value={e}>
                          {e.nama}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
              Submit
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
}
