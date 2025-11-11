<template>
    <h2 class="color:#000;">Sample!!! {{ counter }}</h2>
</template>

<script setup>
import {ref} from 'vue';

const counter = ref(0);

setInterval(() => {
    counter.value++;
}, 1000);
</script>
