import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableRow from '../components/TableRow';
import { useAuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';
import { CaretDownFill, CaretUpFill } from 'react-bootstrap-icons';
import AddTicket from '../components/AddTicket';

const AllTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editTickets, setEditTickets] = useState([]);
    const [currentEditTicket, setCurrentEditTicket] = useState({})
    const { user } = useAuthContext();
    const [sortOrderDate, setSortOrderDate] = useState(false)
    const [sortOrderRoomLocation, setSortOrderRoomLocation] = useState(false)
    const [sortOrderIssue, setSortOrderIssue] = useState(false)
    const [sortOrderBuildingLocation, setSortOrderBuildingLocation] = useState(false)
    const [sortOrderSubmittedBy, setSortOrderSubmittedBy] = useState(false)
    const [sortOrderComments, setSortOrderComments] = useState(false)

    useEffect(() => {
        getTickets();
    }, []);

    const getTickets = async () => {
        const { data } = await axios.get(`/api/ticket/getTicketsForLocation?completedStatus=false`);
        setTickets(data);
        setIsLoading(false);
    }

    const onCompleteClick = async ticket => {
        await axios.post('/api/ticket/markAsComplete', ticket);
        getTickets();
    }

    const onEditClick = ticket => {
        setEditTickets([...editTickets, ticket]);
    }

    const onUpdateClick = ticket => {
        setEditTickets(editTickets.filter(t => t.id !== ticket.id));
        getTickets();
    }

    const sortByDate = () => {
        !!sortOrderDate ? tickets.sort(function (a, b) { return new Date(b.timestamp) - new Date(a.timestamp); }) : tickets.sort(function (a, b) { return new Date(a.timestamp) - new Date(b.timestamp); })
        !!sortOrderDate ? setSortOrderDate(false) : setSortOrderDate(true);
    }

    const sortByRoomLocation = () => {
        !!sortOrderRoomLocation ? tickets.sort((a, b) => (a.roomLocation < b.roomLocation) ? 1 : -1) : tickets.sort((a, b) => (a.roomLocation > b.roomLocation) ? 1 : -1)
        !!sortOrderRoomLocation ? setSortOrderRoomLocation(false) : setSortOrderRoomLocation(true);
    }

    const sortByIssue = () => {
        !!sortOrderIssue ? tickets.sort((a, b) => (a.issue.toLowerCase() < b.issue.toLowerCase()) ? 1 : -1) : tickets.sort((a, b) => (a.issue.toLowerCase() > b.issue.toLowerCase()) ? 1 : -1)
        !!sortOrderIssue ? setSortOrderIssue(false) : setSortOrderIssue(true);
    }

    const sortByBuilding = () => {
        !!sortOrderIssue ? tickets.sort((a, b) => (a.location.toLowerCase() < b.location.toLowerCase()) ? 1 : -1) : tickets.sort((a, b) => (a.location.toLowerCase() > b.location.toLowerCase()) ? 1 : -1)
        !!sortOrderIssue ? setSortOrderBuildingLocation(false) : setSortOrderBuildingLocation(true);
    }

    const sortBySubmittedBy = () => {
        !!sortOrderSubmittedBy ? tickets.sort((a, b) => (a.user.firstName.toLowerCase() < b.user.firstName.toLowerCase()) ? 1 : -1) :
            tickets.sort((a, b) => (a.user.firstName.toLowerCase() > b.user.firstName.toLowerCase()) ? 1 : -1)
        !!sortOrderSubmittedBy ? setSortOrderSubmittedBy(false) : setSortOrderSubmittedBy(true);
    }

    const sortByComments = () => {
        !!sortOrderComments ? tickets.sort((a, b) => (a.comments.toLowerCase() < b.comments.toLowerCase()) ? 1 : -1) : tickets.sort((a, b) => (a.comments.toLowerCase() > b.comments.toLowerCase()) ? 1 : -1)
        !!sortOrderComments ? setSortOrderComments(false) : setSortOrderComments(true);
    }

    return (
        <>
            <div>
                {!user && <h1>Please <Link to={'/login'}> log in</Link> to view outstanding tickets</h1>}
                {!!user && <>
                    <AddTicket getNewTickets={() => getTickets()} />
                    <table className="table table-striped table-bordered table-hover" >
                        <thead  >
                            <tr>
                                <th>Edit</th>
                                <th>Timestamp {!sortOrderDate && <CaretDownFill onClick={sortByDate} />}
                                    {!!sortOrderDate && <CaretUpFill onClick={sortByDate} />}
                                </th>
                                <th>Room Number/Location {!sortOrderRoomLocation && <CaretDownFill onClick={sortByRoomLocation} />}
                                    {!!sortOrderRoomLocation && <CaretUpFill onClick={sortByRoomLocation} />}
                                </th>
                                <th>Issue {!sortOrderIssue && <CaretDownFill onClick={sortByIssue} />}
                                    {!!sortOrderIssue && <CaretUpFill onClick={sortByIssue} />}
                                </th>
                                <th>Building {!sortOrderBuildingLocation && <CaretDownFill onClick={sortByBuilding} />}
                                    {!!sortOrderBuildingLocation && <CaretUpFill onClick={sortByBuilding} />}
                                </th>
                                <th>Submitted By {!sortOrderSubmittedBy && <CaretDownFill onClick={sortBySubmittedBy} />}
                                    {!!sortOrderSubmittedBy && <CaretUpFill onClick={sortBySubmittedBy} />}
                                </th>
                                <th>Mark as Complete</th>
                            </tr>
                        </thead>
                        {!isLoading &&
                            <tbody>
                                {
                                    (!!tickets.length && !!user) && tickets.map(ticket => <TableRow
                                        ticket={ticket}
                                        key={ticket.id}
                                        onCompleteClick={() => onCompleteClick(ticket)}
                                        onEditClick={() => onEditClick(ticket)}
                                        onUpdateClick={onUpdateClick}
                                        editMode={editTickets.find(t => t.id === ticket.id)}
                                        ownsTicket={ticket.user.id === user.id}
                                    />)
                                }
                            </tbody>
                        }

                    </table>
                </>
                }
            </div>
        </>
    );
}

export default AllTickets;