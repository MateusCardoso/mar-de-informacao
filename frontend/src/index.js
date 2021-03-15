import 'semantic-ui-css/semantic.min.css'
import React from "react";
import ReactDOM from "react-dom";
import { Container} from "semantic-ui-react";

import NewPost from "./newPost"

const App = ({ children }) => (
  <Container style={{ margin: 20 }}>


    {children}
  </Container>
);

ReactDOM.render(
  <App>
    <NewPost />
  </App>,
  document.getElementById("root")
);
