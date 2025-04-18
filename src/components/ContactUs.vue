<script setup>
import { ref } from 'vue'
import Header from './Layouts/Header.vue'
// Contact form data

// Newsletter email
const newsletterEmail = ref('')
const name = ref('')
const msgMail = ref('')
const msgName = ref('')
const msg = ref('')
const formTitle = ref('')
const chatId = import.meta.env.TG_CHAT_ID
const botToken = import.meta.env.NEWSLETTER_BOT_TOKEN
const telegram_message = `<strong>New ${formTitle.value}</strong>\nEmail: <code>${msgMail.value}</code>\n\nName: <code>${name.value}</code>\n`

// Function to handle contact form submission
function sendMessage() {
  if (!msgMail.value || !msgName.value || !msg.value) {
    alert('Please fill in all inputs')
    return
  } else {
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegram_message,
        parse_mode: 'HTML',
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Message sent successfully')
          setTimeout(() => {
            alert(`Thank you for subscribing! We'll send updates to ${msgMail.value}`)
            msgMail.value = '' // Clear the input field after submission
            name.value = '' // Clear the input field after submission
          }, 1000)
        } else {
          alert('Error sending message to Telegram')
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error)
        alert('An error occurred, please try again')
        msgMail.value = ''
        name.value = ''
      })
  }
}

// Function to handle newsletter subscription
function subscribeNewsletter() {
  if (!newsletterEmail.value || !name.value) {
    alert('Inputs is required!')
    return // Stop execution if email is empty
  } else {
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegram_message,
        parse_mode: 'HTML',
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Message sent successfully')
          setTimeout(() => {
            alert(`Thank you for subscribing! We'll send updates to ${newsletterEmail.value}`)
            newsletterEmail.value = '' // Clear the input field after submission
            name.value = '' // Clear the input field after submission
          }, 1000)
        } else {
          alert('Error sending message to Telegram')
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error)
        alert('An error occurred, please try again')
        newsletterEmail.value = ''
        name.value = ''
      })
  }

  // If email is provided, proceed with subscription logic
}
</script>

