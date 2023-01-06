import { Link } from "react-router-dom";

export default function PropertyItem(props) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: props.unit,
    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    <div className="product-wrapper">
      <div className="product">
        <Link to={"/show-property/" + props.id} className="show-info">
          {props.images.length > 0 ? (
            <img src={props.images[0].url} alt={props.address} />
          ) : (
            <img src="assets/default .jpeg" alt="Default" />
          )}
        </Link>
        <div className="flex-row">
          <Link to={"/show-property/" + props.id} className="show-info">
            {props.address}
          </Link>
          <div className="date">{props.date}</div>
        </div>
        <div className="flex-row">
          <div className="category">{props.category}</div>
        </div>
        <div className="flex-row">
          <div className="price">{formatter.format(props.price)}</div>
          <Link to={"/show-property/" + props.id} className="show-info">
            More information
          </Link>
        </div>
      </div>
    </div>
  );
}
