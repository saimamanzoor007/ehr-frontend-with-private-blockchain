import i18next from 'i18next';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import authRoles from '../auth/authRoles';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'dashboards',
    title: 'Dashboards',
    type: 'item',
    icon: 'heroicons-outline:home',
    translate: 'DASHBOARDS',
    url: '/dashboards',
    auth: authRoles.user,
  },
  {
    id: 'users',
    title: 'Users',
    type: 'group',
    icon: 'heroicons-outline:user',
    translate: 'USERS',
    auth: [...authRoles.admin, ...authRoles.doctor],

    children: [
      {
        id: 'patients',
        title: 'Patients',
        type: 'item',
        url: 'patients',
        icon: 'heroicons-outline:user',
        auth: [...authRoles.admin, ...authRoles.doctor],
      },
      {
        id: 'labAttendant',
        title: 'Lab Attendants',
        type: 'item',
        url: 'lab-attendant',
        icon: 'heroicons-outline:user',
        auth: authRoles.admin,
      },
      {
        id: 'doctor',
        title: 'Doctors',
        type: 'item',
        url: 'doctors',
        icon: 'heroicons-outline:user',
        auth: authRoles.admin,
      },
      {
        id: 'register',
        title: 'Register User',
        type: 'item',
        url: 'register-user',
        auth: authRoles.admin,
        icon: 'person_add',
      },
    ]
  },
  {
    id: 'records',
    title: 'Medical Records',
    type: 'group',
    icon: 'heroicons-outline:user',
    auth: authRoles.patient,
    children: [
      {
        id: 'medical-records',
        title: 'Medical Records List',
        type: 'item',
        url: 'medical-records',
        icon: 'heroicons-outline:document-text',
        auth: authRoles.user,
      },
      {
        id: 'add-medical-records',
        title: 'Add Medical Records',
        type: 'item',
        url: 'add-medical-records',
        icon: 'heroicons-outline:document-add',
        auth: [...authRoles.admin, ...authRoles.doctor],
      },
    ]
  },

  {
    id: 'sign-out',
    title: 'Sign out',
    type: 'item',
    auth: authRoles.user,
    url: 'sign-out',
    icon: 'exit_to_app',
  },

];

export default navigationConfig;
