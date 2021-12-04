import {Grid, Paper, TextField} from "@material-ui/core";
import Autocomplete from '@mui/material/Autocomplete';

import {Component} from "react";

// todo remove
const top100Films = [
    {label: 'The Shawshank Redemption', year: 1994},
];

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentList: [],
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
                    studentList: response
                });
                console.log("this.state")
                console.log(this.state)
            });
    }

    componentDidMount() {
        /* todo update
        fetch('http://localhost:3002/students/')
            .then(response => response.json())
            .then((response) => {
                this.setState({studentList : response})
               // console.log(this.state.studentList);
            });
         */
    }


    render() {
        return (
            <div>
                <Grid
                    container
                    spacing={4}
                    columns={1}
                    alignItems="center"
                    justifyContent="center"
                    style={{minHeight: '100vh'}}
                >

                    <Grid item xs={3}>
                        Response time: {this.state.responseTime}
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            disablePortal
                            id="search-student"
                            options={this.state.studentList}
                            onInputChange={(event, newInputValue) => {
                                this.searchStudent(newInputValue)
                            }}
                            PaperComponent={({children}) => (
                                <Paper style={{background: "#E2DCDE"}}>{children}</Paper>
                            )}
                            renderInput={(params) => <TextField {...params}/>}
                            noOptionsText="Type text to search"
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Search;