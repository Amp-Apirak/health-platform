<script setup>
import { ref, watch } from "vue";

// กำหนด props ที่รับเข้ามา
const props = defineProps({
  isOpen: Boolean, // สถานะการเปิด/ปิด modal
  mode: {
    type: String,
    default: "add", // 'add' หรือ 'edit'
    validator: (value) => ["add", "edit"].includes(value),
  },
  user: {
    type: Object,
    default: () => ({
      username: "",
      role: "",
      fullName: "",
      organization: "",
      status: "Active",
    }),
  },
});

const organizationOptions = [
  { label: "ThreePranAcad", value: "ThreePranAcad" },
  { label: "ThaiPolice", value: "ThaiPolice" },
  { label: "ThaiHospital", value: "ThaiHospital" },
  // เพิ่มองค์กรอื่นๆ ตามต้องการ
];

// กำหนด emits สำหรับส่งข้อมูลกลับไปยัง parent component
const emit = defineEmits(["close", "save"]);

// สร้าง reactive form สำหรับข้อมูลผู้ใช้
const userForm = ref({ ...props.user, status: "Active" }); // กำหนดค่า default ของ status เป็น 'Active'

// watch การเปลี่ยนแปลงของ props.user เพื่ออัปเดต form
watch(
  () => props.user,
  (newUser) => {
    userForm.value = { ...newUser, status: newUser.status || "Active" }; // ใช้ 'Active' ถ้าไม่มีค่า status
  },
  { deep: true }
);

// ฟังก์ชันสำหรับ submit form
const submitForm = () => {
  emit("save", {
    ...userForm.value,
    status: userForm.value.status || "Active",
  }); // ใช้ 'Active' ถ้าไม่มีค่า status
};

// ตัวเลือกสำหรับสถานะผู้ใช้
const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

// ตัวเลือกสำหรับสิทธิ์ผู้ใช้ (คุณสามารถปรับเปลี่ยนตามความต้องการ)
const roleOptions = [
  { label: "ผู้ดูแลระบบ", value: "admin" },
  { label: "ผู้ใช้งานทั่วไป", value: "user" },
  { label: "ผู้จัดการ", value: "manager" },
];

// เพิ่มตัวแปรควบคุมการแสดง modal
const isModalOpen = ref(props.isOpen);

// ซิงค์ค่า isOpen จาก props กับ isModalOpen
watch(() => props.isOpen, (newValue) => {
  isModalOpen.value = newValue;
});

// แจ้ง parent component เมื่อ modal ถูกปิด
watch(isModalOpen, (newValue) => {
  if (!newValue) {
    emit('close');
  }
});
</script>

<template>
  <UModal 
    v-model="isModalOpen"
    :ui="{
      wrapper: 'fixed inset-0 z-50 overflow-y-auto',
      container: 'flex min-h-full items-start sm:items-center justify-center p-4 text-center sm:p-0',
      base: 'relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg',
      overlay: {
        base: 'fixed inset-0 transition-opacity',
        background: 'bg-gray-500 bg-opacity-75',
        transition: {
          enter: 'ease-out duration-300',
          enterFrom: 'opacity-0',
          enterTo: 'opacity-100',
          leave: 'ease-in duration-200',
          leaveFrom: 'opacity-100',
          leaveTo: 'opacity-0'
        }
      },
    }"
  >
    <UCard :ui="{ base: 'w-full' }">
      <template #header>
        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
          {{ mode === "add" ? "เพิ่มผู้รับบริการ" : "แก้ไขข้อมูลผู้ใช้" }}
        </h3>
      </template>
      <form @submit.prevent="submitForm">
        <div class="space-y-4">
          <UFormGroup label="ชื่อผู้ใช้">
            <UInput v-model="userForm.username" placeholder="กรอกชื่อผู้ใช้" />
          </UFormGroup>
          <UFormGroup label="สิทธิ์">
            <USelect
              v-model="userForm.role"
              :options="roleOptions"
              placeholder="เลือกสิทธิ์"
            />
          </UFormGroup>
          <UFormGroup label="ชื่อ-สกุล">
            <UInput v-model="userForm.fullName" placeholder="กรอกชื่อ-สกุล" />
          </UFormGroup>
          <UFormGroup label="องค์กร">
            <USelect
              v-model="userForm.organization"
              :options="organizationOptions"
              placeholder="เลือกองค์กร"
            />
          </UFormGroup>
          <UFormGroup label="สถานะ">
            <USelect
              v-model="userForm.status"
              :options="statusOptions"
              placeholder="เลือกสถานะ"
            />
          </UFormGroup>
        </div>
        <div class="mt-6 flex items-center justify-end gap-x-6">
          <UButton
            type="button"
            color="gray"
            variant="soft"
            @click="isModalOpen = false"
          >
            ยกเลิก
          </UButton>
          <UButton type="submit" color="primary">
            {{ mode === "add" ? "เพิ่ม" : "บันทึก" }}
          </UButton>
        </div>
      </form>
    </UCard>
  </UModal>
</template>

<style scoped>
@media (max-width: 640px) {
  :deep(.modal-container) {
    align-items: flex-start !important;
    padding-top: 1rem !important;
  }
}
</style>