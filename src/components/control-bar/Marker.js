import React, {Component} from 'react';

class Marker extends Component {
	constructor (props){
		super(props);
		
		this.state ={
			offset : 0,
		}

		this.returnMe = this.returnMe.bind(this);
	}
	returnMe(){
		 
		// console.log("Excutes this.props.MarkerClick and return the props");
		this.props.markerClick(this.props);
	}
	componentDidMount() {
		var offset = (this.props.seconds / this.props.videoDuration)
	  	this.setState({ offset: offset * 100 });
	}
	render(){

		var style = {
		      backgroundColor: 'red',
		      width:'10px',
		      height:'10px',
		      borderRadius:'50%',
		      position:'absolute',
		      top:'-4px',
		      left: this.state.offset+'%', 
	          zIndex: "999999",
	    };
		return (<div className="clarensMarker" style={style} onClick={this.returnMe} ></div>);

	}
}
export default Marker;