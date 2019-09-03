import React, { useEffect, useState } from 'react';
import User from '../User/User';
import './App.css';

const App = () => {
	const [ users, setUsers ] = useState([]);
	const [ currentUser, selectUser ] = useState(-1);

	useEffect(() => {//on first load - getting users data from  API
		fetch('https://simple-rest-weld.herokuapp.com/users').then((resp) => resp.json()).then((result) => {
			setUsers(result);
			console.log(result);
		});
	}, []);


	const changeName = (id, name) => {
		setUsers(users.map((item) => (item.id === id ? { ...item, name: name } : item)));
    //change user's name by id
		selectUser(-1);

		fetch(`https://simple-rest-weld.herokuapp.com/users/${id}`, {
			//sending request to API for name change
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name
			})
		});
	};

	const removeUser = (id) => {
		setUsers(users.filter((item) => item.id !== id)); //removing user by id

		selectUser(-1);
		fetch(`https://simple-rest-weld.herokuapp.com/users/${id}`, {
			//sending request to API for user delete
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});
	};

	return (
		<div className="App">
			<div className="user-list">
				{users.map((user) => {
					return (
						<User
							data={user}  //user data
							key={user.id}
							currentUser={currentUser}//pass 'current user ' do change edition mode on/off 
							selectUser={selectUser}  //callback for selecting user
							removeUser={removeUser}  //callback for removing user
							changeName={changeName} //callback  for changing name for selected user
						/>
					);
				})}
			</div>
		</div>
	);
};

export default App;
