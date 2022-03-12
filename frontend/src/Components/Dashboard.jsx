import { Component } from "react";
import {Row, Col, Container, Image, Card, Button} from 'react-bootstrap';
import { FaEthereum } from "react-icons/fa";
import {RiMedalFill} from 'react-icons/ri';
import ScaleLoader from 'react-spinners/ScaleLoader';
import {Link} from 'react-router-dom';


class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            readingBooks: [],
            readBooks: []
        };

    }
    componentDidMount = () => {
        fetch("http://localhost:8000/library",{
            method: "GET",
            headers: {
                'Content-Type' : 'application/json'
            },
        }).then((res)=>{
            if(res.ok) return res.json();
        }).then(async(res) => {
            console.log(res.data[0]);
            await this.setState({readingBooks: [res.data[0],res.data[0],res.data[0], res.data[0]]});
            await this.setState({readBooks: this.state.readingBooks});
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
                </Col>
            
            )
        }
        else{
            return(
                <>
                    <Container>
                        <Row style={{marginTop:'30px'}}>
                            <Col md={3} >
                                <h2 > <strong>Your Stats </strong></h2>
                                <Row style={{marginTop:'20px'}}>
                                    <Col md={6}><h4>Incentives</h4></Col>
                                    <Col md={4}><h4><strong>256</strong></h4></Col>
                                </Row>
                                <Row>
                                    <Col md={6}><h4>Books read</h4></Col>
                                    <Col md={4}><h4><strong>7</strong></h4></Col>
                                </Row>
                                <Row>
                                    <Col md={6}><h4>Rank</h4></Col>
                                    <Col md={4}><h4><strong>1125</strong></h4></Col>
                                </Row>
                                <h2 style={{marginTop:'30px'}} > <strong>Leaderboard</strong></h2>
                                
                                <Row style={{marginTop:'20px'}}>
                                    <Col md={8}><h4><span><RiMedalFill/></span> Robert Downey</h4></Col>
                                    <Col md={4}><h4>119</h4></Col>
                                </Row>
                                <Row style={{marginTop:'20px'}}>
                                    <Col md={8}><h4><span style={{color:'grey'}}><RiMedalFill/></span> Sachin Khan</h4></Col>
                                    <Col md={4}><h4>118</h4></Col>
                                </Row>
                                <Row style={{marginTop:'20px'}}>
                                    <Col md={8}><h4><span style={{color:'#c7c7c7'}}><RiMedalFill/></span> Vinoth Ramji</h4></Col>
                                    <Col md={4}><h4>114</h4></Col>
                                </Row>
                            </Col>
                            <Col md={9}>
                                <h2> <strong> Reading Books </strong></h2>
                                <Row>
                                {this.state.readingBooks.map((book)=>{
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
                                </Row>

                                <h2> <strong> Completed Books </strong></h2>
                                <Row>
                                {this.state.readBooks.map((book)=>{
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
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </>
            )
        }
        
    }
}

export default Dashboard;