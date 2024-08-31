<script setup lang="ts">
import type { FormError } from "#ui/types";

// กำหนดไม่ให้ใช้ layout ใด ๆ
definePageMeta({
  layout: false,
});

const fields = [
  {
    name: "email",
    type: "text",
    label: "Email",
    placeholder: "Enter your email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
  {
    name: "remember",
    label: "Remember me",
    type: "checkbox",
  },
];

const validate = (state: any) => {
  const errors: FormError[] = [];
  if (!state.email)
    errors.push({ path: "email", message: "Email is required" });
  if (!state.password)
    errors.push({ path: "password", message: "Password is required" });
  return errors;
};

const providers = [
  {
    label: "Continue with GitHub",
    icon: "i-simple-icons-github",
    color: "white" as const,
    click: () => {
      console.log("Redirect to GitHub");
    },
  },
];

function onSubmit(data: any) {
  console.log("Submitted", data);
}
</script>

<template>
  <!-- Flexbox container สำหรับจัดให้อยู่กึ่งกลางแนวตั้งและแนวนอน -->
  <div class="flex items-center justify-center min-h-screen w-full h-screen bg-gray-100">
    <!-- Card สำหรับฟอร์มการเข้าสู่ระบบ -->
    <UCard class="max-w-sm w-full">
      <UAuthForm
        :fields="fields"
        :validate="validate"
        :providers="providers"
        title="Welcome back!"
        align="top"
        icon="i-heroicons-lock-closed"
        :ui="{ base: 'text-center', footer: 'text-center' }"
        @submit="onSubmit"
      >
        <template #description>
          Don't have an account?
          <NuxtLink to="/" class="text-primary font-medium">Sign up</NuxtLink>.
        </template>

        <template #password-hint>
          <NuxtLink to="/" class="text-primary font-medium"
            >Forgot password?</NuxtLink
          >
        </template>
        <template #validation >
          <UAlert
            color="red"
            icon="i-heroicons-information-circle-20-solid"
            title="Error signing in"
          />
        </template>
        <template #footer>
          By signing in, you agree to our
          <NuxtLink to="/" class="text-primary font-medium"
            >Terms of Service</NuxtLink
          >.
        </template>
      </UAuthForm>
    </UCard>
  </div>
</template>
