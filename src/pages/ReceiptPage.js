import React from 'react';
import { useParams } from "react-router-dom";

export default function ReceiptPage() {
    const { sessionId } = useParams();
    return (
        <React.Fragment>
            <h1>Receipt Page - Payment Successful - sessionId: {sessionId}</h1>
            {/* Render Order Details here */}
        </React.Fragment>
    )
}