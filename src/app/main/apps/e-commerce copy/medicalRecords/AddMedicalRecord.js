
import FusePageCarded from '@fuse/core/FusePageCarded';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import withReducer from 'app/store/withReducer';

import { useParams } from 'react-router-dom';
import _ from '@lodash';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../store';
import AddMedicalRecordHeader from './AddMedicalRecordHeader';
import AddMedicalRecordDetails from './AddMedicalRecordDetails';


function AddMedicalRecord(props) {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { patientId } = routeParams;

  return (
    <FusePageCarded
      header={<AddMedicalRecordHeader patientId={patientId} />}
      content={
        <>
          <Tabs
            value={0}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            classes={{ root: 'w-full h-64 border-b-1' }}
          >
            <Tab className="h-64" label="Medical Record Details" />
            {/* <Tab className="h-64" label="Medical Record File" /> */}
          </Tabs>
          <div className="p-16 sm:p-24 max-w-3xl">
            <div >
              <AddMedicalRecordDetails patientId={patientId} />
            </div>
          </div>
        </>
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('eCommerceApp', reducer)(AddMedicalRecord);
