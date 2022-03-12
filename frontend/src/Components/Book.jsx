import { Component } from "react";
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import {FaEthereum} from 'react-icons/fa';
import ScaleLoader from 'react-spinners/ScaleLoader';

class Book extends Component{
    constructor(props){
        super(props);
        this.state = {
            book: {},
            isLoading: true
        };
    }
    componentDidMount = () => {
        var dataSend = {bookId: this.props.bookId};
        fetch("http://localhost:8000/book",{
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(dataSend)
        }).then((res)=>{
            if(res.ok) return res.json();
        }).then(async(res) => {
            console.log(res);
            await this.setState({book: res});
            await this.setState({isLoading: false});
        });
    }
    unixToDate(unix_timestamp) {
        unix_timestamp = parseInt(unix_timestamp);
        const timeStamp = unix_timestamp;
        const date = new Date(timeStamp).toLocaleDateString('en-UK');
        return date;
    }
    render(){
        if(this.state.isLoading){
            return(
                <Col 
                    style={{padding:'150px 400px', textAlign:'center'}}
                >
                    <ScaleLoader />
                    {/* <h6> Loading... </h6> */}
                </Col>
            
            )
        }
        else{
            const genureList = () => {
                // return(
                    this.state.book.genure.map((g) => {
                        return(
                            <span> game </span>
                        );
                    })
                // );
            }
            return(
                <>
                <Container >
                <Row style={{marginTop:'30px'}}>
                    <Col md={5}>
                        <Image src={this.state.book.img} 
                            style={{margin:'50px', objectFit:'cover'}}
                        />
                    </Col>
                    <Col md={7} style={{padding:'50px'}}>
                        <h1 style={{fontWeight:'bolder',paddingLeft:'0px'}}> 
                        {this.state.book.name} </h1>
    
                    
        
            
                        <h4> <em> by {this.state.book.author} </em></h4>
                        <h3> {this.state.book.genure.map((g) => {
                            return(<p
                                style={{marginRight:'10px', display:'inline', padding:'10px', borderRadius:'500px', fontSize:'15px', backgroundColor:'#fafafa', border:'1px solid black'}}
                            > {g} </p>);
                        })} </h3>
                        <h6 style={{marginTop:'30px'}}> ISBN : <strong> {this.state.book.isbn} </strong></h6>
                        <h6> Page Count: <strong> {this.state.book.pagecount} </strong></h6>
                        <hr /> 
                        <h4 style={{marginTop:'30px'}}> Expected Incetive : <strong className="text-dark">{this.state.book.incentive}<FaEthereum /></strong> 
                        </h4>
                        <h5> Upcoming Batch : <strong> {this.unixToDate(this.state.book.upcoming_bdate)} </strong></h5>
                        {/* <h5> Current Winner: <span style={{fontWeight:'light', fontSize:'17px'}}> {this.state.product.winner_address} </span> </h5> */}
                        <hr />
            
                        <Row>
                                                   
                            <Col md={5}>
                                <Button  className="btn-lg" variant="dark"
                                    style={{width:'90%', fontWeight:'bolder' }}
                                    
                                > Add to My Shelf </Button>
                            </Col>
                            
                            
                        </Row>
            
                    </Col>
                </Row>
                </Container>
                </>
            );
        }
        
    }
}

export default Book;