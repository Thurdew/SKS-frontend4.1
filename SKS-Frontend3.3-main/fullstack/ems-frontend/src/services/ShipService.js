import axios from "axios";

import cors from 'cors';


const REST_API_BASE_URL = 'http://localhost:8080/ship';


export const listShips = () => axios.get(REST_API_BASE_URL);

export const createShip = (ship) => axios.post(REST_API_BASE_URL,ship)

export const getShip = (shipId) => axios.get(REST_API_BASE_URL + '/' + shipId)

export const updateShip = (shipId,ship) => axios.put(REST_API_BASE_URL + '/' + shipId, ship)

export const deleteShip = (shipId) => axios.delete(REST_API_BASE_URL + '/' + shipId)


