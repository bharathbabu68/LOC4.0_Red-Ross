import { Component } from "react";
import {Container, Image, Row, Col, Form, Button} from 'react-bootstrap';

const Web3 = require('web3');

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
            img: 'https://parkablogs.com/sites/default/files/images/no-cover-image.jpg',
            connectwalletstatus: 'Connect Wallet',
            account_addr: '',
            web3: null,
            contractval:'',
            connect_web3_modal:false,
            metamask_installed:false,
            not_logged_in:false,
        };
    }

    componentDidMount = async() => {

        var web3;
        const Web3 = require('web3');
        if(typeof window.web3 !== 'undefined'){
            web3 = new Web3(window.ethereum);
            console.log(web3);
           //  var address = "0xE6CcAFB99015d50D631B2f310B50471EB411f8Da";
           //  var contract = new web3.eth.Contract(abi, address);
           //  this.setState({contractval: contract});
            this.setState({web3: web3});
            web3.eth.getAccounts().then((accounts) => {
               if(accounts.length == 0){
                   this.setState({connect_web3_modal: true});
               }
               else{
                   this.initialiseAddress(web3);
               }
            });
        }
        else{
            this.setState({metamask_installed:true});
        }

        if(window.ethereum) {
            window.ethereum.on('accountsChanged', () => {
                this.initialiseAddress(web3);
                console.log("Account changed");
            });
        }
    }

        
    initialiseAddress(web3) {

        web3.eth.getAccounts().then((accounts) => {

            var account_addr = accounts[0];
            console.log(account_addr);
    
            this.setState({account_addr: accounts[0]});
    
            if(!account_addr) {
                
                this.setState({connectwalletstatus: 'Connect Wallet'});
                return;
            }
    
            const len = account_addr.length;
            const croppedAddress = account_addr.substring(0,6) + "..." + account_addr.substring(len-4, len);
    
            web3.eth.getBalance(account_addr).then((balance) => {
    
                var account_bal = (Math.round(web3.utils.fromWei(balance) * 100) / 100);
                var temp = "Connected :"  + croppedAddress + " (" + account_bal + " ETH)";
                this.setState({connectwalletstatus: temp});
                this.setState({connect_web3_modal: false});
                console.log(temp);
            });
        });
    }

    connect(web3) {

        window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .catch((err) => {
        if (err.code === 4001) {
            alert('You refused connection to our website. Please connect to MetaMask.');
            this.setState({connect_web3_modal: true});
        } else {
            console.error(err);
        }
        })
    }

    render(){
        return(
            <>
            
            <Container >
            <Row style={{marginTop:'30px'}}>
            <Col md={8}>
                <h1 style={{fontWeight:'light'}}>Add Book to Store</h1>
            </Col>
            <Col md={4} style={{textAlign:'right'}}>
                                <Button variant="dark"  
                        style={{height:'3rem'}} onClick={
                            () => {
                                var web3 = this.state.web3;
                                if(this.state.connectwalletstatus === 'Connect Wallet') {
                                this.connect(web3);
                                this.initialiseAddress(web3);
                                }
                                else {
                                    var tempact = this.state.account_addr;
                                    navigator.clipboard.writeText(tempact);
		                            this.setState({connectwalletstatus: 'Copied'});
		                            setTimeout(() => this.initialiseAddress(web3), 400);
                                }
                            }
                        }>{this.state.connectwalletstatus} 
                    </Button>
                                </Col>
            </Row>
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