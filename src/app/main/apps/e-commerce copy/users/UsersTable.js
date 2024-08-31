import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import { getUsers, selectUsers, selectUsersSearchText } from '../store/usersSlice';
import UsersTableHead from './UsersTableHead';
import UserStatus from './UserStatus';

function UsersTable(props) {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const searchText = useSelector(selectUsersSearchText);

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(users);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  useEffect(() => {
    let url = window.location.href.split("/")
    let role = url[url.length - 1]
    dispatch(getUsers(role)).then(() => setLoading(false));
  }, [dispatch, window.location.href]);

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(FuseUtils.filterArrayByString(users, searchText));
      setPage(0);
    } else {
      setData(users);
    }
  }, [users, searchText]);


  function handleClick(item) {
    props.navigate(`/patient/${item.id}/medical-records`);
  }


  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no {props.name}!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <UsersTableHead
            rowCount={data.length}
            name={props.name}
          />

          <TableBody>
            {_.orderBy(
              data
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    onClick={(event) => { if (props.name === "Patients") handleClick(n) }}
                  >

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.id}
                    </TableCell>

                    <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                      {`${n.firstName} ${n.lastName}`}
                    </TableCell>
                    {props.name === "Patients" && (
                      <>
                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                          {n.Patient?.dateOfBirth}
                        </TableCell>

                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                          {n.Patient?.gender}
                        </TableCell>
                      </>
                    )}

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      <UserStatus name={n.status} />
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.createdAt}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className="shrink-0 border-t-1"
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default withRouter(UsersTable);
