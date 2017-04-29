var FbApi = (() => {
	let todos = [];

	return {
		todoGetter : () => {
			return todos;
		},
		setTodos : (newArray) => {
			todos = newArray;
		},
		setSingleTodo: (newObject) => {
			todos.push(newObject);
		},
		setChecked: (itemId) => {
			const position = itemId.split("item")[1]; //["", 0] indexOf for number
			todos[position].isCompleted = !todos[position].isCompleted;
		}	
	};


})();