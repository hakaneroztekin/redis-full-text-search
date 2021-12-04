import {Box, Grid, TextField} from "@material-ui/core";


const Search = () => {
    let searchStudent = (event) => {
        let studentName = event.target.value;
        console.log("Searching student: " + studentName);
    }

    return (
        <div>
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh'}}
            >
                <Grid item xs={6}>
                    <TextField id="outlined-basic" fullWidth label="Student Name" variant="outlined" onChange={searchStudent} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Search;