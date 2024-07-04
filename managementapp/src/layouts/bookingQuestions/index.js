/* eslint-disable */
import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types"
import Card from "@mui/material/Card";

import {
    TextField, Grid, MenuItem, Typography, Tab, Tabs, IconButton, Button,

} from "@mui/material";
import Table from 'react-bootstrap/Table'

import { Formik, Field, Form, ErrorMessage } from "formik";
import MDButton from "components/MDButton";
import { useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DeleteIcon from '@mui/icons-material/Delete';
import PlusOneOutlined from '@mui/icons-material/PlusOneOutlined';
import { BookingQeustService } from "services/BookingQuestService";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Link } from 'react-router-dom';



function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Grid item xs={12} md={10}>
                    <Typography>{children}</Typography>
                </Grid>
            )}
        </div>
    );
}

export const CreateBookingQuestions = () => {

    let questionType = ''


    const location = useLocation();
    const _service = location.state._service;
    const direction = location.state.direction;






    const initialValue = useMemo(() => {

        return {
            _service: "",
            type: '',
            question: "",
            options: ['']
        }

    });




    CustomTabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {


        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleDelete = (id) => {
        BookingQeustService.deleteBookingQuestion(id)
            .then(() => { toast.success("Deleted Successfuly") })
            .then(() => window.location.reload(false))
            .catch(() => { toast.error("An error") })
    }

    const [allQuestions, setAllQuestions] = useState([]);
    const getBookingQuestions = () => {
        BookingQeustService.getBookingQuestions(_service)
            .then(resp => {
                setAllQuestions(resp.Questions);

            })
    }
    useEffect(() => {
        getBookingQuestions()
    }, [])


    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [fields, setFields] = useState(['']);
    function handleOptionChange(i, e) {

        let val = [...fields];
        val[i] = e.target.value
        setFields(val);

    }
    function handleAdd() {
        setFields([...fields, '']);
    }
    function handleRemove(i) {
        const val = [...fields];
        val.splice(i, 1);
        setFields(val);
    }

    if (value === 0) questionType = 'text'
    else if (value === 1) questionType = 'choice'
    else if (value === 2) questionType = 'date'


    const handleSubmit = async (values, props) => {
        values.type = questionType
        values._service = _service
        values.options = fields
        await BookingQeustService.createBookingQuestions(values)
            .then((resp) => {
                toast.success(resp.message);
            })
            .then(() => window.location.reload(false))
            .catch((error) => toast.error("An error"));
    };


    return (
        <><DashboardLayout>
            <DashboardNavbar name={direction == 'rtl' ? "إضافة أو تعديل أسئلة الحجز" : "Create or Edit Booking Questions"} />
            <React.Fragment>
                <Formik
                    initialValues={initialValue}
                    onSubmit={handleSubmit}
                >
                    {(props) => {
                        const {
                            question
                        } = props.values;
                        return (
                            <Form>
                                <Tabs value={value} onChange={handleChange} aria-label="">
                                    <Tab label={direction == "rtl" ? `سؤال نصي ` : `Text Question `} {...a11yProps(0)} />
                                    <Tab label={direction == "rtl" ? `اختيار من متعدد ` : `Multiple Choice `} {...a11yProps(1)} />
                                    <Tab label={direction == "rtl" ? `تاريخ` : `Date`} {...a11yProps(2)} />
                                </Tabs>


                                <CustomTabPanel value={value} index={0}>
                                    <Grid item mt={5} xs={12} md={10}>
                                        <TextField
                                            label={direction == "rtl" ? `نص السؤال` : `Question `}
                                            name="question"
                                            variant="outlined"
                                            margin="dense"
                                            value={question}
                                            key={1}
                                            fullWidth
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            helperText={<ErrorMessage name="question" />}
                                            error={props.errors.questions && props.touched.questions}
                                            required
                                        />


                                    </Grid>
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                    <Grid container xs={12} md={15}>
                                        <Grid item mt={5} xs={10}>
                                            <TextField
                                                label={direction == "rtl" ? `نص السؤال` : `Question `}
                                                name="question"
                                                variant="outlined"
                                                margin="dense"
                                                value={question}
                                                key={2}
                                                fullWidth
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                helperText={<ErrorMessage name="question" />}
                                                error={props.errors.questions && props.touched.questions}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={10}>

                                            <MDButton color="info" variant="contained" type="button" onClick={() => handleAdd()} startIcon={<PlusOneOutlined />}>
                                                {direction == "rtl" ? `إضافة خيار` : `Add Choice `}
                                            </MDButton>
                                        </Grid>

                                        {fields.map((field, idx) => {
                                            return (
                                                <Grid item m={1} xs={5} >
                                                    <TextField
                                                        type="text"
                                                        label={direction == "rtl" ? `الخيار` : `Choice `}
                                                        key={`${idx}`}
                                                        value={field || ""}
                                                        onChange={(e) => handleOptionChange(idx, e)}
                                                        onBlur={props.handleBlur}
                                                    />
                                                    <IconButton type="button" onClick={() => handleRemove(idx)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Grid>

                                            );
                                        })}
                                    </Grid>
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={2}>
                                    <Grid item mt={5} xs={10}>
                                        <TextField
                                            label={direction == "rtl" ? `نص السؤال` : `Question `}
                                            name="question"
                                            variant="outlined"
                                            margin="dense"
                                            value={question}
                                            key={2}
                                            fullWidth
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            helperText={<ErrorMessage name="question" />}
                                            error={props.errors.questions && props.touched.questions}
                                            required
                                        />
                                    </Grid>
                                </CustomTabPanel>

                                <Grid container spacing={2}>


                                    <Grid item xs={4}>
                                        <MDButton variant="contained" type="submit" color="primary" fullWidth>
                                            {direction == "rtl" ? "إضافة" : "Submit"}
                                        </MDButton>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <MDButton
                                            onClick={() => window.location.href = '/'}
                                            variant="contained"
                                            color="warning"
                                            fullWidth
                                        >
                                            {direction == "rtl" ? "عودة" : "Back"}
                                        </MDButton>
                                    </Grid>
                                </Grid>


                            </Form>
                        );
                    }}
                </Formik>
            </React.Fragment>
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox
                                mx={2}
                                mt={3}
                                py={3}
                                px={2}
                                variant="gradient"
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                            >
                                <MDTypography variant="h4" color="white" align="center">
                                    {direction == 'rtl' ? "أسئلة الخدمة" : "Services Question"}
                                </MDTypography>
                            </MDBox>

                            {allQuestions != null && allQuestions.length > 0 &&
                                <MDBox
                                    mx={2}
                                    mt={2}
                                    py={1}
                                    px={1}
                                    variant="gradient"
                                    bgColor="info"
                                    borderRadius="sm"
                                    coloredShadow="info"
                                >
                                    <Table striped bordered hover responsive="lg" variant="dark" >
                                        <thead >
                                            <tr align="center">
                                                <th>{direction == "ltr" ? "type" : "نوع السؤال"}</th>
                                                <th>{direction == "ltr" ? "type" : "نص السؤال"}</th>
                                                <th>{direction == "ltr" ? "type" : "خيارات السؤال"}</th>
                                                <th>{direction == "ltr" ? "type" : "إعدادات"}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {

                                                allQuestions.map(row => {
                                                    let routload = { data: row, direction: direction }
                                                    return (<tr key={row._id}>
                                                        <td>{row.type}</td>
                                                        <td>{row.question}</td>
                                                        <td>{row.options != null && row.options != '' &&
                                                            <div style={{
                                                                maxHeight: "80px",
                                                                overflowY: "auto"
                                                            }}>
                                                                <Table variant="dark" striped hover size="sm">
                                                                    <tbody>
                                                                        {row.options.map((inrow, i) => (
                                                                            <tr key={i}>
                                                                                <td>{inrow}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </Table>
                                                            </div>
                                                        }
                                                        </td>
                                                        <td align="center" >
                                                            {<>  <Link to='/updateQuestions' state={routload} >
                                                                <MDButton variant="contained" style={{ margin: '0 5px 0 5px', backgroundColor: "lightblue" }}>
                                                                    {direction == 'rtl' ? "تعديل " : "Update"}
                                                                </MDButton>
                                                            </Link>

                                                                <MDButton onClick={() => handleDelete(row._id)} color="warning" style={{ backgroundColor: "red" }}>
                                                                    {direction == 'rtl' ? "حذف" : "Delete"}
                                                                </MDButton>


                                                            </>}</td>
                                                    </tr>)

                                                })

                                            }
                                        </tbody>
                                    </Table>
                                </MDBox>
                            }

                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
        </>

    );
};
