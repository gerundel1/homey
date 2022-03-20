import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import "./OrderListSeller.css";
import axios from "axios";

import { useTheme } from "@mui/material/styles";

//  drop down list
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// date picker
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import DateTimePicker from "@mui/lab/DateTimePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import Button from "@mui/material/Button";

function OrderListSeller() {
    //  drop down list
    const [sort, setSort] = React.useState("");

    const handleChange = (event) => {
        setSort(event.target.value);
        console.log(sort);
    };

    // date picker
    const [valueFrom, setValueFrom] = React.useState(new Date());

    const handleChangePickerFrom = (newValue) => {
        setValueFrom(newValue);
    };

    const [valueTo, setValueTo] = React.useState(new Date());

    const handleChangePickerTo = (newValue) => {
        setValueTo(newValue);
    };

    return (
        <div className="full-container">
            <div className="filter-container">
                <Grid className="flex-child" container spacing={2}>
                    <Grid item xs={6} md={2}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Sort
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sort}
                                label="Sort"
                                onChange={handleChange}
                            >
                                <MenuItem value={"newest"}>Newest</MenuItem>
                                <MenuItem value={"oldest"}>Oldest</MenuItem>
                            </Select>
                        </FormControl>{" "}
                    </Grid>
                    <Grid item xs={6} md={8} className="align-vertically">
                        <span>
                            <strong>Filter: </strong>
                        </span>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="From"
                                inputFormat="MM/dd/yyyy"
                                value={valueFrom}
                                onChange={handleChangePickerFrom}
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                            />
                        </LocalizationProvider>{" "}
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="To"
                                inputFormat="MM/dd/yyyy"
                                value={valueTo}
                                onChange={handleChangePickerTo}
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                            />
                        </LocalizationProvider>{" "}
                        <Button
                            variant="contained"
                            style={{
                                borderRadius: 5,
                                backgroundColor: "#A3BAB4",
                                padding: "13px 36px",
                                fontSize: "1em",
                                display: "block",
                            }}
                        >
                            Apply
                        </Button>
                    </Grid>
                </Grid>
            </div>

            <Grid container spacing={5} sx={{ flexDirection: "column" }}>
                {/* single card start */}
                <Grid item xs={3}>
                    <Card sx={{ display: "flex", width: "fit-content" }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: 300,
                            }}
                        >
                            <CardContent sx={{ flex: "1 0 auto" }}>
                                <Typography component="div" variant="h5">
                                    Customer Detail:
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="text.secondary"
                                    component="div"
                                >
                                    Customer name
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="text.secondary"
                                    component="div"
                                >
                                    Customer email
                                </Typography>
                                &nbsp;
                                <Typography component="div" variant="h5">
                                    Product Detail:
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="text.secondary"
                                    component="div"
                                >
                                    Product name
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="text.secondary"
                                    component="div"
                                >
                                    Product quantity ordered
                                </Typography>
                            </CardContent>
                        </Box>
                        <CardMedia
                            component="img"
                            sx={{ width: 300, height: 250 }}
                            image="https://source.unsplash.com/random"
                            alt="Product image"
                        />
                    </Card>
                </Grid>
                {/* single card end */}
            </Grid>
        </div>
    );
}

export default OrderListSeller;
