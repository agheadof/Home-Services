/* eslint-disable */
import React, { useState, useEffect, useMemo } from "react";
import { TextField, Grid, MenuItem, Typography, duration } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import MDButton from "components/MDButton";
import { toast } from "react-toastify";
import { AdService } from "services/AdService";


export const CreateAd = ({ direction, Ad, isCreate, backToPrevious }) => {

    let adValidation

    if (isCreate) {

        adValidation = yup.object().shape({
            title: yup.string().min(3, "Too Short !").max(30, "Too Long !").required("Required !"),
            duration: yup.number().min(1).required("Required !"),
            location: yup.string().min(3, "Too Short !").max(30, "Too Long !").required("Required !"),
        });
    }
    else {
        adValidation = yup.object().shape({
            title: yup.string().min(3, "Too Short !").max(30, "Too Long !"),
            location: yup.string().min(3, "Too Short !").max(30, "Too Long !"),
            duration: yup.number().min(1),
        });
    }
    const initialValue = useMemo(() => {
        if (isCreate)
            return {
                title: "",
                location: "",
                duration: 0,
            };
        else
            return {
                title: Ad?.title,
                location: Ad?.location,
                duration: Ad?.duration,
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
        console.log(values);

        var data = new FormData();
        await Object.keys(values).forEach((e) => {
            data.append(e, values[e]);
        });
        if (selectedFile) data.append("file", selectedFile);
        if (isCreate) {
            await AdService.createAd(data)
                .then((resp) => {
                    toast.success(resp.message);
                })
                .catch((error) => toast.error("An error"));
        } else {
            await AdService.updateAd(Ad._id, data)
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
                validationSchema={adValidation}
                onSubmit={handleSubmit}
            >
                {(props) => {
                    const {
                        title,
                        location,
                        duration,
                    } = props.values;
                    return (
                        <Form>
                            {

                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={10}>
                                        <TextField
                                            label={direction == "rtl" ? "العنوان" : "Title"}
                                            name="title"
                                            variant="outlined"
                                            margin="dense"
                                            value={title}
                                            fullWidth
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            helperText={<ErrorMessage name="title" />}
                                            error={props.errors.title && props.touched.title}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={10}>
                                        <TextField
                                            label={direction == "rtl" ? "الموقع" : "location"}
                                            name="location"
                                            variant="outlined"
                                            margin="dense"
                                            value={location}
                                            fullWidth
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            helperText={<ErrorMessage name="location" />}
                                            error={props.errors.location && props.touched.location}
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={10}>
                                        <TextField
                                            label={direction == "rtl" ? "المدة" : "Duration"}
                                            name="duration"
                                            variant="outlined"
                                            margin="dense"
                                            value={duration}
                                            fullWidth
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            helperText={<ErrorMessage name="duration" />}
                                            error={props.errors.duration && props.touched.duration}
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
