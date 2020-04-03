import React from "react"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function UserCard(props) {
    return (
        <Card style={{ width: '12rem', height: '20rem', marginTop: '1rem', marginLeft: '1rem' }}>
            <Card.Img variant="top" src={props.pictureUrl} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Button variant="outline-primary" style={{position: "absolute", right: "0.5rem", bottom: "0.5rem"}}>Unfollow</Button>
            </Card.Body>
        </Card>
    )
}