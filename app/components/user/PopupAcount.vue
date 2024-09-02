<script setup>
import { ref, watch, onMounted } from "vue"; // นำเข้า ref, watch, และ onMounted จาก Vue

// กำหนด props ที่จะรับข้อมูลเข้ามา
const props = defineProps({
  isOpen: Boolean, // รับค่าบูลีนเพื่อระบุสถานะการเปิด/ปิดของ Modal
  mode: {
    type: String,
    default: "add", // กำหนดค่าเริ่มต้นเป็น 'add'
    validator: (value) => ["add", "edit"].includes(value), // ตรวจสอบว่า mode ต้องเป็น 'add' หรือ 'edit'
  },
  user: {
    type: Object,
    default: () => ({
      username: "", // ชื่อผู้ใช้
      role: "", // สิทธิ์ผู้ใช้
      fullName: "", // ชื่อ-สกุล
      organization: "", // องค์กร
      status: "Active", // สถานะ
    }),
  },
});

// กำหนดการส่งข้อมูลออกไป (emit events)
const emit = defineEmits(["close", "save"]); // กำหนดอีเวนต์ที่สามารถถูกเรียกได้ ได้แก่ 'close' และ 'save'

// สร้าง ref สำหรับควบคุมสถานะของ Modal
const isModalOpen = ref(props.isOpen); // เก็บสถานะการเปิด/ปิดของ Modal
const userForm = ref({ ...props.user }); // กำหนดข้อมูลฟอร์มผู้ใช้ที่สามารถแก้ไขได้

// ตัวเลือกสำหรับ dropdown องค์กร
const organizationOptions = [
  { label: "ThreePranAcad", value: "ThreePranAcad" },
  { label: "ThaiPolice", value: "ThaiPolice" },
  { label: "ThaiHospital", value: "ThaiHospital" },
];

// ตัวเลือกสำหรับ dropdown สถานะผู้ใช้
const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

// ตัวเลือกสำหรับ dropdown สิทธิ์ผู้ใช้
const roleOptions = [
  { label: "ผู้ดูแลระบบ", value: "admin" },
  { label: "ผู้ใช้งานทั่วไป", value: "user" },
  { label: "ผู้จัดการ", value: "manager" },
];

// ฟังก์ชันสำหรับส่งข้อมูลเมื่อผู้ใช้กดปุ่มบันทึก
const submitForm = () => {
  emit("save", userForm.value); // ส่งข้อมูลฟอร์มกลับไปยัง parent component
};

// ฟังก์ชันสำหรับอัพเดทข้อมูลฟอร์มเมื่อมีการเปลี่ยนแปลงผู้ใช้ที่กำลังแก้ไข
const updateUserForm = (newUser) => {
  console.log("Updating user form with:", newUser); // แสดงข้อมูลผู้ใช้ที่กำลังจะอัพเดทใน console
  userForm.value = {
    ...newUser,
    status: newUser.status || "Active", // กำหนดค่าเริ่มต้นของ status เป็น 'Active' ถ้าไม่มีค่า
    role: newUser.role || "", // กำหนดค่าเริ่มต้นของ role เป็นว่างถ้าไม่มีค่า
  };
  console.log("Updated userForm:", userForm.value); // แสดงข้อมูลฟอร์มผู้ใช้ที่อัพเดทแล้วใน console
};

// ตรวจสอบการเปลี่ยนแปลงของ props.isOpen เพื่อเปิดหรือปิด Modal
watch(
  () => props.isOpen,
  (newValue) => {
    isModalOpen.value = newValue; // ตั้งค่า isModalOpen ตามค่าใหม่ของ props.isOpen
    if (newValue && props.mode === "edit") {
      updateUserForm(props.user); // ถ้าเป็นโหมดแก้ไขและเปิด Modal ให้เรียกฟังก์ชัน updateUserForm
    }
  }
);

// ตรวจสอบการเปลี่ยนแปลงของ isModalOpen เพื่อตอบสนองการปิด Modal
watch(isModalOpen, (newValue) => {
  if (!newValue) {
    emit("close"); // ถ้า isModalOpen เป็น false ให้ส่งอีเวนต์ 'close' กลับไปยัง parent component
  }
});

// ตรวจสอบการเปลี่ยนแปลงของ props.user เพื่ออัพเดทฟอร์มโดยอัตโนมัติ
watch(() => props.user, updateUserForm, { deep: true });

// เมื่อคอมโพเนนต์ถูกเมาท์ครั้งแรก
onMounted(() => {
  if (props.mode === "edit") {
    updateUserForm(props.user); // ถ้าอยู่ในโหมดแก้ไข ให้เรียกฟังก์ชัน updateUserForm
  }
});
</script>
<template>
  <UModal
    prevent-close
    v-model="isModalOpen"
    :ui="{
      wrapper: 'fixed inset-0 z-50 overflow-y-auto',
      container:
        'flex min-h-full items-start sm:items-center justify-center p-4 text-center sm:p-0',
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
          leaveTo: 'opacity-0',
        },
      },
    }"
  >
    <UCard :ui="{ base: 'w-full' }">
      <!-- ส่วนหัวของ Modal -->
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon
            :name="
              mode === 'add' ? 'i-heroicons-plus-circle' : 'i-heroicons-pencil'
            "
            class="w-6 h-6"
          />
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            {{ mode === "add" ? "เพิ่มผู้ใช้งานระบบ" : "แก้ไขข้อมูลผู้ใช้" }}
          </h3>
        </div>
      </template>

      <!-- ฟอร์มสำหรับกรอกข้อมูล -->
      <form @submit.prevent="submitForm">
        <div class="space-y-4">
          <!-- ช่องกรอกชื่อผู้ใช้ -->
          <UFormGroup label="ชื่อผู้ใช้">
            <UInput v-model="userForm.username" placeholder="กรอกชื่อผู้ใช้" />
          </UFormGroup>

          <!-- เลือกสิทธิ์ -->
          <UFormGroup label="สิทธิ์">
            <USelect
              v-model="userForm.role"
              :options="roleOptions"
              placeholder="เลือกสิทธิ์"
            />
          </UFormGroup>

          <!-- ช่องกรอกชื่อ-สกุล -->
          <UFormGroup label="ชื่อ-สกุล">
            <UInput v-model="userForm.fullName" placeholder="กรอกชื่อ-สกุล" />
          </UFormGroup>

          <!-- เลือกองค์กร -->
          <UFormGroup label="องค์กร">
            <USelect
              v-model="userForm.organization"
              :options="organizationOptions"
              placeholder="เลือกองค์กร"
            />
          </UFormGroup>

          <!-- เลือกสถานะ -->
          <UFormGroup label="สถานะ">
            <USelect
              v-model="userForm.status"
              :options="statusOptions"
              placeholder="เลือกสถานะ"
            />
          </UFormGroup>
        </div>

        <!-- ปุ่มดำเนินการ -->
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
/* ปรับแต่ง Modal สำหรับหน้าจอขนาดเล็ก */
@media (max-width: 640px) {
  :deep(.modal-container) {
    align-items: flex-start !important;
    padding-top: 1rem !important;
  }
}
</style>
