<template>
  <div id="MenuOverlay" class="fixed z-50 bottom-0 h-full w-full bg-white px-3">
    <div class="flex items-center justify-between py-5">
      <NuxtLink to="/" @click="userStore.isMenuOverlay = false">
        <img src="/AliExpress-logo.png" width="170" alt="" />
      </NuxtLink>

      <button
        @click="userStore.isMenuOverlay = false"
        class="rounded-full p-1 hover:bg-gray-200"
      >
        <Icon name="mdi:close" size="30" />
      </button>
    </div>

    <div class="flex items-center justify-between pt-5">
      <ul class="w-full">
        <li
          class="relative flex items-center justify-between py-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer"
          @click="goTo('orders')"
        >
          <div class="flex items-center text-[20px] font-semibold">
            <Icon name="ph:pen-light" size="33" />
            <span class="pl-4">My Orders</span>
          </div>
        </li>
        <li
          class="relative flex items-center justify-between py-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer"
          @click="goTo('shoppingcart')"
        >
          <div class="flex items-center text-[20px] font-semibold">
            <Icon name="ph:shopping-cart-simple-light" size="33" />
            <span class="pl-4">Cart</span>
          </div>
          <div
            class="flex items-center justify-center bg-[#FF4646] h-[35px] min-w-[35px] text-lg text-white rounded-full"
          >
            {{ userStore.cart.length }}
          </div>
        </li>
        <li
          class="relative flex items-center justify-between py-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer"
          v-if="false"
          @click="signOut()"
        >
          <div class="flex items-center text-[20px] font-semibold">
            <Icon name="ph:sign-out-light" size="33" />
            <span class="pl-4">Sign out</span>
          </div>
        </li>

        <li
          class="relative flex items-center justify-between py-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer"
          v-else
          @click="signIn()"
        >
          <div class="flex items-center text-[20px] font-semibold">
            <Icon name="ph:sign-in-light" size="33" />
            <span class="pl-4">Sign in / Register</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/user";
const userStore = useUserStore();
// const client = useSupabaseClient();
// const user = useSupabaseUser();

const goTo = (url) => {
  userStore.isMenuOverlay = false;
  return navigateTo(`/${url}`);
};

const signOut = () => {
  client.auth.signOut();
  userStore.isMenuOverlay = false;
  return navigateTo("/");
};

const signIn = () => {
  userStore.isMenuOverlay = false;
  return navigateTo("/auth");
};
</script>
