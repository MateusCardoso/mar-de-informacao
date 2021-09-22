import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

  import NewPost from "./newPost"
  import DisplayPost from "./displayPost"
  import Home from "./home"
  import SearchPost from "./searchPost";
  import EditPost from "./editPost";

export default function PageRouter(){
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/Create">
                        <NewPost />
                    </Route>
                    <Route path="/Edit/:postId">
                        <EditPost />
                    </Route>
                    <Route path="/Display/:postId">
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