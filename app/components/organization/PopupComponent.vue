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
  <UModal v-model="isOpen" prevent-close fullscreen >
    <UCard
      :ui="{
        base: 'flex flex-col max-h-screen overflow-y-auto',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        body: {
          base: 'grow',
        },
      }"
    >
      <!-- หัวข้อ -->
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <UIcon name="octicon:organization-24" class="w-6 h-6" />
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Add Organization
            </h3>
          </div>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="isOpen = false"
          />
        </div>
      </template>
      <!-- Form รับข้อมูล -->
      <UForm :state="state">
        <div class="grid grid-cols-2 gap-4">
          <!-- ระดับองค์กร -->
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
          <!-- เลือกองค์กร -->
          <UFormGroup
            label="ชื่อองค์กร"
            name="organizationName"
            required
            class="col-span-1"
          >
            <USelectMenu
              placeholder="เลือกองค์กร"
              v-model="form.level"
              :options="levelOptions"
            />
          </UFormGroup>
        </div>

        <!-- เส้นใต้ -->
        <UDivider class="sticky bottom-0 mt-6 mb-5" />

        <h2 class="text-base font-semibold leading-7 text-gray-900 mb-3">
          ข้อมูลองค์กร/หน่วยงาน
        </h2>
        <!-- เลือกรูปภาพ -->
        <div class="col-span-full mt-2">
          <label
            for="cover-photo"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Organization Photo</label
          >
          <div
            class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
          >
            <div class="text-center">
              <svg
                class="mx-auto h-12 w-12 text-gray-300"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <div class="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  for="file-upload"
                  class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    class="sr-only"
                    model-value=""
                  />
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>

        <br />

        <div class="grid grid-cols-2 gap-4">
          <!-- รหัสองค์กร/หน่วยงาน -->
          <UFormGroup
            label="รหัสองค์กร/หน่วยงาน"
            name="organizationCode"
            required
            class="col-span-1"
          >
            <UInput
              placeholder="กรอกรหัสองค์กร/หน่วยงาน"
              v-model="form.organizationode"
            />
          </UFormGroup>
          <!-- เลือกองค์กร -->
          <UFormGroup
            label="สังกัด"
            name="organizationName"
            required
            class="col-span-1"
          >
            <USelectMenu
              placeholder="เลือกสังกัด"
              v-model="form.level"
              :options="levelOptions"
            />
          </UFormGroup>
        </div>

        <div class="grid grid-cols-1 gap-4 mt-4">
          <!-- ชื่อองค์กร/หน่วยงาน -->
          <UFormGroup
            label="ชื่อองค์กร/หน่วยงาน"
            name="organizationCode"
            required
            class="col-span-1"
          >
            <UInput
              placeholder="กรอกชื่อองค์กร/หน่วยงาน"
              v-model="form.organizationode"
            />
          </UFormGroup>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-4">
          <!-- จังหวัด -->
          <UFormGroup
            label="จังหวัด"
            name="organizationCode"
            required
            class="col-span-1"
          >
            <UInput placeholder="กรอกจังหวัด" v-model="form.organizationode" />
          </UFormGroup>
          <!-- อำเภอ/เขต -->
          <UFormGroup
            label="อำเภอ/เขต"
            name="organizationName"
            required
            class="col-span-1"
          >
            <USelectMenu
              placeholder="เลือกอำเภอ/เขต"
              v-model="form.level"
              :options="levelOptions"
            />
          </UFormGroup>
          <!-- ตำบล/แขวง -->
          <UFormGroup
            label="ตำบล/แขวง"
            name="organizationCode"
            class="col-span-1"
          >
            <USelectMenu
              placeholder="กรอกตำบล/แขวง"
              v-model="form.level"
              :options="levelOptions"
            />
          </UFormGroup>
          <!-- รหัสไปรษณีย์ -->
          <UFormGroup
            label="รหัสไปรษณีย์"
            name="organizationName"
            class="col-span-1"
          >
            <UInput
              placeholder="เลือกรหัสไปรษณีย์"
              v-model="form.organizationode"
            />
          </UFormGroup>
        </div>

        <!-- เส้นใต้ -->
        <UDivider class="sticky bottom-0 mt-6 mb-5" />

        <h2 class="text-base font-semibold leading-7 text-gray-900 mb-3">
          ข้อมูลติดต่อ
        </h2>

        <div class="grid grid-cols-2 gap-4 mt-4">
          <!-- จังหวัด -->
          <UFormGroup
            label="จังหวัด"
            name="organizationCode"
            required
            class="col-span-1"
          >
            <UInput placeholder="กรอกจังหวัด" v-model="form.organizationode" />
          </UFormGroup>
          <!-- อำเภอ/เขต -->
          <UFormGroup
            label="อำเภอ/เขต"
            name="organizationName"
            required
            class="col-span-1"
          >
            <USelectMenu
              placeholder="เลือกอำเภอ/เขต"
              v-model="form.level"
              :options="levelOptions"
            />
          </UFormGroup>
          <!-- ตำบล/แขวง -->
          <UFormGroup
            label="ตำบล/แขวง"
            name="organizationCode"
            class="col-span-1"
          >
            <USelectMenu
              placeholder="กรอกตำบล/แขวง"
              v-model="form.level"
              :options="levelOptions"
            />
          </UFormGroup>
          <!-- รหัสไปรษณีย์ -->
          <UFormGroup
            label="รหัสไปรษณีย์"
            name="organizationName"
            class="col-span-1"
          >
            <UInput
              placeholder="เลือกรหัสไปรษณีย์"
              v-model="form.organizationode"
            />
          </UFormGroup>
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>
