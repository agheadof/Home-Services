// @mui material components
/* eslint-disable */
import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import {
    useMaterialUIController,
} from "context";
import { useEffect, useState } from "react";
import MDInput from "components/MDInput";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ComplaintsService from "services/supportServices"
import { toast } from 'react-toastify';

function Complaints() {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    const [complaints, setComplaints] = useState([]);
    const [rows, setFiltered] = useState([]);
    const [controller, dispatch] = useMaterialUIController();
    const {
        direction,
    } = controller;
    const columns = [
        {
            Header: direction == "ltr" ? "Id" : "المعرّف",
            accessor: (d) => {
                return <MDTypography display="block" variant="button" fontWeight="medium">
                    {d._id}
                </MDTypography>
            },
            width: 20,
            dataKey: 'id',
        },
        {
            Header: direction == "ltr" ? "Complaint" : "الشكوى",
            accessor: (d) => {
                return <MDTypography display="block" variant="button" fontWeight="medium">
                    {d.title}
                </MDTypography>
            },
            width: 50,
            dataKey: 'title',
        },
        {
            Header: direction == "ltr" ? "User" : "المستخدم",
            accessor: (d) => {
                return <MDTypography display="block" variant="button" fontWeight="medium">
                    {d.userName}
                </MDTypography>
            },
            width: 50,
            dataKey: 'userName',
        },
        {
            Header: direction == "ltr" ? "Status" : "الحالة",
            accessor: (d) => {
                return <MDTypography display="block" variant="button" fontWeight="medium">
                    {d.status}
                </MDTypography>
            },
            width: 50,
            dataKey: 'status',
        },
        {
            Header: direction == "ltr" ? "Actions" : "إعدادات",
            accessor: (d) => {
                return <>
                    <React.Fragment>
                        <Button variant="contained" onClick={handleClickOpen}>
                            <MDTypography className={'text-white'} display="block" variant="button" fontWeight="medium" >
                                {direction == "ltr" ? "Resolve Ticket" : "معالجة الشكوى"}
                            </MDTypography>
                        </Button>
                        <Dialog
                            fullScreen={fullScreen}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                component: 'form',
                                onSubmit: (event) => {
                                    event.preventDefault();
                                    handleAction(d._id, event)
                                    handleClose();
                                },
                            }}
                        >
                            <DialogTitle>{direction == "ltr" ? "Resolve Ticket" : "معالجة الشكوى"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    {`${d.message}`}
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="solve"
                                    name="reply"
                                    label="Reply"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button variant="outlined" color="error" onClick={handleClose}><MDTypography className={'text-dark'} display="block" variant="button" fontWeight="medium" >{direction == "ltr" ? "Cancle" : "إلغاء"}</MDTypography></Button>
                                <Button type="submit" variant="outlined" color="primary" ><MDTypography className={'text-dark'} display="block" variant="button" fontWeight="medium" >{direction == "ltr" ? "send reply" : "إرسال رد"}</MDTypography></Button>
                            </DialogActions>
                        </Dialog>
                    </React.Fragment> </>
            },
            width: 50,
        }
    ];
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const getComplaints = () => {
        ComplaintsService.getAllComplaints()
            .then(resp => {
                setFiltered(resp);
                setComplaints(resp);
            })
    }
    useEffect(() => {
        getComplaints()

    }, [])
    // Damage Dialog


    const handleAction = (id, e) => {
        console.log(e)
        let reply = e.target.value
        ComplaintsService.resolveComplaints(id, reply)
            .then(resp => {
                toast.success(direction == "ltr" ? "Complaint Resolved succesfully" : "تمت معالجة الشكوى بنجاح")
                getComplaints()

            })
            .catch(error => {
                toast.error(error?.response?.data?.message)
            })
    }

    // custom pagination

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (
        event,
        newPage,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const [search, setSearch] = useState();
    const onSearchChange = useAsyncDebounce((value) => {
        setSearch(value)
        if (!!value) {
            let _searched = complaints.filter(e => e.userName.toLowerCase().includes(value)
                || e.title.toLowerCase().includes(value));
            setFiltered(_searched)
        }
        else
            setFiltered(complaints)
    }, 100);
    //
    return (
        <DashboardLayout>
            <DashboardNavbar name={direction == 'rtl' ? "الشكاوى" : "Complaints"} />
            <MDInput
                style={{ marginTop: "1em" }}
                placeholder={direction == 'rtl' ? "بحث" : "Search"}
                value={search}
                size="small"
                fullWidth
                onChange={({ currentTarget }) => {
                    onSearchChange(currentTarget.value);
                }}
            />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox
                                mx={2}
                                mt={-3}
                                py={3}
                                px={2}
                                variant="gradient"
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                            >
                                <MDTypography variant="h6" color="white">
                                    {direction == 'rtl' ? "جدول الشكاوى" : "Complaints Table"}
                                </MDTypography>
                            </MDBox>

                            {rows != null && rows.length > 0 &&
                                <DataTable
                                    type='coupons'
                                    table={{ columns, rows }}
                                    isSorted={true}
                                    entriesPerPage={true}
                                    showTotalEntries={true}
                                    noEndBorder
                                    canSearch={true}
                                />
                            }
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>

        </DashboardLayout>
    );
}

export default Complaints;
