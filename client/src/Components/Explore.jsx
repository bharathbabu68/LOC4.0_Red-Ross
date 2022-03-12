import { Component } from "react";
import {Button, Row, Col, Container, Card} from 'react-bootstrap';
import {Link} from "react-router-dom";

import ScaleLoader from 'react-spinners/ScaleLoader';
class Explore extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            books: [],
        };
    }
    componentDidMount = async() => {
        console.log('getting daat');
        fetch("http://localhost:8000/explore",{
            method: "GET",
            headers: {
                'Content-Type' : 'application/json'
            },
        }).then((res)=>{
            if(res.ok) return res.json();
        }).then(async(res) => {
            console.log(res.data[0]);
            await this.setState({books: [res.data[0],res.data[0],res.data[0]]});
            await this.setState({isLoading: false});
        });
    }
    renderBooks(){
        if(this.state.isLoading){
            return(
                <Col 
                    style={{padding:'150px 400px'}}
                >
                    <ScaleLoader />
                    {/* <h6> Loading... </h6> */}
                </Col>
            
            )
        }
        else{
            return(
                <>
                    {this.state.books.map((book)=>{
                        return(
                            <Col md={4} 
                                style={{padding: '30px'}}>
                                <Link to={`/explore/${book._id}`} style={{textDecoration:"none", color:"black"}}>

                                <Card 
                                    style={{borderTop:"1px solid black"}}>
                                        <Card.Img 
                                            style={{height:'250px', objectfit:'cover'}}
                                            src={book.img}/>
                                        <Row style={{marginTop: '20px'}}>
                                            <Col style={{paddingLeft:'20px'}}>
                                                <h5
                                                style={{fontWeight:'bolder'}}
                                            >{book.name}</h5>
                                            <p><em> by {this.state.books[0].author}</em></p>
                                            </Col>
                                        </Row>                                 
                                </Card>    
                                </Link>
                            </Col>
                        )
                    })}
                </>
            );
        }
    }
    render(){
        
        return(
            <>
                <Container>
                    <Row style={{marginTop:'30px'}}>
                        <Col>
                        <h2> Virtual Library </h2>
                        </Col>
                        <Col style={{textAlign:'right' }}>
                        <Button variant="warning" style={{marginRight:'20px'}}> +  New Book </Button>
                        </Col>
                    </Row>

                    <Row style={{marginTop:'30px '}}>
                        <Col md={3}>
                            <h3> Search </h3>
                            <input type='text' style={{height:'40px'}}></input>
                            <h3 style={{marginTop:'20px'}}> Filter your Books </h3>
                            <input type='radio' name='fiction' value='fiction'></input>
                            <label for='fiction' style={{paddingLeft:'15px'}}> Fiction</label> <br />
                            <input type='radio' name=''></input>
                            <label style={{paddingLeft:'15px'}}> Mystery</label><br />
                            <input type='radio' name=''></input>
                            <label style={{paddingLeft:'15px'}}> Thriller</label><br />
                            <input type='radio' name=''></input>
                            <label style={{paddingLeft:'15px'}}> Horror</label><br />
                            <input type='radio' name=''></input>
                            <label style={{paddingLeft:'15px'}}> Historical</label><br />
                            <input type='radio' name=''></input>
                            <label style={{paddingLeft:'15px'}}> Romance</label><br />
                            <input type='radio' name=''></input>
                            <label style={{paddingLeft:'15px'}}> Western</label><br />
                            <input type='radio' name=''></input>
                            <label style={{paddingLeft:'15px'}}> Bildungsroman</label><br />
                            
                        </Col>
                        <Col md={9}>
                            <Row>
                            {this.renderBooks()}
                            </Row>
                            
                        </Col>
                    </Row>
                </Container>


            </>
        );
    }
}

export default Explore;