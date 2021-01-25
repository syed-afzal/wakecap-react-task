import React, { useState, useContext, useEffect } from 'react';
import { Container, Grid, Typography, AppBar, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import AddBuilding from './AddBuilding';
import { AppContext } from '../../state/context';
import Map from './../map';

const useStyles = makeStyles(() => ({
    container: {
        height: 420,
        border: '2px solid #3f51b5',
        borderRadius: 5,
    },
    listRoot: {
        height: 355,
        overflow: 'auto'
    },
    list: {
        cursor: "pointer",
        "& .hiddenButton": {
            display: "none"
        },
        "&:hover .hiddenButton": {
            display: "inline",
        },
        "&:hover ": {
            backgroundColor: 'gray'
        },
        marginTop: 8,
        backgroundColor: 'silver',
        height: 25,
        display: 'flex',
        alignItems: 'center',
    },
    button: {
        width: '100%'
    },
    apBar: {
        height: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buildingText: {
        marginLeft: 8
    }
}));

export const Index = () => {

    const classes = useStyles();
    const [buildingState, setBuildingState] = useState({
        viewType: '',
        formType: '',
        selectedBuilding: null,
        selectedUserBuildings: [],
        map: {}
    });
    const { formType, viewType, selectedBuilding, selectedUserBuildings } = buildingState
    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
        setBuildingState((prevState) => ({ ...prevState, selectedUserBuildings: state.buildings.filter(x => x.userId === state.selectedUser) }))
    }, [state.buildings, state.selectedUser]);

    useEffect(() => {
        if (selectedUserBuildings.length > 0) {
            setBuildingState((prevState) => ({ ...prevState, selectedBuilding: selectedUserBuildings[0], viewType: 'map' }))
        } else
            setBuildingState((prevState) => ({ ...prevState, viewType: '' }))
    }, [selectedUserBuildings]);

    const handleDelete = (id: string) => {
        dispatch({
            type: 'DELETE',
            payload: {
                id: id
            }
        })
        handleReset();
    }

    const handleReset = () => {
        setBuildingState((prevState) => ({ ...prevState, formType: '', viewType: '' }))
    }

    const handleMapLoad = (map: any) => {
        setBuildingState((prevState) => ({ ...prevState, map: map }))
    }
    return (
        <Container>
            <Grid container justify="flex-start" spacing={3} >
                <Grid item xs={4}>
                    <Typography component="div" className={classes.container} >
                        <AppBar color="primary" position="static" className={classes.apBar}>
                            Building List
                        </AppBar>
                        <Typography component="div" className={classes.listRoot} >
                            {
                                selectedUserBuildings.length > 0 && selectedUserBuildings.map((building, index) => {
                                    return (
                                        <Typography
                                            component="div"
                                            key={index}
                                            className={classes.list}
                                        >
                                            <Grid container>
                                                <Grid item xs={10}
                                                      onClick={() => setBuildingState((prevState) => ({ ...prevState, viewType: 'map', selectedBuilding: building }))}
                                                >
                                                    <Typography
                                                        component='span'
                                                        className={classes.buildingText}
                                                    > {building.name} </Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <DeleteIcon
                                                        className={'hiddenButton'}
                                                        onClick={() => handleDelete(building.id)}
                                                        color={'primary'}
                                                    />
                                                    <EditIcon
                                                        onClick={() => {
                                                            setBuildingState((prevState) => ({ ...prevState, formType: 'edit', viewType: 'form', selectedBuilding: building }))
                                                        }}
                                                        className={'hiddenButton'}
                                                        color={'primary'} />
                                                </Grid>
                                            </Grid>
                                        </Typography>
                                    )
                                })
                            }
                        </Typography>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => {
                                setBuildingState((prevState) => ({ ...prevState, formType: 'add', viewType: 'form' }))
                            }}
                            disabled={!state.selectedUser}
                            className={classes.button}
                        >
                            Add Building
                        </Button>
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Typography component="div" className={classes.container} >
                        <AppBar color="primary" position="static">
                            {
                                viewType === 'form' && formType === 'add' && <span> ADD </span>
                            }
                            {
                                viewType === 'form' && formType === 'edit' && <span> EDIT </span>
                            }
                            {
                                viewType === 'map' && <span> {selectedBuilding?.name} Map View </span>
                            }
                        </AppBar>
                        {
                            viewType === 'form' && <AddBuilding formType={formType} formData={selectedBuilding} clickHandler={handleReset} />
                        }
                        {
                            viewType === 'map' && selectedBuilding && <Map id='myMap' onMapLoad={handleMapLoad} location={selectedBuilding} />
                        }
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )

}
