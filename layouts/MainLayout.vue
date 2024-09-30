<template>
  <div>
    <div id="MainLayout" class="w-full fixed z-50">
      <div id="TopMenu" class="w-full bg-[#fafafa] border-b md:block hidden">
        <ul
          class="flex items-center justify-end text-xs text-[#333333] font-light px-2 h-10 bg-[#fafafa] max-w-[1200px]"
        >
          <li
            class="border-r border-r-gray-400 px-3 hover:text-[#FF4646] cursor-pointer"
          >
            Sell on AliExpress
          </li>
          <li
            class="border-r border-r-gray-400 px-3 hover:text-[#FF4646] cursor-pointer"
          >
            Cookie Preferences
          </li>
          <li
            class="border-r border-r-gray-400 px-3 hover:text-[#FF4646] cursor-pointer"
          >
            Help
          </li>
          <li
            class="border-r border-r-gray-400 px-3 hover:text-[#FF4646] cursor-pointer"
          >
            Buyer Protection
          </li>
          <li class="px-3 hover:text-[#FF4646] cursor-pointer">
            <Icon name="ic:sharp-install-mobile" size="17" /> <span>App</span>
          </li>
          <li
            @mouseenter="isAccountMenu = true"
            @mouseleave="isAccountMenu = false"
            class="relative flex items-center px-2.5 hover:text-[#ff4646] h-full cursor-pointer"
            :class="
              isAccountMenu
                ? 'bg-white z-40 shadow-[0_15px_100px_40px_rgba(0,0,0,0.3)]'
                : 'border border-[#fafafa]'
            "
          >
            <Icon name="ph:user-thin" size="17" />
            Account
            <Icon name="mdi:chevron-down" size="15" class="ml-5" />

            <div
              id="AccountMenu"
              v-if="isAccountMenu"
              class="absolute bg-white w-[220px] text-[#333333] z-40 top-[38px] -left-[100px] border-x border-b"
            >
              <div v-if="!user">
                <div class="font-semibold text-[15px] my-4 px-3">
                  Welcome to AliExpress!
                </div>
                <div class="flex items-center gap-1 px-3 mb-3">
                  <NuxtLink
                    to="/auth"
                    class="bg-[#FF4646] text-center w-full text-[16px] rounded-sm text-white font-semibold p-2"
                  >
                    Login / Register
                  </NuxtLink>
                </div>
              </div>
              <div class="border-b"></div>
              <ul class="bg-white">
                <li
                  @click="navigateTo('/orders')"
                  class="text-[13px] py-2 px-4 w-full hover:bg-gray-200"
                >
                  My Orders
                </li>
                <li
                  v-if="user"
                  @click="client.auth.signOut()"
                  class="text-[13px] py-2 px-4 w-full hover:bg-gray-200"
                >
                  Sign out
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      <div class="flex items-center w-full bg-white" id="MainHeader">
        <div
          class="flex lg:justify-start justify-between gap-10 max-w-[1150px] w-full px-3 py-5 mx-auto"
        >
          <NuxtLink to="/" class="min-w-[170px]">
            <img src="/AliExpress-logo.png" width="170" alt="logo" />
          </NuxtLink>
          <div class="max-w-[700px] w-full md:block hidden">
            <div class="relative">
              <div
                class="flex items-center border-2 border-[#EF4646] rounded-md w-full"
              >
                <input
                  type="text"
                  v-model="searchItem"
                  placeholder="kitchen accessories"
                  class="w-full placeholder-gray-400 text-sm pl-3 focus:outline-none"
                />
                <Icon
                  v-if="isSearching"
                  name="eos-icons:loading"
                  size="25"
                  class="mr-2"
                />
                <button
                  class="flex items-center h-[100%] p-1.5 px-2 bg-[#EF4646]"
                >
                  <Icon
                    name="ph:magnifying-glass"
                    size="20"
                    class="text-white"
                  />
                </button>
              </div>
              <div
                v-if="items && items.data"
                class="absolute bg-white max-w-[700px] h-auto w-full"
              >
                <div v-for="item in items.data" :key="item" class="p-1">
                  <NuxtLink
                    :to="`/item/${item.id}`"
                    class="flex items-center justify-between w-full cursor-pointer hover:bg-gray-100"
                  >
                    <div class="flex items-center">
                      <img :src="item.url" class="rounded-md" width="40" />
                      <div class="truncate ml-2">{{ item.title }}</div>
                    </div>
                    <div class="truncate">$ {{ item.price / 100 }}</div>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <NuxtLink to="/shoppingcart" class="flex items-center">
            <button
              class="relative md:block hidden"
              @mouseenter="isCartHover = true"
              @mouseleave="isCartHover = false"
            >
              <span
                class="absolute z-[10] flex items-center justify-center -right-[3px] top-0 bg-[#ff4646] h-[17px] min-w-[17px] text-xs text-white px-0.5 rounded-full"
              >
                {{ userStore.cart.length }}
              </span>
              <div class="min-w-[40px]">
                <Icon
                  name="ph:shopping-cart-simple-light"
                  size="33"
                  :class="isCartHover ? 'text-[#FF4646]' : ''"
                />
              </div>
            </button>
          </NuxtLink>

          <button
            @click="userStore.isMenuOverlay = true"
            class="md:hidden block rounded-full p-1.5 -mt-[4px] hover:bg-gray-200"
          >
            <Icon size="33" name="radix-icons:hamburger-menu" />
          </button>
        </div>
      </div>
    </div>

    <Loading v-if="userStore.isLoading" />

    <div class="lg:pt-[150px] md:pt-[130px] pt-[80px]"></div>
    <slot />

    <Footer />
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/user";
const userStore = useUserStore();

const client = useSupabaseClient();
const user = useSupabaseUser();

let isAccountMenu = ref(false);
let isCartHover = ref(false);
let searchItem = ref("");
let isSearching = ref(false);
let items = ref(null);

const searchByName = useDebounce(async () => {
  isSearching.value = true;
  items.value = await useFetch(
    `/api/prisma/search-by-name/${searchItem.value}`
  );
  isSearching.value = false;
}, 100); // trì hoãn việc thực thi của hàm hoặc thay đổi giá trị cho đến khi một khoảng thời gian nhất định trôi qua

watch(
  () => searchItem.value,
  async () => {
    if (!searchItem.value) {
      setTimeout(() => {
        items.value = "";
        isSearching.value = false;
        return;
      }, 500);
    }
    searchByName();
  }
);
</script>
