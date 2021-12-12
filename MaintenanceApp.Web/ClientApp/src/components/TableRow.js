import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

const TableRow = ({ ticket, onCompleteClick, onEditClick, editMode, onUpdateClick, onChange, ownsTicket}) => {
    const { id, issue, roomLocation, timestamp, comments, user} = ticket;
    const [editTicket, setEditTicket] = useState({});

    useEffect(() => {
        if(editMode){
            setEditTicket(ticket);
        }
    }, [editMode]);

    const onTextChange = e => {
        const ticketCopy = { ...editTicket };
        ticketCopy[e.target.name] = e.target.value;
        setEditTicket(ticketCopy);
        console.log(ticketCopy);
        console.log(ticket);
    }

    const onUpdateClickChild = async ticketToUpdate => {
        await axios.post('/api/ticket/UpdateTicket',  {id: ticketToUpdate.id, issue: ticketToUpdate.issue, roomLocation: ticketToUpdate.roomLocation});
        onUpdateClick(editTicket); 
    }
    
    return (
    <tr>
        <td>
            {!editMode && <button  onClick={onEditClick} disabled={!ownsTicket} className="btn btn-primary">Edit</button>}
            {editMode && <button onClick={() => onUpdateClickChild(editTicket)} className="btn btn-success">Update</button>}
        </td>
        <td>{moment(timestamp).format("MM/DD/YYYY")}</td>
             {!editMode && <td>{roomLocation}</td>}
             {editMode && <td><input type="text" className="form-control" name="roomLocation" value={editTicket.roomLocation} onChange={onTextChange} /></td>}
        
            {!editMode && <td>{issue}</td>}
            {editMode && <td><input type="text" className="form-control" name="issue" value={editTicket.issue} onChange={onTextChange} /></td>}
        <td>{user.location}</td>
        <td>{user.firstName} {user.lastName}</td>
        <td>
            <button onClick={onCompleteClick} disabled={!ownsTicket} className="btn btn-primary">Mark as Complete</button>
        </td>
    </tr> 
    );
}


export default TableRow;