import { Component } from "react";
import {Row, Col, Container, Image, Card, Button, Modal} from 'react-bootstrap';
import { FaEthereum } from "react-icons/fa";
import {RiMedalFill} from 'react-icons/ri';
import ScaleLoader from 'react-spinners/ScaleLoader';
import {Link} from 'react-router-dom';
const Web3 = require('web3');


class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            readingBooks: [],
            readBooks: [],
            connectwalletstatus: 'Connect Wallet',
            account_addr: '',
            web3: null,
            contractval:'',
            connect_web3_modal:false,
            metamask_installed:false,
            not_logged_in:false,
            allBooks: [],
            books: [],
            isMember: false,
            membershipShow: false,
            bookShow: false,
            selectedBook: {}
        };

    }
    componentDidMount = () => {
        var data = {username: 'admin'};
        fetch("http://localhost:8000/dashboard",{
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res)=>{
            if(res.ok) return res.json();
        }).then(async(res) => {
            console.log(res.data);
            await this.setState({allBooks: res.allBooks});

            await this.setState({books: res.books});
            await this.setState({isLoading: false});
        });
    

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


            
    renderMembership(){
        if(this.state.isMember){
            return(
                <>
                <p> Your Membership expires on Apr 16, 2022 </p>
                </>
            );
        }
        else{
            return(
                <>
                <p><a onClick={async()=>{
                    this.setState({membershipShow:true})
                }}
                className="text-primary"
                style={{cursor:'pointer'}}
                >Become a member</a> to avail all the features</p>
                </>
            )
        }
    }
    render(){
        const handleMemberClose = async() => this.setState({membershipShow:false});
        const handleBookClose = async() => this.setState({bookShow:false});
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
                <Modal show={this.state.membershipShow} onHide={handleMemberClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Become a Super Reader </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col md={5}>
                                <Image src="https://5.imimg.com/data5/SM/ZI/DY/SELLER-42012147/ribbon-gold-medal-500x500.jpg"
                                style={{height:'200px', objectFit:'cover'}} />

                            </Col>
                            <Col md={7}>
                                <h5> Membership Features </h5>
                                <ul>
                                    <li> Limitless access to Books</li>
                                    <li> Best reading interface </li>
                                    <li> Access to community forum to read with your friends</li>
                                </ul>
                                <h5>Cost <strong>150 <FaEthereum /> </strong></h5>
                                <h6> Duration : <strong> 3 mos </strong></h6>
                                <Button 
                                    style={{width:'100%'}}
                                    variant="dark"
                                    onClick={()=>{
                                        
                                    }}
                                > Join now</Button>
                            </Col>
                        </Row>

                    </Modal.Body>
                    
                </Modal>
                <Modal show={this.state.bookShow} onHide={handleBookClose}>
                    <Modal.Header closeButton>
                    <Modal.Title> Your Book </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col md={5}>
                                <Image src={this.state.selectedBook.img}
                                style={{height:'200px', objectFit:'cover'}} />

                            </Col>
                            <Col md={7}>
                                <h5> {this.state.selectedBook.name} </h5>
                                <h6><em>{this.state.selectedBook.author}</em></h6>
                                
                                <Button 
                                    style={{width:'100%', marginTop:'50px'}}
                                    variant="outline-dark"
                                    onClick={()=>{
                                        var data = {username: 'admin', bookId: this.state.selectedBook.blockchain_id};
                                        fetch("http://localhost:8000/completebook",{
                                            method: "POST",
                                            headers: {
                                                'Content-Type' : 'application/json'
                                            },
                                            body: JSON.stringify(data)
                                        }).then((res)=>{
                                            if(res.ok) return res.json();
                                        }).then(async(res) => {
                                            console.log(res.data);
                                            await this.setState({bookShow:false});
                                        });
                                    }}
                                > Take Quiz </Button>
                                <a href="https://www.info24service.com/wp-content/uploads/4-Harry-Potter-and-the-Goblet-of-Fire_US_ISBN-0-439-13959-7_2014-191-1447.pdf">
                                <Button 
                                    style={{width:'100%', marginTop:'10px'}}
                                    variant="dark"
                                > Download </Button> </a>
                            </Col>
                        </Row>

                    </Modal.Body>
                    
                </Modal>

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

                    <Container>
                        
                        <Row style={{marginTop:'30px'}}>
                            <Col md={3} >
                                <h4 > <strong>Your Stats </strong></h4>
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
                                {this.renderMembership()}
                                 <Row>
                                    <Col md={8}>
                                <h2>  Reading Books </h2>
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
                                <Row>
                                {this.state.allBooks.filter((book) => {
                                    for(var j=0; j<this.state.books.length; j++){
                                        if(book.blockchain_id === this.state.books[j].blockchain_id && this.state.books[j].status === 'current') return true;
                                    }
                                }).map((book)=>{
                                    return(
                                        <Col md={3} 
                                            style={{padding: '30px'}}

                                            onClick={async()=>{
                                                await this.setState({selectedBook:book});
                                                await this.setState({bookShow:true});
                                            }}
                                            >
                                            
                                            
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
                                            {/* </Link> */}
                                        </Col>
                                    )
                                })}
                                </Row>

                                <h2> Completed Books</h2>
                                <Row>
                                {this.state.allBooks.filter((book) => {
                                    for(var j=0; j<this.state.books.length; j++){
                                        if(book.blockchain_id === this.state.books[j].blockchain_id && this.state.books[j].status === 'complete') return true;
                                    }
                                }).map((book)=>{
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