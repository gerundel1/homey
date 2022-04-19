import React from "react";
import { makeStyles } from "@material-ui/core";
import Drawer from "@mui/material/Drawer";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { useHistory, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
    return {
        page: {
            // background: "#f9f9f9",
            width: "100%",
        },
        drawer: {
            width: drawerWidth,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        root: {
            display: "flex",
        },
        active: {
            background: "#8FA39E",
        },
        appbar: {
            zIndex: "1400 !important",
        },
        toolbar: theme.mixins.toolbar,
    };
});

function Layout({ children }) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const menuItems = [
        {
            text: "POSTS",
            path: "/postlist",
        },
        {
            text: "ORDERS",
            path: "/orders",
        },
    ];

    return (
        <div className={classes.root}>
            {/* app bar */}
            {/* <AppBar className={classes.appbar}>
                <Toolbar>
                    <Typography>HOMEY</Typography>
                </Toolbar>
            </AppBar> */}

            {/* <Nav /> */}

            {/* side drawer */}

            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{ paper: classes.drawerPaper }}
                PaperProps={{
                    sx: {
                        backgroundColor: "#A3BAB4",
                        color: "#E9E5E3",
                    },
                }}
            >
                {/* menu list  */}
                <Toolbar />

                <List>
                    {menuItems.map((item) => (
                        <div
                            className={
                                location.pathname == item.path
                                    ? classes.active
                                    : null
                            }
                            key={uuidv4()}
                        >
                            <ListItem
                                key={item.text}
                                button
                                onClick={() => history.push(item.path)}
                            >
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontSize: "1.2em",
                                    }}
                                    style={{ paddingLeft: 22 }}
                                ></ListItemText>
                            </ListItem>
                        </div>
                    ))}
                </List>
            </Drawer>

            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    );
}

export default Layout;
