import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField} from "@material-ui/core";
import Autocomplete from '@mui/material/Autocomplete';

import {Component} from "react";
import Typography from "@material-ui/core/Typography";

const styles = {
    typography: {
        fontFamily: "PT Sans"
    },
    table: {
        minWidth: 500,
    },
    tableContainer: {
        boxShadow: "none"
    }
};

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matchingStudents: [],
            responseTime: 0,
        };
    }

    searchStudent(name) {
        console.log("Searching student: " + name);
        if (name === undefined || name.length === 0) {
            return;
        }

        fetch('http://localhost:3002/students/' + name)
            .then(response => {
                this.setState({
                    responseTime: response.headers.get('X-Response-Time')
                });
                return response.json()
            })
            .then((response) => {
                this.setState({
                    matchingStudents: response
                });
                console.log("this.state")
                console.log(this.state)
            });
    }

    componentDidMount() {
        fetch('http://localhost:3002/students/')
            .then(response => {
                this.setState({
                    responseTime: response.headers.get('X-Response-Time')
                });
                return response.json()
            })
            .then((response) => {
                this.setState({matchingStudents: response})
                // console.log(this.state.matchingStudents);
            });
    }


    render() {
        return (
            <div>
                <Grid
                    container
                    direction="column"
                    spacing={4}
                    alignItems="center"
                    justifyContent="center"
                    style={{minHeight: '100vh'}}
                >
                    <Grid item>
                        <Typography inline variant="h4" style={styles.typography} color="primary">search a
                            student</Typography>
                    </Grid>
                    <Grid item>
                        <TableContainer component={Paper} style={styles.tableContainer}>
                            <Table style={styles.table} aria-label="simple table">
                                <TableBody>
                                    <TableRow
                                        key={"responseTime"}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Typography variant="subtitle2" style={styles.typography}>response
                                                time</Typography>
                                        </TableCell>
                                        <TableCell align="right"
                                                   style={styles.typography}>{this.state.responseTime}</TableCell>
                                        <TableCell component="th" scope="row">
                                            <Typography variant="subtitle2" style={styles.typography}>match
                                                count</Typography>
                                        </TableCell>
                                        <TableCell align="right"
                                                   style={styles.typography}>{this.state.matchingStudents.length}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            disablePortal
                            id="search-student"
                            options={this.state.matchingStudents}
                            onInputChange={(event, newInputValue) => {
                                this.searchStudent(newInputValue)
                            }}
                            PaperComponent={({children}) => (
                                <Paper style={{background: "#E2DCDE"}}>{children}</Paper>
                            )}
                            renderInput={(params) => <TextField {...params}/>}
                            noOptionsText="Type text to search"
                            sx={{width: "50vh", borderRadius: "2px 2px 2px 2px"}}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Search;