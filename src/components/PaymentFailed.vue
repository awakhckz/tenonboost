<template>
  <div class="min-h-screen bg-[#4f117a] text-gray-200 flex flex-col">
    <Header />
    
    <main class="flex-1 flex items-center justify-center p-4">
      <div class="bg-purple-900/50 border border-red-500 rounded-xl p-8 max-w-2xl w-full text-center">
        <!-- Animated cross -->
        <div class="mx-auto mb-6 w-20 h-20 flex items-center justify-center">
          <svg class="crossmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle class="crossmark__circle" cx="26" cy="26" r="25" fill="none"/>
            <path class="crossmark__cross" fill="none" d="M16 16 36 36 M36 16 16 36"/>
          </svg>
        </div>

        <h1 class="text-3xl font-bold text-red-400 mb-4">Payment Failed</h1>
        
        <div class="bg-purple-800/50 rounded-lg p-6 mb-6">
          <p class="mb-4">
            We couldn't process your payment. Please check your payment details and try again.
          </p>
          
          <div v-if="transactionId" class="text-left">
            <p><span class="font-medium">Transaction ID:</span> {{ transactionId }}</p>
            <p v-if="errorMessage"><span class="font-medium">Reason:</span> {{ errorMessage }}</p>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            @click="retryPayment"
            class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
          >
            Retry Payment
          </button>
          <button 
            @click="contactSupport"
            class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition"
          >
            Contact Support
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
const errorMessage = ref('')

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  transactionId.value = params.get('tx_ref') || ''
  errorMessage.value = params.get('message') || 'Payment was declined or failed to process'
})

const retryPayment = () => {
  router.go(-1) // Go back to payment page
}

const contactSupport = () => {
  window.location.href = 'mailto:support@tenonboost.online?subject=Payment%20Failed'
}
</script>

<style scoped>
.crossmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #EF4444;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.crossmark__cross {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  stroke: #EF4444;
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