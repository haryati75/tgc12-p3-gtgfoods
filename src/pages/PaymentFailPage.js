import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

export default function PaymentFailPage() {
    const history = useHistory();

    return (
        <React.Fragment>
            <Container>
                <h1>Stripe Payment has been cancelled. </h1>
                <Button variant="secondary" onClick={() => history.push('/profile')} >My Profile</Button>{' '}
                <Button variant="secondary" onClick={() => history.push('/')} >Continue Shopping</Button>                
            </Container>
        </React.Fragment>
    )
}