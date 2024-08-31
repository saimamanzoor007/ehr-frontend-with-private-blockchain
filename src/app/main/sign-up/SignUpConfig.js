import SignUpPage from './SignUpPage';
import authRoles from '../../auth/authRoles';

const SignUpConfig = {
  settings: {
    layout: {
      config: {
      },
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'register-user',
      element: <SignUpPage />,
    },
  ],
};

export default SignUpConfig;
