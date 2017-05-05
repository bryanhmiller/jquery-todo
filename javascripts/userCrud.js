var FbApi = ((dogs) => {

	dogs.addUser = (keys, newUser) => {
		return new Promise((resolve, reject) => {
			$.ajax({
				method : "POST",
				url : `${keys.databaseURL}/users.json`,
				data : JSON.stringify(newUser)
			}).done((response) => {
				resolve(response);
			}).fail((error) => {
				reject(error);
			});
		});
	};

	dogs.getUser = (keys, uid) => {
		let users = [];
		return new Promise((resolve, reject) => {
			$.ajax({
				method: "GET",
				url : `${keys.databaseURL}/users.json?orderBy="uid"&equalTo="${uid}"`
			}).done((response) => {
				console.log("user iife get", response);
				Object.keys(response).forEach((key)=>{ //use for every Firebase app
					response[key].id = key;
					users.push(response[key]);
				});
				resolve(users[0]);
			}).fail((error) => {
				reject(error);
			});
		});
	};

	return dogs;
})(FbApi || {});