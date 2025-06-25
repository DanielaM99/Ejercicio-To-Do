document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const pendingCountSpan = document.getElementById('pendingCount');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updatePendingCount();
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('task-item');
            if (task.completed) {
                listItem.classList.add('completed');
            }

            listItem.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div>
                    <button class="complete-btn" data-index="${index}">${task.completed ? '✅' : '✔️'}</button>
                    <button class="delete-btn" data-index="${index}">❌</button>
                </div>
            `;
            taskList.appendChild(listItem);
        });
        updatePendingCount();
    };

    // Function to update the pending task counter
    const updatePendingCount = () => {
        const pendingTasks = tasks.filter(task => !task.completed).length;
        pendingCountSpan.textContent = pendingTasks;
    };

    // Function to add a new task
    const addTask = () => {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please, write an assignment');
            return;
        }

        tasks.push({ text: taskText, completed: false });
        taskInput.value = ''; 
        saveTasks();
        renderTasks();
    };

    addTaskBtn.addEventListener('click', addTask);

    // Allows you to add tasks by pressing Enter
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    taskList.addEventListener('click', (e) => {
        const target = e.target;

        // Mark task as completed or incomplete
        if (target.classList.contains('complete-btn')) {
            const index = parseInt(target.dataset.index);
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        }

        // Delete task
        if (target.classList.contains('delete-btn')) {
            const index = parseInt(target.dataset.index);
            tasks.splice(index, 1); 
            saveTasks();
            renderTasks();
        }
    });

    // Renders initial tasks on page load
    renderTasks();
});

