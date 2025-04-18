<template>
  <div class="flex flex-col text-gray-200 secondary relative w-full gap-6">
    <Header class="z-999" />
    <div v-if="showModal" class="fixed inset-0 bg-transparent flex items-center justify-center z-50">
  <div class="errModal bg-purple-900 p-6 rounded-lg max-w-md w-full">
    <h3 class="text-lg font-bold mb-4">{{ modalTitle }}</h3>
    <p class="mb-4">{{ modalMessage }}</p>
    <button 
      @click="showModal = false"
      class="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
    >
      OK
    </button>
  </div>
</div>
    <div
      class="flex flex-col place-items-center secondary w-full relative overflow-x-hidden pt-32 gap-12"
    >
      <div class="blob absolute top-0 w-[400px] -right-40 rotate-180">
        <img src="/src/assets/blob1.svg" alt="tenonboost" />
      </div>
      <div class="blob absolute top-100 w-[400px] -left-40">
        <img src="/src/assets/blob1.svg" alt="tenonboost" />
      </div>

      <div class="notice z-20 text-center w-[90%] max-w-[600px] gap-6 flex flex-col">
        <div>
          <h1 class="text-2xl text-center text-orange-600">Important Information!!!</h1>
          <p>
            Follow instructions below to turn off
            <span class="font-bold text-blue-600">Flag For Review</span> on Instagram. This is very
            important to make sure followers deliver safely.
          </p>
        </div>
        <div>
          <h1 class="text-xl font-bold underline">Steps to Disable the Feature:</h1>
          <ul class="list-none flex flex-col gap-4">
            <li>
              1️⃣ Open Instagram and go to
              <span class="text-orange-600 font-semi-bold">Settings.</span>
            </li>
            <li>
              2️⃣ Scrool Down
              <span class="text-orange-600 font-semi-bold">Select Follow and Invite Friends.</span>
            </li>
            <li>
              3️⃣ Scroll to the
              <span class="text-orange-600 font-semi-bold"
                >Flag for Review option and turn it OFF.</span
              >
            </li>
            <li>
              <span class="text-orange-600 font-semi-bold">Note:</span> Tenon Boost Won't take
              responsibility of any damages caused by failure to turn off this feature.
            </li>

            <li>
              ✨ Tip: Double-check your settings to avoid any interruptions! Thank you for your
              cooperation. 🙌
            </li>
          </ul>
        </div>
      </div>
      <!-- Currency Selection -->
      <label class="flex flex-col gap-4 z-40">
        <span class="text-gray-200 text-lg">Select Currency</span>
        <CurrencyDropdown
          v-model="selectedCurrency"
          :currencies="['NGN', 'USD', 'EUR', 'KES']"
          class="z-40"
        />
      </label>

      <!-- Order Form -->
      <form
        @submit.prevent
        class="flex flex-col gap-4 p-6 w-[90%] z-20 max-w-[600px] border border-gray-200 rounded-xl shadow-md space-y-4 text-gray-200"
      >
        <h2 class="text-xl font-bold text-center">Place An Order</h2>

        <!-- Search Input -->
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search service..."
          class="block w-full p-2 border rounded outline-none"
        />

        <!-- Category Selection -->
        <!-- Category Dropdown -->
        <label class="flex flex-col gap-4">
          <span class="text-gray-200 text-lg">Select Category</span>
          <CategoryServicesDropDown
            v-model="selectedCategory"
            :options="categories"
            placeholder="All Categories"
            @update:modelValue="filterServicesByCategory"
          />
        </label>
        <!-- <pre>{{ JSON.stringify(selectedService, null, 2) }}</pre> -->

        <!-- Service Dropdown -->
        <label class="flex flex-col gap-4">
          <span class="text-gray-200 text-lg">Select Service</span>
          <CategoryServicesDropDown
            v-model="selectedService"
            :options="filteredServices"
            :label-key="'name'"
            placeholder="Select a service"
          />
        </label>

        <!-- Quantity Input -->
        <label class="flex flex-col gap-4">
          <span class="text-gray-200 text-lg">Quantity</span>
          <input
            type="number"
            v-model="quantity"
            class="block w-full mt-1 p-2 border rounded outline-none"
            :min="selectedService?.min || 1"
            :max="selectedService?.max || 100000"
          />
        </label>

        <!-- Link Input -->
        <label class="flex flex-col gap-4">
          <span class="text-gray-200 text-lg">Link</span>
          <input
            type="link"
            v-model="link"
            class="block w-full mt-1 p-2 border rounded outline-none"
          />
        </label>

        <!-- Email -->
        <label class="flex flex-col gap-4">
          <span class="text-gray-200 text-lg">Email</span>
          <input
            type="email"
            v-model="customerEmail"
            required
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
            class="block w-full mt-1 p-2 border rounded outline-none"
          />
        </label>

        <!-- Total Price -->
         <label for="totalPrice" class='totalPrice'>Total Price: {{selectedCurrency}} {{calculatePrice}}
          </label>
        

        <!-- Place Order Button -->
        <button
          type="button"
          @click="handlePlaceOrder"
          :disabled="isProcessing"
          class="bg-purple-700 cursor-pointer text-center text-xl p-2 rounded-2xl hover:opacity-80"
        ><span v-if="isProcessing" class="inline-block animate-spin">↻</span>
          {{ isProcessing ? 'Processing.' : 'Place Order' }}
        </button>
      </form>

      <!-- Order Description Section -->
      <div class="desc border w-[80%] max-w-[700px] h-fit p-4 mt-20 z-20">
        <p class="header text-center text-xl text-gray-200">Order Description</p>
        <div class="order-desc text-gray-200">
          <p v-if="selectedService">
            <strong>Service:</strong> {{ selectedService.name }}<br />
            <strong>Description:</strong> {{ selectedService.description }}<br />
            <strong>Min Quantity:</strong> {{ selectedService.min }}<br />
            <strong>Max Quantity:</strong> {{ selectedService.max }}<br />
            <strong>Rate:</strong> {{ selectedCurrency }}
            {{ calculatePrice }} per 1k
          </p>
          <p v-else>No service selected.</p>
        </div>
      </div>
    </div>
  </div>
  <Footer class="z-20 secondary" />
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import Header from './Layouts/Header.vue'
import Footer from './Layouts/Footer.vue'
import CurrencyDropdown from './Layouts/CurrencyDropdown.vue'
import CategoryServicesDropDown from './Layouts/Category&ServicesDropDown.vue'

