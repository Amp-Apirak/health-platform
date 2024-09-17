<script setup>
import { ref, watch } from "vue";
import { useAssetOptions } from "~/composables/assets/comonents/useAssetOptions";

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
      room: "",
      InstallationDate: "",
      warranty: "Yes",
      dateWarranty: "",
      expirationDate: "",
      status: "",
      ipAddress: "",
      macAddress: "",
      firmware: "",
      lastMaintenanceDate: "",
      maintenanceDate: "",
      organization: "",
      location: "",
      building: "",
      floor: "",
      owner: "",
      date: "",
    }),
  },
});

// การจัดการรูปภาพ
const selectedImage = ref(null);
const imagePreview = ref("");

//ฟังก์ชันสำหรับจัดการการอัพโหลดรูปภาพ
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedImage.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// กำหนดการส่งข้อมูลออกไป (emit events)
const emit = defineEmits(["close", "save"]);

//showAlert Validation
const showAlert = ref(false);
const alertMessage = ref("");

//การ Validate ข้อมูล
const validateForm = () => {
  const requiredFields = [
    "assetName",
    "serialNumber",
    "assetType",
    "organization",
  ];
  const errors = [];

  requiredFields.forEach((field) => {
    if (!assetForm.value[field]) {
      console.log(`Missing field: ${field}`);
      errors.push(`, กรุณากรอก ${getFieldLabel(field)}`);
    }
  });

  if (errors.length > 0) {
    alertMessage.value = errors.join("\n");
    showAlert.value = true;
    return false;
  }

  return true;
};

onMounted(() => {
  console.log(props.asset);
});

const getFieldLabel = (field) => {
  const labels = {
    assetName: "ชื่ออุปกรณ์",
    serialNumber: "Serial Number",
    assetType: "ประเภทอุปกรณ์",
    organization: "องค์กร/หน่วยงาน",
  };
  return labels[field] || field;
};

// สร้าง ref สำหรับควบคุมสถานะของ Modal
const isModalOpen = ref(props.isOpen);
const assetForm = ref({ ...props.asset, status: "Active" });

// ฟังก์ชันสำหรับอัพเดทข้อมูลฟอร์มเมื่อมีการเปลี่ยนแปลงข้อมูลอุปกรณ์แสดงรูปภาพที่มีอยู่แล้ว
const updateAssetForm = (newAsset) => {
  assetForm.value = {
    ...newAsset,
    status: props.mode === "add" ? "Active" : newAsset.status || "Active",
  };
  if (newAsset.image) {
    imagePreview.value = newAsset.image;
  }
};

// ตรวจสอบการเปลี่ยนแปลงของ props.isOpen เพื่อเปิด/ปิด Modal
watch(
  () => props.isOpen,
  (newValue) => {
    isModalOpen.value = newValue;
    if (newValue && props.mode === "edit") {
      updateAssetForm(props.asset);
    }
  }
);

// เพิ่มฟังก์ชันสำหรับแปลง value เป็น label
const getOptionLabel = (options, value) => {
  if (!Array.isArray(options)) {
    console.error("Expected options to be an array but got:", options);
    return value; // คืนค่า value หาก options ไม่ถูกต้อง
  }
  const option = options.find((opt) => opt.value === value);
  return option ? option.label : value;
};

