import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { selectMedicalRecordSearchText, setMedicalRecordSearchText } from '../store/MedicalRecordSlice';
import { Link, useParams } from 'react-router-dom';

function MedicalRecordHeader(props) {
  const dispatch = useDispatch();
  const searchText = useSelector(selectMedicalRecordSearchText);
  const routeParams = useParams();
  const { patientId } = routeParams;
  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full space-y-8 sm:space-y-0 items-center justify-between py-32 px-24 md:px-32">
      <Typography
        component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="flex text-24 md:text-32 font-extrabold tracking-tight"
      >
        Medical Records
      </Typography>

      <div className="flex flex-1 items-center justify-end space-x-8 w-full sm:w-auto">
        <Paper
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
        >
          <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>

          <Input
            placeholder="Search Medical Records"
            className="flex flex-1"
            disableUnderline
            fullWidth
            value={searchText}
            inputProps={{
              'aria-label': 'Search Medical Records',
            }}
            onChange={(ev) => dispatch(setMedicalRecordSearchText(ev))}
          />
        </Paper>
        {
          props.isAdmin &&
          (<motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
          >
            <Button
              className=""
              component={Link}
              to={`/patient/${patientId}/add-medical-record`}
              variant="contained"
              color="secondary"
              startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
            >
              Add
            </Button>
          </motion.div>)

        }
      </div>
    </div>
  );
}

export default MedicalRecordHeader;