<template>
  <div class="flex flex-col text-gray-200 bg-[#4f117a] w-full">
    <Header />

    <!-- Hero Section -->
    <section
      class="contact-hero flex flex-col p-8 md:pr-20 md:flex-row gap-12 justify-between items-center max-w-[1400px] mx-auto relative overflow-hidden"
    >
      <!-- Gradient Background -->
      <div
        class="absolute grad inset-0 bg-gradient-to-r from-purple-900 to-[#4f117a] opacity-50 z-0"
      ></div>
      <div class="writeup text-2xl flex flex-col gap-4 max-w-[600px] md:pr-12 z-10">
        <h1 class="tag font-bold text-4xl md:text-5xl pt-20">Contact Us</h1>
        <h2 class="text-sm md:text-lg">We're here to help! Reach out to us anytime.</h2>
        <p class="text-lg">
          Whether you have questions, need support, or want to discuss a bulk order, our team is
          ready to assist you. Use the form below, or contact us directly via email or phone.
        </p>
      </div>

      <div
        class="relative flex flex-col items-center gap-10 md:w-full md:p-12 md:flex-row md:justify-center md:pl-11 z-10"
      >
        <!-- Suggested Image: A customer support representative or a team working together -->
        <img
          src="/src/assets/customer-service.webp"
          alt="Contact Us"
          class="md:z-10 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
        />
      </div>
    </section>

    <!-- Contact Methods Section -->
    <section class="contact-methods text-purple-950 py-20 px-8 relative overflow-hidden">
      <!-- Gradient Background -->
      <div class="absolute grad-white inset-0 bg-gradient-to-br from-purple-100 to-white opacity-30 z-0"></div>
      <div class="flex flex-col md:flex-row gap-12 max-w-[1400px] mx-auto z-10 justify-between">
        <!-- Contact Info -->
        <div
          class="intouch flex flex-col gap-8 max-w-[400px] bg-gray-200 p-8 rounded-xl shadow-lg h-fit z-10"
        >
          <h2 class="text-3xl md:text-4xl font-bold">Get in Touch</h2>
          <ul class="flex flex-col gap-4">
            <li class="text-lg flex items-center gap-2">
              <i class="bi bi-geo-alt text-amber-400 text-2xl"></i>
              <span>123 Social Media Street, Lagos, Nigeria</span>
            </li>
            <li class="text-lg flex items-center gap-2">
              <i class="bi bi-envelope text-amber-400 text-2xl"></i>
              <a
                href="mailto:tenonboost@gmail.com"
                class="hover:text-amber-400 transition-colors duration-300"
                >info@tenonboost.online</a
              >
            </li>
            <li class="text-lg flex items-center gap-2">
              <i class="bi bi-phone text-amber-400 text-2xl"></i>
              <a
                href="tel:+2349118760521"
                class="hover:text-amber-400 transition-colors duration-300"
                >+234 911 876 0521</a
              >
            </li>
          </ul>
        </div>

        <!-- Contact Form -->
        <div
          class="intouch flex flex-col gap-8 w-full max-w-[600px] bg-gray-200 p-8 rounded-xl shadow-lg z-10"
        >
          <h2 class="text-3xl md:text-4xl font-bold">Send Us a Message</h2>
          <form @submit.prevent="sendMessage" class="flex flex-col gap-6">
            <div class="flex flex-col gap-4">
              <label for="name" class="text-lg">Your Name</label>
              <input
                type="text"
                id="name"
                v-model="msgName"
                class="p-3 rounded-lg outline-none border border-gray-600 bg-transparent text-purple-950 focus:border-amber-400 focus:ring focus:ring-amber-400 transition-all duration-300"
                required
              />
            </div>
            <div class="flex flex-col gap-4">
              <label for="email" class="text-lg">Your Email</label>
              <input
                type="email"
                id="email"
                v-model="msgMail"
                class="p-3 rounded-lg outline-none border border-gray-600 bg-transparent text-purple-950 focus:border-amber-400 focus:ring focus:ring-amber-400 transition-all duration-300"
                required
              />
            </div>
            <div class="flex flex-col gap-4">
              <label for="message" class="text-lg">Message</label>
              <textarea
                id="message"
                v-model="msg"
                rows="5"
                class="p-3 rounded-lg outline-none border border-gray-600 bg-transparent text-purple-950 focus:border-amber-400 focus:ring focus:ring-amber-400 transition-all duration-300"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              class="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors duration-300 transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="newsletter bg-[#4f117a] text-gray-200 py-20 px-8 relative overflow-hidden">
      <!-- Gradient Background -->
      <div
        class="absolute bg-gradient-to-br from-purple-900 to-[#4f117a] opacity-50 z-0"
      ></div>
      <div class="flex newsletter flex-col gap-8 max-w-[1400px] mx-auto z-10">
        <h2 class="text-3xl md:text-4xl font-bold text-center">
          Subscribe to Our Newsletter
        </h2>
        <p class="text-lg md:text-xl text-center">
          Stay updated with the latest offers and news from TenonBoost.
        </p>
        <form
          @submit.prevent="subscribeNewsletter"
          class="flex flex-col gap-4 max-w-[600px] mx-auto"
        >
          <input
            type="email"
            v-model="newsletterEmail"
            placeholder="Enter your email"
            class="p-3 rounded-lg outline-none border border-gray-200 bg-transparent text-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400 transition-all duration-300"
            required
          />
          <button
            type="submit"
            class="bg-amber-400 text-gray-900 p-3 rounded-lg hover:bg-amber-500 transition-colors duration-300 transform hover:scale-105"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
.intouch{
  background: #ececec;
  color: #4f117a;
}

.intouch input, textarea{
  border: 1px solid 
}

.intouch button {
  background: #97009c
}

  .grad{
    background: linear-gradient(to right,#97009c, #4f117a)
  }
  .grad-white{
    background: linear-gradient(to right,#d9beec,#fff)
  }

  .newsletter{
    background: linear-gradient(to bottom, #4f117a,#4f0074)
  }

  .newsletter input{
    border: 1px solid #fff
  }

  .newsletter button{
    background: #faab00;
    color: #4f117a
  }

</style>
