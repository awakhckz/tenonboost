<script setup>
import { onMounted } from 'vue'
import Header from './Layouts/Header.vue'
import Footer from './Layouts/Footer.vue'

function animateCountUp(el, target, duration = 5000) {
  let start = 0
  let increment = target / (duration / 16)
  let prefix = el.getAttribute('data-prefix') || ''
  let suffix = el.getAttribute('data-suffix') || ''
  let animationId

  function updateCounter() {
    start += increment
    if (start >= target) {
      el.textContent = prefix + target.toLocaleString() + suffix
      cancelAnimationFrame(animationId)
    } else {
      el.textContent = prefix + Math.floor(start).toLocaleString() + suffix
      animationId = requestAnimationFrame(updateCounter)
    }
  }

  updateCounter()

  // Cleanup function
  return () => {
    cancelAnimationFrame(animationId)
  }
}

function initBrandSlider() {
  const track = document.querySelector('.brand-track')
  if (!track) return

  const images = Array.from(track.children)
  let speed = 2
  let animationId
  let position = 0

  // Clone images dynamically
  images.forEach((image) => {
    let clone = image.cloneNode(true)
    track.appendChild(clone)
  })

  function scroll() {
    position -= speed
    track.style.transform = `translateX(${position}px)`
    // Safari needs webkit prefix
    track.style.webkitTransform = `translateX(${position}px)`

    if (position <= -track.scrollWidth / 2) {
      position = 0
    }

    animationId = requestAnimationFrame(scroll)
  }

  scroll()

  // Cleanup function
  return () => {
    cancelAnimationFrame(animationId)
  }
}

function initCounters() {
  document.querySelectorAll('.price').forEach((span) => {
    let target = parseInt(span.getAttribute('data-count'))
    animateCountUp(span, target)
  })
}

function initIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible')
      }
    })
  }, {
    threshold: 0.1
  })

  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el)
  })

  // Cleanup function
  return () => {
    observer.disconnect()
  }
}

onMounted(() => {
  const cleanupFunctions = [
    initBrandSlider(),
    initCounters(),
    initIntersectionObserver()
  ]

  // Cleanup when component unmounts
  return () => {
    cleanupFunctions.forEach(fn => fn && fn())
  }
})
</script>

