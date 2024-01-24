import Alpine from 'alpinejs';
import { v4 as uuid } from 'uuid';
window.Alpine = Alpine;

Alpine.store('tasks', {
	taskList: localStorage.getItem('taskList')
		? JSON.parse(localStorage.getItem('taskList'))
		: [
				{ title: 'test', body: 'test', status: 'done', id: uuid() },
				{ title: 'test', body: 'test', status: 'inProgress', id: uuid() },
		  ],

	getDoneTasks() {
		return this.taskList.filter((task) => task.status === 'done');
	},

	getInProgressTasks() {
		return this.taskList.filter((task) => task.status === 'inProgress');
	},

	createNewTask(title, body) {
		this.taskList.push({
			title,
			body,
			id: uuid(),
			status: 'inProgress',
		});
		this.saveToLocalStorage();
	},

	deleteTask(taskId) {
		this.taskList = this.taskList.filter((task) => task.id !== taskId);
		this.saveToLocalStorage();
	},

	toggleTaskStatus(id) {
		this.taskList = this.taskList.map((task) =>
			task.id === id
				? {
						...task,
						status: task.status === 'inProgress' ? 'done' : 'inProgress',
				  }
				: task
		);
		this.saveToLocalStorage();
	},

	updateTask(newTitle, newBody, id) {
		this.taskList = this.taskList.map((task) =>
			task.id === id
				? {
						...task,
						title: newTitle,
						body: newBody,
				  }
				: task
		);
		this.saveToLocalStorage();
	},

	saveToLocalStorage() {
		localStorage.setItem('taskList', JSON.stringify(this.taskList));
	},
});

Alpine.start();
