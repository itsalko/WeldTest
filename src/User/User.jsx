import React, { useEffect, useState, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import './User.css';

const User = ({ data, currentUser, selectUser,changeName,removeUser }) => {
    const [name,setName]=useState(data.name);
	return (
		<div className="user-item">
			{currentUser !== data.id ? (
				<Fragment>
					<span>{data.name}</span>
					<FontAwesomeIcon
						icon={faEdit}
						className="btn"
						onClick={() => {
							selectUser(data.id);
						}}
					/>
					<FontAwesomeIcon icon={faTrash} className="btn" onClick={() => {
							removeUser(data.id);
						}} />
				</Fragment>
			) : (
				<Fragment>
					<input type="text" defaultValue={data.name} onChange={ e => setName( e.target.value ) }/> 
                    <FontAwesomeIcon icon={faCheck} className="btn" onClick={()=>{changeName(data.id,name)}}/>
				</Fragment>
			)}
		</div>
	);
};

export default User;
