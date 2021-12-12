import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import { CandidateCounterContext } from '../CandidateCounterContext';

const TicketDetails = () => {
    const { id } = useParams();
    const [ticket, setTicket] = useState({});
    // const { updateCounts } = useContext(CandidateCounterContext);
    const [isLoading, setIsLoading] = useState(true);

    const { timestamp, issue, roomlocation, location, submittedBy, comments} = ticket;

    useEffect(() => {
        const getTicket = async () => {
            const { data } = await axios.get(`/api/ticket/getTicket?id=${id}`);
            setTicket(data);
            console.log(data);
            setIsLoading(false);
        }
        getTicket();
    }, []);

    // const onClick = e => {
    //     setCandidate({ ...candidate, status: e.target.name });
    // }

    // useEffect(() => {
    //     const updateTicket = async () => {
    //         await axios.post('/api/ticket/updateTicket', {id: ticket.id, issue: ticket.issue, roomLocation: ticket.roomLocation});
    //         // updateCounts();
    //     }
    //     updateTicket();
    // }, [ticket])

    return (
        <div className="row">
            <div className="col-md-6 offset-3">
                {isLoading && <h2>Loading...</h2>}
                {!isLoading && <div className="card card-body bg-light">
                    <p>Ticket #{id}</p>
                    <h4> {issue}</h4>
                    <h6><b>Timestamp:</b> {timestamp}</h6>
                    <h6><b>Location:</b>  {roomlocation}</h6>
                    <h6><b>Submitted By:</b>  PUT NAME HERE</h6>
                    <h6><b>Comments:</b> </h6>
                    <p>{comments}</p>
                    <button className="btn btn-primary">Mark as Complete</button>
                </div>}
            </div>
        </div>
    );
}

export default TicketDetails;
