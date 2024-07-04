/* eslint-disable */

import api from '../../services/Api'
import React from 'react'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/esm/Container'
import Table from 'react-bootstrap/Table'

import Form from 'react-bootstrap/Form'
import { useMaterialUIController } from "context";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";

const Requests = () => {

    const [controller] = useMaterialUIController();
    const { direction } = controller;
    const [requests, setRequests] = useState([])
    const [search, setSearch] = useState([])

    useEffect(async () => {

        const getRequests = async () => {
            await api.get('/api/booking/getAllRequests')
                .then(res => {
                    setRequests(res.data)
                    setSearch(res.data)
                })
                .catch(() => {
                    setRequests(null)
                    setSearch(null)
                })

        }
        getRequests()

    }, [])


    const [filter, setFilter] = useState([])

    const handleSearch = (e) => {
        const searchWord = e.target.value;

        if (searchWord === '') {
            setRequests(search)
        }
        else {
            const newFilter = search.filter((value) => value._id.toLowerCase().includes(searchWord.toLowerCase()))
            setRequests(newFilter)
        }
        setFilter(searchWord)
    }



    return (
        <DashboardLayout>
            <DashboardNavbar name={direction == 'rtl' ? "إدارة الطلبات" : "Request Management"} />
            <Container className='mt-5'>
                <Form className="d-flex justify-content-start"  >
                    <Form.Control
                        type="search"
                        placeholder={direction == "ltr" ? "Search By Id" : "بحث بالمعرف"}
                        value={filter}
                        onInput={(e) => handleSearch(e)}
                        aria-label={direction == "ltr" ? "Search" : "بحث"}
                    />

                </Form>
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
                    <Table striped bordered hover variant="dark">
                        <thead style={{ height: "10px", fontSize: "17px" }}>
                            <tr >
                                <th>{direction == "ltr" ? "# ID" : "# المعرف"}</th>
                                <th>{direction == "ltr" ? "User Id" : "معرف المستخدم"}</th>
                                <th>{direction == "ltr" ? "Service Id" : "معرف الخدمة"}</th>
                                <th>{direction == "ltr" ? "User answers" : "إجابات المستخدم"}</th>
                                <th>{direction == "ltr" ? "Date" : "تاريخ الطلب"}</th>
                                <th>{direction == "ltr" ? "Status" : "حالة الطلب"}</th>
                                <th>{direction == "ltr" ? "Settings" : "الإعدادات"}</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                requests == null ? false : true &&
                                    requests.map(req => {

                                        return (<tr key={req._id} style={{ fontSize: "14px" }}>
                                            <td>{req._id}</td>
                                            <td>{req.user_id}</td>
                                            <td>{req.service_id}</td>
                                            <td>{req.answers != null && req.answers != '' &&
                                                <div style={{
                                                    maxHeight: "80px",
                                                    overflowY: "auto"
                                                }}>
                                                    <Table variant="dark" striped hover size="sm">
                                                        <tbody>
                                                            {req.answers.map((row, i) => (
                                                                <tr key={i}>
                                                                    <td>{row}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            }</td>
                                            <td>{req.date}</td>
                                            <td>{req.status}</td>
                                            <td>{req.status == 'done' ? false : true && <Button size='sm' variant='info' className='text-dark' onClick={() => {
                                                let newStatus = { status: 'done' }
                                                api.put(`api/booking/updateRequestStatus/${req._id}`, newStatus)
                                                    .then(() => window.location.reload(false))
                                            }}>{direction == "ltr" ? "Mark as done" : "تحديد كمنجزة"}</Button>}</td>
                                        </tr>)
                                    })

                            }

                        </tbody>
                    </Table>
                </MDBox>


            </Container>


        </DashboardLayout>
    )
}

export default Requests