import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createShipment, getShipment, listShipments, updateShipment } from "../services/ForwardService";
import { listCompanies } from "../services/CompanyService";
import { listProducts } from "../services/ProductService";
import { listShips } from "../services/ShipService";
import './ForwardComponent.css';
import SideBar from "./SideBar";

import FooterComponent from "./FooterComponent";


const ForwardComponent = () => {
    const [companyNameOptions, setCompanyNameOptions] = useState([]);
    const [productNameOptions, setProductNameOptions] = useState([]);
    const [shipNameOptions, setShipNameOptions] = useState([]);

    const [companyName, setCompanyName] = useState('');
    const [productName, setProductName] = useState('');
    const [shipName, setShipName] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const [departurePoint, setDeparturePoint] = useState('');
    const [destinationPoint, setDestinationPoint] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [price, setPrice] = useState('');
    const [comment, setComment] = useState('');
    const [shipmentDate, setShipmentDate] = useState('');
    const [teslimatNo, setTeslimatNo] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        companyName: '',
        productName: '',
        shipName: '',
        vehicles: '',
        departurePoint: '',
        destinationPoint: '',
        customerPhone: '',
        price: '',
        comment: '',
        shipmentDate: '',
        teslimatNo: ''
    });

    useEffect(() => {
        fetchDropdownOptions();
        if (id) {
            getShipment(id).then(response => {
                const shipment = response.data;
                console.log("Shipment data received:", shipment);
                setCompanyName(shipment.company.companyName);
                setProductName(shipment.product.productName);
                setShipName(shipment.ship.shipName);
                setVehicles(shipment.vehicles);
                setDeparturePoint(shipment.departurePoint);
                setDestinationPoint(shipment.destinationPoint);
                setCustomerPhone(shipment.customerPhone);
                setPrice(shipment.price);
                setComment(shipment.comment);
                setShipmentDate(shipment.shipmentDate);
                setTeslimatNo(shipment.teslimatNo);
            }).catch(error => {
                console.error("Error fetching shipment:", error);
            });
        }
    }, [id]);

    const fetchDropdownOptions = () => {
        listCompanies().then(response => {
            setCompanyNameOptions(response.data);
        }).catch(error => {
            console.error("Error fetching company names:", error);
        });

        listProducts().then(response => {
            setProductNameOptions(response.data);
        }).catch(error => {
            console.error("Error fetching product names:", error);
        });

        listShips().then(response => {
            setShipNameOptions(response.data);
        }).catch(error => {
            console.error("Error fetching ship names:", error);
        });
    };

    const handleInputChange = (e, setStateFunction) => {
        setStateFunction(e.target.value);
    };

    const handleVehicleChange = (index, field, value) => {
        const newVehicles = [...vehicles];
        newVehicles[index][field] = value;
        setVehicles(newVehicles);
    };

    const addVehicle = () => {
        setVehicles([...vehicles, { vehicleType: '', towPlate: '', trailerPlate: '' }]);
    };

    const removeVehicle = (index) => {
        const newVehicles = vehicles.filter((_, i) => i !== index);
        setVehicles(newVehicles);
    };

    const saveOrUpdateShipment = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const shipmentData = {
                companyName,
                productName,
                shipName,
                vehicles,
                departurePoint,
                destinationPoint,
                customerPhone,
                price,
                comment,
                shipmentDate,
                teslimatNo
            };

            if (id) {
                updateShipment(id, shipmentData).then(response => {
                    console.log("Sevkiyat güncellendi:", response.data);
                    navigate('/forward');
                }).catch(error => {
                    console.error("Sevkiyat güncellenirken hata oluştu:", error);
                });
            } else {
                createShipment(shipmentData).then(response => {
                    console.log("Sevkiyat oluşturuldu:", response.data);
                    navigate('/forward');
                }).catch(error => {
                    console.error("Sevkiyat oluşturulurken hata oluştu:", error);
                });
            }
        }
    };

    const validateForm = () => {
        let valid = true;
        const errorCopy = { ...errors };

        // Tüm alanlar için geçerlilik kontrolü yap
        if (!companyName.trim()) {
            errorCopy.companyName = 'Firma Adı Gerekli';
            valid = false;
        }
        if (!productName.trim()) {
            errorCopy.productName = 'Ürün Adı Gerekli';
            valid = false;
        }
        if (!shipName.trim()) {
            errorCopy.shipName = 'Gemi Adı Gerekli';
            valid = false;
        }
        if (!vehicles.length) {
            errorCopy.vehicles = 'Araç Bilgileri Gerekli';
            valid = false;
        }
        if (!departurePoint.trim()) {
            errorCopy.departurePoint = 'Kalkış Noktası Gerekli';
            valid = false;
        }
        if (!destinationPoint.trim()) {
            errorCopy.destinationPoint = 'Varış Noktası Gerekli';
            valid = false;
        }
        if (!customerPhone.trim()) {
            errorCopy.customerPhone = 'Müşteri Telefon Numarası Gerekli';
            valid = false;
        }
        if (!price.trim()) {
            errorCopy.price = 'Fiyat Gerekli';
            valid = false;
        }
        if (!shipmentDate.trim()) {
            errorCopy.shipmentDate = 'Sevkiyat Tarihi Gerekli';
            valid = false;
        }
        if (!teslimatNo.trim()) {
            errorCopy.teslimatNo = 'Teslimat Numarası Gerekli';
            valid = false;
        }

        setErrors(errorCopy);
        return valid;
    };

    const pageTitle = () => {
        return id ? <h2 className='text-center'>SEVKİYAT GÜNCELLE</h2> : <h2 className='text-center'>SEVKİYAT EKLEME</h2>;
    };

    return (
        <div className="root">
            <SideBar/>
            <div id="content" className='container'>
            <div className='row' style={{ marginTop: '20px' }}>
                    <div className='card'>
                        {pageTitle()}
                        <div className="my-card-body">
                            <form>
                                <div className='form-group '>
                                    <label className='form-label'> Firma Adı:</label>
                                    <select
                                        value={companyName}
                                        onChange={(e) => handleInputChange(e, setCompanyName)}
                                        className={`form-control ${errors.companyName ? 'is-invalid' : ''}`}
                                    >
                                        <option value=''>Firma Adı Seçiniz</option>
                                        {companyNameOptions.map((company, index) => (
                                            <option key={index} value={company.companyName}>{company.companyName}</option>
                                        ))}
                                    </select>
                                    {errors.companyName && <div className='invalid-feedback'>{errors.companyName}</div>}
                                </div>

                                <div className='form-group '>
                                    <label className='form-label'> Ürün Adı:</label>
                                    <select
                                        value={productName}
                                        onChange={(e) => handleInputChange(e, setProductName)}
                                        className={`form-control ${errors.productName ? 'is-invalid' : ''}`}
                                    >
                                        <option value=''>Ürün Adı Seçiniz</option>
                                        {productNameOptions.map((product, index) => (
                                            <option key={index} value={product.productName}>{product.productName}</option>
                                        ))}
                                    </select>
                                    {errors.productName && <div className='invalid-feedback'>{errors.productName}</div>}
                                </div>

                                <div className='form-group '>
                                    <label className='form-label'> Gemi Adı:</label>
                                    <select
                                        value={shipName}
                                        onChange={(e) => handleInputChange(e, setShipName)}
                                        className={`form-control ${errors.shipName ? 'is-invalid' : ''}`}
                                    >
                                        <option value=''>Gemi Adı Seçiniz</option>
                                        {shipNameOptions.map((ship, index) => (
                                            <option key={index} value={ship.shipName}>{ship.shipName}</option>
                                        ))}
                                    </select>
                                    {errors.shipName && <div className='invalid-feedback'>{errors.shipName}</div>}
                                </div>

                                <div className='form-group '>
                                    <label className='form-label'> Kalkış Noktası:</label>
                                    <input
                                        type='text'
                                        placeholder='Kalkış Noktasını Giriniz'
                                        name='departurePoint'
                                        value={departurePoint}
                                        className={`form-control ${errors.departurePoint ? 'is-invalid' : ''}`}
                                        onChange={(e) => handleInputChange(e, setDeparturePoint)}
                                    ></input>
                                    {errors.departurePoint && <div className='invalid-feedback'>{errors.departurePoint}</div>}
                                </div>

                                <div className='form-group '>
                                    <label className='form-label'> Varış Noktası:</label>
                                    <input
                                        type='text'
                                        placeholder='Varış Noktasını Giriniz'
                                        name='destinationPoint'
                                        value={destinationPoint}
                                        className={`form-control ${errors.destinationPoint ? 'is-invalid' : ''}`}
                                        onChange={(e) => handleInputChange(e, setDestinationPoint)}
                                    ></input>
                                    {errors.destinationPoint && <div className='invalid-feedback'>{errors.destinationPoint}</div>}
                                </div>

                                <div className='form-group '>
                                    <label className='form-label'> Müşteri Telefonu:</label>
                                    <input
                                        type='text'
                                        placeholder='Müşteri Telefonunu Giriniz'
                                        name='customerPhone'
                                        value={customerPhone}
                                        className={`form-control ${errors.customerPhone ? 'is-invalid' : ''}`}
                                        onChange={(e) => handleInputChange(e, setCustomerPhone)}
                                    ></input>
                                    {errors.customerPhone && <div className='invalid-feedback'>{errors.customerPhone}</div>}
                                </div>

                                <div className='form-group '>
                                    <label className='form-label'> Fiyat:</label>
                                    <input
                                        type='text'
                                        placeholder='Fiyat Giriniz'
                                        name='price'
                                        value={price}
                                        className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                        onChange={(e) => handleInputChange(e, setPrice)}
                                    ></input>
                                    {errors.price && <div className='invalid-feedback'>{errors.price}</div>}
                                </div>

                                <div className='form-group '>
                                    <label className='form-label'> Yorum:</label>
                                    <input
                                        type='text'
                                        placeholder='Yorum Giriniz'
                                        name='comment'
                                        value={comment}
                                        className={`form-control ${errors.comment ? 'is-invalid' : ''}`}
                                        onChange={(e) => handleInputChange(e, setComment)}
                                    ></input>
                                    {errors.comment && <div className='invalid-feedback'>{errors.comment}</div>}
                                </div>

                                <div className='form-group '>
                                    <label className='form-label'> Sevkiyat Tarihi:</label>
                                    <input
                                        type='date'
                                        placeholder='Sevkiyat Tarihini Giriniz'
                                        name='shipmentDate'
                                        value={shipmentDate}
                                        className={`form-control ${errors.shipmentDate ? 'is-invalid' : ''}`}
                                        onChange={(e) => handleInputChange(e, setShipmentDate)}
                                    ></input>
                                    {errors.shipmentDate && <div className='invalid-feedback'>{errors.shipmentDate}</div>}
                                </div>

                                <div className='form-group '>
                                    <label className='form-label'> Teslimat Numarası:</label>
                                    <input
                                        type='text'
                                        placeholder='Teslimat Numarasını Giriniz'
                                        name='teslimatNo'
                                        value={teslimatNo}
                                        className={`form-control ${errors.teslimatNo ? 'is-invalid' : ''}`}
                                        onChange={(e) => handleInputChange(e, setTeslimatNo)}
                                    ></input>
                                    {errors.teslimatNo && <div className='invalid-feedback'>{errors.teslimatNo}</div>}
                                </div>

                                <div className='form-group '>
                                    <label className='form-label'> Araç Bilgileri:</label>
                                    {vehicles.map((vehicle, index) => (
                                        <div key={index} className='vehicle-inputs'>
                                            <input
                                                type='text'
                                                placeholder='Araç Türü'
                                                value={vehicle.vehicleType}
                                                className={`form-control ${errors.vehicles ? 'is-invalid' : ''}`}
                                                onChange={(e) => handleVehicleChange(index, 'vehicleType', e.target.value)}
                                            />
                                            <input
                                                type='text'
                                                placeholder='Çekici Plakası'
                                                value={vehicle.towPlate}
                                                className={`form-control ${errors.vehicles ? 'is-invalid' : ''}`}
                                                onChange={(e) => handleVehicleChange(index, 'towPlate', e.target.value)}
                                            />
                                            <input
                                                type='text'
                                                placeholder='Römork Plakası'
                                                value={vehicle.trailerPlate}
                                                className={`form-control ${errors.vehicles ? 'is-invalid' : ''}`}
                                                onChange={(e) => handleVehicleChange(index, 'trailerPlate', e.target.value)}
                                            />
                                            <button type='button' onClick={() => removeVehicle(index)}>Araç Sil</button>
                                        </div>
                                    ))}
                                    {errors.vehicles && <div className='invalid-feedback'>{errors.vehicles}</div>}
                                    <button type='button' className='btn btn-success' onClick={addVehicle}>Araç Ekle</button>

                                </div>

                                <button className='btn btn-success' onClick={saveOrUpdateShipment}>Kaydet</button>
                                <button className='btn btn-danger' onClick={() => navigate('/forward')} style={{ marginLeft: "10px" }}>İptal</button>
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="background-logo"></div>
        
        </div>
    );
};

export default ForwardComponent