// ฟังก์ชัน submitForm
const submitForm = () => {
  if (!validateForm()) return;

  const formData = { ...assetForm.value };

  // แปลงค่า dropdown กลับเป็น label
  [
    "organization",
    "status",
    "assetType",
    "assetGroup",
    "warranty",
    "owner",
    "building",
    "floor",
    "room",
  ].forEach((field) => {
    if (
      typeof formData[field] === "object" &&
      formData[field] !== null &&
      formData[field] !== undefined
    ) {
      formData[field] = formData[field].label;
    } else {
      // ใช้ฟังก์ชัน getOptionLabel เพื่อแปลง value เป็น label
      switch (field) {
        case "organization":
          formData[field] = getOptionLabel(
            organizationOptions,
            formData[field]
          );
          break;
        case "status":
          formData[field] = getOptionLabel(
            statusOptions.value,
            formData[field]
          );
          break;
        case "assetType":
          formData[field] = getOptionLabel(typeOptions.value, formData[field]);
          break;
        case "assetGroup":
          formData[field] = getOptionLabel(groupOptions.value, formData[field]);
          break;
        case "warranty":
          formData[field] = getOptionLabel(
            warrantyOptions.value,
            formData[field]
          );
          break;
        case "owner":
          formData[field] = getOptionLabel(ownerOptions.value, formData[field]);
          break;
        case "building":
          formData[field] = getOptionLabel(
            buildingOptions.value,
            formData[field]
          );
          break;
        case "floor":
          formData[field] = getOptionLabel(floorOptions.value, formData[field]);
          break;
        case "room":
          formData[field] = getOptionLabel(roomOptions.value, formData[field]);
          break;
      }
    }
  });

  // เพิ่มข้อมูลรูปภาพ
  if (selectedImage.value) {
    formData.image = selectedImage.value;
  }

  emit("save", formData);
};

// ฟังก์ชันปิด Modal
const closeModal = () => {
  emit("close");
};

// Mockup data
const {
  typeOptions,
  organizationOptions,
  statusOptions,
  warrantyOptions,
  ownerOptions,
  buildingOptions,
  floorOptions,
  groupOptions,
  roomOptions,
} = useAssetOptions();
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

      <!--  ส่วนของการแจ้งเตือน -->
      <UAlert
        v-if="showAlert"
        icon="i-heroicons-exclamation-triangle"
        color="red"
        variant="solid"
        title="ข้อมูลไม่ครบถ้วน"
        :description="alertMessage"
        class="mb-4"
      />

      <!-- ฟอร์มสำหรับกรอกข้อมูล -->
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
          <UFormGroup
            label="เลือกองค์กร/หน่วยงาน"
            name="organization"
            required
            class="col-span-1"
          >
            <UInputMenu
              v-model="assetForm.organization"
              :options="organizationOptions"
            />
          </UFormGroup>
          <UFormGroup label="สถานะ" name="status" class="col-span-1">
            <UInputMenu v-model="assetForm.status" :options="statusOptions" />
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
              <img
                v-if="imagePreview"
                :src="imagePreview"
                alt="Preview"
                class="mx-auto h-32 w-32 object-cover mb-4"
              />
              <svg
                v-else
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
                    @change="handleImageUpload"
                    accept="image/*"
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
          <UFormGroup
            label="จัดกลุ่มอุปกรณ์"
            name="assetGroup"
            required
            class="col-span-1"
          >
            <UInputMenu
              placeholder="เลือกกลุ่มอุปกรณ์"
              v-model="assetForm.assetGroup"
              :options="groupOptions"
              required
            />
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
            <UInputMenu
              placeholder="เลือกประเภทอุปกรณ์"
              v-model="assetForm.assetType"
              :options="typeOptions"
              required
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
            <UInputMenu
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
            <UInputMenu
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
            <UInputMenu
              placeholder="เลือกองค์กร/หน่วยงาน"
              v-model="assetForm.organization"
              :options="organizationOptions"
            />
          </UFormGroup>
          <UFormGroup label="ตึก/อาคาร" name="building" class="col-span-1">
            <UInputMenu
              placeholder="เลือกตึก/อาคาร"
              v-model="assetForm.building"
              :options="buildingOptions"
            />
          </UFormGroup>
          <UFormGroup label="ชั้น" name="floor" class="col-span-1">
            <UInputMenu
              placeholder="เลือกชั้น"
              v-model="assetForm.floor"
              :options="floorOptions"
            />
          </UFormGroup>
          <UFormGroup label="ห้อง" name="room" class="col-span-1">
            <UInputMenu
              placeholder="เลือกห้อง"
              v-model="assetForm.room"
              :options="roomOptions"
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

      <!--  ส่วนของการแจ้งเตือน -->
      <UAlert
        v-if="showAlert"
        icon="i-heroicons-exclamation-triangle"
        color="red"
        variant="solid"
        title="ข้อมูลไม่ครบถ้วน"
        :description="alertMessage"
        class="mb-4 mt-4"
      />
    </UCard>
  </UModal>
</template>
