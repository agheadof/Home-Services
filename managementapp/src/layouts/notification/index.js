/* eslint-disable */
import React, { useMemo } from "react";
import { TextField, Grid } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import MDButton from "components/MDButton";
import { toast } from "react-toastify";
import {
    useMaterialUIController
} from "context";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import NotificationsService from "services/NotificationService";

export const PushNotification = () => {

    const [controller] = useMaterialUIController();
    const { direction } = controller;

    let fieldValidation = yup.object().shape({
        title: yup.string().min(3, "Too Short !").max(50, "Too Long !").required("Required !"),
        message: yup.string().min(3, "Too Short !").max(50, "Too Long !").required("Required !"),
    })


    const initialValue = useMemo(() => {

        return {
            title: "",
            message: ""
        };

    }, []);


    const handleSubmit = async (values, props) => {
        await NotificationsService.pushNotification(values)
            .then((resp) => {
                console.log(resp)

                toast.success(resp.message);
            })
            .catch((error) => {
                console.log(error)
                toast.error("An error")
            });

    };




    return (
        <><DashboardLayout>
            <DashboardNavbar name={direction == 'rtl' ? "إرسال إشعارات" : "Push Notification"} />
            <React.Fragment>
                <Formik
                    initialValues={initialValue}
                    validationSchema={fieldValidation}
                    onSubmit={handleSubmit}
                >
                    {(props) => {
                        const {
                            title,
                            message
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
                                                label={direction == "rtl" ? "نص الإشعار" : "Notification Text"}
                                                name="message"
                                                variant="outlined"
                                                margin="dense"
                                                value={message}
                                                fullWidth
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                helperText={<ErrorMessage name="message" />}
                                                error={props.errors.message && props.touched.message}
                                                required
                                            />
                                        </Grid>

                                        <Grid item xs={4}>
                                            <MDButton variant="contained" type="submit" color="primary" fullWidth>
                                                {direction == "rtl" ? "إرسال" : "Push"}
                                            </MDButton>
                                        </Grid>

                                    </Grid>

                                }
                            </Form>
                        );
                    }}
                </Formik>
            </React.Fragment>
        </DashboardLayout>
        </>
    );
};
