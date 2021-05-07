import axios from '../../api/employeesApi';

export function setEmployees(payload) {
  return { type: 'employees/setEmployees', payload };
}

export function setLoading(payload) {
  return { type: 'loading/setLoading', payload };
}

export const fetchEmployees = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.get('/');
    dispatch(setEmployees(data));
  } catch (error) {
    console.error(error);
  } finally {
    await dispatch(setLoading(false));
  }
};

export const createEmployee = (payload) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    // console.log(payload);
    await axios.post('/', { ...payload });
  } catch (error) {
    console.error(error);
  } finally {
    await dispatch(setLoading(false));
    await dispatch(fetchEmployees());
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axios.delete('/' + id);
  } catch (error) {
    console.error(error);
  } finally {
    await dispatch(setLoading(false));
    await dispatch(fetchEmployees());
  }
};
