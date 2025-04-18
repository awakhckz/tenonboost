<template>
  <footer class=" bg-[url(/src/assets/wavegray.svg)] bg-contain bg-no-repeat text-gray-700 pt-12 ">
    <div class="flex flex-col bg-[#e5e7eb] gap-12 max-w-[1400px] mx-auto px-8 py-8">
      <!-- About Section -->
      <div class="flex flex-col gap-4 max-w-[300px]">
        <router-link to="/" class="w-40"><img src="/src/assets/tenonboost_colored.png" alt="tenonboost"></router-link>
        <!-- <h3 class="text-xl font-bold">About TenonBoost</h3>
        <p class="text-lg">
          TenonBoost is your trusted partner for instant social media growth. We deliver fast, reliable, and affordable SMM services to help you grow your online presence.
        </p> -->
        <div class="flex gap-4">
          <a href="https://www.facebook.com/share/18sbtjmPHb/" class="text-gray-700 hover:text-amber-400 transition-colors duration-300" alt="tenonboost facebook">
            <i class="bi bi-facebook text-2xl" alt="tenonboost facebook"></i>
          </a>
          <a href="https://instagram.com/tenonboost" target="blank" class="text-gray-700 hover:text-amber-400 transition-colors duration-300" alt="tenonboost instagram">
            <i class="bi bi-instagram text-2xl" alt="tenonboost instagram"></i>
          </a>
          <!-- <a href="#" class="text-gray-700 hover:text-amber-400 transition-colors duration-300">
            <i class="bi bi-twitter text-2xl"></i>
          </a> -->
          <a href="https://tiktok.me/tenonboost" class="text-gray-700 hover:text-amber-400 transition-colors duration-300" alt="tenonboost tiktok">
            <i class="bi bi-tiktok text-2xl" alt="tenonboost tiktok"></i>
          </a>
        </div>
      </div>
<div class="flex flex-col gap-8 md:flex-row justify-between w-full">
      <!-- Quick Links Section -->
      <div class="flex flex-col gap-4">
        <h3 class="text-xl font-bold">Quick Links</h3>
        <ul class="flex flex-col gap-2">
          <li>
            <RouterLink to="/" class="text-lg hover:text-amber-400 transition-colors duration-300">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/services" class="text-lg hover:text-amber-400 transition-colors duration-300">Services</RouterLink>
          </li>
          <li>
            <RouterLink to="/about" class="text-lg hover:text-amber-400 transition-colors duration-300">About Us</RouterLink>
          </li>
          <li>
            <RouterLink to="/contact-us" class="text-lg hover:text-amber-400 transition-colors duration-300">Contact Us</RouterLink>
          </li>
        </ul>
      </div>

      <!-- Contact Info Section -->
      <div class="flex flex-col gap-4">
        <h3 class="text-xl font-bold">Contact Info</h3>
        <ul class="flex flex-col gap-2">
          <li class="text-lg flex items-center gap-2">
            <i class="bi bi-geo-alt text-amber-400"></i>
            <a href="https://www.google.com/maps/place/35+Evo+Road,+GRA,+Port+Harcourt+500101,+Rivers/data=!4m2!3m1!1s0x1069ce7c3e9b72e9:0xd1692848687865e6?sa=X&ved=1t:242&ictx=111" class="hover:text-amber-400 text-sm md:text-lg">35 Evo Road,GRA,Port Harcourt+500101,+Rivers Nigeria</a>
          </li>
          <li class="text-lg flex items-center gap-2">
            <i class="bi bi-envelope text-amber-400"></i>
            <a href="mailto:tenonboost@gmail.com" class="hover:text-amber-400 transition-colors duration-300">tenonboost@gmail.com</a>
          </li>
          <!-- <li class="text-lg flex items-center gap-2">
            <i class="bi bi-phone text-amber-400"></i>
            <a href="tel:+2349118760521" class="hover:text-amber-400 transition-colors duration-300">+234 911 876 0521</a>
          </li> -->
        </ul>
      </div>

      <!-- Newsletter Section -->
      <div class="flex flex-col gap-4 max-w-[400px]">
        <h3 class="text-xl font-bold">Subscribe to Our Newsletter</h3>
        <p class="text-lg">
          Stay updated with the latest offers and news from TenonBoost.
        </p>
        <form @submit.prevent="subscribeNewsletter" id="form" class="flex flex-col gap-4">
          <input
            type="email"
            v-model="email"
            placeholder="Enter your email"
            class="p-3 rounded-lg outline-none border border-gray-700 bg-transparent text-gray-700"
          />
          <button
            type="submit"
            class="bg-amber-400 text-gray-900 p-3 rounded-lg hover:bg-amber-500 transition-colors duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div></div>

    <!-- Copyright Section -->
    <div class="text-center mt-12 pt-8 border-t border-gray-700 bg-[#e5e7eb] pb-12">
      <p class="text-lg">
        &copy; 2023 TenonBoost. All rights reserved.
      </p>
      <p class="text-lg">
        <RouterLink to="/policy" class="hover:text-amber-400 transition-colors duration-300">Privacy Policy</RouterLink> | 
        <RouterLink to="/terms" class="hover:text-amber-400 transition-colors duration-300">Terms of Service</RouterLink>
      </p>
    </div>
  </footer>
</template>

<script setup>

// import { meta } from 'eslint-plugin-vue'
import { ref } from 'vue'
// import { useRouter } from 'vue-router';

// const router = useRouter();

// Create a ref to bind the email input field
const email = ref('')
const chatId = import.meta.env.VITE_TG_CHAT_ID
const botToken = import.meta.env.VITE_NEWSLETTER_BOT_TOKEN
// Newsletter subscription logic
function subscribeNewsletter() {
  const telegram_message = `You have a New Subscriber On NewsLetter ${email.value}`
  if (!email.value) {
    alert('Email is required!')
    return // Stop execution if email is empty
  } else{
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegram_message,
          parse_mode: "HTML",
        }),
      })
      .then((response) => {
          if (response.ok) {
            console.log("Message sent successfully");
            setTimeout(() => {
                alert(`Thank you for subscribing! We'll send updates to ${email.value}`)
                email.value = '' // Clear the input field after submission
            }, 1000);
          } else {
            alert("Error sending message to TenonBoost News Letter");
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
          alert("An error occurred, please try again");
          email.value = ''
        });
  }

  // If email is provided, proceed with subscription logic
}
</script>

<style scoped>
footer{
  color: #2c2c2c;
}

footer input{
  border: 2px solid #2c2c2c
}

footer button {
  background: #fbbf24;
}

footer a:hover {
  color: #fbbf24; /* Amber-400 */
}
</style>