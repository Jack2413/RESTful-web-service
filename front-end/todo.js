$(document).ready(function(e) {
	var $select;
	var count = 0;
	reload();
	$('#add-todo').button({
		icons: { primary: "ui-icon-circle-plus" }}).click(
		function() {
			$('#new-todo').dialog('open');
		});
	$('#new-todo').dialog( {
		modal : true , autoOpen : false ,
		buttons : {
			"Add task" : function () { 
				var taskName = $('#task').val();
				var user1 = $('#user1').val();
				$('#task').val("");
				$('#user1').val("");
				if (taskName === "") { return false; }
				count++;

				$.Ajax({
						method: 'POST',
						url: 'https://nwen304project2.herokuapp.com/post', 
						data: JSON.stringify({

							task: taskName,
							task_name : user1,
							state : todo

						}),
						classontentType: "application/json",
						dataType: "json" 
					}).then(createToDo, ERROR_LOG);	
					$(this).dialog('close');
			},
			"Cancel" : function () { $(this).dialog('close'); }
		}
	});

	$('#add-edit').button({
		icons: { primary: "ui-icon-circle-plus" }}).click(
		function() {
			$('#edit-todo').dialog('open');
		});

	$('#edit-todo').dialog( {
		modal : true, autoOpen: false,
		buttons : {
			"Confirm" : function(){
				var name = $('#name').val();
				var user = $('#user').val();
				$('#name').val("");
				$('#user').val("");
				//alter($('#name').val());
				if (name === "") { return false; }

				$.Ajax({
						method: 'PUT',
						url: 'https://nwen304project2.herokuapp.com/put', 
						data: JSON.stringify({

							previous_index: $select.find('.count').text(),
							new_taskName: name,
							new_taskUser: user
						}),
						classontentType: "application/json",
						dataType: "json" 
					}).then(my_next_function, ERROR_LOG);

				var x = $select.find('.task').text();
				$select.find('.tasks').text(name+' ');
				$select.find('.users').text(user);

				$(this).dialog('close');
				

			},
			"Cancel" : function(){
				$(this).dialog('close');
			}
		}
	});

	$('#confirm-dialog').dialog( {
		modal : true, autoOpen: false,
		buttons : {
			"Confirm" : function(){
				$.Ajax({
						method: 'DELETE',
						url: 'https://nwen304project2.herokuapp.com/delete', 
						data: JSON.stringify({
							task: $select.find('.task').text() 
						}),
						classontentType: "application/json",
						dataType: "json" 
					}).then(my_next_function, ERROR_LOG);

				$select.effect('puff', function() { $(this).remove(); });
				$(this).dialog('close');

			},
			"Cancel" : function(){
				$(this).dialog('close');
			}
		}
	});

	$('#todo-list').on('click', '.done', function() {
		var $taskItem = $(this).parent('li');
		$.Ajax({
			method: 'PUT',
			url: 'https://nwen304project2.herokuapp.com/put', 
			data: JSON.stringify({
				task: task.find('.task').test(),
				state: completed 
			}),
			classontentType: "application/json",
			dataType: "json" 
		}).then(my_next_function, ERROR_LOG);

		$taskItem.slideUp(250, function() {
			var $this = $(this);
			$this.detach();

			$('#completed-list').prepend($this);
			$this.slideDown();
		});
	});

	$('#todo-list').on('click', '.edit', function() {
		$select = $(this).parent('li');	
		$('#edit-todo').dialog('open');
	});



	$('.sortlist').sortable({
		connectWith : '.sortlist',
		cursor : 'pointer',
		placeholder : 'ui-state-highlight',
		cancel : '.delete,.done',

	});

	$('.sortlist').on('click','.delete',function() {
		$select = $(this).parent('li');		
		$("#confirm-dialog").dialog('open');

	});

	function reload() {
	$.Ajax({
		method: 'GET',
		url: 'https://nwen304project2.herokuapp.com/get', 
			
	}).then(reloadTasks, ERROR_LOG);
	}

	function reloadTasks(tasks){
		tasks.forEach(function(tasks){
			var taskHTML = '<li><span class="done">%</span>';
			taskHTML += '<span class="edit">+</span>';
			taskHTML += '<span class="delete">x</span>';
			taskHTML += '<span class="count"></span>';
			taskHTML += '<span class="tasks"></span>';
			taskHTML += '<span class="users"></span></li>';

			var $newTask = $(taskHTML);

			$newTask.find('.count').text(id+' ');
			$newTask.find('.tasks').text(taskName+' ');
			$newTask.find('.users').text(user);
			$newTask.hide();
			
			if (tasks.state == 'todo') {
				$('#todo-list').prepend($newTask);
			}else{
				$('#completed-list').prepend($newTask);
			}
		}
	}
}); // end ready
