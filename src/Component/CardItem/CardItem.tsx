
import { useNavigate } from 'react-router-dom';
import './CardItem.css';

const Card = (props: any) => {
    const navigate = useNavigate();
    return (
        <div className="card-item" title={props.item.laptopName}>
            <img src={props.item.image ? `http://localhost:8080/image/${props.item.image}` : require('../../image/frame2.png')} className="card__img"/>
            <div className="card__body">
                <div className="card__title" >
                    <span onClick={()=> navigate(`/update/${props.item.laptopId}`)}>{props.item.laptopName}</span>
                </div>
                <div className="priceContainer">
                    <div className="card__price">{new Intl.NumberFormat().format(props.item.price)}</div>
                </div>
                <div className="discount-notify">
                    <span>Rating {props.item.rating} /5.0</span>
                </div>
                <div className="deman-label">
                    <span>{props.item.labelName}</span>
                </div>
            </div>
        </div>
    )
}
export default Card;