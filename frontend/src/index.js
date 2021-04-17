import 'semantic-ui-css/semantic.min.css'
import React from "react";
import ReactDOM from "react-dom";
import { Container} from "semantic-ui-react";
require('dotenv').config();

import PageRouter from "./pageRouter"

const App = ({ children }) => (
  <Container style={{ margin: 20 }}>


    {children}
  </Container>
);

ReactDOM.render(
  <App>
    <PageRouter />
  </App>,
  document.getElementById("root")
);
