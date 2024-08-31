import { combineReducers } from '@reduxjs/toolkit';
import users from './usersSlice';
import medicalRecords from './MedicalRecordSlice';

const reducer = combineReducers({
  users,
  medicalRecords
});

export default reducer;
