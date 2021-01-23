import React, { useState, useContext } from 'react';
import { Container, Grid, Typography, AppBar, Button, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import AddBuilding from './AddBuilding';
import { AppContext } from '../../state/context';


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
    }
}));

export const Index = () => {

    const classes = useStyles();
    const [buildingState, setBuildingState] = useState({
        viewType: '',
        formType: '',
        selectedBuilding: null
    });
    const { formType, viewType, selectedBuilding } = buildingState
    const { state, dispatch } = useContext(AppContext);

    const handleDelete = (id: number) => {
        dispatch({
            type: 'DELETE',
            payload: {
                id: id
            }
        })
    }

    const handleReset = () => {
        setBuildingState((prevState) => ({ ...prevState, formType: '', viewType: '' }))
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
                                state?.buildings?.length > 0 && state.buildings.map((building, index) => {
                                    return (
                                        building.userId === state.selectedUser &&
                                        <Typography component="div" key={index} className={classes.list}>
                                            <Grid container>
                                                <Grid item xs={10}>
                                                    <Typography component='span' style={{ marginLeft: 8 }} > {building.name} </Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <DeleteIcon
                                                        className={'hiddenButton'}
                                                        onClick={() => handleDelete(building.id)}
                                                        color={'primary'}
                                                    />
                                                    <EditIcon
                                                        onClick={() => setBuildingState((prevState) => ({ ...prevState, formType: 'edit', viewType: 'form', selectedBuilding: building }))}
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
                                formType === 'add' && <span> ADD </span>
                            }
                            {
                                formType === 'edit' && <span> EDIT </span>
                            }
                        </AppBar>
                        {
                            viewType === 'form' && <AddBuilding formType={formType} formData={selectedBuilding} clickHandler={handleReset} />
                        }
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )

}