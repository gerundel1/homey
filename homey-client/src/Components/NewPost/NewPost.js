import React, { useState } from "react";
import Background from "../Background/Background";
import { useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  FormControl,
} from "@mui/material";
import axios from 'axios';

const theme = createTheme(); // add details after

export default function NewPost() {
  const [imagefile, setImagefile] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const postData = {
      name: data.itemName,
      unitPrice: data.unitPrice,
      pricePer: data.pricePer,
      description: data.description,
      images: imagefile,
      allergies: data.allergies,
      quantity: data.quantity,
      category: data.category
    };
    console.log(postData);

    // axios({
    //     url: "post/create",
    //     method: "POST",
    //     data: postData,
    // })
    //     .then(() => {
    //         console.log("Data has been sent to the server");
    //     })
    //     .catch(() => {
    //         console.log("Internal server error");
    //     });
  };

  console.log(errors);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <Box
          className="shadowBox"
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            <p>Create a New Post</p>
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="itemName"
                  fullWidth
                  label="Item Name"
                  id="itemName"
                  autoFocus
                  required
                  {...register("itemName", {
                    required: "This field is required.",
                })}
                error={!!errors?.itemName}
                helperText={
                    errors?.itemName
                        ? errors.itemName.message
                        : null
                }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="unitPrice"
                  fullWidth
                  label="Unit Price"
                  id="unitPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  {...register("unitPrice", {
                    required: "This field is required.",
                })}
                error={!!errors?.unitPrice}
                helperText={
                    errors?.unitPrice
                        ? errors.unitPrice.message
                        : null
                }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="pricePer"
                  fullWidth
                  label="Per Unit"
                  id="pricePer"
                  placeholder="E.g. dozen, loaf, cookie..."
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="quantity"
                  fullWidth
                  label="Quantity Available"
                  id="quantity"
                  type="number"
                  min="0"
                  required
                  {...register("quantity", {
                    required: "This field is required.",
                })}
                error={!!errors?.quantity}
                helperText={
                    errors?.quantity
                        ? errors.quantity.message
                        : null
                }
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                name="category"
                fullWidth
                label="Cuisine Category"
                id="category"
                min="0"
                required
                {...register("category", {
                  required: "This field is required.",
              })}
              error={!!errors?.category}
              helperText={
                  errors?.category
                      ? errors.quantity.message
                      : null
              }
              />
            </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="description"
                  label="Item Description"
                  id="description"
                  multiline
                  rows={4}
                  {...register("description", {
                    required: "This field is required.",
                })}
                error={!!errors?.description}
                helperText={
                    errors?.description
                        ? errors.description.message
                        : null
                }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="allergies"
                  label="Allergy Alerts"
                  id="allergies"
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl>
                  <label>Product Image</label>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={8}>
                <FormControl>
                  <input
                    type="file"
                    id="itemImage"
                    onChange={(e) => setImagefile(e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Button
              className="buttonHover"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
      <Background />
    </ThemeProvider>
  );
}
