import withReducer from 'app/store/withReducer';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { motion } from 'framer-motion';
import reducer from './store';
import { getWidgets, selectWidgets } from './store/widgetsSlice';
import DashboardAppHeader from './DashboardAppHeader';
import DashboardWidget from './widgets/DashboardWidget';
import { selectUser } from 'app/store/userSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const widgets = useSelector(selectWidgets);

  useEffect(() => {
    dispatch(getWidgets());
  }, [dispatch]);
  return (
    <FusePageSimple
      header={<DashboardAppHeader />}
      content={
        <>
          {useMemo(() => {
            const container = {
              show: {
                transition: {
                  staggerChildren: 0.06,
                },
              },
            };

            const item = {
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            };

            return (
              !_.isEmpty(widgets) && (
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32 w-full p-24 md:p-32"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {
                    (user.role === "admin" || user.role === "doctor")
                    && (
                      <motion.div variants={item} className="sm:col-span-2 lg:col-span-1 ">
                        <DashboardWidget count={5000} name="Patients" />
                      </motion.div>
                    )}
                  {
                    user.role === "admin"
                    && (
                      <>
                        <motion.div variants={item} className="sm:col-span-2 lg:col-span-1 ">
                          <DashboardWidget count={1000} name="Doctors" />
                        </motion.div>

                        <motion.div variants={item} className="sm:col-span-2 lg:col-span-1 ">
                          <DashboardWidget count={200} name="Lab Attendants" />
                        </motion.div>
                      </>
                    )
                  }
                  {
                    user.role === "patient"
                    && (
                      <motion.div variants={item} className="sm:col-span-2 lg:col-span-1 ">
                        <DashboardWidget count={1000} name="Medical Records" />
                      </motion.div>
                    )
                  }

                </motion.div>
              )
            );
          }, [widgets])}
        </>
      }
    />
  );
}

export default withReducer('analyticsDashboardApp', reducer)(Dashboard);
