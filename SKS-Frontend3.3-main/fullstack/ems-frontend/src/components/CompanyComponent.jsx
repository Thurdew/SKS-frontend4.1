import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCompany, getCompany, updateCompany } from "../services/CompanyService";
import FooterComponent from "./FooterComponent";
import SideBar from "./SideBar";

const CompanyComponent = () => {
    const [companyName, setCompanyName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [taxOffice, setTaxOffice] = useState('');
    const [taxNumber, setTaxNumber] = useState('');
    const [address, setAddress] = useState('');

    const { id } = useParams();
    const [errors, setErrors] = useState({
        companyName: '',
        phoneNumber: '',
        email: '',
        taxOffice: '',
        taxNumber: '',
        address: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getCompany(id).then((response) => {
                setCompanyName(response.data.companyName);
                setPhoneNumber(response.data.phoneNumber);
                setEmail(response.data.email);
                setTaxOffice(response.data.taxOffice);
                setTaxNumber(response.data.taxNumber);
                setAddress(response.data.address);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'companyName':
                setCompanyName(value);
                break;
            case 'phoneNumber':
                setPhoneNumber(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'taxOffice':
                setTaxOffice(value);
                break;
            case 'taxNumber':
                setTaxNumber(value);
                break;
            case 'address':
                setAddress(value);
                break;
            default:
                break;
        }
    };

    const saveOrUpdateCompany = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const company = { companyName, phoneNumber, email, taxOffice, taxNumber, address };
            if (id) {
                updateCompany(id, company).then((response) => {
                    navigate('/company');
                }).catch(error => {
                    console.error(error);
                });
            } else {
                createCompany(company).then((response) => {
                    navigate('/company');
                }).catch(error => {
                    console.error(error);
                });
            }
        }
    };

    const validateForm = () => {
        let valid = true;
        const errorCopy = { ...errors };

        if (companyName.trim()) {
            errorCopy.companyName = '';
        } else {
            errorCopy.companyName = 'Firma Adı Gerekli';
            valid = false;
        }

        if (phoneNumber.trim()) {
            errorCopy.phoneNumber = '';
        } else {
            errorCopy.phoneNumber = 'Firma Telefon Numarası Gerekli';
            valid = false;
        }

        if (email.trim()) {
            errorCopy.email = '';
        } else {
            errorCopy.email = 'Email Gerekli';
            valid = false;
        }

        if (taxOffice.trim()) {
            errorCopy.taxOffice = '';
        } else {
            errorCopy.taxOffice = 'Vergi Dairesi Gerekli';
            valid = false;
        }

        if (taxNumber.trim()) {
            errorCopy.taxNumber = '';
        } else {
            errorCopy.taxNumber = 'Vergi Numarası Gerekli';
            valid = false;
        }

        if (address.trim()) {
            errorCopy.address = '';
        } else {
            errorCopy.address = 'Firma Adresi Gerekli';
            valid = false;
        }

        setErrors(errorCopy);
        return valid;
    };

    const pageTitle = () => {
        return <h2 className='text-center'>{id ? 'FİRMA GÜNCELLE' : 'FİRMA EKLEME'}</h2>;
    };

    return (
        <div id="root">
            <SideBar />
            <div id="content" className='my-container'>
            <div className='row' style={{ marginTop: '-90px' }}>
                    <div className='card'>
                        {pageTitle()}
                        <div className='my-card-body'>
                            <form>
                                <div className='form-group'>
                                    <label> Firma Adı:</label>
                                    <input
                                        type='text'
                                        placeholder='Firma Adını Giriniz'
                                        name='companyName'
                                        value={companyName}
                                        className={`form-control ${errors.companyName ? 'is-invalid' : ''}`}
                                        onChange={handleInputChange}
                                    ></input>
                                    {errors.companyName && <div className='invalid-feedback'>{errors.companyName}</
                                    div>}
                                </div>
                                <div className='form-group'>
                                    <label> Telefon Numarası:</label>
                                    <input
                                        type='text'
                                        placeholder='Firma Telefon Numarasını Giriniz'
                                        name='phoneNumber'
                                        value={phoneNumber}
                                        className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                                        onChange={handleInputChange}
                                    ></input>
                                    {errors.phoneNumber && <div className='invalid-feedback'>{errors.phoneNumber}</div>}
                                </div>
                                <div className='form-group'>
                                    <label> Email:</label>
                                    <input
                                        type='text'
                                        placeholder='Email Giriniz'
                                        name='email'
                                        value={email}
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        onChange={handleInputChange}
                                    ></input>
                                    {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                                </div>
                                <div className='form-group'>
                                    <label> Vergi Dairesi:</label>
                                    <input
                                        type='text'
                                        placeholder='Vergi Dairesi Giriniz'
                                        name='taxOffice'
                                        value={taxOffice}
                                        className={`form-control ${errors.taxOffice ? 'is-invalid' : ''}`}
                                        onChange={handleInputChange}
                                    ></input>
                                    {errors.taxOffice && <div className='invalid-feedback'>{errors.taxOffice}</div>}
                                </div>
                                <div className='form-group'>
                                    <label> Vergi Numarası:</label>
                                    <input
                                        type='text'
                                        placeholder='Vergi Numarası Giriniz'
                                        name='taxNumber'
                                        value={taxNumber}
                                        className={`form-control ${errors.taxNumber ? 'is-invalid' : ''}`}
                                        onChange={handleInputChange}
                                    ></input>
                                    {errors.taxNumber && <div className='invalid-feedback'>{errors.taxNumber}</div>}
                                </div>
                                <div className='form-group'>
                                    <label> Adres:</label>
                                    <input
                                        type='text'
                                        placeholder='Firma Adresi Giriniz'
                                        name='address'
                                        value={address}
                                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                        onChange={handleInputChange}
                                    ></input>
                                    {errors.address && <div className='invalid-feedback'>{errors.address}</div>}
                                </div>
                                <button className='btn btn-success' onClick={saveOrUpdateCompany}>Kaydet</button>
                                <button className='btn btn-secondary' onClick={() => navigate('/company')} style={{ marginLeft: "10px" }}>Geri Dön</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="background-logo"></div> {/* Şeffaf logo */}
            </div>
            <FooterComponent />
        </div>
    );
};

export default CompanyComponent;

