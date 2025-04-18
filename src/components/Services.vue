<script setup>
import { ref, onMounted } from 'vue'
import Header from './Layouts/Header.vue'
import Footer from './Layouts/Footer.vue'
import Telegram from './Layouts/Telegram.vue'

// Fetch services from the API
const services = ref([])
const filteredServices = ref([])

onMounted(async () => {
  try {
    const response = await fetch('/api/services?api_key=127tenonenterprice127')
    const data = await response.json()
    console.log('API Response:', data) // Log the response to inspect its structure

    // Map the services to match the expected structure
    services.value = data.services.map((service) => ({
      id: service.service, // Use the 'service' key as the ID
      name: service.name,
      rate: parseFloat(service.rate), // Convert rate to a number
      category: service.category,
      description: `Min: ${service.min}, Max: ${service.max}`,
      min: parseInt(service.min),
      max: parseInt(service.max),
    }))

    filterAndAdjustServices(services.value) // Pass the mapped services
  } catch (error) {
    console.error('Error fetching services:', error)
  }
})

// Function to calculate adjusted rate (add 10%)
const calculateAdjustedRate = (rate) => {
  return Math.floor(rate * 1.3) // Add 10% to the rate
}

// Function to filter and organize services
const filterAndAdjustServices = (data) => {
  if (!Array.isArray(data)) {
    console.error('Expected an array but got:', data)
    return
  }

  // Group services by category (e.g., Instagram, YouTube, etc.)
  const categories = {}
  data.forEach((service) => {
    const category = service.category || 'Other'
    if (!categories[category]) {
      categories[category] = []
    }
    categories[category].push(service)
  })

  // Flatten the categories into a single array for display
  filteredServices.value = Object.values(categories).flat()
}
</script>

<template>
  <div class="flex flex-col text-gray-200 bg-[#4f117a] w-full">
    <Header />

    <!-- Hero Section -->
    <section
      class="services-hero flex flex-col p-8 md:pr-20 md:flex-row gap-12 justify-between items-center max-w-[1400px] mx-auto pt-30"
    >
      <div class="writeup text-2xl flex flex-col gap-4 max-w-[600px] md:pr-12">
        <h1 class="tag font-bold  text-4xl md:text-5xl">Our SMM Services</h1>
        <h2 class="text-sm md:text-lg">
          Affordable, Fast, and Reliable Social Media Marketing Services
        </h2>
        <p class="text-lg">
          Boost your social media presence with our wide range of services. From Instagram followers
          to YouTube views, we’ve got you covered – all delivered in just 2 minutes!
        </p>
      </div>

      <div
        class="relative flex flex-col items-center gap-10 md:w-full md:p-12 md:flex-row md:justify-center md:pl-11"
      >
        <!-- Suggested Image: A person managing social media accounts -->
        <img
          src="/src/assets/services-hero.webp"
          alt="Our Services"
          class="md:w-[500px] md:z-10 rounded-lg shadow-lg"
        />
      </div>
    </section>

    <!-- Services Grid -->
    <section class="services-grid bg-white text-purple-950 py-20 px-8">
      <div class="flex flex-col gap-12 max-w-[1400px] mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-center">Explore Our Services</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="service in filteredServices"
            :key="service.id"
            class="service-card bg-gray-100 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <div class="flex flex-col gap-4">
              <h3 class="text-xl font-bold">{{ service.name }}</h3>
              <p class="text-lg">{{ service.description }}</p>
              <p class="text-lg font-semibold">Rate: ₦{{ calculateAdjustedRate(service.rate) }}</p>
              <RouterLink
                :to="`/order/${service.id}`"
                class="bg-purple-600 text-white p-3 rounded-lg text-center hover:bg-purple-700 transition-colors duration-300"
              >
                Order Now
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call-to-Action Section -->
    <section class="cta secondary text-gray-200 py-20 px-8">
      <div class="flex flex-col gap-8 max-w-[1400px] mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold reveal">Ready to Boost Your Social Media?</h2>
        <p class="text-lg md:text-xl">
          Join thousands of satisfied customers and grow your presence today. No account needed –
          just fast, reliable service!
        </p>
        <RouterLink
          to="/order"
          class="group relative text-2xl rounded text-center p-4 w-[200px] mx-auto transition-all ease-linear duration-500 bg-purple-400 bg-gradient-to-r from-purple-950 hover:bg-purple-500 order-btn reveal"
        >
          <span
            class="absolute inset-0 bg-gradient-to-l bg-purple-400 from-purple-950 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300 rounded"
          ></span
          >Order Now
        </RouterLink>
      </div>
    </section>
    <Footer />
    <Telegram />
  </div>
</template>



<style scoped>
.services-grid{
  color:#4f117a
}

.service-card{
  background:#f3f3f3
}

.service-card a{
background:#9222a8;
color:#fff;
}
</style>