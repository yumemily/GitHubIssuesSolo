import React, { useState, useEffect } from 'react'
import { useHistory, Link } from "react-router-dom";
import { Row, Col, Container, Card, ListGroup } from 'react-bootstrap'

import MySpinner from '../components/MySpinner'

export default function Results() {

    const history = useHistory()
    const [reps, setReps] = useState([])

    const getKeyword = async () => {
        let term = window.location.search.split("?q=")[1]

        if (!term) return history.push("/")
        const res = await fetch(`https://api.github.com/search/repositories?q=${term}&page=1`, {
            method: "GET",
            headers: {
                "Content-Type": "application/vnd.github.mercy-preview+json"
            }
        })
        const data = await res.json()
        setReps(reps.concat(data.items));
    }

    useEffect(() => {
        getKeyword()
    }, [])

    const htmlReps = reps.map((item) => {
        return (
            <div>
                <Card style={{ margin: '2rem' }}>
                    <Card.Body>
                        <Card.Title>
                            <i class="fa fa-address-card-o text-secondary" aria-hidden="true"></i>
                            {' '}
                            <Link to={`/${item.full_name}/issues`} >
                                {item.full_name}
                            </Link>
                        </Card.Title>
                        <Card.Text>
                            {item.description}
                        </Card.Text>
                        <Card.Subtitle>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            {' '}
                            {item.stargazers_count}
                        </Card.Subtitle>
                    </Card.Body>
                </Card>
            </div>
        )
    })

    console.log('reps', reps)

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <Card style={{ width: '18rem', marginTop: '2rem' }}>
                        <Card.Header>Featured</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                <Col md={9}>
                    {htmlReps}
                </Col>
            </Row>
        </Container>
    )
}
