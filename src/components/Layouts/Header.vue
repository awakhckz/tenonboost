<script setup>
import { ref } from 'vue';
const mobileNav = ref(false)
const openNav = ()=>{
mobileNav.value = !mobileNav.value
}
</script>

<template>
    <div class="header flex p-4 items-center justify-between fixed w-full light-p z-20">
    <div class="logo text-2xl text-white flex items-center"><img src="/src/assets/logo_white.png" width="170" alt=""></div>
    <div class="nav text-white text-lg relative flex items-center">
        <i @click="openNav" class="bi bi-text-right md:hidden cursor-pointer"></i>
        <nav class="md:flex flex-col justify-between hidden absolute -right-4 top-10  secondary whitespace-nowrap p-6 gap-6 w-fit h-fit md:relative md:flex-row md:top-0 md:right-0 md:bg-transparent">
            <router-link to="/about">About Us</router-link>
            <router-link to="/services">Services</router-link>
            <router-link to="/contact">Contact Us</router-link>
        </nav>
    </div>
         <div v-if="mobileNav" class="mobile-nav secondary text-white text-lg absolute top-23 right-0 flex items-center w-full">
        <!-- <i @click="closeNav" class="bi bi-text-left md:hidden"></i> -->
        <nav class="flex flex-col text-center md:hidden whitespace-nowrap p-12 gap-12 h-screen w-full">
            <router-link to="/about">About Us</router-link>
            <router-link to="/services">Services</router-link>
            <router-link to="/contact">Contact Us</router-link>
        </nav>
    </div>    
    </div>
</template>