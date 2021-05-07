const initialState = {
  data: [],
  dataDetail: {},
  loading: false,
  error: null,
};

function reducer(state = initialState, { type, payload }) {
  if (type === 'employees/setEmployees') {
    return { ...state, data: payload };
  } else if (type === 'loading/setLoading') {
    return { ...state, loading: payload };
  }
  return state;
}

export default reducer;
