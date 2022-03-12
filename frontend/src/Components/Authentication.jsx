import { Component } from "react";
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';
import book from '../Resources/book.png';
class Authentication extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentState:'Login',
            username: '',
            password: '',
            cpassword: ''
        };
        this.chooseLogin = this.chooseLogin.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
        this.handleSignup=this.handleSignup.bind(this);
    }
    chooseLogin = () => {
        if(this.state.currentState === "Login"){
            return(
                <>
                    <Form>
                        <Form.Group>
                            <Form.Label style={{fontSize:"20px"}}>Email address</Form.Label>
                            <Form.Control style={{height:"45px"}} type="email" placeholder="Enter email" 
                                onChange={async(event) => {
                                    await this.setState({lusermail: event.target.value});
                                }}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label style={{fontSize:"20px", marginTop:"30px"}}>Password</Form.Label>
                            <Form.Control style={{height:"45px"}}  type="password" placeholder="Password" 
                                onChange={async(event) => {
                                    await this.setState({lpassword: event.target.value});
                                }}
                            />
                        </Form.Group>
                        
                        
                        <Button variant="dark" style={{margin:"30px 20px 30px 0px", backgroundColor:"#262A53"}} 
                            onClick={this.handleLogin}
                        >
                            Login
                        </Button>

                    </Form>
                </>
            );
        }
        else{
            return(
                <>
                    <Form>
                        <Form.Group>
                            <Form.Label style={{fontSize:"20px"}}>Email address</Form.Label>
                            <Form.Control style={{height:"45px"}} type="email" placeholder="Your Email" 
                            onChange={async(event) => {
                                await this.setState({lusermail: event.target.value});
                            }}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label style={{fontSize:"20px", marginTop:"30px"}}>Password</Form.Label>
                            <Form.Control style={{height:"45px"}}  type="password" placeholder="Choose a Password"
                                onChange={async(event) => {
                                    await this.setState({lpassword: event.target.value});
                                }}
                             />
                        </Form.Group>
                        
                        <Form.Group>
                            <Form.Label style={{fontSize:"20px", marginTop:"30px"}}>Confirm Password</Form.Label>
                            <Form.Control style={{height:"45px"}}  type="password" placeholder="Confirm it" 
                                onChange={async(event) => {
                                    await this.setState({sconfirmpassword: event.target.value});
                                }}
                            />
                        </Form.Group> 

                        <Button variant="dark" style={{margin:"30px 20px 30px 0px", backgroundColor:"#262A53"}}
                            onClick={this.handleSignup}
                        >
                            Create Account
                        </Button>
                    </Form>
                </>
            );
        }
    }
    login = async() => {
        await this.setState({currentState: "Login"})
        document.querySelector("#login-btn").classList.add("authenticate-btn-active");
        document.querySelector("#signup-btn").classList.remove("authenticate-btn-active");
       

    }
    signup = async() => {
        await this.setState({currentState: "Sign Up"})
        console.log('hello');
        document.querySelector("#login-btn").setAttribute("variant","light");
        document.querySelector("#signup-btn").setAttribute("variant","warning");
        

    }
    handleSignup(){
        if(this.state.lpassword !== this.state.sconfirmpassword){
            this.setState({password_mismatch:true});
            return;
        }
        var newUser = {
            username: this.state.lusermail.split("@")[0],
            password: this.state.lpassword
        }
        console.log(newUser);
        fetch('http://localhost:8000/signup',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newUser),

        }).then((response) => {
            if(response.ok) return response.json();
        }).then(async(res) => {
            if(res.success == 1){
                this.setState({signup_success:true});
                window.location.href = 'http://localhost:3000/explore';
            }
            else{
                this.setState({user_already_exists:true});
            }
        })
    }
    handleLogin()
    {
        console.log(this.state.lusermail);
        console.log(this.state.lpassword);
        var key={name:this.state.lusermail.split("@")[0],password:this.state.lpassword};
     
        fetch('http://localhost:8000/login',{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify(key)
        }).then((res)=>{
            return res.json();
        }).then(async(res)=>{
            console.log("Login status")
            console.log(res.success)
            if(res.success==1)
            {
                await this.props.func(this.state.lusermail.split("@")[0]);
                localStorage.setItem('user',JSON.stringify({token: "logged_in", status: 1}));
                window.location.href = 'http://localhost:3000/explore';
            }
            else if(res.success==-1){
                this.setState({no_user_exists:true});
            }
            else{
                this.setState({failed_login:true})
            }

        })
    }
    render(){
        return(
            <>
            
            <Container fluid style={{width:'85%'}}>
                <Row>
                <Col md={7} style={{padding:'80px',}}>
                    <h1 
                    style={{fontSize:'500%', fontWeight:'bolder'}}> Learn.Earn.Repeat</h1> 
                    
                    <h3 style={{marginTop:'30px'}}> Knowlege-up yourself and clain Incentives </h3>
                    {/* <h5> <span style={{fontSize:'40px'}}> 20942548 </span> Antiques Sold </h5> */}

                    <h5 style={{marginTop:'300px', fontWeight:'light'}} > </h5>
                    <h6 style={{fontWeight:'lighter'}}> © Copyright Reserved by RedRoss 2022 </h6>
                </Col>
                <Col md={5} style={{}}>
                    <Container fluid 
                    style={{borderRadius:'10px', backgroundColor:'white', width:'70%', padding:'20px', marginTop:'70px'}}>
                    <Row style={{marginTop:"30px", }}>
                        <Col md={6}> 
                            <Button variant='light'
                            onClick={async() => {
                                await this.setState({currentState: "Login"});
                                document.querySelector("#login-btn").classList.add("authenticate-btn-active");
                                document.querySelector("#signup-btn").classList.remove("authenticate-btn-active");
       
                            }} 
                            className="btn-lg authenticate-btn authenticate-btn-active" id='login-btn'> 
                            Login </Button>
                        </Col>
                        <Col md={6}> 
                            <Button variant="light"
                            onClick={async()=>{
                                await this.setState({currentState: "Sign Up"});
                                document.querySelector("#signup-btn").classList.add("authenticate-btn-active");
                                document.querySelector("#login-btn").classList.remove("authenticate-btn-active");
                            }} 
                            className="btn-lg authenticate-btn"  id='signup-btn'> 
                            Sign Up </Button>
                        </Col>
                    </Row>
                    <hr />

                    {this.chooseLogin()}
                    </Container>
                   
                </Col>
                </Row>
            </Container>
            </>
        );
        
    }
}

export default Authentication;