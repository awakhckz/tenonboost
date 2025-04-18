<template>
  <div class="max-w-lg mx-auto p-6 bg-gray-900 rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-4">Generate API Key</h2>

    <input v-model="email" type="email" placeholder="Enter your email"
      class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 required">
    <button @click="generateKey" class="mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
      Generate API Key
    </button>

    <div v-if="apiKey" class="mt-4">
      <p class="text-gray-700">Your API Key:</p>
      <div class="flex items-center">
        <input v-model="apiKey" class="w-full px-3 py-2 border rounded-md" readonly />
        <button @click="copyKey" class="ml-2 px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300">Copy</button>
      </div>
    </div>

    <h2 class="text-xl font-bold mt-6">Verify API Key</h2>
    <input v-model="testKey" type="text" placeholder="Paste API Key"
      class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
    <button @click="fetchServices" class="mt-3 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
      Fetch Services
    </button>

    <div v-if="services.length" class="mt-4">
      <h3 class="text-lg font-semibold">Available Services:</h3>
      <ul class="list-disc pl-5">
        <li v-for="service in services" :key="service.id">{{ service.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      apiKey: "",
      testKey: "",
      services: []
    };
  },
  methods: {
    async generateKey() {
      try {
        const res = await axios.post("/api/generate-api-key", { email: this.email });
        this.apiKey = res.data.apiKey;
      } catch (error) {
        console.error(error);
      }
    },
    copyKey() {
      navigator.clipboard.writeText(this.apiKey);
      alert("API Key copied!");
    },
    async fetchServices() {
      try {
        const res = await axios.post("/api/fetch-services", { apiKey: this.testKey });
        this.services = res.data;
      } catch (error) {
        alert("Invalid API Key!");
      }
    }
  }
};
</script>
