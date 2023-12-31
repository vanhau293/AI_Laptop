import React from 'react';
import ProductScreen from './Product/ProductScreen';
import { Route, Routes, useNavigate } from "react-router-dom";
import CreateProduct from './create-product/CreateProduct';
import UpdateProduct from './UpdateProduct/UpdateProduct';

const Main = () => {
    return (
        <Routes>
            <Route path='/' element={<ProductScreen />} />
            <Route path='/create' element={<CreateProduct />} />
            <Route path='/update/:laptopId' element={<UpdateProduct/>} />
        </Routes>
    );
}

export default Main;
