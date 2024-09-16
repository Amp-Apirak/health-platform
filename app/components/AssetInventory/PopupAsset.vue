<script setup>
import { ref, watch, onMounted } from "vue";

const isOpen = ref(false);

// กำหนด props ที่จะรับข้อมูลเข้ามา
const props = defineProps({
  isOpen: Boolean,
  mode: {
    type: String,
    default: "add",
    validator: (value) => ["add", "edit"].includes(value),
  },
  asset: {
    type: Object,
    default: () => ({
      assetID: "",
      assetName: "",
      assetGroup: "",
      assetType: "",
      manufacturer: "",
      brand: "",
      model: "",
      serialNumber: "",
      location: "",
      InstallationDate: "",
      warranty: "Yes",
      dateWarranty: "",
      expirationDate: "",
      status: "Active",
      ipAddress: "",
      macAddress: "",
      firmware: "",
      lastMaintenanceDate: "",
      maintenanceDate: "",
      organization: "",
      building: "",
      floor: "",
      owner: "",
      date: "",
    }),
  },
});

// กำหนดการส่งข้อมูลออกไป (emit events)
const emit = defineEmits(["close", "save"]);

// สร้าง ref สำหรับควบคุมสถานะของ Modal
const isModalOpen = ref(props.isOpen);
const assetForm = ref({ ...props.asset });

// ฟังก์ชันสำหรับอัพเดทข้อมูลฟอร์มเมื่อมีการเปลี่ยนแปลงข้อมูลอุปกรณ์
const updateAssetForm = (newAsset) => {
  assetForm.value = { ...newAsset, status: newAsset.status || "Active" };
};

// ตรวจสอบการเปลี่ยนแปลงของ props.isOpen เพื่อเปิด/ปิด Modal
watch(
  () => props.isOpen,
  (newValue) => {
    isModalOpen.value = newValue;
    if (newValue && props.mode === "edit") {
      updateAssetForm(props.assetForm);
    }
  }
);

// ฟังก์ชันสำหรับส่งข้อมูลเมื่อกดปุ่มบันทึก
const submitForm = () => {
  const formData = { ...assetForm.value };
  // แปลงค่า dropdown กลับเป็น string ถ้าจำเป็น
  [
    "organization",
    "status",
    "assetType",
    "warranty",
    "owner",
    "building",
    "floor",
  ].forEach((field) => {
    if (typeof formData[field] === "object" && formData[field] !== null) {
      formData[field] = formData[field].value;
    }
  });
  emit("save", formData);
};

// ฟังก์ชันปิด Modal
const closeModal = () => {
  emit("close");
};

const typeOptions = [
  { value: "healthSmart", label: "Health Smart" },
  { value: "healthRunning", label: "Health Running" },
  { value: "healthCare", label: "Health Care" },
  { value: "environmentSecsor", label: "environmentSecsor" },
  { value: "emergency", label: "Emergency" },
];

const organizationOptions = [
  { value: "ThaiPolice", label: "สำนักงานตำรวจแห่งชาติ" },
  { value: "ThreePranAcademy", label: "โรงเรียนนายร้อยสามพราน" },
];

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const warrantyOptions = [
  { value: "1", label: "Yes" },
  { value: "0", label: "No" },
];

const ownerOptions = [
  { value: "owner1", label: "เจ้าของ 1" },
  { value: "owner2", label: "เจ้าของ 2" },
  // เพิ่มตัวเลือกตามต้องการ
];

const buildingOptions = [
  { value: "A", label: "อาคาร A" },
  { value: "B", label: "อาคาร B" },
  // เพิ่มตัวเลือกตามต้องการ
];

const floorOptions = [
  { value: "1", label: "ชั้น 1" },
  { value: "2", label: "ชั้น 2" },
  // เพิ่มตัวเลือกตามต้องการ
];
</script>

