document.addEventListener("DOMContentLoaded", () => {
    const todoForm = document.getElementById("todoForm");
    const todoInput = document.getElementById("todo");
    const dateInput = document.getElementById("dateInput");
    const todoList = document.getElementById("todoList");
    const filterSelect = document.getElementById("filterSelect");

    let todos = [];

    // Render List
    function renderTodos(filter = "all") {
        todoList.innerHTML = "";

        const today = new Date().toISOString().split("T")[0];
        let filteredTodos = todos;

        if (filter === "today") {
            filteredTodos = todos.filter(todo => todo.date === today);
        } else if (filter === "upcoming") {
            filteredTodos = todos.filter(todo => todo.date > today);
        }

        if (filteredTodos.length === 0) {
            todoList.innerHTML = `<li class="text-gray-500 text-center">No tasks found</li>`;
            return;
        }

        filteredTodos.forEach((todo, index) => {
            const li = document.createElement("li");
            li.className = "flex justify-between items-center border p-3 rounded";

            li.innerHTML = `
            <div>
                <p class="font-medium">${todo.text}</p>
                <p class="text-sm text-gray-500">${todo.date}</p>
                <span class="text-xs font-semibold px-2 py-1 rounded ${todo.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }">
                    ${todo.status}
                </span>
            </div>
            <div class="flex space-x-2">
                <button onclick="toggleStatus(${index})" class="p-2 rounded-full bg-green-100 hover:bg-green-200">
                    <!-- Icon Check -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M5 13l4 4L19 7" />
                    </svg>
                </button>
                <button onclick="deleteTodo(${index})" class="p-2 text-red-400 rounded-full bg-red-100 hover:bg-red-200">
                    <!-- Icon Trash -->
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>

                </button>
            </div>
        `;
            todoList.appendChild(li);
        });
    }


    // Add Todo
    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const text = todoInput.value.trim();
        const date = dateInput.value;

        if (!text) {
            alert("Please enter a task!");
            return;
        }
        if (!date) {
            alert("Please select a date!");
            return;
        }

        todos.push({ text, date, status: "Pending" });
        todoInput.value = "";
        dateInput.value = "";
        renderTodos(filterSelect.value);
    });

    // Filter
    filterSelect.addEventListener("change", () => {
        renderTodos(filterSelect.value);
    });

    // Delete Todo
    window.deleteTodo = (index) => {
        todos.splice(index, 1);
        renderTodos(filterSelect.value);
    };

    // Toggle Status
    window.toggleStatus = (index) => {
        todos[index].status = todos[index].status === "Completed" ? "Pending" : "Completed";
        renderTodos(filterSelect.value);
    };

    renderTodos();
});
