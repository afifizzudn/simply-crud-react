const initialState = {
  dataProvinces: [],
  dataCity: [],
  dataDistrict: [],
  loading: false,
  error: null,
};

function reducer(state = initialState, { type, payload }) {
  if (type === 'provinces/setProvinces') {
    return { ...state, dataProvinces: payload };
  } else if (type === 'city/setCity') {
    return { ...state, dataCity: payload };
  } else if (type === 'district/setDistrict') {
    return { ...state, dataDistrict: payload };
  } else if (type === 'loading/setLoading') {
    return { ...state, loading: payload };
  }
  return state;
}

export default reducer;
