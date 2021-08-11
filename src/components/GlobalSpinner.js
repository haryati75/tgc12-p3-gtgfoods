import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useGlobalSpinnerContext } from '../GlobalSpinnerContext';

export default function GlobalSpinner (props) {
    const isGlobalSpinnerOn = useGlobalSpinnerContext();
    return isGlobalSpinnerOn ? (
        <div className="global-spinner-overlay">
            <p><Spinner className="mx-3" animation="border" variant="success" />Loading...</p>
        </div>     
    ) : null
}
  