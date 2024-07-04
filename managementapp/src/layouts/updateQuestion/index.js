/* eslint-disable */
import { Link, useLocation } from 'react-router-dom';
import { useState } from "react";

import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { TextField, IconButton } from "@mui/material";
import BookingQeustService from 'services/BookingQuestService';
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import PlusOneOutlined from '@mui/icons-material/PlusOneOutlined';


export const UpdateQuestion = () => {

    const location = useLocation();
    const data = location.state.data;
    const direction = location.state.direction;

    let routeload = { _service: data._service, direction: direction }

    const [questionText, setQuestionText] = useState(data.question);
    function handleQestionChange(e) {
        setQuestionText(e.target.value)
    }

    const [fields, setFields] = useState(data.options);
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

    async function handleSubmit() {
        let payload = { question: questionText, options: fields }
        await BookingQeustService.updateBookingQuestion(data._id, payload)
            .then(() => { window.location.href = '/bookingQuestions' })
            .catch(() => toast.error('An Error'))
    }

    return (
        <><DashboardLayout>
            <DashboardNavbar name={direction == 'rtl' ? " تعديل أسئلة الحجز" : "Edit Booking Questions"} />
            <Card>
                <MDBox pt={4} pb={3} px={3}>
                    <MDBox component="form" role="form">

                        <MDBox mb={2}>
                            <Grid container xs={12} md={15}>
                                <Grid item mt={5} xs={10}>
                                    <TextField
                                        label={direction == "rtl" ? `نص السؤال` : `Question `}
                                        name="question"
                                        variant="outlined"
                                        margin="dense"
                                        value={questionText}
                                        key={1}
                                        fullWidth
                                        onChange={(e) => handleQestionChange(e)}
                                    />
                                </Grid>
                                {(data.type === 'choice') &&
                                    <> <Grid item xs={10}>
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
                                                    />
                                                    <IconButton type="button" onClick={() => handleRemove(idx)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Grid>

                                            );
                                        })}
                                    </>
                                }
                            </Grid>

                        </MDBox>

                        <MDBox mt={4} mb={1}>
                            <Grid container spacing={2}>


                                <Grid item xs={4}>
                                    <MDButton variant="contained" onClick={() => handleSubmit()} color="primary" fullWidth>
                                        {direction == "rtl" ? "تعديل" : "Update"}
                                    </MDButton>
                                </Grid>
                                <Grid item xs={2}>

                                    <Link to='/bookingQuestions' state={routeload}>
                                        <MDButton
                                            variant="contained"
                                            color="warning"
                                            fullWidth
                                        >
                                            {direction == "rtl" ? "عودة" : "Back"}
                                        </MDButton>
                                    </Link>
                                </Grid>
                            </Grid>
                        </MDBox>

                    </MDBox>
                </MDBox>
            </Card>
        </DashboardLayout>
        </>
    );
};

