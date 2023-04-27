import React, { useEffect }  from 'react'
import {Box, Button, IconButton, Typography, useTheme}from "@mui/material";
import { fetchUsers } from '../../redux/userSlice'
import { useSelector,useDispatch } from 'react-redux'
import { tokens } from "../../theme";
import Loading from '../global/Loading';


const UsersList = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {loading,error,users} = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchUsers());
    }, [dispatch]);

    const sortedUsers = [...users].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    }); // create a sorted copy of the users array

    return (
        <>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`1px solid ${colors.primary[900]}`}
                colors={colors.grey[100]}
                p="10px"
            >
                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                    Recent Users
                </Typography>
            </Box>
            <Loading Loading={loading} error={error}>
            {sortedUsers.slice(0, 4).map((user, i) => (
                <Box
                    key={i}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`1px solid ${colors.primary[900]}`}
                    p="5px"
                >
                    <Box>
                        <Typography
                            color={colors.greenAccent[500]}
                            variant="h5"
                            fontWeight="600"
                        >
                            {user.firstname}
                        </Typography>
                        <Typography color={colors.grey[100]}>
                            {user.lastname}
                        </Typography>
                    </Box>
                    <Box color={colors.grey[100]}>{user.email}</Box>
                    <Box
                        backgroundColor={colors.greenAccent[500]}
                        p="5px 10px"
                        borderRadius="4px"
                    >
                        {user.createdAt.slice(0, 10)}
                    </Box>
                </Box>
            ))}
            </Loading>
        </>
    )
}

export default UsersList;