var FbApi = ((oldCrap) => {

	oldCrap.getTodos = () => {
		let items = [];
		return new Promise ((resolve,reject) =>{
			$.ajax("./database/seed.json")
			.done((data) => {
				let response = data.items;
				Object.keys(response).forEach((key)=>{ //use for every Firebase app
					response[key].id = key;
					items.push(response[key]);
				});
				FbApi.setTodos(items);
				resolve();
			}) 
			.fail((error) => {
				reject(error);
			});
		});	
	};

	return oldCrap;
})(FbApi || {});