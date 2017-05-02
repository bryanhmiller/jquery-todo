var FbApi = ((oldCrap) => {

	oldCrap.getTodos = (apiKeys) => {
		let items = [];
		return new Promise ((resolve,reject) =>{
			$.ajax(`${apiKeys.databaseURL}/items.json`)
			.done((data) => {
				let response = data;
				Object.keys(response).forEach((key)=>{ //use for every Firebase app
					response[key].id = key;
					items.push(response[key]);
				});
				resolve(items);
			}) 
			.fail((error) => {
				reject(error);
			});
		});	
	};

	oldCrap.addTodo = (apiKeys, id) => {
		return new Promise ((resolve, reject) => {
			newTodo.id = `item${FbApi.todoGetter().length}`;
			console.log("newTodo", newTodo);
			FbApi.setSingleTodo(newTodo);
			resolve();
		});
	};

	oldCrap.checker = (apiKeys, id) => {
		return new Promise((resolve, reject) => {
			FbApi.setChecked(id);
			resolve();
		});
	};

	oldCrap.deleteTodo = (apiKeys, id) => {
		return new Promise ((resolve, reject) => {
			$.ajax({
				method : "DELETE",
				url : `${apiKeys.databaseURL}/items/${id}.json`
			}).done(() => {
				resolve();
			}).fail((error) => {
				reject(error);
			});

		});
	};

	oldCrap.editTodo = (apiKeys, id) => {
		return new Promise ((resolve, reject) => {
			FbApi.duhlete(id);
			resolve();
		});
	};

	return oldCrap;
})(FbApi || {});