import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
  } from "react-router-dom";

import Explore from './Components/Explore';
import NavBar from "./Components/NavBar";
import Book from './Components/Book';

function App() {
    const getBoodId = ({match}) => {
        return(
            <>
                <Book productId={match.params.productId} />
            
            </>

        )
    }
    return (
        <>
            <NavBar />
            <BrowserRouter>
            <Switch>
                <Route
                    exact path="/explore"
                    component={() => {
                        return <Explore />;
                    }}
                />
                <Route
                    exact path="/"
                    component={() => {
                        return <Explore />;
                    }}
                />
                <Route path="/explore/:productId">
                    {getBoodId}
                </Route>
            </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
