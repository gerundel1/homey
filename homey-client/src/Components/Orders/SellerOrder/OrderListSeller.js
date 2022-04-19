import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import "./OrderListSeller.css";
import axios from "axios";
import { UserContext } from "../../../App";
import { v4 as uuidv4 } from 'uuid';


//table
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CardMedia from "@mui/material/CardMedia";


//  drop down list
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// date picker
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

function OrderListSeller() {
    const { userType, userEmail } = useContext(UserContext);

    //  drop down list
    const [sort, setSort] = React.useState("");

    const handleChange = (event) => {
        setSort(event.target.value);
        console.log(sort);
    };

    // date picker
    const yesterday = new Date();

    yesterday.setDate(yesterday.getDate() - 1);

    yesterday.toISOString();
    const [valueFrom, setValueFrom] = React.useState(yesterday);

    const handleChangePickerFrom = (newValue) => {
        let date = new Date(newValue);
        setValueFrom(date.toISOString());
    };

    const [valueTo, setValueTo] = React.useState(new Date().toISOString());

    const handleChangePickerTo = (newValue) => {
        let date = new Date(newValue);
        setValueTo(date.toISOString());
    };

    const [orders, setOrders] = useState([]);

    async function setProductImages(data) {
        let temp = data;
        for (let i = 0; i < temp.length; i++) {
            for (let j = 0; j < temp[i].orderItems.length; j++) {
                const product = await axios.get(`http://localhost:8080/api/product/${temp[i].orderItems[j].productId}`);
                temp[i].orderItems[j] = {
                    ...temp[i].orderItems[j],
                    image: product.data.images[0]
                }
            }
        }
        return temp;
    }

    useEffect(() => {
        const get_string = userType === "Business" ? 
        `http://localhost:8080/api/orders/get_all?seller=${userEmail}&sort=${sort}&sdate=${valueFrom}&edate=${valueTo}` :
        `http://localhost:8080/api/orders/get_all?user=${userEmail}&sort=${sort}&sdate=${valueFrom}&edate=${valueTo}`;
        axios.get(get_string)
        .then(async result => {
            setOrders(await setProductImages(result.data));
        })
    }, [sort, valueFrom, valueTo]);

    //table

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: '#A2BAB4',
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

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
                                <MenuItem value={"desc"} defaultChecked>Newest</MenuItem>
                                <MenuItem value={"asc"}>Oldest</MenuItem>
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
                        </LocalizationProvider>
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
                        </LocalizationProvider>
                    </Grid>
                </Grid>
            </div>
            {orders.map((order) => (
                <>
                <TableContainer key={uuidv4()} component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            <Typography variant="h5">
                                { userType === "Business" ?
                                `Customer - ${order.userEmail}` :
                                `Seller - ${order.sellerEmail}`}
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <Typography variant="h5">
                                Price&nbsp;($)
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <Typography variant="h5">
                                Quantity
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <Typography variant="h5">
                                Image
                            </Typography>
                        </StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {order.orderItems.map((row) => (
                        <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                            <Typography variant="h6">
                                {row.name}
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <Typography variant="h6">
                                {row.price}
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <Typography variant="h6">
                                {row.quantity}
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <CardMedia
                                component="img"
                                height="140"
                                image={`http://localhost:8080/api/product/image/${row.image}`}
                                alt="Product image"
                            /></StyledTableCell>
                        </StyledTableRow>
                    ))}
                    <TableRow>
                        <TableCell >
                            <Typography variant="h5">
                               <strong>Total: ${order.total}</strong>
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h5">
                               <strong>Date: {new Date(order.createdAt).toString().split(" ").slice(0, 5).join(" ")}</strong>
                            </Typography>
                        </TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            &nbsp;
            </>
            ))}
        </div>
    );
}

export default OrderListSeller;
