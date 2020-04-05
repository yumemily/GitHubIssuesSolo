import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import moment from 'moment'
import { Card, Nav, Button, Media, Form } from "react-bootstrap/";

export default function SingleIssue(props) {
    const { owner, repo, id } = useParams();
    const [singleIssue, setSingleIssue] = useState([])
    const [comments, setComments] = useState([])
    const [userInfo, setUserInfo] = useState([])
    const [newComment, setNewComment] = useState('')

    const ReactMarkdown = require('react-markdown')

    const fetchSingleIssue = async () => {
        const res = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/issues/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/vnd.github.mercy-preview+json",
                    Accept: "application/vnd.github.squirrel-girl-preview"
                }
            }
        );
        const data = await res.json();
        console.log("single issue", data);
        setSingleIssue(data);
        setUserInfo(data.user)

        if (data.comments > 0) {
            const resComment = await fetch(
                `https://api.github.com/repos/${owner}/${repo}/issues/${id}/comments`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/vnd.github.mercy-preview+json",
                        Accept: "application/vnd.github.squirrel-girl-preview"
                    }
                }
            );
            const dataComment = await resComment.json();
            console.log("display comments", dataComment);
            setComments(dataComment);
        }
    };

    const submitNewComment = async (content) => {
        const newComment = { "body": content };
        const url = `https://api.github.com/repos/${owner}/${repo}/issues/${id}/comments`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `token ${props.token}`
            },
            body: JSON.stringify(newComment)
        });
    }

    useEffect(() => {
        fetchSingleIssue();
    }, [])

    const htmlComments = comments.map((item) => {
        return (
            <Media className='border-top p-3'>
                <img
                    width={64}
                    height={64}
                    className="mr-3"
                    src={item.user.avatar_url}
                    alt="Generic placeholder"
                />
                <Media.Body>
                    <h5>
                        <span style={{ fontStyle: "italic" }}>
                            {item.user.login} commented{" "}
                            {moment(item.created_at)
                                .startOf("day")
                                .fromNow()}
                        </span>
                    </h5>
                    <p>
                        <ReactMarkdown source={item && item.body} />
                    </p>
                </Media.Body>
            </Media>
        )
    })

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
                <div className='container'>
                    <Link to={`/${owner}/${repo}/issues`}>{owner}/{repo}</Link>
                    <h3>{singleIssue.title} <span style={{ color: 'grey' }}>#{singleIssue.number}</span></h3>
                    <h5>{userInfo.login} created this issue{' '}
                        {moment(singleIssue.created_at)
                            .startOf("day")
                            .fromNow()}
                    </h5>
                    <Media className='border-top p-3'>
                        <img
                            width={64}
                            height={64}
                            className="mr-3"
                            src={userInfo.avatar_url}
                            alt="Generic placeholder"
                        />
                        <Media.Body>
                            <h5>
                                <span style={{ fontStyle: "italic" }}>
                                    {userInfo.login} commented{" "}
                                    {moment(singleIssue.created_at)
                                        .startOf("day")
                                        .fromNow()}
                                </span>
                            </h5>
                            <p>
                                <ReactMarkdown source={singleIssue && singleIssue.body} />
                            </p>
                        </Media.Body>
                    </Media>
                    <div>{htmlComments}</div>
                    <Card className='mb-3'>
                        <Card.Header>
                            <Nav variant="tabs" defaultActiveKey="#first">
                                <Nav.Item>
                                    <Nav.Link href="#first">Write</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="#disabled" disabled>
                                        Preview
        </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Card.Header>
                        <Card.Body>
                            <Form.Label>Leave a comment</Form.Label>
                            <Form.Control as="textarea" rows="3" onChange={e => setNewComment(e.target.value)} />
                            <Button onClick={() => submitNewComment(newComment)} className='mt-3' variant="primary">submit</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
}

