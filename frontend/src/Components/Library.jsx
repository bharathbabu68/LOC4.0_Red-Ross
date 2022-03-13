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
            filteredBooks: [],
            isFilter: true,
            searchOptionActive:'Title',
            searchOption: 'Author',
            searchText: '',
            filters: ['all'],
            availableFilters: ['Fiction', 'Mystry', 'Thriller', 'Horror', 'Historical', 'Romance', 'Western', 'Bildungsroman']
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
            console.log(res.data);
            await this.setState({books: res.data});
            await this.setState({isLoading: false});
            await this.setState({filteredBooks: res.data});
        });
        document.querySelector("#check-all").checked = true;
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
                    {this.state.filteredBooks.filter((book)=>{
                        if(this.state.isFilter){
                            if(this.state.filters[0] === 'all'){
                                return true;
                            }
                            for(var j=0; j<this.state.filters.length; j++){
                                if(book.genure.includes(this.state.filters[j])){
                                    // this.setState({filterBooks: [...this.state.filteredBooks,this.state.books[i]]})
                                    
                                    console.log(book.name, this.state.availableFilters[j]);
                                    return true;
                                }
                            }
                            return false;
                            
                        }
                        else{
                            if(this.state.searchOptionActive === 'Title'){
                                
                                if(book.name.includes(this.state.searchText)){
                                    return true
                                    
                                }
                                
                            }
                            else{
                                if(book.author.includes(this.state.searchText)){
                                    return true;
                                    
                                }
                                return false;
                            }
                        }
                    }).map((book)=>{
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
    addFilter = async(filtername, filtercheck) => {
        if(filtercheck){
            if(this.state.filters[0] === 'all'){
                var filter = this.state.filters;
                filter.splice(0,1);
                this.setState({filters: filter});
            }
            var filters = this.state.filters;
            filters.push(filtername);
            this.setState({filters: filters});
            document.querySelector("#check-all").checked = false;
        }
        else{
            for(var i=0; i<this.state.filters.length; i++){
                if(filtername === this.state.filters[i]){
                    var filter = this.state.filters;
                    filter.splice(i,1);
                    this.setState({filters: filter});
                    i--;
                }
            }
        }
        document.querySelector("#search-text").value = "";
        await this.setState({isFilter: true});
        // this.filterBooks();
    }
    filterBooks = async() =>{
        this.setState({filteredBooks:[]});
        console.log(this.state.books.length, this.state.availableFilters.length);
        for(var i=0; i<this.state.books.length; i++){
            for(var j=0; j<this.state.availableFilters.length; j++){
                if(this.state.books[i].genure.includes(this.state.availableFilters[j])){
                    this.setState({filterBooks: [...this.state.filteredBooks,this.state.books[i]]})
                    
                    console.log(this.state.books[i].name, this.state.filteredBooks.length);
                    break;
                }
            }
        }
    }
    searchBooks = async() => {
        this.setState({filteredBooks:[]});
        if(this.state.searchOptionActive === 'Title'){
            for(var i=0; i<this.state.books.length; i++){
                if(this.state.books[i].name.includes(this.state.searchText)){
                    var filter = this.state.filteredBooks;
                    filter.push(this.state.books[i]);
                    await this.setState({filteredBooks: filter});
                    console.log(this.state.books[i].name, this.state.searchText);
                }
            }
        }
        else{
            for(var i=0; i<this.state.books.length; i++){
                if(this.state.books[i].author.includes(this.state.searchText)){
                    var filter = this.state.filteredBooks;
                    filter.push(this.state.books[i]);
                    await this.setState({filteredBooks: filter});
                    console.log(this.state.books[i].name, this.state.searchText);
                }
            }
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
                                Search by {this.state.searchOptionActive}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item 
                                    onClick={async() => {
                                        var temp = this.state.searchOption;
                                        await this.setState({searchOption: this.state.searchOptionActive});
                                        await this.setState({searchOptionActive: temp });
                                    }}
                                >Search by {this.state.searchOption} </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                            <input type='search' style={{height:'40px', marginTop:'20px', width:'100%'}} id="search-text"
                                onChange={async(event)=>{
                                    await this.setState({searchText: event.target.value});
                                    await this.setState({isFilter: false});
                                }}
                            ></input>
                            <h3 style={{marginTop:'20px'}}> Filter your Books </h3>
                            <input type='checkbox' name='fiction' value='all' id="check-all"
                                onClick={(event) => {
                                    if(event.target.checked){
                                        for(var i = 0; i<this.state.availableFilters.length; i++){
                                            document.querySelector("#check-"+this.state.availableFilters[i]).checked = false;
                                        }
                                    }
                                    else document.querySelector("#check-all").checked = true;
                                    this.setState({filters: ['all']});
                                    this.setState({filteredBooks: this.state.books});
                                    this.setState({isFilter: true});
                                    document.querySelector("#search-text").value = "";
                                }}
                            ></input>
                            <label for='all' style={{paddingLeft:'15px'}}> All</label> <br />

                            <input type='checkbox' name='fiction' value='Fiction' id="check-Fiction"
                                onClick={(event)=>{
                                    this.addFilter(event.target.value, event.target.checked);
                                }}
                            ></input>
                            <label for='fiction' style={{paddingLeft:'15px'}}> Fiction</label> <br />

                            <input type='checkbox' value='Mystry' id="check-Mystry"
                                onClick={(event)=>{
                                    this.addFilter(event.target.value, event.target.checked);
                                }}
                            ></input>
                            <label style={{paddingLeft:'15px'}}> Mystery</label><br />

                            <input type='checkbox' value='Thriller' id="check-Thriller"
                                onClick={(event)=>{
                                    this.addFilter(event.target.value, event.target.checked);
                                }}
                            ></input>
                            <label style={{paddingLeft:'15px'}}> Thriller</label><br />

                            <input type='checkbox' value='Horror' id="check-Horror"
                                onClick={(event)=>{
                                    this.addFilter(event.target.value, event.target.checked);
                                }}
                            >

                            </input>
                            <label style={{paddingLeft:'15px'}}> Horror</label><br />

                            <input type='checkbox' value='Historical' id="check-Historical"
                                onClick={(event)=>{
                                    this.addFilter(event.target.value, event.target.checked);
                                }}
                            >

                            </input>
                            <label style={{paddingLeft:'15px'}}> Historical</label><br />

                            <input type='checkbox' value='Romance' id="check-Romance"
                                onClick={(event)=>{
                                    this.addFilter(event.target.value, event.target.checked);
                                }}
                            >

                                </input>
                            <label style={{paddingLeft:'15px'}}> Romance</label><br />

                            <input type='checkbox' value='Western' id="check-Western"
                                onClick={(event)=>{
                                    this.addFilter(event.target.value, event.target.checked);
                                }}
                            >

                            </input>
                            <label style={{paddingLeft:'15px'}}> Western</label><br />

                            <input type='checkbox' value='Bildungsroman' id="check-Bildungsroman"
                                onClick={(event)=>{
                                    this.addFilter(event.target.value, event.target.checked);
                                }}
                            >

                            </input>
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