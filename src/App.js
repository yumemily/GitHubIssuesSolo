import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom'

import './App.css';

import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'

import HomePage from './pages/HomePage'
import IssuesPage from './pages/IssuesPage'
import AddNewIssue from './pages/AddNewIssue'
import Results from './pages/Results'
import SingleIssue from './pages/SingleIssue'

const clientId = process.env.REACT_APP_CLIENT_ID;

function App() {
  const history = useHistory()
  const [token, setToken] = useState(null);
  // const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    const existingToken = localStorage.getItem("token");
    console.log("object", window.location);
    const accessToken =
      window.location.search.split("=")[0] === "?access_token"
        ? window.location.search.split("=")[1].split("&")[0]
        : null; // you already cut the &scope here so..

    if (!accessToken && !existingToken) {
      console.log(
        `https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`
      );
      window.location.replace(
        `https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`
      );
    }

    if (accessToken) {

        localStorage.setItem("token", accessToken)
        setToken(accessToken)
        console.log("my access token is:",accessToken)
      
    }

    if (existingToken) {
      console.log("there")
      setToken(existingToken);
    }
  }, []);

  const search = async (e,search, page) => {
    e.preventDefault()
    history.push("/search?q="+search)
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">Em's GitHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Form inline
            onChange={e => {
              setKeyword(e.target.value);
            }}
            onSubmit={e => {
              search(e, keyword, 1);
            }}
          >
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            >
            <Button variant="outline-success"  type="submit">
            Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route path="/search" render={()=><Results />} />
        <Route path ='/:owner/:repo/issues/addnewissue' exact render={()=><AddNewIssue token={token}/>}/>
        <Route path ='/:owner/:repo/issues/:id' render={()=><SingleIssue token={token}/>}/>
        <Route path="/:owner/:repo/issues" render={()=><IssuesPage />} />
        <Route path='/' exact ><HomePage/></Route>
      </Switch>
    </div>
  );
}

export default App;
