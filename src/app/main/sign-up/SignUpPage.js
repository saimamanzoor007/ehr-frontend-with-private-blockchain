import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormHelperText from '@mui/material/FormHelperText';
import jwtService from '../../auth/services/jwtService';
import { InputLabel, MenuItem, Select } from '@mui/material';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  firstName: yup.string().required('You must enter first name'),
  lastName: yup.string().required('You must enter last name'),
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  role: yup.string().required('You must select role'),
  gender: yup.string().optional(),
  dateOfBirth: yup.string().optional(),
  address: yup.string().optional(),
  phoneNumber: yup.string().optional(),
  emergencyContact: yup.string().optional(),
});

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  role: '',
  gender: '',
  dateOfBirth: '',
  address: '',
  phoneNumber: '',
  emergencyContact: '',
};

function SignUpPage() {
  const { control, formState, handleSubmit, reset, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, setError } = formState;
  function onSubmit({ firstName, lastName, role, password, email, gender,
    dateOfBirth,
    address,
    phoneNumber,
    emergencyContact }) {
    jwtService
      .createUser({
        firstName, lastName, role,
        password,
        email,
        gender,
        dateOfBirth,
        address,
        phoneNumber,
        emergencyContact
      })
      .then((user) => {
        reset();
        // No need to do anything, registered user data will be set at app/auth/AuthContext
      })
      .catch((_errors) => {
        _errors.forEach((error) => {
          setError(error.type, {
            type: 'manual',
            message: error.message,
          });
        });
      });
  }

  return (
    <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0">
      <Paper className="w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow1">
        <div className="w-full max-w-400 sm:w-400 mx-auto sm:mx-0">
          <img className="w-200 m-auto" src="assets/images/logo/logo.svg" alt="logo" />
          <Typography className="mt-20 text-4xl font-extrabold tracking-tight leading-tight">
            Register new user
          </Typography>

          <form
            name="registerForm"
            noValidate
            className="flex flex-col justify-center w-full mt-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-12"
                  label="First name"
                  autoFocus
                  type="name"
                  error={!!errors.firstName}
                  helperText={errors?.firstName?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-12"
                  label="Last name"
                  type="name"
                  error={!!errors.lastName}
                  helperText={errors?.lastName?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-12"
                  label="Email"
                  type="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-12"
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-12"
                  label="Password (Confirm)"
                  type="password"
                  error={!!errors.passwordConfirm}
                  helperText={errors?.passwordConfirm?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Role"
                  className="mb-12"
                  placeholder='Select Role'
                  error={!!errors.role}
                  helperText={errors?.role?.message}
                  variant="outlined"
                  required
                  fullWidth
                >
                  <MenuItem value={"doctor"}>Doctor</MenuItem>
                  <MenuItem value={"patient"}>Patient</MenuItem>
                  <MenuItem value={"labAttendant"}>Lab Attendant</MenuItem>
                </Select>
              )}
            />
            {
              getValues("role") === "patient" && (
                <>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Gender"
                        className="mb-12"
                        placeholder='Select Gender'
                        error={!!errors.gender}
                        helperText={errors?.gender?.message}
                        variant="outlined"
                        required
                        fullWidth
                      >
                        <MenuItem value={"male"}>Male</MenuItem>
                        <MenuItem value={"female"}>Female</MenuItem>
                        <MenuItem value={"other"}>Other</MenuItem>
                      </Select>
                    )}
                  />
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-12"
                        // label="DOB"
                        type="date"
                        format="YYYY-MM-DD"
                        error={!!errors.dateOfBirth}
                        helperText={errors?.dateOfBirth?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-12"
                        label="Phone Number"
                        type="text"
                        error={!!errors.phoneNumber}
                        helperText={errors?.phoneNumber?.message}
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-12"
                        label="Address"
                        type="text"
                        error={!!errors.address}
                        helperText={errors?.address?.message}
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                  <Controller
                    name="emergencyContact"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-12"
                        label="Emergency Contact"
                        type="text"
                        error={!!errors.emergencyContact}
                        helperText={errors?.emergencyContact?.message}
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                </>
              )
            }
            <Button
              variant="contained"
              color="secondary"
              className="w-full mt-24"
              aria-label="Register"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              Create your free account
            </Button>
          </form>
        </div>
      </Paper>

    </div>
  );
}

export default SignUpPage;
