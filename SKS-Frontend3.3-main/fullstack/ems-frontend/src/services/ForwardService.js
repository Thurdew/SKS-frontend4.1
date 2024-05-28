import axios from "axios";

import cors from 'cors';


const REST_API_BASE_URL = 'http://localhost:8080/shipments';


export const listShipments = () => axios.get(REST_API_BASE_URL);

export const createShipment = (shipment) => axios.post(REST_API_BASE_URL,shipment)

export const getShipment = (shipmentId) => axios.get(REST_API_BASE_URL + '/' + shipmentId)

export const updateShipment = (shipmentId,shipment) => axios.put(REST_API_BASE_URL + '/' + shipmentId, shipment)

export const deleteShipment = (shipmentId) => axios.delete(REST_API_BASE_URL + '/' + shipmentId)

export const getShipmentNo = (teslimatNo) => axios.get(REST_API_BASE_URL + '/teslimat/' + teslimatNo)