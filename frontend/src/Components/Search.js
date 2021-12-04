import {Box, Grid, TextField} from "@material-ui/core";
import Autocomplete from '@mui/material/Autocomplete';

import {Component} from "react";

const top100Films = [
    {label: 'The Shawshank Redemption', year: 1994},
];

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentList: [],
        };
    }

    searchStudent(name) {
        console.log("Searching student: " + name);
        if (name === undefined || name.length === 0) {
            return;
        }

        fetch('http://localhost:3002/students/' + name)
            .then(response => response.json())
            .then((response) => {
                this.setState({studentList: response})
            });
        console.log(this.state.studentList)
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
                    alignItems="center"
                    justifyContent="center"
                    style={{minHeight: '100vh'}}
                >
                    <Grid item xs={6}>
                        <Autocomplete
                            disablePortal
                            id="search-student"
                            options={this.state.studentList}
                            onInputChange={(event, newInputValue) => {
                                this.searchStudent(newInputValue)
                            }}
                            renderInput={(params) => <TextField {...params}/>}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Search;