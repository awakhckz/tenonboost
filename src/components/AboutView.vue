<template>
  <div class="flex abt-page flex-col text-gray-200 bg-[#4f117a] w-full">
    <Header />

    <!-- Hero Section -->
    <section class="about-hero flex flex-col p-8 md:pr-20 md:flex-row gap-12 items-center max-w-[1400px] mx-auto pt-32 justify-between">
      <div class="writeup text-2xl flex flex-col gap-4 max-w-[600px] md:pr-12">
        <h1 class="tag font-bold text-4xl md:text-5xl">
          About TenonBoost
        </h1>
        <h2 class="text-sm md:text-lg">
          Your Trusted Partner for Instant Social Media Growth
        </h2>
        <p class="text-lg">
          At TenonBoost, we specialize in delivering fast, reliable, and affordable social media marketing services. Whether you need Instagram followers, YouTube views, TikTok likes, or more, we’ve got you covered – all delivered in just 2 minutes!
        </p>
      </div>

      <div class="relative flex flex-col items-center gap-10 md:w-full md:p-12 md:flex-row md:justify-center md:pl-11">
        <!-- Suggested Image: A team working together or a person managing social media accounts -->
        <img
          src="/src/assets/about-hero.webp"
          alt="About TenonBoost"
          class="md:w-[500px] md:z-10 rounded-lg shadow-lg"
        />
      </div>
    </section>

    <!-- Mission Section -->
    <section class="mission text-purple-950 py-20 px-8">
      <div class="flex flex-col md:flex-row gap-12 max-w-[1400px] mx-auto items-center">
        <div class="flex flex-col gap-8 max-w-[600px]">
          <h2 class="text-3xl md:text-4xl font-bold ">Our Mission</h2>
          <p class="text-lg md:text-xl">
            Our mission is to help individuals and businesses grow their social media presence quickly and effortlessly. We believe in providing high-quality services that are fast, secure, and affordable, so you can focus on what matters most – your content and audience.
          </p>
        </div>
        <!-- Suggested Image: A vision board or a team brainstorming -->
        <img
          src="/src/assets/mission.webp"
          alt="Our Mission"
          class="w-full md:h-[400px] md:w-[600px] rounded-lg shadow-lg"
        />
      </div>
    </section>

    <!-- Values Section -->
    <section class="values secondary text-gray-200 py-20 px-8">
      <div class="flex flex-col gap-12 max-w-[1400px] mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-center">Our Core Values</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="cards bg-amber-400 text-gray-700 p-8 flex flex-col gap-5 rounded-xl hover:scale-105 transition-transform duration-300">
            <div class="img bg-purple-900 w-16 rounded-full p-2 h-16 flex items-center justify-center">
              <i class="bi bi-speedometer text-4xl text-white"></i>
            </div>
            <p class="text-xl font-bold">Speed</p>
            <p class="text-lg">
              We deliver your orders in just 2 minutes – no delays, no excuses.
            </p>
          </div>
          <div class="cards bg-amber-400 text-gray-700 p-8 flex flex-col gap-5 rounded-xl hover:scale-105 transition-transform duration-300">
            <div class="img bg-purple-900 w-16 rounded-full p-2 h-16 flex items-center justify-center">
              <i class="bi bi-shield-check text-4xl text-white"></i>
            </div>
            <p class="text-xl font-bold">Security</p>
            <p class="text-lg">
              Your data and payments are safe with us. We use secure payment gateways to protect your information.
            </p>
          </div>
          <div class="cards bg-amber-400 text-gray-700 p-8 flex flex-col gap-5 rounded-xl hover:scale-105 transition-transform duration-300">
            <div class="img bg-purple-900 w-16 rounded-full p-2 h-16 flex items-center justify-center">
              <i class="bi bi-people text-4xl text-white"></i>
            </div>
            <p class="text-xl font-bold">Customer Focus</p>
            <p class="text-lg">
              We prioritize your satisfaction and are always here to support you with 24/7 customer service.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team bg-white text-purple-950 py-20 px-8">
      <div class="flex flex-col gap-12 max-w-[1400px] mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-center">Meet Our Team</h2>
        <p class="text-lg md:text-xl text-center max-w-[600px] md:place-self-center">
          Behind TenonBoost is a dedicated team of professionals passionate about social media and digital marketing. We work tirelessly to ensure you get the best service possible.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="team-member flex flex-col gap-4 items-center hover:scale-105 transition-transform duration-300">
            <!-- Suggested Image: A professional headshot of a team member -->
            <img
              src="/src/assets/ceo.webp"
              alt="Tenon Boost COE & Founder"
              class="w-[200px] h-[200px] rounded-full object-cover shadow-lg"
            />
            <p class="text-xl font-bold">ThankGod A. Kalu</p>
            <p class="text-lg">CEO & Founder</p>
          </div>
          <div class="team-member flex flex-col gap-4 items-center hover:scale-105 transition-transform duration-300">
            <img
              src="/src/assets/marketing.webp"
              alt="Tenon Boost Marketing Specialist"
              class="w-[200px] h-[200px] rounded-full object-cover shadow-lg"
            />
            <p class="text-xl font-bold">Vincent Charry</p>
            <p class="text-lg">Marketing Specialist</p>
          </div>
          <div class="team-member flex flex-col gap-4 items-center hover:scale-105 transition-transform duration-300">
            <img
              src="/src/assets/support.webp"
              alt="Tenon Boost Support Lead"
              class="w-[200px] h-[200px] rounded-full object-cover shadow-lg"
            />
            <p class="text-xl font-bold">MaryAnn Sam.</p>
            <p class="text-lg">Customer Support Lead</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call-to-Action Section -->
    <section class="cta secondary text-gray-200 py-20 px-8">
      <div class="flex flex-col gap-8 max-w-[1400px] mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold ">Ready to Boost Your Social Media?</h2>
        <p class="text-lg md:text-xl ">
          Join thousands of satisfied customers and grow your presence today. No account needed – just fast, reliable service!
        </p>
        <RouterLink to="/order"
          class=" group relative text-2xl rounded text-center p-4 w-[200px] mx-auto transition-all ease-linear duration-500 bg-purple-400 bg-gradient-to-r from-purple-950 hover:bg-purple-500 order-btn"
        >
          <span
            class="absolute inset-0 bg-gradient-to-l bg-purple-400 from-purple-950 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300 rounded"
          ></span>Order Now
        </RouterLink>
      </div>
    </section>

    <Footer />
    <Telegram />
  </div>
</template>

<script setup>
import Header from './Layouts/Header.vue'
import Footer from './Layouts/Footer.vue'
import Telegram from './Layouts/Telegram.vue'
</script>

<style scoped>
.mission{
  color: #4f117a;
  background: #fff;
  justify-items: space-between;
}

.team{
  color: #4f117a;
}

.cta {
  color: aliceblue;
}
.cards{
  color: #4f117a;
}
</style>