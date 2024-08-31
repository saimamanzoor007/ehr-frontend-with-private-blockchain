import TextField from '@mui/material/TextField';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { Button, Input } from '@mui/material';
import { addMedicalRecord } from '../store/MedicalRecordSlice';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';


const schema = yup.object().shape({
  recordType: yup
    .string()
    .required('You must enter a medical record type')
    .min(3, 'The medical record type must be at least 3 characters'),
  file: yup
    .mixed().required("File is required.")
});

const defaultValues = {
  recordType: "",
  description: "",
  file: null
}

function AddMedicalRecordDetails(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { control, formState, handleSubmit, reset, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, setError } = formState;
  function onSubmit({ recordType, description }) {
    var data = new FormData();
    var imagedata = document.querySelector('input[type="file"]').files[0];
    data.append("file", imagedata);
    data.append("recordType", recordType);
    data.append("description", description);
    data.append("patientId", props.patientId);
    dispatch(addMedicalRecord(data)).then(() => navigate(`/patient/${props.patientId}/medical-records`));
  }

  return (
    <div>
      <form
        name="registerForm"
        noValidate
        className="flex flex-col justify-center w-full mt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="recordType"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={!!errors.recordType}
              required
              helperText={errors?.recordType?.message}
              label="Medical Record Type"
              autoFocus
              id="name"
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              id="description"
              label="Description"
              type="text"
              multiline
              rows={5}
              variant="outlined"
              fullWidth
            />
          )}
        />
        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              className="mt-8 mb-16"
              id="description"
              label="Files"
              type="file"
              variant="outlined"
              fullWidth
              required
            />
          )}
        />
        <Button
          variant="contained"
          color="secondary"
          className="w-full mt-24"
          aria-label="Register"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          type="submit"
          size="large"
        >
          Create Medical Record
        </Button>
      </form>
    </div>
  );
}

export default AddMedicalRecordDetails;
