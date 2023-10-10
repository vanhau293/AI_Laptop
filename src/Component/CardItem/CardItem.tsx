
import './CardItem.css';
// import CustomizedDialogs from "./CustomDialog";
// import AddCartDetail from "./AddCartDetail";

const Card = (props: any) => {
    // const navigate = useNavigate();
    return (
        <div className="card-item" title={props.item.laptopName}>
            <img src={props.item.image ? props.item.image : require('../../image/frame2.png')} className="card__img"/>
            {/* <img src={`http://localhost:8081/api/phone/image/load/${props.item.img}`} className="card__img" /> */}
            <div className="card__body">
                <div className="card__title" >
                    <span /*</div></div>onClick={() => { navigate(`/product/${props.item.tag}`) }*/>{props.item.laptopName}</span>
                </div>
                <div className="priceContainer">
                    <div className="card__price">{new Intl.NumberFormat().format(props.item.price)}</div>
                </div>
                {/* <div className="discount-notify">
                    <span>{props.item.label === "2" ? "Cao cấp" : props.item.label === "2" ? "Tầm Trung" : "Bình Dân"}</span>
                </div> */}
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