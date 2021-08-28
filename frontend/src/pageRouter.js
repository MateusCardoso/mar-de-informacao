import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

  import NewPost from "./newPost"
  import DisplayPost from "./displayPost"
  import Home from "./home"
  import SearchPost from "./searchPost";

export default function PageRouter(){
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/Create">
                        <NewPost />
                    </Route>
                    <Route path="/Display">
                        <DisplayPost />
                    </Route>
                    <Route path="/Search">
                        <SearchPost />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}