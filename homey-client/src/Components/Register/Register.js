import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import Background from "../Background/Background";
import "./Register.css";
const theme = createTheme();
export default function Register() {
    const history = useHistory();
    const location = useLocation();
    const { userType } = location.state;
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        // user input
        // console.log(data);

        const userData = {
            name: data.firstName + " " + data.lastName,
            email: data.email,
            password: data.password,
            type: userType,
            phone: data.phone,
            address: data.address,
            // Anas: this field is always undefined even if I enter a string
            cuisine: data.cuisine,
        };

        axios.post(`http://localhost:8080/api/users/create`, userData)
            .then((obj) => console.log(obj))
            .catch((err) => {
                // You may display this error message in the UI
                console.log(err);
            });
        // add user to database

        // axios({
        //     url: "users/create",
        //     method: "POST",
        //     data: userData,
        // })
        //     .then(() => {
        //         console.log("Data has been sent to the server");
        //     })
        //     .catch(() => {
        //         console.log("Internal server error");
        //     });

        // Redirect to Congratulation page
        history.push("/registersuccess");
    };

    console.log(errors);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    className="shadowBox"
                    sx={{
                        marginTop: 15,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        {userType}
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    className="inputFields"
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    {...register("firstName", {
                                        required: "This field is required.",
                                    })}
                                    error={!!errors?.firstName}
                                    helperText={
                                        errors?.firstName
                                            ? errors.firstName.message
                                            : null
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    {...register("lastName", {
                                        required: "This field is required.",
                                    })}
                                    error={!!errors?.lastName}
                                    helperText={
                                        errors?.lastName
                                            ? errors.lastName.message
                                            : null
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    {...register("email", {
                                        required: "This field is required.",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    error={!!errors?.email}
                                    helperText={
                                        errors?.email
                                            ? errors.email.message
                                            : null
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    {...register("password", {
                                        required: "This field is required.",
                                    })}
                                    error={!!errors?.password}
                                    helperText={
                                        errors?.password
                                            ? errors.password.message
                                            : null
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="new-password"
                                    {...register("confirmPassword", {
                                        required: "This field is required.",
                                    })}
                                    error={!!errors?.confirmPassword}
                                    helperText={
                                        errors?.confirmPassword
                                            ? errors.confirmPassword.message
                                            : null
                                    }
                                />
                            </Grid>
                            {/* extra fields for business user */}
                            {userType == "Business" ? (
                                <>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="phone"
                                            label="Phone Number"
                                            type="phone"
                                            id="phone"
                                            autoComplete="phone"
                                            {...register("phone", {
                                                required:
                                                    "This field is required.",
                                                pattern: {
                                                    value: /^[0-9]{10}$/i,
                                                    message:
                                                        "Invalid phone number",
                                                },
                                            })}
                                            error={!!errors?.phone}
                                            helperText={
                                                errors?.phone
                                                    ? errors.phone.message
                                                    : null
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="address"
                                            label="Address"
                                            type="address"
                                            id="address"
                                            {...register("address", {
                                                required:
                                                    "This field is required.",
                                            })}
                                            error={!!errors?.address}
                                            helperText={
                                                errors?.address
                                                    ? errors.address.message
                                                    : null
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="cuisine"
                                            label="Cuisine"
                                            type="text"
                                            id="cuisine"
                                        />
                                    </Grid>
                                </>
                            ) : (
                                ""
                            )}
                        </Grid>
                        <Button
                            className="buttonHover"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                Already have an account?
                                <Link to="/login" variant="body2">
                                    Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            <Background />
        </ThemeProvider>
    );
}
