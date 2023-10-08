import React, { useState, useEffect } from "react";
import { AddShoppingCart } from '@mui/icons-material'
import './CardItem.css';
// import CustomizedDialogs from "./CustomDialog";
// import AddCartDetail from "./AddCartDetail";
import { Link, useNavigate } from "react-router-dom";
interface cart {
    name: '',
    afterDiscountPrice: '',
    beforeDiscountPrice: '',
    id_product_color_size: ''
    quantity: '',
    color: '',
    size: '',
    img: ''
};
const Card = (props: any) => {
    // const navigate = useNavigate();
    const [shoppingCart, setShoppingCart] = useState<Partial<cart>>({})
    const [openDialogCart, setOpenDialogCart] = useState(false);
    return (
        <div className="card-item" title={props.item.product_name}>
            <img src={props.item.label ? props.item.label : require('../../image/frame2.png')} className="card__img"/>
            {/* <img src={`http://localhost:8081/api/phone/image/load/${props.item.img}`} className="card__img" /> */}
            <div className="card__body">
                <div className="card__title" >
                    <span /*</div></div>onClick={() => { navigate(`/product/${props.item.tag}`) }*/>{props.item.product_name}</span>
                </div>
                <div className="priceContainer">
                    <div className="card__price">{new Intl.NumberFormat().format(props.item.price)}</div>
                </div>
                {/* <div className="discount-notify">
                    <span>{props.item.label === "2" ? "Cao cấp" : props.item.label === "2" ? "Tầm Trung" : "Bình Dân"}</span>
                </div> */}
                <div className="discount-notify">
                    <span>{props.item.rating === "2" ? "Rating 2.0/5.0" : props.item.label === "3" ? "Rating 3.0/5.0" : "Rating 0.0/5.0"}</span>
                </div>
                <div className="deman-label">
                    <span>{props.item.label === "2" ? "Gamming" : props.item.label === "3" ? "Học tập, văn phòng" : "Kỹ thuật, đồ họa"}</span>
                </div>
            </div>
        </div>
    )
}
export default Card;