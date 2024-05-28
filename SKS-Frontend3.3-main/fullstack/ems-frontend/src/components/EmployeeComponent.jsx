import React, { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';
import FooterComponent from "./FooterComponent";
import SideBar from './SideBar';

const EmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const { id } = useParams();
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    function handleFirstName(e) {
        setFirstName(e.target.value);
    }

    function handleLastName(e) {
        setLastName(e.target.value);
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function saveOrUpdateEmployee(e) {
        e.preventDefault();
        if (validateForm()) {
            const employee = { firstName, lastName, email };
            if (id) {
                updateEmployee(id, employee).then((response) => {
                    navigator('/employees');
                }).catch(error => {
                    console.error(error);
                });
            } else {
                createEmployee(employee).then((response) => {
                    navigator('/employees');
                }).catch(error => {
                    console.error(error);
                });
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorCopy = { ...errors };
        if (firstName.trim()) {
            errorCopy.firstName = '';
        } else {
            errorCopy.firstName = 'Adınız Gerekli';
            valid = false;
        }
        if (lastName.trim()) {
            errorCopy.lastName = '';
        } else {
            errorCopy.lastName = 'Soyadınız Gerekli';
            valid = false;
        }
        if (email.trim()) {
            errorCopy.email = '';
        } else {
            errorCopy.email = 'Email Gerekli';
            valid = false;
        }
        setErrors(errorCopy);
        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Personel Güncelle</h2>;
        } else {
            return <h2 className='text-center'>Personel Ekle</h2>;
        }
    }

    return (
        <div id='root'>
            <SideBar />
            <div id="content" className='my-container'>
                <div className='row' style={{ marginTop: '-90px' }}>
                    <div className='card ' style={{ paddingTop: '20px' }}>
                        {pageTitle()}
                        <div className='card-body'>
                            <form>
                                <div className='form-group '>
                                    <label className='form-label'> Ad:</label>
                                    <input
                                        type='text'
                                        placeholder='Personel Adını Giriniz'
                                        name='firstName'
                                        value={firstName}
                                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                        onChange={handleFirstName}
                                    ></input>
                                    {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                                </div>
                                <div className='form-group '>
                                    <label className='form-label'> Soyad:</label>
                                    <input
                                        type='text'
                                        placeholder='Personel Soyadını Giriniz'
                                        name='lastName'
                                        value={lastName}
                                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                        onChange={handleLastName}
                                    ></input>
                                    {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                                </div>
                                <div className='form-group '>
                                    <label className='form-label'> Email:</label>
                                    <input
                                        type='text'
                                        placeholder='Personel Email Giriniz'
                                        name='email'
                                        value={email}
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        onChange={handleEmail}
                                    ></input>
                                    {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                                </div>
                                <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Kaydet</button>
                                <button className='btn btn-secondary' onClick={() => navigate('/employees')} style={{ marginLeft: "10px" }}>Geri Dön</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="background-logo"></div>
            </div>
            <FooterComponent />
        </div>
    );
}

export default EmployeeComponent;
