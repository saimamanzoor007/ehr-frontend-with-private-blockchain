/**
 * Authorization Roles
 */
const authRoles = {
  admin: ['admin'],
  doctor: ['doctor',],
  patient: ['patient'],
  user: ['admin', 'doctor', 'labAttendant', "patient"],
  onlyGuest: [],
};

export default authRoles;
