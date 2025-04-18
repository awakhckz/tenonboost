<template>
  <div class="p-6 text-center">
    <h2 class="text-xl font-bold">Watch Ads to Earn Followers</h2>
    
    <p v-if="adWatched < 10" class="my-2">Ads Watched: {{ adWatched }}/10</p>

    <button 
      @click="loadAd" 
      :disabled="adWatched >= 10 || adPlaying" 
      class="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {{ adPlaying ? "Ad Playing..." : "Watch Ad" }}
    </button>

    <div v-if="adPlaying" class="mt-4">
      <video id="vastPlayer" class="w-full max-w-lg mx-auto" controls autoplay>
        <source :src="vastAdUrl" type="application/x-mpegURL">
        Your browser does not support the video tag.
      </video>
    </div>

    <div v-if="adWatched >= 10" class="mt-4">
      <input type="text" v-model="profileLink" placeholder="Enter Profile Link" class="border p-2 rounded w-full">
      <button @click="claimReward" class="px-4 py-2 mt-2 bg-green-500 text-white rounded">Claim Reward</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const adWatched = ref(parseInt(localStorage.getItem("adWatched")) || 0);
const adPlaying = ref(false);
const profileLink = ref("");

const vastAdUrl = "https://s.magsrv.com/v1/vast.php?idzone=5557438";

const loadAd = () => {
  adPlaying.value = true;
  const videoElement = document.getElementById("vastPlayer");
  
  if (videoElement) {
    videoElement.play();
    setTimeout(() => {
      adWatched.value++;
      localStorage.setItem("adWatched", adWatched.value);
      adPlaying.value = false;
    }, 30000); // Ensure ad plays for 30 seconds before counting
  }
};

const claimReward = async () => {
  if (!profileLink.value.trim()) {
    alert("Please enter your profile link!");
    return;
  }

  const chatId = import.meta.env.VITE_TG_CHAT_ID;
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const telegramMessage = `<strong>New Reward Claim</strong>\nProfile Link: <code>${profileLink.value}</code>\nWatched Ads: ${adWatched.value}`;

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: telegramMessage,
      parse_mode: "HTML",
    }),
  });

  if (response.ok) {
    alert("Claim successful! We'll review and process your request.");
    localStorage.setItem("adWatched", 0);
    adWatched.value = 0;
    profileLink.value = "";
  } else {
    alert("Failed to send claim. Try again.");
  }
};

onMounted(() => {
  if (adWatched.value >= 10) {
    adPlaying.value = false;
  }
});
</script>

<style scoped>
button:disabled {
  background-color: gray;
  cursor: not-allowed;
}
</style>
