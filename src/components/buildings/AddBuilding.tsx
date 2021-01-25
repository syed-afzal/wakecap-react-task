import React, { useEffect, useState, useContext } from 'react';
import {
    Container, Button,
    FormControl, FormLabel, TextField, Select, MenuItem, InputLabel, Grid
} from '@material-ui/core';
import * as data from './../../data/countriesList.json';
import { AppContext } from '../../state/context';
import { Building } from '../../models';
import { Types } from '../../state/constants';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    row: {
        marginTop: theme.spacing(1)
    },
    buttonRow: {
        position: 'absolute', 
        bottom: 40, 
        right: 8
    },
    container: {
        position: 'relative',
        height: '100%'
    },
    cancel: {
        marginRight: 8
    }
}));

interface BuildingProps {
    formType: string,
    formData?: Building,
    clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const AddBuilding: React.FC<BuildingProps> = (props) => {

    const [addBuildingState, setAddBuildingState] = useState({
        locations: [],
        locationId: '',
        buildingName: '',
    });
    const { locationId, locations, buildingName } = addBuildingState;
    const { state, dispatch } = useContext(AppContext);
    const classes = useStyles();

    useEffect(() => {
        data?.locations && setAddBuildingState((prevState) => ({ ...prevState, locations: data.locations }))
    }, []);

    useEffect(() => {
        props?.formType === 'edit' && setAddBuildingState((prevState) => ({ ...prevState, buildingName: props?.formData?.name, locationId: props?.formData?.locationId }));
    }, [props?.formType]);

    const handleSubmit = (e: any) => {
        props?.formType === 'add' ?
            dispatch({
                type: Types.CREATE,
                payload: {
                    id: `building-${state.buildings.filter(x => x.userId === state.selectedUser).length + 1}`,
                    name: buildingName,
                    userId: state.selectedUser,
                    locationId: locationId
                }
            }) : dispatch({
                type: Types.EDIT,
                payload: {
                    id: props?.formData?.id,
                    name: buildingName,
                    userId: state.selectedUser,
                    locationId: locationId
                }
            })
        setAddBuildingState((prevState) => ({ ...prevState, buildingName: '', locationId: '' }));
        props?.clickHandler(e);
    }

    return (
        <Container className={classes.container}>
            <Grid container className={classes.row}>
                <Grid item xs={3}>
                    <FormControl>
                        <FormLabel component="legend"> Name </FormLabel>

                    </FormControl>
                </Grid>
                <Grid item xs={5}>
                    <FormControl fullWidth>
                        <TextField 
                            variant="outlined" 
                            value={buildingName}
                            onChange={(e: React.ChangeEvent<{ value: string }>) => {
                                e.persist();
                                setAddBuildingState((prevState) => ({ ...prevState, buildingName: e.target.value }))
                            }} 
                            />
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container className={classes.row}>
                <Grid item xs={3}>
                    <FormControl>
                        <FormLabel component="legend"> Location </FormLabel>
                    </FormControl>
                </Grid>
                <Grid item xs={5}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="grouped-native-select">Select Location</InputLabel>
                        <Select
                            value={locationId}
                            variant="outlined"
                            onChange={(e: React.ChangeEvent<{ value: string }>) => {
                                setAddBuildingState((prevState) => ({ ...prevState, locationId: e.target.value }))
                            }}
                        >
                            {
                                locations.length && locations.map(loc => {
                                    return <MenuItem key={loc.id} value={loc.id}> {loc.name} </MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container justify="flex-end" className={classes.buttonRow} >
                <Grid item>
                    <Button 
                        variant="outlined" 
                        className={classes.cancel}
                        onClick={props?.clickHandler}
                    >
                        CANCEL
                    </Button>
                    <Button 
                        variant="contained"
                        onClick={handleSubmit} 
                        disabled={!(locationId && buildingName)}
                        color="primary" 
                    >
                        {
                            props.formType === 'add' ? 'CREATE' : 'EDIT'
                        }
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}
export default AddBuilding;