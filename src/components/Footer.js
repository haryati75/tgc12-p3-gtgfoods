import React from 'react';

export default function Footer() {
    return (<React.Fragment>
        <div className="footer container-fluid mt-5">
            <div className="row">
                <div className="col col-2 col-md-3 ms-3 pl-2">
                    <img src="%PUBLIC_URL%/../../delivery-logo.png" style={{maxWidth:"100%"}} alt="Logo"/>
                </div>
                <div className="col col-8 col-md-7 p-3">
                    <h6>References: </h6>
                    <p className="text-listing">
                        https://perfectsnacks.com/ |
                        https://www.freshly.com/plans-and-menu |
                        https://www.hicjuice.com/
                    </p>
                    <hr></hr>
                    <h6>Website developed by: Haryati Hassan</h6>
                    <p className="text-listing">A school project under Trent Global College, Singapore. Use of the website is for educational purpose only.</p>
                </div>
            </div>
        </div>
    </React.Fragment>)

}