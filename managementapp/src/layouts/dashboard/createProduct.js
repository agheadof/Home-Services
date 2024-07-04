/* eslint-disable */
import React, { useState, useEffect, useMemo } from "react";
import { TextField, Grid, MenuItem, Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import MDButton from "components/MDButton";
import { toast } from "react-toastify";
import { ProductsService } from "services/ProductsService";

export const CreateProduct = ({ direction, service, isCreate, backToPrevious }) => {
  console.clear();
  console.log(service);
  console.log(isCreate);

  let serviceValidation

  if (isCreate) {

    serviceValidation = yup.object().shape({
      name: yup.string().min(3, "Too Short !").max(30, "Too Long !").required("Required !"),
      type: yup.string().min(3, "Too Short !").max(30, "Too Long !").required("Required !"),
      price: yup.number().min(0.5).required("Required !"),
    });
  }
  else {
    serviceValidation = yup.object().shape({
      name: yup.string().min(3, "Too Short !").max(30, "Too Long !"),
      type: yup.string().min(3, "Too Short !").max(30, "Too Long !"),
      price: yup.number().min(0.5),
    });
  }
  const initialValue = useMemo(() => {
    if (isCreate)
      return {
        name: "",
        type: "",
        detailes: "",
        price: 0,
        payment_methods: ""
      };
    else
      return {
        name: service?.name,
        type: service?.type,
        detailes: service?.detailes,
        price: service?.price,
        payment_methods: service?.payment_methods
      };
  }, [isCreate]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [file, setFile] = useState();


  function handleChange(e) {
    setSelectedFile(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
    imageStyle.display = "inline-block";
    setStyle(imageStyle);
  }


  const handleSubmit = async (values, props) => {
    if (selectedFile == null && isCreate) {
      toast.error("Image is required");
      return;
    }
    // console.log(values);

    var data = new FormData();
    await Object.keys(values).forEach((e) => {
      data.append(e, values[e]);
    });
    if (selectedFile) data.append("file", selectedFile);
    if (isCreate) {
      await ProductsService.addService(data)
        .then((resp) => {
          toast.success(resp.message);
        })
        .catch((error) => toast.error("An error"));
    } else {
      await ProductsService.updateService(service._id, data)
        .then((resp) => {
          toast.success(resp.message);
        })
        .catch((error) => toast.error("An error"));
    }
    window.location.reload()
  };



  let imageStyle = {
    display: "none",
  };

  const [style, setStyle] = useState(imageStyle);
  return (
    <React.Fragment>
      <Formik
        initialValues={initialValue}
        validationSchema={serviceValidation}
        onSubmit={handleSubmit}
      >
        {(props) => {
          const {
            name,
            type,
            detailes,
            price,
            payment_methods
          } = props.values;
          return (
            <Form>
              {

                <Grid container spacing={2}>
                  <Grid item xs={12} md={10}>
                    <TextField
                      label={direction == "rtl" ? "الاسم" : "Name"}
                      name="name"
                      variant="outlined"
                      margin="dense"
                      value={name}
                      fullWidth
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      helperText={<ErrorMessage name="name" />}
                      error={props.errors.name && props.touched.name}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <TextField
                      label={direction == "rtl" ? "النوع" : "Type"}
                      name="type"
                      variant="outlined"
                      margin="dense"
                      value={type}
                      fullWidth
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      helperText={<ErrorMessage name="type" />}
                      error={props.errors.type && props.touched.type}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <TextField
                      label={direction == "rtl" ? "وصف الخدمة" : "service description"}
                      name="detailes"
                      variant="outlined"
                      margin="dense"
                      value={detailes}
                      fullWidth
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      helperText={<ErrorMessage name="detailes" />}
                      error={props.errors.detailes && props.touched.detailes}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} md={10}>
                    <TextField
                      label={direction == "rtl" ? "السعر" : "price"}
                      name="price"
                      variant="outlined"
                      margin="dense"
                      value={price}
                      fullWidth
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      helperText={<ErrorMessage name="price" />}
                      error={props.errors.price && props.touched.price}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <TextField
                      label={direction == "rtl" ? "طريقة الدفع" : "Payment method"}
                      name="payment_methods"
                      variant="outlined"
                      margin="dense"
                      value={payment_methods}
                      fullWidth
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      helperText={<ErrorMessage name="payment_methods" />}
                      error={props.errors.payment_methods && props.touched.payment_methods}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} md={10}>
                    <Typography variant="h6">
                      {direction == "rtl" ? "الصورة" : "Image"}
                    </Typography>
                    <TextField
                      name="image"
                      type="file"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      onChange={handleChange}
                      onBlur={props.handleBlur}
                    />
                    <img
                      alt="service-image"
                      className="mt-2"
                      src={file}
                      width={150}
                      height={150}
                      style={style}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <MDButton variant="contained" type="submit" color="primary" fullWidth>
                      {direction == "rtl" ? "إضافة" : "Submit"}
                    </MDButton>
                  </Grid>
                  <Grid item xs={2}>
                    <MDButton
                      onClick={backToPrevious}
                      variant="contained"
                      type="submit"
                      color="warning"
                      fullWidth
                    >
                      {direction == "rtl" ? "عودة" : "Back"}
                    </MDButton>
                  </Grid>

                </Grid>

              }
            </Form>
          );
        }}

      </Formik>





    </React.Fragment>
  );
};
