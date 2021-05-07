import { combineReducers } from 'redux';
import employees from './employeesReducer';
import locations from './locationsReducer';

const reducer = combineReducers({
  employees,
  locations,
});

export default reducer;
