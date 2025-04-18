<template>
  <div class="flex flex-col text-gray-200 bg-[#4f117a] w-full">
    <Header />

    <!-- Hero Section -->
    <section class="terms-hero flex flex-col p-8 md:pr-20 md:flex-row gap-12 justify-between items-center max-w-[1400px] mx-auto pt-30">
      <div class="writeup text-2xl flex flex-col gap-4 max-w-[600px] md:pr-12">
        <h1 class="tag font-bold text-4xl md:text-5xl">
          Terms of Service
        </h1>
        <h2 class="text-sm md:text-lg">
          Please read these terms carefully before using our services.
        </h2>
        <p class="text-lg">
          By accessing or using TenonBoost, you agree to be bound by these terms. If you do not agree to all the terms, you may not use our services.
        </p>
      </div>

      <div class="relative flex flex-col items-center gap-10 md:w-full md:p-12 md:flex-row md:justify-center md:pl-11">
        <!-- Suggested Image: A legal document or contract -->
        <img
          src="/src/assets/tenonboostterms.webp"
          alt="Terms of Service"
          class="w-[300px] md:w-[500px] md:z-10 rounded-lg shadow-lg"
        />
      </div>
    </section>

    <!-- Terms Content Section -->
    <section class="terms-content bg-white text-purple-950 py-20 px-8">
      <div class="flex flex-col gap-8 max-w-[1200px] mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-center">Terms of Service</h2>
        <div class="prose max-w-none">
          <h3 class="text-2xl font-bold">1. Acceptance of Terms</h3>
          <p>
            By using TenonBoost, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>

          <h3 class="text-2xl font-bold">2. Description of Services</h3>
          <p>
            TenonBoost provides social media marketing services, including but not limited to Instagram followers, YouTube views, TikTok likes, and more. All services are delivered electronically.
          </p>

          <h3 class="text-2xl font-bold">3. User Responsibilities</h3>
          <p>
            You agree to use TenonBoost only for lawful purposes and in accordance with these terms. You are responsible for ensuring that your use of our services complies with all applicable laws and regulations.
          </p>

          <h3 class="text-2xl font-bold">4. Payment and Refunds</h3>
          <p>
            All payments are processed securely through our payment gateway. Refunds are only provided in accordance with our Refund Policy, which can be found on our website.
          </p>

          <h3 class="text-2xl font-bold">5. Intellectual Property</h3>
          <p>
            All content and materials provided by TenonBoost, including but not limited to text, graphics, logos, and software, are the property of TenonBoost and are protected by intellectual property laws.
          </p>

          <h3 class="text-2xl font-bold">6. Limitation of Liability</h3>
          <p>
            TenonBoost shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of our services.
          </p>

          <h3 class="text-2xl font-bold">7. Changes to Terms</h3>
          <p>
            We reserve the right to modify these terms at any time. Any changes will be effective immediately upon posting on our website. Your continued use of our services constitutes acceptance of the updated terms.
          </p>

          <h3 class="text-2xl font-bold">8. Governing Law</h3>
          <p>
            These terms are governed by and construed in accordance with the laws of Nigeria. Any disputes arising from these terms shall be resolved in the courts of Nigeria.
          </p>

          <h3 class="text-2xl font-bold">9. Contact Us</h3>
          <p>
            If you have any questions about these terms, please contact us at <a href="mailto:tenonboost@gmail.com" class="text-purple-600 hover:text-purple-800">tenonboost@gmail.com</a>.
          </p>
        </div>
        <Telegram />
      </div>
    </section>

    <!-- Call-to-Action Section -->
    <section class="cta bg-[#4f117a] text-gray-200 py-20 px-8">
      <div class="flex flex-col gap-8 max-w-[1400px] mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold">Ready to Boost Your Social Media?</h2>
        <p class="text-lg md:text-xl">
          Join thousands of satisfied customers and grow your presence today. No account needed – just fast, reliable service!
        </p>
        <RouterLink
          to="/order"
          class="group relative text-2xl rounded text-center p-4 w-[200px] mx-auto transition-all ease-linear duration-500 bg-purple-400 bg-gradient-to-r from-purple-950 hover:bg-purple-500 order-btn"
        >
          <span
            class="absolute inset-0 bg-gradient-to-l bg-purple-400 from-purple-950 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300 rounded"
          ></span
          >Order Now
        </RouterLink>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import Header from './Layouts/Header.vue'
import Footer from './Layouts/Footer.vue'
import Telegram from './Layouts/Telegram.vue'
</script>

<style scoped>


.prose {
  line-height: 1.6;
}

.prose h3 {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

.prose p {
  margin-bottom: 1em;
}

.prose a {
  color: #9333ea; /* Purple-600 */
  text-decoration: underline;
}

.prose a:hover {
  color: #7e22ce; /* Purple-700 */
}

.terms-content{
  color: #4f117a
}
</style>