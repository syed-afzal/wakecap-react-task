import React, { useState, useEffect, useContext } from 'react';
import * as data from '../../data/user.json';

import { Container, Grid, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from '../../state/context';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
    },
}));

export const UserCombo = () => {

    const [users, setUsers] = useState([]);
    const classes = useStyles();
    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
        data && data.users && data.users.length && setUsers(data.users);
    }, [data]);

    return (
        <Container>
            <Grid container justify="center">
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="grouped-native-select" style={{marginLeft: 8}}>Select User</InputLabel>
                    <Select
                        value={state.selectedUser}
                        variant="outlined"
                        onChange={(e: React.ChangeEvent<{ value: string }>) => {
                         dispatch({
                             type: 'SET',
                             payload: e.target.value
                         })
                      }}
                    >
                        {
                            users.length && users.map(user => {
                                return <MenuItem key={user.id} value={user.id}> {user.name} </MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </Grid>
        </Container>
    )

}