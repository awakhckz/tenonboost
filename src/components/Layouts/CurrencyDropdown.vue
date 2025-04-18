<template>
  <div class="relative w-full">
    <!-- Selected Item -->
    <div
      class="bg-gray-800 list text-white border border-gray-700 rounded-md px-4 py-2 cursor-pointer flex justify-between items-center"
      @click="isOpen = !isOpen"
    >
      {{ selectedCurrency || 'Select a currency' }}
      <svg
        class="w-4 h-4 ml-2 transition-transform"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <!-- Dropdown Menu -->
    <ul
      v-if="isOpen"
      class="absolute list z-40 mt-1 w-full bg-gray-900 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto"
    >
      <li
        v-for="currency in currencies"
        :key="currency"
        @click="selectCurrency(currency)"
        class="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer z-"
      >
        {{ currency }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  modelValue: String,
  currencies: Array
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selectedCurrency = ref(props.modelValue)

const selectCurrency = (currency) => {
  selectedCurrency.value = currency
  emit('update:modelValue', currency)
  isOpen.value = false
}

watch(() => props.modelValue, (val) => {
  selectedCurrency.value = val
})

// Optional: close dropdown on outside click
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    isOpen.value = false
}
}
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.list{
  border: 1px solid lightgray;
  background:rgb(74, 4, 121)
}
</style>