<template>
  <div class="flex flex-col text-gray-200 secondary w-full">
    <Header />

    <section
      class="intro flex flex-col p-8 md:pr-20 md:flex-row py-32 md:pt-64 gap-12 justify-between"
    >
      <div class="reveal writeup text-3xl flex flex-col gap-4 md:w-[90%] md:pr-12">
        <p class="tag font-bold reveal">
          Fastest SMM Panel For Unlimited <span class="changes">Engagements</span>
        </p>

        <p class="text-sm reveal">
          Grow massively on social networks with high quality and cheap SMM services from our panel.
          Tenonboost is fast cheap and reliable for Instagram, YouTube, TikTok, Snapchat, Telegram
          and Facebook and many more platforms. No Bot Account
        </p>
        <div
          class="reveal group relative text-2xl rounded text-center p-4 w-[200px] transition-all ease-linear duration-500 order-btn"
        >
          <span
            class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300 rounded"
          ></span>
          <RouterLink to="/order" class="relative">Order Now</RouterLink>
        </div>
      </div>

      <div
        class="relative flex flex-col items-center gap-10 md:w-full md:p-12 md:flex-row md:justify-center md:pl-11 md:bg-[url(/src/assets/blob2.svg)] reveal"
      >
        <!-- <img src="/src/assets/blob2.svg" alt="tenonboost" class="absolute hidden md:flex z-30 inset-0 object-cover -top-40"> -->

        <img
          src="/src/assets/agency_img1.webp"
          alt="tenonboost"
          class="w-[400px] md:w-[200px] md:z-10 reveal rounded"
        />

        <img
          src="/src/assets/socialapps_mobile.webp"
          alt="tenonboost"
          class="w-[400px] md:w-[250px] md:relative md:z-10 reveal rounded"
        />

        <img
          src="/src/assets/shagi_bg_removed.webp"
          alt="tenonboost"
          class="w-[400px] bg-blue-800 shaggi md:w-[250px] md:absolute md:-top-[20%] reveal rounded"
        />
      </div>
    </section>
    <div
      class="reveal numbers flex flex-col md:flex-row gap-12 justify-between p-8 md:px-62 bg-white text-center delivery lex"
    >
      <p class="text-3xl">
        <span class="price text-2xl font-bold" data-count="1000" data-prefix="₦">₦0</span
        ><br />Cheap Services
      </p>
      <p class="text-3xl">
        <span class="price text-2xl font-bold" data-count="20000" data-suffix="+">0K+</span
        ><br />Happy Users
      </p>
      <p class="text-3xl">
        <span class="price text-2xl font-bold" data-count="300000" data-suffix="+">0K+</span
        ><br />Total Completed Orders
      </p>
    </div>

    <div class="benefits flex flex-col gap-6 pt-12 reveal">
      <p class="head text-3xl text-center">Why Choose Our SMM Services.</p>
      <div
        class="features bg-[url(/src/assets/wave1.svg)] bg-cover p-8 flex flex-col md:flex-row gap-12"
      >
        <div
          class="cheap reveal bg-amber-400 cards md:w-[400px] text-gray-700 p-8 flex flex-col gap-5 md:rounded-xl rounded-br-2xl rounded-tl-2xl"
        >
          <div
            class="img hover:shadow-md peer bg-purple-900 w-16 rounded-full p-2 h-16 flex items-center justify-center"
          >
            <i class="bi bi-tag text-4xl text-white"></i>
          </div>
          <p class="text-xl font-bold">Cheapest SMM Panel</p>
          <p class="title font-semibold">
            Our prices are cheapest in the market. Starting at ₦1,000
          </p>
        </div>
        <div
          class="cheap reveal bg-amber-400 cards md:w-[400px] text-gray-700 p-8 flex flex-col gap-5 md:rounded-xl rounded-br-2xl rounded-tl-2xl"
        >
          <div
            class="img hover:shadow-md peer bg-purple-900 w-16 rounded-full p-2 h-16 flex items-center justify-center"
          >
            <i class="bi bi-speedometer text-4xl text-white"></i>
          </div>
          <p class="text-xl font-bold">Fast Order Placement</p>
          <p class="title font-semibold">
            No stress on account creation and sign in. Place and order and get it deliverd ASAP
          </p>
        </div>
        <div
          class="cheap reveal bg-amber-400 md:w-[400px] cards text-gray-700 p-8 flex flex-col gap-5 md:rounded-xl rounded-br-2xl rounded-tl-2xl"
        >
          <div
            class="img hover:shadow-md peer bg-purple-900 w-16 rounded-full p-2 h-16 flex items-center justify-center"
          >
            <i class="bi bi-tag text-4xl text-white"></i>
          </div>
          <p class="text-xl font-bold">Swift And Secure Payment</p>
          <p class="title font-semibold">
            We accept all Debit/Credit Cards securely through the Paystack gateway.
          </p>
        </div>
      </div>
      <div class="brand-slider w-full overflow-hidden whitespace-nowrap relative reveal py-12 z-10">
        <div class="brand-track flex w-fit gap-4">
          <img
            src="/src/assets/fb-tenonboost.webp"
            alt="fb-tenonboost"
            class="w-[160px] h-[125px] md:w-40"
          />
          <img
            src="/src/assets/ig-tenonboost.webp"
            alt="ig-tenonboost"
            class="w-[160px] h-[125px] md:w-40"
          />
          <img
            src="/src/assets/tiktok-tenonboost.webp"
            alt="tiktok-tenonboost"
            class="w-[250px] h-[125px] md:w-40"
          />
          <img
            src="/src/assets/twitter-tenonboost.webp"
            alt="twitter-tenonboost"
            class="w-[160px] h-[125px] md:w-40"
          />
          <img
            src="/src/assets/linkedin-tenonboost.webp"
            alt="linkedin-tenonboost"
            class="w-[160px] h-[125px] md:w-40"
          />
          <img
            src="/src/assets/pinterest-tenonboost.webp"
            alt="pinterest-tenonboost"
            class="w-[160px] h-[125px] md:w-40"
          />
          <img
            src="/src/assets/spotify-tenonboost.webp"
            alt="spotify-tenonboost"
            class="w-[160px] h-[125px] md:w-40"
          />
          <img
            src="/src/assets/youtube-tenonboost.webp"
            alt="youtube-tenonboost"
            class="w-[120px] md:w-32"
          />
          <img
            src="/src/assets/ig-tenonboost.webp"
            alt="ig-tenonboost"
            class="w-[160px] h-[125px] md:w-40"
          />
        </div>
      </div>
    </div>

    <div
      class="intouch text-gray-900 bulk-white bg-gray-200 py-20 p-6 flex flex-col md:flex-row gap-8 md:gap-24 md:px-18 overflow-x-hidden relative"
    >
      <div
        class="contact text-xl md:text-2xl max-w-[800px] w-full flex flex-col gap-8 md:pt-12 reveal z-10"
      >
        <p class="font-bold text-2xl md:text-4xl lex">
          Want a bulk order? <br />
          Contact us quiclky to get it done ASAP
        </p>
        <a
          href="mailto:tenonboost@gmail.com"
          class="mail flex gap-4 text-lg md:text-4xl text-blue-800 w-fit"
          ><i class="bi bi-envelope-at"></i>tenonboost@gmail.com</a
        >
      </div>

      <div
        class="ball-shade w-72 md:w-96 h-72 md:h-96 rounded-full from-blue-600 bg-gradient-to-b absolute opacity-40 -top-10 -left-20 hidden md:block"
      ></div>

      <div class="inbox flex flex-col gap-8 w-full relative">
        <p class="capitalize text-xl lex md:text-4xl reveal z-10">...or send us a quick message!</p>
        <form @submit.prevent="sendMessage" class="flex flex-col gap-6 text-xl w-full z-10">
          <label for="name" class="flex flex-col gap-4 reveal"
            >Your Name
            <input
              type="text"
              name="name"
              id="name"
              class="outline-none rounded-xl border-b border-x border-gray-900 p-3"
          /></label>
          <label for="email" class="flex flex-col gap-4 reveal"
            >Your Email
            <input
              type="email"
              name="email"
              id="email"
              class="outline-none rounded-xl border-b border-x border-gray-900 p-3"
          /></label>
          <label for="message" class="flex flex-col gap-4 reveal"
            >Message
            <input
              type="text"
              name="message"
              id="message"
              class="outline-none rounded-xl border-b border-x border-gray-900 p-3"
          /></label>
          <button type="submit" class="bg-blue-600 send-btn text-white p-3 rounded-2xl max-w-[400px]">
            Send Message<i class="bi bi-send-check"></i>
          </button>
        </form>

        <div
          class="ball-shade w-72 md:w-96 h-72 md:h-96 pink-ball rounded-full from-pink-600 bg-gradient-to-b absolute top-20 right-0 rotate-45 opacity-20"
        ></div>
      </div>
    </div>

    <div class="newsletter py-12 px-8 text-xl w-full flex flex-col gap-6 md:flex-row md:gap-12">
      <div class="head capitalize flex flex-col gap-4 w-full text-3xl lex md:text-5xl md:gap-12 reveal">
        Never Miss out on updates and offers
        <p class="subhead quick text-lg md:text-2xl">
          Subscribe to our newsletter to get notified on any update and offers available.
        </p>
      </div>

      <form @submit.prevent="newsletter" class="newsletter-form w-full flex flex-col gap-6 reveal">
        <p class="title uppercase text-2xl bg-gray-600 p-2 w-fit">newsletter</p>
        <label for="name" class="flex flex-col gap-4 text-lg reveal">
          Name
          <input
            type="text"
            id="name"
            name="name"
            class="outline-none border-b border-x border-gray-200 rounded-2xl p-3"
          />
        </label>
        <label for="mail" class="flex flex-col gap-4 text-lg reveal">
          Email
          <input
            type="email"
            id="mail"
            name="mail"
            class="outline-none border-b border-x border-gray-200 rounded-2xl p-3"
          />
        </label>
        <button type="submit" class="bg-gray-300 text-blue-600 p-3 rounded-2xl max-w-[300px] ">SubsCribe</button>
      </form>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.shaggi{
  background:#0063f8;
}

.bulk-white{
  background: aliceblue;
  color: #2c2c2c;
}
.bulk-white input{
  border-bottom: 1px solid #2c2c2c;
  border-left: 1px solid #2c2c2c;
  border-right: 1px solid #2c2c2c;
}

.ball-shade{
background: linear-gradient(to bottom, blue, #ffffff00)
}

.pink-ball{
  background: linear-gradient(to bottom, #ff5fca, #ffffff00);
}

.send-btn{
  background:#0063f8
}

.newsletter{
  color: aliceblue
}

.newsletter button{
  background: aliceblue;
  color: #0063f8;
}

.newsletter input{
  border: 1px solid aliceblue;
}
.newsletter .title{
  background: gray
}
</style>
