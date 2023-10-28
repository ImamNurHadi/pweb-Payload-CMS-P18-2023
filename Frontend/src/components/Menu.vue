<template>
    <div class="container mx-auto p-4 text-white">
        <div class="bg-gray-700 p-4 rounded-lg shadow-lg mb-4">
            <h1 class="text-3xl font-bold mb-4">Our To-do List</h1>
            <div>
                <button @click="showAddTaskForm = true"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md">Add Task</button>
            </div>
        </div>

        <div v-if="showAddTaskForm" class="bg-gray-700 p-4 rounded-lg shadow-lg mb-4">
            <form @submit.prevent="addOrUpdateTask" class="custom-form">
                <div class="mb-4">
                    <label for="TaskName" class="block text-sm font-medium">Task Name</label>
                    <input v-model="newTask.name" type="text" id="TaskName"
                        class="form-input mt-1 block w-full rounded-md pl-3 text-black">
                </div>
                <div class="mb-4">
                    <label for="TaskUrgency" class="block text-sm font-medium">Task Urgency</label>
                    <select v-model="newTask.urgency" id="TaskUrgency"
                        class="form-select mt-1 block w-full rounded-md text-black">
                        <option value="High Priority">High Priority</option>
                        <option value="Medium Priority">Medium Priority</option>
                        <option value="Low Priority">Low Priority</option>
                        <option value="Lowest Priority">Lowest Priority</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="TaskDue" class="block text-sm font-medium">Task Due</label>
                    <input v-model="newTask.due" type="date" id="TaskDue"
                        class="form-input mt-1 block w-full rounded-md pl-3 text-black">
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Task Category</label>
                    <div class="flex">
                        <button v-for="(category, index) in categories" :key="index" @click="setSelectedCategory(category)"
                            class="category-button hover:bg-blue-600"
                            :class="{ 'selected-category': category === selectedCategory }">
                            {{ category }}
                            <button @click="deleteCategory(index)"
                                class="text-white font-semibold px-2 py-1 ml-2 rounded-md">
                                <div class="hover:text-red-500">
                                    <FontAwesomeIcon icon="times" />
                                </div>
                            </button>
                        </button>
                        <button @click="showAddCategoryForm = true"
                            class="category-button add-category-button hover:bg-blue-600">
                            <FontAwesomeIcon icon="plus" />
                        </button>
                    </div>
                </div>

                <button type="button" @click="cancelForm"
                    class="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md ml-2">Cancel</button>
            </form>
        </div>

        <div v-if="showAddCategoryForm" class="bg-gray-700 p-4 rounded-lg shadow-lg">
            <form @submit.prevent="addCategory">
                <div class="mb-4">
                    <label for="CategoryName" class="block text-sm font-medium">Category Name</label>
                    <input v-model="newCategory" type="text" id="CategoryName"
                        class="form-input mt-1 block w-full rounded-md pl-3 text-black">
                </div>
                <div class="mb-4">
                    <button type="button" @click="cancelCategoryForm"
                        class="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md ml-2">Cancel</button>
                    <button type="submit"
                        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md ml-2">Add</button>
                </div>
            </form>
        </div>


        <div class="bg-gray-700 p-4 rounded-lg shadow-lg mt-4">
            <h2 class="text-2xl font-semibold mb-2">All Tasks</h2>
            <table class="table-auto w-full">
                <thead>
                    <tr>
                        <th class="px-4 py-2">Name</th>
                        <th class="px-4 py-2">Category</th>
                        <th class="px-4 py-2">Urgency</th>
                        <th class="px-4 py-2">Due</th>
                        <th class="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(Task, index) in Tasks" :key="index"
                        class="bg-gray-700 hover-bg-gray-800 transition duration-300 ease-in-out">
                        <td class="px-4 py-2 text-gray-100">{{ Task.name }}</td>
                        <td class="px-4 py-2 text-gray-100">{{ Task.type }}</td>
                        <td class="px-4 py-2 text-gray-100">{{ Task.urgency }}</td>
                        <td class="px-4 py-2 text-gray-100">{{ Task.due }}</td>
                        <td class="px-4 py-2 flex items-center">
                            <button @click="editTask(index)"
                                class="text-white font-semibold px-2 py-1 rounded-md transition duration-300 ease-in-out">
                                <div class="hover:text-blue-700">
                                    <FontAwesomeIcon icon="edit" />
                                </div>
                            </button>

                            <button @click="deleteTask(Task.id)"
                                class="text-white font-semibold px-2 py-1 ml-1 rounded-md transition duration-300 ease-in-out">
                                <div class="hover:text-red-500">
                                    <FontAwesomeIcon icon="trash" />
                                </div>
                            </button>

                            <div class="form-check ml-2">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style>
input {
    border-color: black;
    border-width: 0.1vh;
}

.category-button {
    display: inline-block;
    padding: 0.5rem 1rem;
    margin-right: 1rem;
    background-color: #2c3e50;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s;
}
</style>

<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faTimes, faTrash, faEdit, faPlus);

export default {
    components: {
        FontAwesomeIcon,
    },
    data() {
        return {
            Tasks: [],
            showAddTaskForm: false,
            newTask: {
                id: null,
                name: "",
                type: "",
                urgency: "",
                due: new Date(),
            },
            editingIndex: null,
            categories: ["Perkuliahan", "Perlombaan", "Kepanitiaan"],
            selectedCategory: "",
            showAddCategoryForm: false,
            newCategory: "",
        };
    },
    methods: {
        setSelectedCategory(category) {
            this.selectedCategory = category;
        },

        addOrUpdateTask() {
            if (this.newTask.name && this.selectedCategory && this.newTask.urgency && this.newTask.due) {
                if (this.editingIndex !== null) {
                    this.Tasks.splice(this.editingIndex, 1, { ...this.newTask, type: this.selectedCategory });
                    this.editingIndex = null;
                } else {
                    const newId = Date.now();
                    this.Tasks.push({ ...this.newTask, id: newId, type: this.selectedCategory });
                }

                this.newTask = {
                    name: "",
                    type: "",
                    urgency: "",
                    due: new Date(),
                };

                this.showAddTaskForm = false;
                localStorage.setItem('Tasks', JSON.stringify(this.Tasks));
            }
        },

        cancelForm() {
            this.showAddTaskForm = false;
            this.newTask = {
                name: "",
                type: "",
                urgency: "",
                due: 0,
            };
            this.editingIndex = null;
        },

        editTask(index) {
            this.newTask = { ...this.Tasks[index] };
            this.editingIndex = index;
            this.showAddTaskForm = true;
        },

        deleteTask(id) {
            const index = this.Tasks.findIndex(Task => Task.id === id);
            if (index !== -1) {
                this.Tasks.splice(index, 1);
                localStorage.setItem('Tasks', JSON.stringify(this.Tasks));
            }
        },

        selectCategory(category) {
            this.newTask.type = category;
        },
        addCategory() {
            if (this.newCategory) {
                this.categories.push(this.newCategory);
                this.newCategory = "";
                this.showAddCategoryForm = false;
            }
        },
        cancelCategoryForm() {
            this.showAddCategoryForm = false;
            this.newCategory = "";
        },
        deleteCategory(index) {
            this.categories.splice(index, 1);
        },
    },
    created() {
        const storedTasks = localStorage.getItem('Tasks');
        if (storedTasks) {
            this.Tasks = JSON.parse(storedTasks);
        }
    },
};
</script>


  