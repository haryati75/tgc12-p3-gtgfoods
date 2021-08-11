import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

export default function About() {
    const history = useHistory();
    return (
        <React.Fragment>
            <Container>
                <Card className="text-center">
                    <Card.Header>
                        <h1>All about GreatToGo Foods!</h1>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>Cooking Healthy meals is hard. Eating Healthy is easy.</Card.Title>
                        <Card.Text>That is why we have made it our mission to help you eat healthy without the hassle that comes with marketing, cooking and clean up. Eating Healthy and making good choices for your family can be tough, and we are changing that!</Card.Text>
                        <Card.Subtitle>Coming Soon!</Card.Subtitle>
                        <Card.Text>We are going Healthy, the Asian way. Cuisines with the Healthy twists from Malaysia, Indonesia, Singapore, Thailand and many more will make its way to our Shop.</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Card.Text>What are you waiting for?</Card.Text>
                        <Button variant="success" onClick={()=>history.push('/products')}>Click here to our e-Shop!</Button>
                    </Card.Footer>
                    <Card.Img variant="bottom" src="http://res.cloudinary.com/dtclgbvoy/image/upload/v1628433473/nyjrf8sfci6tzov4mykj.png" />
                </Card>
            </Container>
            
        </React.Fragment>
    )
}