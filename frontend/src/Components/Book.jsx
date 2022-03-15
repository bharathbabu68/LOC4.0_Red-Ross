import { Component } from "react";
import { Container, Row, Col, Image, Button, Badge, Modal } from 'react-bootstrap';
import {FaEthereum} from 'react-icons/fa';
import {abi} from "../Resources/abi";
import ScaleLoader from 'react-spinners/ScaleLoader';
const Web3 = require('web3');

class Book extends Component{
    constructor(props){
        super(props);
        this.state = {
            book: {},
            isLoading: true,
            connectwalletstatus: 'Connect Wallet',
            account_addr: '',
            web3: null,
            contractval:'',
            connect_web3_modal:false,
            metamask_installed:false,
            member_modal:false,
            membership_result:-1,
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

        var web3;
        const Web3 = require('web3');
        if(typeof window.web3 !== 'undefined'){
            web3 = new Web3(window.ethereum);
            console.log(web3);
            var address = "0x63aD6BB5F68a1937898673f9E43D24eB1B7aaC45";
            var contract = new web3.eth.Contract(abi, address);
            console.log(contract);
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
                <Modal show={this.state.member_modal}>
                <Modal.Header >
                <Modal.Title>Become a paid member</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <p>Become a paid member and unlock all the benefits of this platform. </p>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=>{this.setState({member_modal:false})
            }}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>

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
                <Row style={{marginTop:'15px'}}>
                <Col md={12} style={{textAlign:'right'}}>
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
            
                        <h4 > Expected Incentive Amount: <strong className="text-dark">{Math.round(100 * this.state.book.incentive) / 100}<FaEthereum /></strong> 
                        </h4>
                        <h4> Upcoming Cohort :  March 30th 2022 </h4>
                        <h4> Number of reads: <strong>18</strong></h4>
                        {/* <h5> Current Winner: <span style={{fontWeight:'light', fontSize:'17px'}}> {this.state.product.winner_address} </span> </h5> */}
                        <hr />
            
                        <Row>
                                                   
                            <Col md={5}>
                                <Button  className="btn-lg" variant="dark"
                                    style={{width:'90%', fontWeight:'bolder' }}
                                    onClick={()=>{

                                        // validate whether the sender is a member or not
                                        var web3 = this.state.web3;
                                        var account_addr = this.state.account_addr;
                                        var contract = this.state.contractval;
                                        contract.methods.is_a_member().call({from: account_addr}).then(async (result) => {
                                            if(result==0)
                                                alert("You are not a member. Please become a member to buy this book.");
                                            else{
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
                                            }
                                        });




                                    //     var dataSend ={
                                    //         username: 'admin',
                                    //         bookId: this.state.book.blockchain_id
                                    //     }
                                    //     fetch("http://localhost:8000/reading",{
                                    //     method: "POST",
                                    //     headers: {
                                    //         'Content-Type' : 'application/json'
                                    //     },
                                    //     body: JSON.stringify(dataSend)
                                    // }).then((res)=>{
                                    //     if(res.ok) return res.json();
                                    // }).then(async(res) => {
                                    //     if(res.data === "success"){
                                    //         window.location.href = "/dashboard";
                                    //     }
                                        
                                    // });
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