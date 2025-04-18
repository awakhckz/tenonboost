<template>
  <div class="flex flex-col text-gray-200 bg-[#4f117a] w-full">
    <Header />

    <!-- Hero Section -->
    <section class="privacy-hero flex flex-col p-8 md:pr-20 md:flex-row gap-12 justify-between items-center max-w-[1400px] mx-auto pt-30">
      <div class=" writeup text-2xl flex flex-col gap-4 max-w-[600px] md:pr-12">
        <h1 class="tag font-bold  text-4xl md:text-5xl">
          Privacy Policy
        </h1>
        <h2 class="text-sm md:text-lg ">
          Your privacy is important to us. Please read this policy carefully.
        </h2>
        <p class="text-lg ">
          This Privacy Policy explains how TenonBoost collects, uses, and protects your personal information when you use our services.
        </p>
      </div>

      <div class="relative flex flex-col items-center gap-10 md:w-full md:p-12 md:flex-row md:justify-center md:pl-11 ">
        <!-- Suggested Image: A shield or lock icon representing privacy -->
        <img
          src="/src/assets/tenonboost-privacy.webp"
          alt="Privacy Policy"
          class="w-[300px] md:w-[500px] md:z-10  rounded-lg shadow-lg"
        />
      </div>
    </section>

    <!-- Privacy Content Section -->
    <section class="privacy-content bg-white text-purple-950 py-10 px-8">
      <div class="flex flex-col gap-8 max-w-[1200px] mx-auto">
        <h2 class="tag text-3xl md:text-4xl font-bold text-center ">Privacy Policy</h2>
        <div class="prose max-w-none">
          <h3 class="text-2xl font-bold">1. Information We Collect</h3>
          <p>
            We collect information you provide directly to us, such as your name, email address, and payment details when you use our services. We also automatically collect certain information when you visit our website, including your IP address, browser type, and device information.
          </p>

          <h3 class="text-2xl font-bold">2. How We Use Your Information</h3>
          <p>
            We use your information to provide, maintain, and improve our services, process transactions, communicate with you, and personalize your experience. We may also use your information for security purposes and to comply with legal obligations.
          </p>

          <h3 class="text-2xl font-bold">3. Sharing Your Information</h3>
          <p>
            We do not sell or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and providing our services, but only to the extent necessary.
          </p>

          <h3 class="text-2xl font-bold">4. Data Security</h3>
          <p>
            We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
          </p>

          <h3 class="text-2xl font-bold">5. Your Rights</h3>
          <p>
            You have the right to access, update, or delete your personal information at any time. If you wish to exercise these rights, please contact us at <a href="mailto:tenonboost@gmail.com" class="text-purple-600 hover:text-purple-800">tenonboost@gmail.com</a>.
          </p>

          <h3 class="text-2xl font-bold">6. Cookies and Tracking Technologies</h3>
          <p>
            We use cookies and similar tracking technologies to enhance your experience on our website. You can control the use of cookies through your browser settings, but disabling cookies may affect the functionality of our website.
          </p>

          <h3 class="text-2xl font-bold">7. Third-Party Links</h3>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites. We encourage you to review the privacy policies of any third-party sites you visit.
          </p>

          <h3 class="text-2xl font-bold">8. Changes to This Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be effective immediately upon posting on our website. Your continued use of our services constitutes acceptance of the updated policy.
          </p>

          <h3 class="text-2xl font-bold">9. Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:tenonboost@gmail.com" class="text-purple-600 hover:text-purple-800">tenonboost@gmail.com</a>.
          </p>
        </div>
        <Telegram />
      </div>
    </section>

    <!-- Call-to-Action Section -->
    <section class="cta bg-[#4f117a] text-gray-200 py-20 px-8">
      <div class="flex flex-col gap-8 max-w-[1400px] mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold ">Ready to Boost Your Social Media?</h2>
        <p class="text-lg md:text-xl ">
          Join thousands of satisfied customers and grow your presence today. No account needed – just fast, reliable service!
        </p>
        <RouterLink
          to="/order"
          class=" group relative text-2xl rounded text-center p-4 w-[200px] mx-auto transition-all ease-linear duration-500 bg-purple-400 bg-gradient-to-r from-purple-950 hover:bg-purple-500 order-btn"
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
.privacy-content{
  color: #4f117a
}

.tag{
  background: #4f117a;
  color:#fff;
  padding: 5px
}

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
</style>