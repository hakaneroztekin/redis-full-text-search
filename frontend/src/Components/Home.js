import React from 'react'
import NavBar from "./NavBar";
import BackgroundImage from '../Images/background.png';

import {Paper} from "@material-ui/core";
import Search from "./Search";

const styles = {
    paperContainer: {
        backgroundImage: `url(${BackgroundImage})`,
        backgroundRepeat: 'repeat',
        height: '100vh',
    }
};

const Home = () => {
    return(
            <Paper style={styles.paperContainer}>
                <NavBar />
                <Search />
            </Paper>
    )
}

export default Home;