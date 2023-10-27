<template>
    <div class="container mx-auto p-4">
        <div class="bg-gray-100 p-4 rounded-lg shadow-lg mb-4">
            <h1 class="text-3xl font-bold mb-4">Our To-do List</h1>
            <div>
                <button @click="showAddTaskForm = true"
                    class="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md">Add
                    Task</button>
                <button @click="toggleArkaTable"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md ml-4"> {{
                        showArkaTable ? 'Hide Arka' : 'Show Arka' }}</button>
                <button @click="toggleAzkaTable"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md ml-4">{{
                        showAzkaTable ? 'Hide Azka' : 'Show Azka' }}</button>
                <button @click="toggleImamTable"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md ml-4">{{
                        showImamTable ? 'Hide Imam' : 'Show Imam' }}</button>
            </div>
        </div>

        <div v-if="showAddTaskForm" class="bg-white p-4 rounded-lg shadow-lg">
            <form @submit.prevent="addOrUpdateTask" class="custom-form">
                <div class="mb-4">
                    <label for="TaskName" class="block text-sm font-medium text-gray-600">Task Name</label>
                    <input v-model="newTask.name" type="text" id="TaskName"
                        class="form-input mt-1 block w-full rounded-md pl-3">
                </div>
                <div class="mb-4">
                    <label for="TaskWho" class="block text-sm font-medium text-gray-600">Who?</label>
                    <select v-model="newTask.who" id="TaskWho" class="form-select mt-1 block w-full rounded-md ">
                        <option value="Arka">Arka</option>
                        <option value="Azka">Azka</option>
                        <option value="Imam">Imam</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="TaskType" class="block text-sm font-medium text-gray-600">Task Type</label>
                    <select v-model="newTask.type" id="TaskType" class="form-select mt-1 block w-full rounded-md">
                        <option value="Perkuliahan">Perkuliahan</option>
                        <option value="Perlombaan">Perlombaan</option>
                        <option value="Kepanitiaan">Kepanitiaan</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="TaskUrgency" class="block text-sm font-medium text-gray-600">Task Urgency</label>
                    <select v-model.number="newTask.Urgency" id="TaskUrgency"
                        class="form-select mt-1 block w-full rounded-md">
                        <option value="High Priority">High Priority</option>
                        <option value="Medium Priority">Medium Priority</option>
                        <option value="Low Priority">Low Priority</option>
                        <option value="Lowest Priority">Lowest Priority</option>
                    </select>
                </div>

                <div class="mb-4">
                    <label for="TaskDue" class="block text-sm font-medium text-gray-600">Task Due</label>
                    <input v-model="newTask.Due" type="date" id="TaskDue"
                        class="form-input mt-1 block w-full rounded-md pl-3">
                </div>
                <button type="submit"
                    class="bg-green-600 hover:bg-green-500 text-white font-semibold px-4 py-2 rounded-md">{{
                        editingIndex !== null ? 'Save' : 'Add' }}</button>
                <button type="button" @click="cancelForm"
                    class="bg-gray-500 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-md ml-2">
                    Cancel
                </button>

            </form>
        </div>

        <div v-if="showArkaTable" class="bg-white p-4 rounded-lg shadow-lg mt-4">
            <h2 class="text-2xl font-semibold mb-2">Arka</h2>
            <table class="table-auto w-full">
                <thead>
                    <tr>
                        <th class="px-4 py-2">Name</th>
                        <th class="px-4 py-2">Type</th>
                        <th class="px-4 py-2">Urgency</th>
                        <th class="px-4 py-2">Due</th>
                        <th class="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(Task, index) in filteredTasks('Arka')" :key="index"
                        class="bg-white hover:bg-gray-100 transition duration-300 ease-in-out">
                        <td class="px-4 py-2 text-gray-800">{{ Task.name }}</td>
                        <td class="px-4 py-2 text-gray-800">{{ Task.type }}</td>
                        <td class="px-4 py-2 text-gray-800">{{ Task.Urgency }}</td>
                        <td class="px-4 py-2 text-gray-800">{{ Task.Due }}</td>
                        <td class="px-4 py-2 flex items-center">
                            <button @click="editTask(index)"
                                class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-2 py-1 rounded-md  transition duration-300 ease-in-out">
                                Edit
                            </button>
                            <button @click="deleteTask(Task.id)"
                                class="bg-red-500 hover:bg-red-600 text-white font-semibold px-2 py-1 ml-1 rounded-md transition duration-300 ease-in-out">
                                Delete
                            </button>
                            <div class="form-check ml-2">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="showAzkaTable" class="bg-white p-4 rounded-lg shadow-lg mt-4">
            <h2 class="text-2xl font-semibold mb-2">Azka</h2>
            <table class="table-auto w-full">
                <thead>
                    <tr>
                        <th class="px-4 py-2">Name</th>
                        <th class="px-4 py-2">Type</th>
                        <th class="px-4 py-2">Urgency</th>
                        <th class="px-4 py-2">Due</th>
                        <th class="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(Task, index) in filteredTasks('Azka')" :key="index"
                        class="bg-white hover:bg-gray-100 transition duration-300 ease-in-out">
                        <td class="px-4 py-2 text-gray-800">{{ Task.name }}</td>
                        <td class="px-4 py-2 text-gray-800">{{ Task.type }}</td>
                        <td class="px-4 py-2 text-gray-800">{{ Task.Urgency }} </td>
                        <td class="px-4 py-2 text-gray-800">{{ Task.Due }}</td>
                        <td class="px-4 py-2 flex items-center">
                            <button @click="editTask(index)"
                                class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-2 py-1 rounded-md  transition duration-300 ease-in-out">
                                Edit
                            </button>
                            <button @click="deleteTask(Task.id)"
                                class="bg-red-500 hover:bg-red-600 text-white font-semibold px-2 py-1 ml-1 rounded-md transition duration-300 ease-in-out">
                                Delete
                            </button>
                            <div class="form-check ml-2">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
                            </div>
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>

        <div v-if="showImamTable" class="bg-white p-4 rounded-lg shadow-lg mt-4">
            <h2 class="text-2xl font-semibold mb-2">Imam</h2>
            <table class="table-auto w-full">
                <thead>
                    <tr>
                        <th class="px-4 py-2">Name</th>
                        <th class="px-4 py-2">Type</th>
                        <th class="px-4 py-2">Urgency</th>
                        <th class="px-4 py-2">Due</th>
                        <th class="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(Task, index) in filteredTasks('Imam')" :key="index"
                        class="bg-white hover:bg-gray-100 transition duration-300 ease-in-out">
                        <td class="px-4 py-2 text-gray-800">{{ Task.name }}</td>
                        <td class="px-4 py-2 text-gray-800">{{ Task.type }}</td>
                        <td class="px-4 py-2 text-gray-800">{{ Task.Urgency }}</td>
                        <td class="px-4 py-2 text-gray-800">{{ Task.Due }}</td>
                        <td class="px-4 py-2 flex items-center">
                            <button @click="editTask(index)"
                                class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-2 py-1 rounded-md  transition duration-300 ease-in-out">
                                Edit
                            </button>
                            <button @click="deleteTask(Task.id)"
                                class="bg-red-500 hover:bg-red-600 text-white font-semibold px-2 py-1 ml-1 rounded-md transition duration-300 ease-in-out">
                                Delete
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

