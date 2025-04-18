<template>
  <div class="min-h-screen bg-[#4f117a] text-gray-200 flex flex-col">
    <Header />
    
    <main class="flex-1 flex items-center justify-center p-4">
      <div class="bg-purple-900/50 border border-purple-500 rounded-xl p-8 max-w-2xl w-full text-center">
        <!-- Animated checkmark -->
        <div class="mx-auto mb-6 w-20 h-20 flex items-center justify-center">
          <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
            <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>

        <h1 class="text-3xl font-bold text-green-400 mb-4">Payment Successful!</h1>
        
        <div class="bg-purple-800/50 rounded-lg p-6 mb-6 text-left">
          <h2 class="text-xl font-semibold mb-4">Order Details</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><span class="font-medium">Transaction ID:</span> {{ transactionId }}</p>
              <p><span class="font-medium">Service:</span> {{ serviceType }}</p>
              <p><span class="font-medium">Link:</span> 
                <a :href="link" target="_blank" class="text-blue-400 hover:underline break-all">{{ link }}</a>
              </p>
            </div>
            <div>
              <p><span class="font-medium">Amount:</span> {{ amount }} NGN</p>
              <p><span class="font-medium">Quantity:</span> {{ quantity }}</p>
              <p><span class="font-medium">Email:</span> {{ email }}</p>
            </div>
          </div>
        </div>

        <p class="mb-6 text-lg">
          Your order is being processed. You'll receive a confirmation email shortly.
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            @click="goToDashboard"
            class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
          >
            Track Order
          </button>
          <button 
            @click="placeNewOrder"
            class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition"
          >
            Place New Order
          </button>
        </div>
      </div>
    </main>

    <Footer class="bg-[#4f117a]" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/Layouts/Header.vue'
import Footer from '@/components/Layouts/Footer.vue'

const router = useRouter()
const transactionId = ref('')
const serviceType = ref('')
const amount = ref('')
const quantity = ref('')
const email = ref('')
const link = ref('')

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  transactionId.value = params.get('transaction_id') || 'N/A'
  serviceType.value = params.get('serviceType') || 'N/A'
  amount.value = params.get('amount') || '0'
  quantity.value = params.get('quantity') || '0'
  email.value = params.get('email') || 'N/A'
  link.value = params.get('link') || '#'
})

const goToDashboard = () => {
  router.push('/dashboard')
}

const placeNewOrder = () => {
  router.push('/')
}
</script>

<style scoped>
.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #10B981;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  stroke: #10B981;
  stroke-width: 2;
  stroke-linecap: round;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}
</style>