// Reactive state
const searchQuery = ref('')
const selectedCurrency = ref('NGN')
const selectedCategory = ref('')
const customerEmail = ref('')
const categories = ref([])
const selectedService = ref(null)
const services = ref([])
const quantity = ref('')
const link = ref('')
const orderStatus = ref('')
const isProcessing = ref(false)
const exchangeRates = ref({})
const email = customerEmail.value
const showModal = ref(false);
const modalTitle = ref('');
const modalMessage = ref('');

// 1. Split at "@" and get the first part
const username = email.split('@')[0] // "john.doe"

// 2. Capitalize the first letter of each word
const capitalizedUsername = username
  .split('.') // Split into parts if needed (e.g., "john.doe" → ["john", "doe"])
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  .join(' ')

// Computed properties
const filteredServices = computed(() => {
  return services.value
    .filter((service) =>
      selectedCategory.value ? service.category === selectedCategory.value : true,
    )
    .filter((service) =>
      searchQuery.value
        ? service.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        : true,
    )
})

const calculatePrice = computed(() => {
  if (!selectedService.value) return 0

  const baseRateNGN = parseFloat(selectedService.value.rate)
  const rateWithProfit = baseRateNGN * 1.1

  const finalRate = convertCurrency(rateWithProfit, selectedCurrency.value)

  return ((finalRate * quantity.value) / 1000).toFixed(2)
})

// Methods
const fetchServices = async () => {
  try {
    const response = await axios.get('/api/services?api_key=127tenonenterprice127')
    services.value = response.data.services
    extractCategories()
    await fetchExchangeRates()
    convertAllServiceRates()
  } catch (error) {
    console.error('Error fetching services:', error)
  }
}

