import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

  import NewPost from "./newPost"

export default function PageRouter(){
    return (
        <Router>
            <div>
                <nav>
                <ul>
                    <li>
                    <Link to="/Create">Create</Link>
                    </li>
                </ul>
                </nav>

                <Switch>
                <Route path="/Create">
                    <NewPost />
                </Route>
                </Switch>
            </div>
        </Router>
    );
}