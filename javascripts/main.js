$(document).ready(() => {
	let apiKeys;

	$("#new-item").click(()=>{
		$(".list-container").addClass("hide");
		$(".new-container").removeClass("hide");
	});

	$("#list-items").click(()=>{
		$(".new-container").addClass("hide");
		$(".list-container").removeClass("hide");
	});

	FbApi.firebaseCredentials().then((keys) => {
		apiKeys = keys;
		firebase.initializeApp(apiKeys);
		FbApi.writeDom(apiKeys);
		countTask();	
	}).catch((error) => {
		console.log("keys error", error);
	});

// add todo
	$("#add-todo-button").click(() => {
		let newTodo = {
			isCompleted: false,
			task: $("#add-todo-text").val()
		};

		FbApi.addTodo(newTodo).then(() => {
			$("#add-todo-text").val("");
			$(".new-container").addClass("hide");
			$(".list-container").removeClass("hide");
			FbApi.writeDom(apiKeys);
			countTask();
		}).catch((error) => {
			console.log("addTodo error", error);
		});

	});

// delete todo
	$(".main-container").on("click", ".delete", (event) => {
		FbApi.deleteTodo(apiKeys, event.target.id).then(() => {
			FbApi.writeDom(apiKeys);
			countTask();
		}).catch((error) => {
			console.log("error in deleteTodo", error);
		});
	}); 




// edit todo
	$(".main-container").on("click", ".edit", (event) => {
		let editText = $(event.target).closest(".col-xs-4").siblings(".col-xs-8").find(".task").html();
		FbApi.editTodo(event.target.id).then(() => {
			$(".list-container").addClass("hide");
			$(".new-container").removeClass("hide");
			$("#add-todo-text").val(editText);
		}).catch((error) => {
			console.log("editTodo error", error);
		});
	});








// complete todos
	$(".main-container").on("click", "input[type='checkbox']", (event) => {
		console.log("id", event.target.id);
		FbApi.checker(event.target.id).then(() => {
			FbApi.writeDom(apiKeys);
			countTask();
		}).catch((error) => {
			console.log("checker error", error);
		});
	});



 	let countTask = () => {
 		let remainingTasks = $("#incomplete-tasks li").length;
 		$("#counter").hide().fadeIn(300).html(remainingTasks);
 	};

});