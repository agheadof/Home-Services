/* eslint-disable */

import api from '../../services/Api'
import React from 'react'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/esm/Container'
import Table from 'react-bootstrap/Table'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/esm/Tabs'
import CreateUser from './createUser'
import Form from 'react-bootstrap/Form'
import { useMaterialUIController } from "context";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

const Accounts = () => {

    const [controller] = useMaterialUIController();
    const { direction } = controller;
    const [accounts, setAccounts] = useState([])
    const [search, setSearch] = useState([])



    const user = JSON.parse(localStorage.getItem("currentUser"));

    useEffect(async () => {


        if (user.type === 'super') {


            const getAccounts = async () => {
                await api.get('/api/users/')
                    .then(res => {
                        setAccounts(res.data)
                        setSearch(res.data)
                    })
                    .catch(() => {
                        setAccounts(null)
                        setSearch(null)
                    })

            }
            getAccounts()
        }
        else {
            window.location.href = '/'
        }

    }, [])


    const [filter, setFilter] = useState([])

    const handleSearch = (e) => {
        const searchWord = e.target.value;

        if (searchWord === '') {
            setAccounts(search)
        }
        else {
            const newFilter = search.filter((value) => value.name.toLowerCase().includes(searchWord.toLowerCase()))
            setAccounts(newFilter)
        }
        setFilter(searchWord)
    }



    return (
        <DashboardLayout>
            <DashboardNavbar name={direction == 'rtl' ? "إدارة الحسابات" : "Account Management"} />
            <Container className='mt-5'>
                <Tabs
                    defaultActiveKey='accounts'
                    id="Accounts"
                    className="mb-3"
                    justify>
                    <Tab eventKey='Create' title={direction == "ltr" ? "Create Account" : "إنشاء حساب"}> <CreateUser direction={direction} /> </Tab>
                    <Tab eventKey='accounts' title={direction == "ltr" ? "Accounts" : "حسابات"}>
                        <Form className="d-flex justify-content-start"  >

                            <Form.Control
                                type="search"
                                placeholder={direction == "ltr" ? "Search By Name" : "بحث بالاسم"}
                                value={filter}
                                onInput={(e) => handleSearch(e)}

                                aria-label={direction == "ltr" ? "Search" : "بحث"}
                            />

                        </Form>
                        <Table striped bordered hover responsive size='sm' variant="dark">
                            <thead>
                                <tr>
                                    <th>{direction == "ltr" ? "# ID" : "# المعرف"}</th>
                                    <th>{direction == "ltr" ? "Type" : "نوع الحساب"}</th>
                                    <th>{direction == "ltr" ? "Full Name" : "الاسم"}</th>
                                    <th>{direction == "ltr" ? "Email" : "البريد"}</th>
                                    <th>{direction == "ltr" ? "Phone" : "رقم الجوال"}</th>
                                    <th>{direction == "ltr" ? "Settings" : "الإعدادات"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    accounts.map(acc => {

                                        return (<tr key={acc._id}>
                                            <td>{acc._id}</td>
                                            <td>{acc.type}</td>
                                            <td>{acc.name}</td>
                                            <td>{acc.email}</td>
                                            <td>{acc.phone_number}</td>
                                            <td>{(acc.type == "super" ? false : true) && <Button size='sm' variant='danger' onClick={() => {
                                                api.delete(`api/users/${acc._id}`)
                                                    .then(() => window.location.reload(false))
                                            }}>{direction == "ltr" ? "Delete User" : "حذف المستخدم"}</Button>}</td>
                                        </tr>)
                                    })
                                }
                            </tbody>
                        </Table>
                    </Tab>

                </Tabs>
            </Container>


        </DashboardLayout>
    )
}

export default Accounts