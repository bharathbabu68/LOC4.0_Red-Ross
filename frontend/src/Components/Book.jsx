import { Component } from "react";
import { Container, Row, Col, Image, Button, Badge } from 'react-bootstrap';
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
                            style={{margin:'50px', objectFit:'cover', height:'500px'}}
                        />
                    </Col>
                    <Col md={7} style={{padding:'50px'}}>
                        <h1 style={{fontWeight:'bolder',paddingLeft:'0px'}}> 
                        {this.state.book.name} </h1>
    
                    
        
            
                        <h4> <em> by {this.state.book.author} </em></h4>
                        <br></br>
                        <h4>Tags: </h4>
                        {this.state.book.genure.map((g) => {
                            return(<span  
                            >  <Badge style={{padding:"5px"}}pill bg="dark"> <span style={{color:"white", fontSize:"larger"}}>{g}</span></Badge> </span>);
                        })} 
                        <hr /> 
                        <h4 style={{marginTop:'30px'}}> ISBN : <strong> {this.state.book.isbn} </strong></h4>
                        <h4> Page Count: <strong> {this.state.book.pagecount} </strong></h4>
            
                        <h4 > Expected Incentive Amount: <strong className="text-dark">{this.state.book.incentive / 100}<FaEthereum /></strong> 
                        </h4>
                        <h4> Upcoming Cohort : <strong> March 30th 2022 </strong></h4>
                        <h4> Number of reads: <strong>18</strong></h4>
                        {/* <h5> Current Winner: <span style={{fontWeight:'light', fontSize:'17px'}}> {this.state.product.winner_address} </span> </h5> */}
                        <hr />
            
                        <Row>
                                                   
                            <Col md={5}>
                                <Button  className="btn-lg" variant="dark"
                                    style={{width:'90%', fontWeight:'bolder' }}
                                    onClick={()=>{
                                        var dataSend ={
                                            username: 'admin',
                                            bookId: this.state.book.blockchain_id
                                        }
                                        fetch("http://localhost:8000/reading",{
                                        method: "POST",
                                        headers: {
                                            'Content-Type' : 'application/json'
                                        },
                                        body: JSON.stringify(dataSend)
                                    }).then((res)=>{
                                        if(res.ok) return res.json();
                                    }).then(async(res) => {
                                        if(res.data === "success"){
                                            window.location.href = "/dashboard";
                                        }
                                        
                                    });
                                    }}
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