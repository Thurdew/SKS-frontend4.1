import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createProduct, getProduct, updateProduct } from '../services/ProductService';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import SideBar from './SideBar';

const  ProductComponent = () => {

    const [productName, setProductName] = useState('')

    const {id} = useParams();

    const[errors, setErrors] = useState({
        productName : ''
    })

    const navigator = useNavigate();

    useEffect(() => {
        if(id){
            getProduct(id).then((response) => {
                setProductName(response.data.productName);
            }).catch(error => {
                console.error(error)
            })
        }
    }, [id])

    function handleProductName(e){ 
        setProductName(e.target.value);
    }

    function saveOrUpdateProduct(e){
        e.preventDefault();
        if(validateForm()){
            const product = {productName}
            console.log(product)
            if(id){
                updateProduct(id,product).then((response) =>{
                    console.log(response.data)
                    navigator('/product');  
                }).catch(error => {
                    console.error(error);
                })
            }
            else{
                createProduct(product).then((response) =>{
                console.log(response.data);
                navigator('/product')           
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }

    function validateForm(){
        let valid = true;

        const errorCopy = {...errors}

        if(productName.trim()){
            errorCopy.productName = '';
        }
        else{
            errorCopy.productName = 'Ürün Tipi Gerekli';
            valid = false;
        }
        setErrors(errorCopy);
        return valid
    }

    function pageTitle(){  
        if (id) {
            return <h2 className='text-center'>ÜRÜN GÜNCELLE</h2>
        }
        else{
            return <h2 className='text-center'>ÜRÜN EKLEME</h2>
        }

    }
  return (
    <div id='root'>
        <SideBar/>
    <div className='my-container'>
            <br /><br />
            <div className='row'>
                <div className='card '>
                   {
                    pageTitle()  
                   }
                    <div className='card-body'>
                        <form>
                            <div className='form-group'>
                                 <label className='form-label'> Ürün Adı:</label>
                                 <input
                                    type = 'text'
                                    placeholder='Ürün Adını Giriniz'
                                    name='productName'
                                    value={productName}
                                    className={`form-control ${errors.productName ? 'is-invalid' : '' }`}
                                    onChange={handleProductName} 
                                 ></input>
                                 {errors.productName && <div className='invalid-feedback'>{errors.productName}</div>}
                            </div>
                            <button className='btn btn-success' onClick={saveOrUpdateProduct}>Kaydet</button>
                            <button className='btn btn-secondary' onClick={() => navigator('/product')} style={{ marginLeft: "10px" }}>Geri Dön</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div className="background-logo"></div> {/* Şeffaf logo */}

        <FooterComponent/>
    </div>    
    )
}

export default ProductComponent
