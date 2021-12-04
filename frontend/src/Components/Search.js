import {Grid, Paper, TextField} from "@material-ui/core";
import Autocomplete from '@mui/material/Autocomplete';

import {Component} from "react";
import Typography from "@material-ui/core/Typography";


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
                    spacing={5}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    style={{minHeight: '100vh'}}
                >

                    <Grid item xs={4}>
                        <Typography inline>Response time: {this.state.responseTime}</Typography>
                        <Typography inline>Match count: {this.state.matchingStudents.length}</Typography>
                    </Grid>
                    <Grid item xs={8}>
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
                            sx={{width: "50vh"}}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Search;