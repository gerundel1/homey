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
} from "@mui/material";
import axios from "axios";
import "./NewPost.css";

const theme = createTheme(); // add details after

export default function NewPost() {
  const [imageFiles, setImageFiles] = useState({});
  const [imgErrMsg, setImgErrMsg] = useState(null);
  const [unit, setUnit] = useState(null);
  const [allergies, setAllergies] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function handleImageUpload(e) {
    setImageFiles({ photos: e.target.files });

    if (e.target.files.length > 4) {
      setImgErrMsg("Maximum 4 images.");
    } else {
      setImgErrMsg(null);
    }
  }

  function setUnitVar(e) {
    setUnit(e.target.value);
  }

  function setAllergyVar(e) {
    setAllergies(e.target.value);
  }

  const onSubmit = (data) => {
    if (imgErrMsg === null) {
      let postData = new FormData();
      postData.append("name", data.itemName);
      postData.append("unitPrice", data.unitPrice);
      postData.append("pricePer", unit);
      postData.append("description", data.description);
      postData.append("allergies", allergies);
      postData.append("quantity", data.quantity);
      postData.append("category", data.category);
      for (var i = 0; i < imageFiles.photos.length; i++) {
        postData.append("images", imageFiles.photos[i]);
      }

      axios.post(`http://localhost:8080/api/product/create`, postData)
      .then(obj => console.log(obj))
      .catch(err => {
          // You may display this error message in the UI
          console.log(err)
      });
    }
  };

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
                  helperText={errors?.itemName ? errors.itemName.message : null}
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
                    errors?.unitPrice ? errors.unitPrice.message : null
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
                  onChange={setUnitVar}
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
                  helperText={errors?.quantity ? errors.quantity.message : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="category"
                  fullWidth
                  label="Cuisine Type"
                  id="category"
                  min="0"
                  required
                  {...register("category", {
                    required: "This field is required.",
                  })}
                  error={!!errors?.category}
                  helperText={errors.category ? errors.quantity.message : null}
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
                    errors?.description ? errors.description.message : null
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
                  onChange={setAllergyVar}
                  rows={3}
                />
              </Grid>

              <Grid item xs={12} sm={5}>
                <label className="image-label">Upload Images (up to 4)</label>
                {imgErrMsg !== null && (
                  <div className="image-error">{imgErrMsg}</div>
                )}
              </Grid>

              <Grid item xs={12} sm={7}>
                <input
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                />
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
