import React from 'react'

import {Paper} from "@material-ui/core";
import Search from "./Search";

const styles = {
    paperContainer: {
    }
};

const Home = () => {
    return(
            <Paper style={styles.paperContainer}>
                <Search />
            </Paper>
    )
}

export default Home;