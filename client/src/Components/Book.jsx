import { Component } from "react";

class Book extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }
    render(){
        return(
            <>
            <h1> book details {this.props.productId} </h1>
            </>
        );
    }
}

export default Book;