<template>
  <UModal v-model="isModalOpen" @close="closeModal" prevent-close>
    <UCard
      :ui="{
        base: 'flex flex-col max-h-screen overflow-y-auto',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        body: {
          base: 'grow',
        },
      }"
    >
      <!-- ปรับขนาดให้กว้างเต็มที่ -->
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <UIcon
              :name="
                mode === 'add'
                  ? 'material-symbols:inventory'
                  : 'i-heroicons-pencil'
              "
              class="w-6 h-6"
            />
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              {{ mode === "add" ? "เพิ่มอุปกรณ์" : "แก้ไขข้อมูลอุปกรณ์" }}
            </h3>
          </div>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="closeModal"
          />
        </div>
      </template>

      <!-- ฟอร์มสำหรับกรอกข้อมูล -->
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
          <UFormGroup
            label="เลือกองค์กร/หน่วยงาน"
            name="organization"
            required
            class="col-span-1"
          >
            <USelectMenu
              v-model="assetForm.organization"
              :options="organizationOptions"
            />
          </UFormGroup>
          <UFormGroup label="สถานะ" name="status" class="col-span-1">
            <USelectMenu v-model="assetForm.status" :options="statusOptions" />
          </UFormGroup>
        </div>

        <!-- เส้นใต้ -->
        <UDivider class="sticky bottom-0 mt-6 mb-5" />

        <h2 class="text-base font-semibold leading-7 text-gray-900 mb-3">
          ข้อมูลอุปกรณ์
        </h2>
        <!-- เลือกรูปภาพ -->
        <div class="col-span-full mt-2 mb-3">
          <label
            for="cover-photo"
            class="block text-sm font-medium leading-6 text-gray-900"
            >รูปอุปกรณ์</label
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

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
          <!-- ใช้ grid สำหรับการจัดการฟอร์ม -->
          <UFormGroup label="รหัสอุปกรณ์">
            <UInput v-model="assetForm.assetID" placeholder="กรอกรหัสอุปกรณ์" />
          </UFormGroup>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <!-- ใช้ grid สำหรับการจัดการฟอร์ม -->
          <UFormGroup label="ชื่ออุปกรณ์" required>
            <UInput
              v-model="assetForm.assetName"
              placeholder="กรอกชื่ออุปกรณ์"
            />
          </UFormGroup>
          <UFormGroup
            label="ประเภทอุปกรณ์"
            name="assetType"
            required
            class="col-span-1"
          >
            <USelectMenu
              placeholder="เลือกประเภทอุปกรณ์"
              v-model="assetForm.assetType"
              :options="typeOptions"
            />
          </UFormGroup>
          <UFormGroup label="แบรนด์">
            <UInput v-model="assetForm.brand" placeholder="กรอก แบรนด์" />
          </UFormGroup>
          <UFormGroup label="โมเดล">
            <UInput v-model="assetForm.model" placeholder="กรอก โมเดล" />
          </UFormGroup>
          <UFormGroup label="Serial Number" required>
            <UInput
              v-model="assetForm.serialNumber"
              placeholder="กรอก Serial Number"
            />
          </UFormGroup>
          <UFormGroup label="Mac Address">
            <UInput
              v-model="assetForm.macAddress"
              placeholder="กรอก Mac Address"
            />
          </UFormGroup>
          <UFormGroup label="Firmware">
            <UInput v-model="assetForm.firmware" placeholder="ระบุ firmware" />
          </UFormGroup>
          <UFormGroup label="IP Address">
            <UInput
              v-model="assetForm.ipAddress"
              placeholder="กรอก IP Address"
            />
          </UFormGroup>
          <UFormGroup label="ชื่อบริษัทผู้ผลิต">
            <UInput
              v-model="assetForm.manufacturer"
              placeholder="กรอกชื่อบริษัทผู้ผลิต"
            />
          </UFormGroup>
          <UFormGroup label="Warranty" name="warranty" class="col-span-1">
            <USelectMenu
              placeholder="Warranty"
              v-model="assetForm.warranty"
              :options="warrantyOptions"
            />
          </UFormGroup>
          <UFormGroup label="Warranty Date">
            <UInput
              v-model="assetForm.dateWarranty"
              placeholder="เลือกวันที่"
              type="date"
            />
          </UFormGroup>
          <UFormGroup label="Expiration Date">
            <UInput
              v-model="assetForm.expirationDate"
              placeholder="ระบุวันหมดอายุ"
              type="date"
            />
          </UFormGroup>
        </div>

        <!-- เส้นใต้ -->
        <UDivider class="sticky bottom-0 mt-6 mb-5" />

        <h2 class="text-base font-semibold leading-7 text-gray-900 mb-3">
          ข้อมูลผู้ดูแล/ผู้ครอบครองอุปกกรณ์
        </h2>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
          <UFormGroup label="ชื่อ-สกุล" name="owner" class="col-span-1">
            <USelectMenu
              placeholder="เลือกชื่อ-สกุล"
              v-model="assetForm.owner"
              :options="ownerOptions"
            />
          </UFormGroup>
          <UFormGroup
            label="เลือกองค์กร/หน่วยงาน"
            name="organization"
            class="col-span-1"
          >
            <USelectMenu
              placeholder="เลือกองค์กร/หน่วยงาน"
              v-model="assetForm.organization"
              :options="organizationOptions"
            />
          </UFormGroup>
          <UFormGroup label="ตึก/อาคาร" name="building" class="col-span-1">
            <USelectMenu
              placeholder="เลือกตึก/อาคาร"
              v-model="assetForm.building"
              :options="buildingOptions"
            />
          </UFormGroup>
          <UFormGroup label="ชั้น" name="floor" class="col-span-1">
            <USelectMenu
              placeholder="เลือกชั้น"
              v-model="assetForm.floor"
              :options="floorOptions"
            />
          </UFormGroup>
        </div>

        <!-- ปุ่มดำเนินการ -->
        <div class="mt-6 flex items-center justify-end gap-x-6">
          <UButton type="button" @click="closeModal" color="gray">
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
