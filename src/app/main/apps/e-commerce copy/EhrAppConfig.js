import { lazy } from 'react';
import { authRoles } from 'src/app/auth';
import AddMedicalRecord from './medicalRecords/AddMedicalRecord';

const Users = lazy(() => import('./users/Users'));
const MedicalRecords = lazy(() => import('./medicalRecords/MedicalRecords'));

const EhrAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'patients',
      element: <Users name={"Patients"} />,
      auth: [...authRoles.admin, ...authRoles.doctor],
    },

    {
      path: 'doctors',
      element: <Users name={"Doctors"} />,
      auth: authRoles.admin,
    },
    {
      path: 'lab-attendant',
      element: <Users name={"Lab Attendants"} />,
      auth: authRoles.admin,
    },
    {
      path: 'patient/:patientId/medical-records',
      element: <MedicalRecords isAdmin={true} />,
      auth: [...authRoles.admin, ...authRoles.doctor],
    },
    {
      path: 'patient/:patientId/add-medical-record',
      element: <AddMedicalRecord />,
      auth: [...authRoles.admin, ...authRoles.doctor],
    },
    {
      path: 'medical-records',
      element: <MedicalRecords />,
      auth: [...authRoles.patient],
    },
  ],
};

export default EhrAppConfig;
