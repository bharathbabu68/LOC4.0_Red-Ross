import { Component } from "react";
import {Button, Row, Col, Container, Card, Dropdown, Modal} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {abi} from "../Resources/abi";
import ScaleLoader from 'react-spinners/ScaleLoader';

const Web3 = require('web3');
class Library extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            books: [],
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
        fetch("http://localhost:8000/library",{
            method: "GET",
            headers: {
                'Content-Type' : 'application/json'
            },
        }).then((res)=>{
            if(res.ok) return res.json();
        }).then(async(res) => {
            console.log(res.data[0]);
            this.setState({books: res.data, isLoading: false});
        });

        var web3;
        const Web3 = require('web3');
        if(typeof window.web3 !== 'undefined'){
            web3 = new Web3(window.ethereum);
            console.log(web3);
            var address = "0x368610772b1dbd5ae2c7fa79a1972dbf3ed1bed5";
            var contract = new web3.eth.Contract(abi, address);
            this.setState({contractval: contract});
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
                                <Link to={`/library/${book.blockchain_id}`} style={{textDecoration:"none", color:"black"}}>

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
                <Container>

                <Modal show={this.state.metamask_installed}>
                            <Modal.Header >
                            <Modal.Title>No Metamask?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <p>Hi, please install Metamask and reload the page. </p>
                            </Modal.Body>
                            <Modal.Footer>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.connect_web3_modal}>
                        <Modal.Header >
                        <Modal.Title>Connect to Web3</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <p>Hi, welcome to Virtual Library. Please click the below button to connect your wallet our website. Once metamask opens, simply click connect. </p>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={async() => {
                            var web3;
                            if(typeof window.web3 !== 'undefined'){
                                web3 = new Web3(window.ethereum);
                                this.setState({web3: web3});
                                this.connect(web3);
                                this.initialiseAddress(web3);

                                // var address = "0xE6CcAFB99015d50D631B2f310B50471EB411f8Da";
 
                                // var contract = new web3.eth.Contract(abi, address);
 
                                // this.setState({contractval: contract});
                            }
                            else{
                                alert('No web3? Please install the metamask extension and refresh the page');
                                return;
                            }
                        }}>Connect Wallet</Button>
                    </Modal.Footer>
                </Modal>

                    <Row style={{marginTop:'30px'}}>
                        <Col md={8}>
                        <h2> Virtual Library </h2>
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

                    <Row style={{marginTop:'10px'}}>
                        <Col md={3} style={{borderRight:'2px solid white', paddingTop:'30px'}}>
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
                        <Col md={9} style={{marginTop:'30px', textAlign: 'right'}}>
                        <Link to={'addBook'} style={{textDecoration:"none", color:"black"}}>
                        <span style={{border:'1px solid #212529', padding:'15px', borderRadius:'3px'}}> +  New Book  </span>
                        </Link>
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