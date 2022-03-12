import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
  } from "react-router-dom";

import Library from './Components/Library';
import NavBar from "./Components/NavBar";
import Book from './Components/Book';
import Authentication from './Components/Authentication';

function App() {
    const getBoodId = ({match}) => {
        var dataSend = {id:match.params.bookId};
        var book;
        
        return(
            <>
                
                <Book bookId={match.params.bookId} />
            
            </>

        )
    }
    return (
        <>
            <NavBar />
            <BrowserRouter>
            <Switch>
                <Route
                    exact path="/library"
                    component={() => {
                        return <Library />;
                    }}
                />
                <Route
                    exact path="/"
                    component={() => {
                        return <Authentication />;
                    }}
                />
                <Route 
                    exact path="/library/:bookId">
                    {getBoodId}
                </Route>
            </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
