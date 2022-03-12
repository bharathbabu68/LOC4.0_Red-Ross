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
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            
              <Navbar.Brand href="/explore" className="navbrandname">
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
                  href="/explore" className=" navlinks">
                    Dashboard
                  </Nav.Link>
                </div>
               
                <div className="navdiv  navstyle ">
                  <Nav.Link 
                  style={{ fontWeight:"bolder", marginRight:'30px'}}
                   href="/bidstats" className=" navlinks">
                    Explore
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