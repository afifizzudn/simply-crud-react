import axios from '../../api/locationsApi';

export function setProvinces(payload) {
  return { type: 'provinces/setProvinces', payload };
}

export function setCity(payload) {
  return { type: 'city/setCity', payload };
}

export function setDistrict(payload) {
  return { type: 'district/setDistrict', payload };
}

export function setLoading(payload) {
  return { type: 'loading/setLoading', payload };
}

export const fetchProvinces = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.get('/provinsi');
    dispatch(setProvinces(data.provinsi));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchCity = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.get('/kota?id_provinsi=' + id);
    dispatch(setCity(data.kota_kabupaten));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchDistrict = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.get('/kecamatan?id_kota=' + id);
    dispatch(setDistrict(data.kecamatan));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
