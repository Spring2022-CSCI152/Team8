import "./Home.css"

const Popup = props => {
	return (
	  <div className="popup-box">
		<div className="box">
		  <span id="close-icon" onClick={props.handleClose}>x</span>
		  <div data-testid="display">
			{props.content}
		  </div>
		</div>
	  </div>
	);
};

export default Popup;