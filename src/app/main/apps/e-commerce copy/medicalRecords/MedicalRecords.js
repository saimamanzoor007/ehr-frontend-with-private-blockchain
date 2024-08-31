import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../store';
import MedicalRecordHeader from './MedicalRecordHeader';
import MedicalRecordsTable from './MedicalRecordTable';

function MedicalRecords({ isAdmin }) {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<MedicalRecordHeader isAdmin={isAdmin}/>}
      content={<MedicalRecordsTable isAdmin={isAdmin} />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('eCommerceApp', reducer)(MedicalRecords);
