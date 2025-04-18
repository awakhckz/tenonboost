<template>
  <div class="relative w-full">
    <!-- Selected Item -->
    <div
      class="bg-gray-800 list text-white border border-gray-700 rounded-md px-4 py-2 cursor-pointer flex justify-between items-center"
      @click="isOpen = !isOpen"
    >
      <span>
        {{ selectedLabel || placeholder }}
      </span>
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

    <!-- Dropdown List -->
    <ul
      v-if="isOpen"
      class="absolute list z-50 mt-1 w-full bg-gray-900 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto"
    >
      <li
        v-for="(item, index) in options"
        :key="index"
        @click="select(item)"
        class="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer"
      >
        {{ getLabel(item) }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  modelValue: [String, Object],
  options: Array,
  placeholder: String,
  labelKey: String
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selectedLabel = ref('')

const getLabel = (item) => {
  if (!item) return ''
  return typeof item === 'object' && props.labelKey ? item[props.labelKey] : item
}

const select = (item) => {
  selectedLabel.value = getLabel(item)
  emit('update:modelValue', item)
  isOpen.value = false
}

watch(() => props.modelValue, (val) => {
  selectedLabel.value = getLabel(val)
})

onMounted(() => {
  selectedLabel.value = getLabel(props.modelValue)
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) isOpen.value = false
  })
})
</script>


<style scoped>
.list{
background:rgb(72, 1, 138);
border: 1px solid lightgray;
}
</style>