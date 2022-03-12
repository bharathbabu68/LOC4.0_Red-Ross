import react, { Component } from "react";
import { Image } from "react-bootstrap";

import logo from "../Resources/logo.png";
import { Container, Navbar, Nav } from "react-bootstrap";


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
         <Navbar expand="lg"

        >
          <Container style={{borderBottom:'1px solid black'}}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            
              <Navbar.Brand href="/library" className="navbrandname">
              <Image style={{height:"40px",width:"40px"}} src={logo}
              
                /> 
              </Navbar.Brand>

            
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav 
                style={{padding:"20px", marginLeft:'auto'}}
              className="">
              <div className="navdiv navstyle">
                  <Nav.Link 
                  style={{fontWeight:"bolder", marginRight:'30px'}}
                  href="/dashboard" className=" navlinks">
                    Dashboard
                  </Nav.Link>
                </div>
               
                <div className="navdiv  navstyle ">
                  <Nav.Link 
                  style={{ fontWeight:"bolder", marginRight:'30px'}}
                   href="/library" className=" navlinks">
                    Library
                  </Nav.Link>
                </div>
                <div className="navdiv navstyle ">
                  <Nav.Link  
                  id="name"
                  style={{fontWeight:"bolder"}}
                  href="/" className=" navlinks" onClick={()=>{
                    localStorage.removeItem('user');
                  }}>
                    Logout
                  </Nav.Link>
                </div>
              
                
                
                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
       
      </div>
    );
  }
}

export default NavBar;