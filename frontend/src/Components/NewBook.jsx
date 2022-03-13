import { Component } from "react";
import {Container, Image, Row, Col, Form, Button} from 'react-bootstrap';

class NewBook extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            author: '',
            isbn:'',
            pagecount: '',
            genure: [],
            cost: 0,
            img: 'https://parkablogs.com/sites/default/files/images/no-cover-image.jpg'
        };
    }
    render(){
        return(
            <>
            <Container >
            <Row style={{marginTop:'30px'}}>
                <Col md={5}>
                    <Image src={this.state.img} 
                        style={{height:'550px', width:'480px', margin:'50px', objectFit:'cover', }}
                    />
                </Col>
                <Col md={7} style={{padding:'50px'}}>
                    <Form style={{width:'60%'}}>
                        <Form.Group>
                            <Form.Label style={{fontSize:"20px"}}>Title of the Book</Form.Label>
                            <Form.Control style={{height:"45px"}} type="text" placeholder="Title" 
                                onChange={async(event) => {
                                    await this.setState({name: event.target.value});
                                }}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label style={{fontSize:"20px", marginTop:"30px"}}>Author Name</Form.Label>
                            <Form.Control style={{height:"45px"}}  type="text" placeholder="Author" 
                                onChange={async(event) => {
                                    await this.setState({author: event.target.value});
                                }}
                            />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group>
                                <Form.Label style={{fontSize:"20px", marginTop:"30px"}}>ISBN number</Form.Label>
                                <Form.Control style={{height:"45px"}}  type="number" placeholder="ISBN" 
                                    onChange={async(event) => {
                                        await this.setState({isbn: event.target.value});
                                    }}
                                />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                <Form.Label style={{fontSize:"20px", marginTop:"30px"}}>Page Count</Form.Label>
                                <Form.Control style={{height:"45px"}}  type="number" placeholder="Pages" 
                                    onChange={async(event) => {
                                        await this.setState({pagecount: event.target.value});
                                    }}
                                />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group>
                            <Form.Label style={{fontSize:"20px", marginTop:"30px"}}>Cover Image URL</Form.Label>
                            <Form.Control style={{height:"45px"}}  type="url" placeholder="URL" 
                                onChange={async(event) => {
                                    await this.setState({img: event.target.value});
                                }}
                            />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group>
                                <Form.Label style={{fontSize:"20px", marginTop:"30px"}}>Initial Deposit</Form.Label>
                                <Form.Control style={{height:"45px"}}  type="number" placeholder="Deposit" 
                                    onChange={async(event) => {
                                        await this.setState({cost: event.target.value});
                                    }}
                                />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Button variant="dark" 
                                    style={{marginTop:'70px',backgroundColor:"#262A53", width:'100%'}} 
                                    onClick={()=>{
                                        var data = {
                                            name: this.state.name,
                                            author: this.state.author,
                                            isbn: this.state.isbn,
                                            pagecount: this.state.pagecount,
                                            genure: ['Mystry'],
                                            cost: this.state.cost,
                                            img: this.state.img

                                        }
                                        fetch("http://localhost:8000/addbook",{
                                            method: "POST",
                                            headers: {
                                                'Content-Type' : 'application/json'
                                            },
                                            body: JSON.stringify(data)
                                        }).then((res)=>{
                                            if(res.ok) return res.json();
                                        }).then(async(res) => {
                                            console.log(res.data);
                                            window.location.href = "/library";
                                        });
                                    }}
                                >
                                    Add to Library
                                </Button>
                            </Col>
                        </Row>
                        

                    </Form>
        
                </Col>
            </Row>
            </Container>
            </>
        );
    }
}

export default NewBook;