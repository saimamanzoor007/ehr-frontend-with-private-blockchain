import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMedicalRecords = createAsyncThunk('medicalRecords/getMedicalRecords', async ({ isAdmin, patientId }) => {
  let url = '/medical-records'
  if (isAdmin) {
    url = `/patients/${patientId}/medical-records`
  }
  const response = await axios.get(url);
  const data = await response.data;

  return data;
});

export const addMedicalRecord = createAsyncThunk('medicalRecords/addMedicalRecord', async (medicalData) => {
  const response = await axios.post('/medical-records', medicalData);
  const data = await response.data;
});

export const downloadMedicalRecord = createAsyncThunk('medicalRecords/downloadMedicalRecord', async ({ id, patientId, isAdmin }) => {
  let downloadUrl = '/medical-record/'
  if (isAdmin) {
    downloadUrl = `/patients/${patientId}/medical-record/`
  }
  console.log(downloadUrl + id)
  const response = await axios.get(downloadUrl + id, {
    responseType: 'blob', // Ensure the response is treated as binary data (blob)
  });
  const data = await response.data;
  // Extract the filename from the Content-Disposition header
  const contentDisposition = response.headers['content-disposition'];
  let fileName = 'downloaded-file.bin'; // Fallback filename
  if (contentDisposition) {
    const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
    if (fileNameMatch.length > 1) {
      fileName = fileNameMatch[1];
    }
  }

  // Create a blob from the response
  const blob = new Blob([data], { type: response.headers['content-type'] });
  const url = window.URL.createObjectURL(blob);

  // Create a link element to trigger the download
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName); // Use the filename from the response

  // Append the link to the body and trigger the download
  document.body.appendChild(link);
  link.click();

  // Clean up by removing the link element
  link.parentNode.removeChild(link);

  return data; // You can return any additional data if needed
});


const MedicalRecordsAdapter = createEntityAdapter({});

export const { selectAll: selectMedicalRecords, selectById: selectOrderById } = MedicalRecordsAdapter.getSelectors(
  (state) => state.eCommerceApp.medicalRecords
);

const medicalRecordSlice = createSlice({
  name: 'medicalRecords',
  initialState: MedicalRecordsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setMedicalRecordSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getMedicalRecords.fulfilled]: MedicalRecordsAdapter.setAll,
    [downloadMedicalRecord.fulfilled]: () => { },
    [addMedicalRecord.fulfilled]: () => { },
  },
});

export const { setMedicalRecordSearchText } = medicalRecordSlice.actions;

export const selectMedicalRecordSearchText = ({ eCommerceApp }) => eCommerceApp.medicalRecords.searchText;

export default medicalRecordSlice.reducer;
