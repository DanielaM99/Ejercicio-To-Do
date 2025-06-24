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

    // Función para actualizar el contador de tareas pendientes
    const updatePendingCount = () => {
        const pendingTasks = tasks.filter(task => !task.completed).length;
        pendingCountSpan.textContent = pendingTasks;
    };

    // Función para agregar una nueva tarea
    const addTask = () => {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('¡Por favor, escribe una tarea antes de agregarla!');
            return;
        }

        tasks.push({ text: taskText, completed: false });
        taskInput.value = ''; 
        saveTasks();
        renderTasks();
    };

    addTaskBtn.addEventListener('click', addTask);

    // Permite agregar tareas presionando Enter
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    taskList.addEventListener('click', (e) => {
        const target = e.target;

        // Marca tarea como completada o incompleta
        if (target.classList.contains('complete-btn')) {
            const index = parseInt(target.dataset.index);
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        }

        // Elimina tarea
        if (target.classList.contains('delete-btn')) {
            const index = parseInt(target.dataset.index);
            tasks.splice(index, 1); 
            saveTasks();
            renderTasks();
        }
    });

    // Renderiza las tareas iniciales al cargar la página
    renderTasks();
});