select {
    border-color: black;
    border-width: 0.1vh;
}
</style>

<script>
export default {
    data() {
        return {
            Tasks: [],
            showAddTaskForm: false,
            showArkaTable: true,
            showAzkaTable: true,
            showImamTable: true,
            newTask: {
                id: null,
                name: "",
                who: "",
                type: "",
                Urgency: "",
                Due: new Date(),
            },
            editingIndex: null,
        };
    },
    created() {
        const savedTasks = localStorage.getItem('Tasks');
        if (savedTasks) {
            this.Tasks = JSON.parse(savedTasks);
        }
    },
    methods: {
        filteredTasks(who) {
            return this.Tasks.filter(Task => Task.who === who);
        },


        addOrUpdateTask() {
            if (true) {
                if (this.editingIndex !== null) {
                    this.Tasks.splice(this.editingIndex, 1, { ...this.newTask });
                    this.editingIndex = null;
                } else {
                    const newId = Date.now();
                    this.Tasks.push({ ...this.newTask, id: newId }); // Sesuaikan bidang "who"
                }

                this.newTask = {
                    name: "",
                    who: "",
                    type: "",
                    Urgency: "",
                    Due: new Date(this.newTask.Due),
                };

                this.showAddTaskForm = false;
                localStorage.setItem('Tasks', JSON.stringify(this.Tasks));
            } else {
                alert('Masukkan teks atau angka yang valid untuk Task Urgency dan Task Due.');
            }
        },



        toggleArkaTable() {
            this.showArkaTable = !this.showArkaTable;
        },

        toggleAzkaTable() {
            this.showAzkaTable = !this.showAzkaTable;
        },

        toggleImamTable() {
            this.showImamTable = !this.showImamTable;
        },

        cancelForm() {
            this.showAddTaskForm = false;
            // Reset nilai newTask dan editingIndex jika perlu
            this.newTask = {
                name: "",
                type: "",
                Urgency: "",
                Due: 0,
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
        }
    },
};
</script>
  
  