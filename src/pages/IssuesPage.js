import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Col, Row, Button } from "react-bootstrap/";
import moment from "moment";
import Label from "../components/Label";
import { Link, useParams } from 'react-router-dom'


const ReactMarkdown = require('react-markdown')

export default function IssuesPage(props) {
    const [issues, setIssues] = useState([])
    const { owner, repo } = useParams()

    const fetchIssues = async () => {
        const url = `https://api.github.com/repos/${owner}/${repo}/issues?page=1&per_page=20`
        const response = await fetch(url);
        const data = await response.json();
        console.log("data", data);
        setIssues(data);
    }

    useEffect(() => {
        fetchIssues();
    }, [])

    const renderIssues = () => {
        return issues.map(item => (
            <Card className="border-left-0 !important, border-right-0 pt-3 pb-3">
                <Row>
                    <Col sm={10}>
                        <Card.Title
                            key={item.number}
                        >
                            {" "}
                            {/* <span style={{ fontWeight: "bolder", paddingRight: 5 }}>#{item.number}</span>
                            {item.title} */}
                            <Link to={`/${owner}/${repo}/issues/${item.number}`}> #{item.number} {item.title}</Link>
                            <Label labels={item.labels} />
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                            <span style={{ fontStyle: "italic" }}>
                                Opened{" "}
                                {moment(item.created_at)
                                    .startOf("day")
                                    .fromNow()}
                            </span>
                            {' '}by{' '}
                            <span style={{ fontWeight: "bold", color: "black" }}>
                                @{item.user.login}
                            </span>
                        </Card.Subtitle>
                        {/* <Card.Text><ReactMarkdown source={item && item.body} /></Card.Text> */}
                    </Col>
                    <Col sm={2}>
                        <Card.Text>
                            <img
                                style={{ width: 100, borderRadius: 100 }}
                                src={`${item.user.avatar_url}`}
                            />
                        </Card.Text>
                    </Col>
                </Row>
            </Card>
        ))
    }


    return (
        <div>
            <div id="grad" class="jumbotron jumbotron-fluid">
                <div class="container text-center">
                    <h3>Learn Git and Github without any code!</h3>
                    <p class="lead">
                        Using the Hello World guide, you'll start a branch, write comments,
                        and open a pull request.
                    </p>
                    <a href="https://guides.github.com/activities/hello-world/">
                        <Button variant="success">Read the guide </Button>
                    </a>
                </div>
            </div>
            <div className="container">
                <Card className="p3 mb-3">
                    <Card.Body
                        style={{ paddingLeft: 5 + "rem", paddingRight: 5 + "rem" }}
                        className="text-center"
                    >
                        <h5 style={{ fontWeight: "bold" }}>
                            {" "}
                            👋Want to contribute to {owner}/{repo} ?
                        </h5>
                        <p>
                            If you have a bug or an idea, read the contributing guidelines
              before opening an issue.<br></br>
                            If you're ready to tackle some open issues, we've collected some
                            good first issues for you.
                         </p>
                    </Card.Body>
                </Card>
                <Link to={`/${owner}/${repo}/issues/addnewissue`}>Add New Issue</Link>

                {renderIssues()}
            </div>
        </div>
    )
}
