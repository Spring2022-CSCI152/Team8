import "./Home.css"

const Popup = props => {
	return (
	  <div className="popup-box">
		<div className="box">
		  <span id="close-icon" onClick={props.handleClose}>x</span>
		  {props.content}
		</div>
	  </div>
	);
};

export default Popup;