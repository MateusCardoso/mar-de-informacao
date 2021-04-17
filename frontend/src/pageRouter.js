import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

  import NewPost from "./newPost"
  import Home from "./home"

export default function PageRouter(){
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/Create">
                        <NewPost />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}