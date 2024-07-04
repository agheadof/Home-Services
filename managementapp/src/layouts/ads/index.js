// @mui material components
/* eslint-disable */
import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useAsyncDebounce } from "react-table";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import {
    useMaterialUIController
} from "context";
import { useEffect, useState } from "react";

import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { CreateAd } from "./createAd";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
import { AdService } from "services/AdService";

function Ads() {
    const [Ads, setAds] = useState([]);
    const [rows, setFiltered] = useState([]);
    const [controller] = useMaterialUIController();
    const { direction } = controller;




    const backendUrl = "http://localhost:5000";

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
            Header: direction == "ltr" ? "Title" : "عنوان الإعلان",
            accessor: (d) => {
                return <MDTypography display="block" variant="button" fontWeight="medium">
                    {d.title}
                </MDTypography>
            },
            width: 20,
            dataKey: 'title',
        },
        {
            Header: direction == "ltr" ? "Duration" : "المدة",
            accessor: (d) => {
                return <MDTypography display="block" variant="button" fontWeight="medium">
                    {d.duration}
                </MDTypography>
            },
            width: 20,
            dataKey: 'duration',
        },
        {
            Header: direction == "ltr" ? "Location" : "الموقع",
            accessor: (d) => {
                return <MDTypography display="block" variant="button" fontWeight="medium">
                    {d.location}
                </MDTypography>
            },
            width: 20,
            dataKey: 'location',
        },
        {
            Header: direction == "ltr" ? "Image" : "الصورة",
            accessor: (d) => {
                return <img src={`${backendUrl}/images/${d.image}`} width="50" height="50" />
            },
            width: 50,
            dataKey: 'brand',
        },
        {
            Header: direction == "ltr" ? "Actions" : "إعدادات",
            accessor: (d) => {
                return <>  <MDButton onClick={() => showProduct(d)} style={{ margin: '0 5px 0 5px', backgroundColor: "lightblue" }}>
                    {direction == 'rtl' ? "تعديل" : "Edit"}
                </MDButton>

                    <MDButton onClick={() => handleClickOpen(1, d._id)} color="warning" style={{ backgroundColor: "red" }}>
                        {direction == 'rtl' ? "حذف" : "Delete"}
                    </MDButton>
                </>
            },
            width: 50,
        }
    ];
    const getAds = () => {
        AdService.getAllAds()
            .then(resp => {
                console.log(resp)
                setFiltered(resp);
                setAds(resp);

            })
    }
    useEffect(() => {
        getAds()
    }, [])
    // Damage Dialog
    const [open, setOpen] = React.useState(false);
    const [del, setDelete] = React.useState(0);
    const [id, setId] = React.useState(0);
    const [message, setMessage] = React.useState("");
    const handleClickOpen = (number, id) => {
        setDelete(number)
        setId(id)
        setMessage("هل تريد حذف هذا العنصر؟")
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleAction = () => {
        AdService.deleteAd(id)
            .then(resp => {
                toast.success("Deleted succesfully")
                getAds()
                setOpen(false)
            })
            .catch(error => {
                toast.error(error?.response?.data?.message)


            })
    }

    const DamageDialog = (props) => {
        return <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {message}
            </DialogTitle>
            <DialogActions>
                <MDButton color="primary" onClick={handleAction} autoFocus>
                    {direction == "ltr" ? "Yes" : "نعم"}
                </MDButton>
                <MDButton color="light" onClick={handleClose}>
                    {direction == "ltr" ? "No" : "لا"}
                </MDButton>
            </DialogActions>
        </Dialog>
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
            let _searched = Ads.filter(e => e.name.toLowerCase().includes(value));
            setFiltered(_searched)
        }
        else
            setFiltered(Ads)
    }, 100);


    const [show, setShow] = useState(false);
    const [createNew, setCreate] = useState(false);
    const [_Ad, set_Ad] = useState(null);


    const showProduct = (d) => {
        setShow(true);
        set_Ad(d);
        setCreate(false);
    }
    const addNew = () => {
        setCreate(true);
        setShow(true);
    }
    const back = () => {
        setCreate(false)
        setShow(false)
        set_Ad(null)
    }

    return (
        <DashboardLayout>
            {
                !show && <> <DashboardNavbar name={direction == 'rtl' ? "الإعلانات" : "Advertisements"} />
                    <MDButton onClick={() => addNew()} color="primary">
                        {direction == 'rtl' ? "إضافة إعلان" : "Create Ad"}
                    </MDButton>
                    <MDInput
                        style={{ marginTop: "1em" }}
                        placeholder={direction == 'rtl' ? "بحث بالاسم" : "Search by name"}
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
                                            {direction == 'rtl' ? "جدول الإعلانات" : "As Table"}
                                        </MDTypography>
                                    </MDBox>
                                    {rows != null && rows.length > 0 &&
                                        <DataTable

                                            type='Ads'
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
                    </MDBox> </>
            }
            {
                show &&
                <>
                    <DashboardNavbar name={direction == 'rtl' ? "إضافة أو تعديل إعلان" : "Create or Edit Ad"} />
                    <CreateAd direction={direction} isCreate={createNew} Ad={_Ad} backToPrevious={() => back()} />
                </>
            }

            <DamageDialog />
        </DashboardLayout>
    );
}

export default Ads;
