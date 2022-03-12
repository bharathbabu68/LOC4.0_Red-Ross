import { Component } from "react";
import {Button, Row, Col, Container, Card, Dropdown} from 'react-bootstrap';
import {Link} from "react-router-dom";

import ScaleLoader from 'react-spinners/ScaleLoader';
class Library extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            books: [],
        };
    }
    componentDidMount = async() => {
        fetch("http://localhost:8000/library",{
            method: "GET",
            headers: {
                'Content-Type' : 'application/json'
            },
        }).then((res)=>{
            if(res.ok) return res.json();
        }).then(async(res) => {
            console.log(res.data[0]);
            await this.setState({books: [res.data[0],res.data[0],res.data[0], res.data[0]]});
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
                            <Col md={3} 
                                style={{padding: '30px'}}>
                                <Link to={`/library/${book._id}`} style={{textDecoration:"none", color:"black"}}>

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
                                            <p><em> by {book.author}</em></p>
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
                        <Link to={'addBook'} style={{textDecoration:"none", color:"black"}}>
                        <span style={{border:'1px solid #212529', padding:'15px', borderRadius:'3px'}}> +  New Book  </span>
                        </Link>
                        </Col>
                    </Row>

                    <Row style={{}}>
                        <Col md={3} style={{borderRight:'2px solid white', paddingTop:'20px'}}>
                        <Dropdown style={{}}>
                            <Dropdown.Toggle variant="dark" id="dropdown-basic"
                                style={{width:'100%'}}
                            >
                                Search by Title
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Search by Author</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                            <input type='text' style={{height:'40px', marginTop:'20px', width:'100%'}}></input>
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
                        <Col md={9} style={{marginTop:'30px'}}>
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

export default Library;