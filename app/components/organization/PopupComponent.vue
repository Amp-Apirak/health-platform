<script setup lang="ts">
import { ref, watch } from "vue";

const isOpen = ref(true); // ควบคุมการแสดงผลของ Popup
const loading = ref(false);
const state = ref();

const form = ref({
  nameOrg: "",
  codeOrg: "",
  Affiliation: "",
  level: null,
  levelOrg: null,
  district: "",
  subdistrict: "",
  province: "",
  email: "",
  website: "",
  facebook: "",
  line: "",
  details: "",
  zipcode: "",
  phonenumber: "",
  username: "",
  password: "",
  confirm_password: "",
});

const onImageUpload = (files) => {
  // Handle the uploaded files here
  console.log("Uploaded files:", files);
};

const levelOptions = [
  { value: "LvMax", label: "ระดับสูงสุด" },
  { value: "Lv1", label: "ระดับ 1" },
  { value: "Lv2", label: "ระดับ 2" },
  { value: "Lv3", label: "ระดับ 3" },
  { value: "Lv4", label: "ระดับ 4" },
  { value: "Lv5", label: "ระดับ 5" },
  { value: "Lv6", label: "ระดับ 6" },
  { value: "Lv7", label: "ระดับ 7" },
];

const orgOptions = [
  { value: "MainOrg", label: "ระดับขององค์กรหลัก" },
  { value: "SubOrg", label: "ระดับขององค์กรย่อย" },
];

const underOrg = [
  { value: "ThaiPolice", label: "สำนักงานตำรวจแห่งชาติ" },
  { value: "ThreePranAcademy", label: "โรงเรียนนายร้อยสามพราน" },
];

const provinceOptions = [
  { value: "bangkok", label: "กรุงเทพมหานคร" },
  { value: "chonburi", label: "ชลบุรี" },
];

const districtOptions = [
  { value: "phra_nakhon", label: "เขตพระนคร" },
  { value: "dusit", label: "เขตดุสิต" },
  { value: "nang_loeng", label: "เขตหนองเลิง" },
  { value: "bang_rak", label: "เขตบางรัก" },
  { value: "bang_kapi", label: "เขตบางกะปิ" },
  { value: "pathumwan", label: "เขตปทุมวัน" },
  { value: "pom_prap_sattru_phai", label: "เขตป้อมปราบศัตรูพ่าย" },
];

const subdistrictOptions = [
  { value: "bang_chak", label: "แขวงบางจาก" },
  { value: "prasert_manukitch", label: "แขวงพระโขนงเหนือ" },
  { value: "prakhanong", label: "แขวงพระโขนง" },
  { value: "klong_toei_nuea", label: "แขวงคลองเตยเหนือ" },
  { value: "bang_nuea", label: "แขวงบางนาเหนือ" },
];

const emit = defineEmits(["close"]);

watch(isOpen, (value) => {
  if (!value) {
    emit("close");
  }
});

const validate = (state) => {
  // ตรวจสอบความถูกต้องของข้อมูลในฟอร์ม
  // ... และกำหนดค่า state ให้เหมาะสม
};

const submit = () => {
  // ส่งข้อมูลไปยังเซิร์ฟเวอร์หรือจัดการข้อมูลตามที่ต้องการ
  // ... และปิด Popup เมื่อเสร็จสิ้น
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    isOpen.value = false;
  }, 2000);
};
</script>

<template>
  <div>
    <UModal v-model="isOpen" fullscreen>
      <UCard
        :ui="{
          base: 'h-full flex flex-col',
          rounded: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          body: {
            base: 'grow',
          },
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Modal
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>

        <Placeholder class="h-full" />
        <UForm :state="state" >
          <div class="grid grid-cols-2 gap-4">
            <UFormGroup
              label="ระดับองค์กร"
              name="level"
              required
              class="col-span-1"
            >
              <USelectMenu
                placeholder="เลือกระดับองค์กรระดับองค์กร"
                v-model="form.level"
                :options="levelOptions"
              />
            </UFormGroup>
            <UFormGroup
              label="ระดับองค์กร"
              name="level"
              required
              class="col-span-1"
            >
              <USelectMenu
                placeholder="เลือกระดับองค์กรระดับองค์กร"
                v-model="form.level"
                :options="levelOptions"
              />
            </UFormGroup>
          </div>
          <br>
            <!-- เส้นใต้ -->
            <UDivider class="sticky bottom-0 mt-2" />
               
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>
