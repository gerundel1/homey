import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import Background from "../Background/Background";
import axios from "axios";
import { UserContext } from "../../App";

const theme = createTheme();

export default function Login() {
    const history = useHistory();
    const { setUserName, setLoginStatus, setUserType, setUserEmail, setUserId } =
        useContext(UserContext);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        axios.post("http://localhost:8080/api/users/login", {
                email: data.email,
                password: data.password,
            })
            .then((res) => {
                console.log(res.data);
                localStorage.setItem("token", "Bearer " + res.data.accessToken);
                localStorage.setItem("refreshToken", res.data.refreshToken);
                localStorage.setItem("user", JSON.stringify(res.data.user));

                setUserName(res.data.user.name);
                setUserEmail(res.data.user.email);
                setUserType(res.data.user.type);
                setLoginStatus(true);
                setUserId(res.data.user._id);
                console.log(res.data);
                console.log(res.data.user.name);
            })
            .catch((err) => {
                // You may display this error message in the UI
                console.log(err);
            });

        // Redirect to Congratulation page for now
        history.push("/registersuccess");
    };

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
                        Login
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            {...register("email", {
                                required: "This field is required.",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address",
                                },
                            })}
                            error={!!errors?.email}
                            helperText={
                                errors?.email ? errors.email.message : null
                            }
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
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

                        <Button
                            className="buttonHover"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
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
