<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

library.add(faTimes, faTrash, faEdit);

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      tasks: [],
      urgencies: [],
      showAddTaskForm: false,
      newTask: {
        id: null,
        name: "",
        urgency: "",
        due: new Date(),
      },
      editingIndex: null,
    };
  },

  created() {
    this.getUrgencies(); // Panggil fungsi getUrgencies untuk mengisi data urgencies
  },
  methods: {
    async getUrgencies() {
      await fetch('http://localhost:3000/api/Priority')
        .then((response) => response.json())
        .then((data) => {
          this.urgencies = data.docs; // Mengisi data urgencies dengan data dari respons
        })
        .catch((error) => {
          console.error(error);
        });
    },
    addOrUpdateTask() {
      if (this.newTask.name && this.newTask.urgency && this.newTask.due) {
        if (this.editingIndex !== null) {
          this.tasks.splice(this.editingIndex, 1, { ...this.newTask });
          this.editingIndex = null;
        } else {
          const newId = Date.now();
          this.tasks.push({ ...this.newTask, id: newId });
        }

        this.newTask = {
          name: "",
          urgency: "",
          due: new Date(),
        };

        this.showAddTaskForm = false;
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      }
    },

    cancelForm() {
      this.showAddTaskForm = false;
      this.newTask = {
        name: "",
        urgency: "",
        due: 0,
      };
      this.editingIndex = null;
    },

    editTask(index) {
      this.newTask = { ...this.tasks[index] };
      this.editingIndex = index;
      this.showAddTaskForm = true;
    },

    deleteTask(id) {
      const index = this.tasks.findIndex(task => task.id === id);
      if (index !== -1) {
        this.tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      }
    },
  },
};
</script>

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
          <select v-model="newTask.urgency" id="TaskUrgency" class="form-select mt-1 block w-full rounded-md text-black">
            <option value="">Select Task Urgency</option>
            <!-- Mencetak hanya 'name' dari setiap urgensi -->
            <option v-for="urgency in urgencies" :value="urgency.name">{{ urgency.name }}</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="TaskDue" class="block text-sm font-medium">Task Due</label>
          <input v-model="newTask.due" type="date" id="TaskDue"
            class="form-input mt-1 block w-full rounded-md pl-3 text-black">
        </div>

        <button type="button" @click="cancelForm"
          class="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md ml-2">Cancel</button>
        <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md ml-2">Add
          Task</button>
      </form>
    </div>

    <div class="bg-gray-700 p-4 rounded-lg shadow-lg mt-4">
      <h2 class="text-2xl font-semibold mb-2">All Tasks</h2>
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Urgency</th>
            <th class="px-4 py-2">Due</th>
            <th class="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in tasks" :key="index"
            class="bg-gray-700 hover-bg-gray-800 transition duration-300 ease-in-out">
            <td class="px-4 py-2 text-gray-100">{{ task.name }}</td>
            <td class="px-4 py-2 text-gray-100">{{ task.urgency }}</td>
            <td class="px-4 py-2 text-gray-100">{{ task.due }}</td>
            <td class="px-4 py-2 flex items-center">
              <button @click="editTask(index)"
                class="text-white font-semibold px-2 py-1 rounded-md transition duration-300 ease-in-out">
                <div class="hover:text-blue-700">
                  <FontAwesomeIcon icon="edit" />
                </div>
              </button>

              <button @click="deleteTask(task.id)"
                class="text-white font-semibold px-2 py-1 ml-1 rounded-md transition duration-300 ease-in-out">
                <div class="hover:text-red-500">
                  <FontAwesomeIcon icon="trash" />
                </div>
              </button>
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
</style>