const fetchExchangeRates = async () => {
  try {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/USD`)
    exchangeRates.value = response.data.rates
  } catch (error) {
    console.error('Error fetching exchange rates:', error)
  }
}

const convertCurrency = (amount, currency) => {
  const baseAmount = parseFloat(amount) // Ensure it's treated as a number
  if (isNaN(baseAmount)) return 0 // Return 0 if the amount is not a valid number

  if (currency === 'NGN') return baseAmount

  const rate = exchangeRates.value[currency]
  if (!rate) return 0 // If the exchange rate is missing, return 0

  return (baseAmount / exchangeRates.value['NGN']) * rate
}

const convertAllServiceRates = () => {
  services.value = services.value.map((service) => ({
    ...service,
    convertedRate: convertCurrency(service.rate, selectedCurrency.value),
  }))
}

const extractCategories = () => {
  categories.value = [...new Set(services.value.map((service) => service.category))]
}

const updateCurrency = async () => {
  await fetchExchangeRates()
  convertAllServiceRates()
}

async function handlePlaceOrder() {
  // Validate once before proceeding
  if (!selectedService.value || !link.value || !quantity.value || !customerEmail.value) {
    showErrorModal('Missing Information', 'Please fill all required fields');
    return;
  }

  if (!validateEmail(customerEmail.value)) {
    showErrorModal('Invalid Email', 'Please enter a valid email address');
    return;
  }

  
    if(calculatePrice.value < 100){
      showErrorModal('Order Must Be At Least NGN 100');
      return;
    }

  if (quantity.value < selectedService.value?.min || quantity.value > selectedService.value?.max) {
    showErrorModal(
      'Invalid Quantity',
      `Please enter a quantity between ${selectedService.value.min} and ${selectedService.value.max}`
    );
    return;
  }

  isProcessing.value = true;

  try {
    // First send email
    const emailSent = await sendEmail();
    if (!emailSent) {
      showErrorModal('Email Failed', 'Could not send confirmation email. Please try again.');
      return;
    }
    
    // Then initiate payment
    await initiatePayment();
  } catch (error) {
    console.error('Order failed:', error);
    showErrorModal('Order Failed', 'There was an error processing your order. Please try again.');
  } finally {
    isProcessing.value = false;
  }
}

// Email validation function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Modal helper functions
function showErrorModal(title, message) {
  modalTitle.value = title;
  modalMessage.value = message;
  showModal.value = true;
}

function showSuccessModal(title, message) {
  modalTitle.value = title;
  modalMessage.value = message;
  showModal.value = true;
}

const initiatePayment = async () => {
  try {
    const baseRateNGN = parseFloat(selectedService.value.rate);
    const totalPriceNGN = (baseRateNGN * 1.1 * quantity.value) / 1000;

    const response = await axios.post('/api/generate-payment-link', {
      totalPrice: totalPriceNGN,
      email: customerEmail.value,
      categoryType: selectedCategory.value,
      serviceType: selectedService.value.name,
      link: link.value,
      quantity: quantity.value,
    });

    if (response.data?.paymentLink) {
      window.location.href = response.data.paymentLink;
    } else {
      throw new Error('No payment link received');
    }
  } catch (error) {
    console.error('Payment error:', error);
    showErrorModal('Payment Failed', 'Failed to initiate payment. Please try again.');
    throw error; // Re-throw to be caught in handlePlaceOrder
  }
};

async function sendEmail() {
  if (!customerEmail.value || !validateEmail(customerEmail.value)) {
    console.error('Invalid email address');
    return false;
  }

  try {
    const serviceName = selectedService.value?.name || 'No service selected';
    const currentCategory = selectedCategory.value || 'No category selected';
    const currentPrice = calculatePrice.value || '0';

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: customerEmail.value,
        subject: `Order Received – We're Processing Your Request!`,
        html: `Hi ${capitalizedUsername}, 
        <p>We wanted to let you know that we’ve received your order, and it’s currently being processed.</p>
             <p>Please note that your payment is still being confirmed. Once your payment is processed, your order will be delivered to the link below.</p> <p>In the meantime, if you have any questions or need assistance, reach out to us at <a href="mailto:tenonboost@gmail.com">tenonboost@gmail.com</a></p> 
             <p>We appreciate your patience!</p> <p>Best regards,</p> <p>The Tenon Boost Team</p> <h3>You can see your order details below:</h3> 
               <h2 style="color:blue; font-size:20px;">Thank you for placing your order with us! 🎉</h2>
               <p>Service: ${serviceName}</p>
               <p>Category: ${currentCategory}</p>
               <p>Link: ${link.value}</p>
               <p>Quantity: ${quantity.value}</p>
               <p>Total Price: ${selectedCurrency.value} ${currentPrice}</p>`
      }),
    });

    const result = await response.json();
    console.log('Email sent:', result);
    return true;
  } catch (error) {
    console.error('Email error:', error);
    return false;
  }
}

// Watchers
watch(selectedCurrency, () => {
  updateCurrency()
})

// Lifecycle hooks
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  orderStatus.value = urlParams.get('status')
  fetchServices()
  fetchExchangeRates()
})
</script>

<style scoped>
.notice span, h1{
  color: orange
}

form {
  border: 1px solid
}

form input{
  border: 1px solid
}

form button {
  background:#831bce;
}

.totalPrice{
  display: flex;
  flex-direction: row;
}

.errModal{
  background:#5a0597
}

.errModal button{
  background:#8104db
}

.desc{
  border: 1px solid
}

</style>