import React, {Component} from 'react';

class Marker extends Component {
	constructor (props){
		super(props);
		
		this.state ={
			offset : 0,
		}
	}

	componentDidMount() {
		 
		var offset = (this.props.seconds/this.props.videoDuration)
	  	this.setState({ offset: offset * 100 });
	  	console.log(this.props.seconds);
	  	console.log(this.props.videoDuration);
	  	console.log(this.state.offset);
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
		return (<div className="clarensMarker" style={style} onClick={this.props.toggleChat}></div>);

	}
}
export default Marker;