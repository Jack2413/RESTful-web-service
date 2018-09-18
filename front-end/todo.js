$(document).ready(function(e) {
	var $select;
	var count = 0;
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
				if (taskName === "") { return false; }
				count++;
				var taskHTML = '<li><span class="done">%</span>';
				taskHTML += '<span class="edit">+</span>';
				taskHTML += '<span class="delete">x</span>';
				taskHTML += '<span class="task"></span></li>';

				var $newTask = $(taskHTML);

				$newTask.find('.task').text(count+'		'+taskName+'	'+user1);
				$newTask.hide();
				$('#todo-list').prepend($newTask);
				
				$newTask.show('clip',250).effect('highlight',1000);
				$(this).dialog('close');
				$('#task').val("");
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
				//alter($('#name').val());
				if (name === "") { return false; }
				var x = $select.find('.task').text();
				$select.find('.task').text(x.charAt(0)+'	'+name+'		'+user);

				$(this).dialog('close');
				$('#name').val("");
				$('#user').val("");

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
		cancel : '.delete,.done'
	});

	$('.sortlist').on('click','.delete',function() {
		$select = $(this).parent('li');		
		$("#confirm-dialog").dialog('open');

	});

}); // end ready
