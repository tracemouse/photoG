<template>
    <div class="footer mt-3 py-3">
 
        <div class="container-xxl text-center mt-3">
 
            Copyright © {{ currentYear }}, all rights reserved
        </div>
    </div>
</template>
<script setup lang="ts">
const currentYear = new Date().getFullYear();
 
</script>

<style lang="scss" scoped>
    .footer{
        background-color: var(--bs-border-color);
        color: var(--bs-secondary-color);
        padding: 48px 0;
        font-size: 0.9rem;

        a{
            color: var(--bs-secondary-color) !important;
        }

        a:hover{
            color: var(--bs-danger) !important;
        }
    }


</style>