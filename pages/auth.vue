<template>
  <div id="AuthPage" class="w-full h-[100vh] bg-white">
    <div
      class="w-full flex items-center justify-center p-5 border-b border-b-gray-300"
    >
      <NuxtLink to="/" class="mix-w-[170px]">
        <img src="/AliExpress-logo.png" width="170" alt="" />
      </NuxtLink>
    </div>
    <div class="max-w-[400px] mx-auto px-2">
      <div class="text-center my-6">Login / Register</div>

      <button
        @click="login('google')"
        class="flex items-center justify-center gap-3 p-1.5 w-full border hover:bg-gray-100 rounded-full text-lg font-semibold"
      >
        <img src="/google-logo.png" class="w-full max-w-[30px]" alt="" />
        <div>Google</div>
      </button>

      <button
        @click="login('github')"
        class="mt-4 flex items-center justify-center gap-3 p-1.5 w-full border hover:bg-gray-100 rounded-full text-lg font-semibold"
      >
        <img src="/github-logo.png" class="w-full max-w-[30px]" alt="" />
        <div>Github</div>
      </button>

      {{ user }}
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient();
const user = useSupabaseUser();

watchEffect(() => {
  if (user.value) {
    return navigateTo("/");
  }
});

const login = async (prov) => {
  const { data, error } = await client.auth.signInWithOAuth({
    provider: prov,
  });
};
</script>
