<script setup>
import { ref, computed, watch } from "vue";
import AssetModal from "~/components/AssetInventory/PopupAsset.vue";

/// ข้อมูลขององค์กรต่าง ๆ
const assets = ref([
  {
    assetID: "A001",
    assetName: "AI Tracker 1",
    assetGroup: "G001",
    assetType: "Health Sensor",
    manufacturer: "GE Healthcare",
    brand: "GE",
    model: "LOGIQ E10",
    serialNumber: "GE12345678",
    location: "Room 101",
    warranty: "3 years",
    dateWarranty: "2023-01-15",
    expirationDate: "2026-01-15",
    status: "Active",
    ipAddress: "192.168.1.10",
    macAddress: "00:1A:2B:3C:4D:5E",
    firmware: "v1.2.3",
    organization: "สำนักงานตำรวจแห่งชาติ",
    location: "Main Building",
    building: "A",
    floor: "1",
    owner: "Radiology Department",
    assetsImage: "image1.jpg",
    dateCreated: "21/08/2567 08.32",
  },
  {
    assetID: "A002",
    assetName: "AI Tracker 2",
    assetGroup: "G001",
    assetType: "Health Sensor",
    manufacturer: "Siemens Healthineers",
    brand: "Siemens",
    model: "MAGNETOM Sola",
    serialNumber: "SI67891234",
    location: "Room 102",
    warranty: "5 years",
    dateWarranty: "2022-06-20",
    expirationDate: "2027-06-20",
    status: "Active",
    ipAddress: "192.168.1.11",
    macAddress: "00:1A:2B:3C:4D:5F",
    firmware: "v2.1.0",
    organization: "สำนักงานตำรวจแห่งชาติ",
    location: "Main Building",
    building: "B",
    floor: "2",
    owner: "Radiology Department",
    assetsImage: "image2.jpg",
    dateCreated: "21/08/2567 08.32",
  },
  {
    assetID: "A003",
    assetName: "CT Scanner",
    assetGroup: "G002",
    assetType: "Health Sensor",
    manufacturer: "Philips",
    brand: "Philips",
    model: "Ingenuity CT",
    serialNumber: "PH34567891",
    location: "Room 103",
    warranty: "4 years",
    dateWarranty: "2021-11-10",
    expirationDate: "2025-11-10",
    status: "Active",
    ipAddress: "192.168.1.12",
    macAddress: "00:1A:2B:3C:4D:60",
    firmware: "v3.0.1",
    organization: "สำนักงานตำรวจแห่งชาติ",
    location: "Main Building",
    building: "B",
    floor: "2",
    owner: "Radiology Department",
    assetsImage: "image3.jpg",
    dateCreated: "21/08/2567 08.32",
  },
  {
    assetID: "A004",
    assetName: "X-Ray Machine",
    assetGroup: "G002",
    assetType: "Health Sensor",
    manufacturer: "Canon Medical",
    brand: "Canon",
    model: "Radrex-i",
    serialNumber: "CA09876543",
    location: "Room 104",
    warranty: "5 years",
    dateWarranty: "2020-08-05",
    expirationDate: "2025-08-05",
    status: "Active",
    ipAddress: "192.168.1.13",
    macAddress: "00:1A:2B:3C:4D:61",
    firmware: "v1.5.0",
    organization: "สำนักงานตำรวจแห่งชาติ",
    location: "Main Building",
    building: "A",
    floor: "1",
    owner: "Radiology Department",
    assetsImage: "image4.jpg",
    dateCreated: "21/08/2567 08.32",
  },
  {
    assetID: "A005",
    assetName: "Defibrillator",
    assetGroup: "G003",
    assetType: "Environment Sensor",
    manufacturer: "Zoll",
    brand: "Zoll",
    model: "AED Plus",
    serialNumber: "ZL12345009",
    location: "Room 105",
    warranty: "3 years",
    dateWarranty: "2019-02-12",
    expirationDate: "2022-02-12",
    status: "Inactive",
    ipAddress: "192.168.1.14",
    macAddress: "00:1A:2B:3C:4D:62",
    firmware: "v2.3.5",
    organization: "สำนักงานตำรวจแห่งชาติ",
    location: "Emergency Room",
    building: "C",
    floor: "1",
    owner: "Emergency Department",
    assetsImage: "image5.jpg",
    dateCreated: "21/08/2567 08.32",
  },
  {
    assetID: "A006",
    assetName: "Ventilator",
    assetGroup: "G003",
    assetType: "Environment Sensor",
    manufacturer: "Dräger",
    brand: "Dräger",
    model: "Evita Infinity V500",
    serialNumber: "DR56789012",
    location: "ICU",
    warranty: "5 years",
    dateWarranty: "2021-03-18",
    expirationDate: "2026-03-18",
    status: "Active",
    ipAddress: "192.168.1.15",
    macAddress: "00:1A:2B:3C:4D:63",
    firmware: "v1.9.7",
    organization: "สำนักงานตำรวจแห่งชาติ",
    location: "Main Building",
    building: "C",
    floor: "3",
    owner: "Intensive Care Unit",
    assetsImage: "image6.jpg",
    dateCreated: "21/08/2567 08.32",
  },
  {
    assetID: "A007",
    assetName: "Infusion Pump",
    assetGroup: "G004",
    assetType: "Environment Sensor",
    manufacturer: "Baxter",
    brand: "Baxter",
    model: "Sigma Spectrum",
    serialNumber: "BA10293847",
    location: "Ward 3A",
    warranty: "4 years",
    dateWarranty: "2020-12-22",
    expirationDate: "2024-12-22",
    status: "Active",
    ipAddress: "192.168.1.16",
    macAddress: "00:1A:2B:3C:4D:64",
    firmware: "v3.4.2",
    organization: "สำนักงานตำรวจแห่งชาติ",
    location: "Main Building",
    building: "D",
    floor: "3",
    owner: "General Surgery Department",
    assetsImage: "image7.jpg",
    dateCreated: "21/08/2567 08.32",
  },
  {
    assetID: "A008",
    assetName: "Ultrasound Machine",
    assetGroup: "G005",
    assetType: "Health Sensor",
    manufacturer: "Hitachi",
    brand: "Hitachi",
    model: "ARIETTA 850",
    serialNumber: "HT56781234",
    location: "Room 106",
    warranty: "4 years",
    dateWarranty: "2022-01-10",
    expirationDate: "2026-01-10",
    status: "Active",
    ipAddress: "192.168.1.17",
    macAddress: "00:1A:2B:3C:4D:65",
    firmware: "v2.0.0",
    organization: "สำนักงานตำรวจแห่งชาติ",
    location: "Main Building",
    building: "D",
    floor: "2",
    owner: "Radiology Department",
    assetsImage: "image8.jpg",
    dateCreated: "21/08/2567 08.32",
  },
]);

// สถานะของ Modal
const isAssetModalOpen = ref(false);
const modalMode = ref("add");
const editingAsset = ref(null);

// เปิด Modal สำหรับเพิ่มองค์กร
const openAddAssetModal = () => {
  modalMode.value = "add";
  editingAsset.value = null;
  isAssetModalOpen.value = true;
};

// เปิด Modal สำหรับแก้ไขอุปกรณ์
const openEditAssetModal = (asset) => {
  modalMode.value = "edit";
  editingAsset.value = { ...asset };
  isAssetModalOpen.value = true;
};

// บันทึกข้อมูลอุปกรณ์
const saveAsset = (assetData) => {
  if (modalMode.value === "add") {
    addAsset(assetData);
  } else {
    editAsset(assetData);
  }
  closeAssetModal();
};

// ปิด Modal
const closeAssetModal = () => {
  isAssetModalOpen.value = false;
  editingAsset.value = null;
};

// เพิ่มอุปกรณ์
const addAsset = (newAsset) => {
  newAsset.assetID = `A${(assets.value.length + 1)
    .toString()
    .padStart(3, "0")}`;
  newAsset.date = new Date().toLocaleDateString("th-TH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  assets.value.push(newAsset);
};
// แก้ไขข้อมูลอุปกรณ์
const editAsset = (updatedAsset) => {
  const index = assets.value.findIndex(
    (asset) => asset.assetID === updatedAsset.assetID
  );
  if (index !== -1) {
    assets.value[index] = updatedAsset;
  }
};

// ลบอุปกรณ์
const deleteAsset = (assetID) => {
  assets.value = assets.value.filter((asset) => asset.assetID !== assetID);
};

// กำหนดโครงสร้างของคอลัมน์ในตาราง
const columns = [
  { key: "assetID", label: "Asset ID", sortable: true },
  { key: "assetGroup", label: "Asset Group", sortable: true },
  { key: "assetName", label: "Asset Name", sortable: true },
  { key: "assetType", label: "Asset Type", sortable: true },
  { key: "serialNumber", label: "Serial Number", sortable: true },
  { key: "organization", label: "Organization", sortable: true },
  { key: "owner", label: "Owner", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "dateCreated", label: "วันที่สร้าง", sortable: true },
  { key: "actions", label: "Actions", sortable: false },
];

// คอลัมน์ที่ถูกเลือกให้แสดง
const selectedColumns = ref(columns);
const columnsTable = computed(() =>
  columns.filter((column) => selectedColumns.value.includes(column))
);

// ค่าสำหรับการค้นหาและกรอง
const search = ref("");
const selectedType = ref("All");
const selectedStatus = ref("All");

// การจัดเรียงและการแบ่งหน้า
const sort = ref({ column: "assetID", direction: "asc" });
const page = ref(1);
const pageCount = ref(10);
const pageTotal = computed(() => filteredAssets.value.length);

// คำนวณช่วงของข้อมูลที่แสดงในแต่ละหน้า
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1);
const pageTo = computed(() =>
  Math.min(page.value * pageCount.value, pageTotal.value)
);

// กรองข้อมูลตามเงื่อนไขที่กำหนด
const filteredAssets = computed(() => {
  let filtered = assets.value;
  if (search.value) {
    const searchLower = search.value.toLowerCase();
    filtered = filtered.filter((asset) =>
      Object.values(asset).some((val) =>
        val.toString().toLowerCase().includes(searchLower)
      )
    );
  }
  if (selectedType.value !== "All") {
    filtered = filtered.filter(
      (asset) => asset.assetType === selectedType.value
    );
  }
  if (selectedStatus.value !== "All") {
    filtered = filtered.filter(
      (asset) => asset.status === selectedStatus.value
    );
  }
  return filtered;
});

// จัดเรียงข้อมูลตามคอลัมน์ที่เลือก
const sortedAssets = computed(() => {
  const sorted = [...filteredAssets.value];
  sorted.sort((a, b) => {
    if (a[sort.value.column] < b[sort.value.column])
      return sort.value.direction === "asc" ? -1 : 1;
    if (a[sort.value.column] > b[sort.value.column])
      return sort.value.direction === "asc" ? 1 : -1;
    return 0;
  });
  return sorted;
});

// แบ่งหน้าข้อมูล
const paginatedAssets = computed(() => {
  const start = (page.value - 1) * pageCount.value;
  const end = start + pageCount.value;
  return sortedAssets.value.slice(start, end);
});

// รีเซ็ตตัวกรองทั้งหมด
const resetFilters = () => {
  search.value = "";
  selectedType.value = "All";
  selectedStatus.value = "All";
  selectedColumns.value = columns;
  pageCount.value = 10;
};

// อัพเดทหน้าปัจจุบันเมื่อข้อมูลที่กรองเปลี่ยนแปลง
watch(filteredAssets, () => {
  page.value = 1;
});

// สร้างตัวเลือกสำหรับ dropdown ประเภทอุปกรณ์
const typeOptions = computed(() => {
  const types = new Set(assets.value.map((asset) => asset.assetType));
  return [
    { label: "All", value: "All" },
    ...Array.from(types).map((type) => ({ label: type, value: type })),
  ];
});

// สร้างตัวเลือกสำหรับ dropdown สถานะ
const statusOptions = computed(() => {
  const statuses = new Set(assets.value.map((asset) => asset.status));
  return [
    { label: "All", value: "All" },
    ...Array.from(statuses).map((status) => ({ label: status, value: status })),
  ];
});
</script>

<template>
  <UCard
    class="w-full"
    :ui="{
      base: '',
      ring: '',
      divide: 'divide-y divide-gray-200 dark:divide-gray-700',
      header: { padding: 'px-4 py-5' },
      body: {
        padding: '',
        base: 'divide-y divide-gray-200 dark:divide-gray-700',
      },
      footer: { padding: 'p-4' },
    }"
  >
    <!-- ส่วนหัวของการ์ด -->
    <template #header>
      <div class="flex items-center justify-between">
        <h2
          class="font-semibold text-xl text-gray-900 dark:text-white leading-tight"
        >
          Asset Management
        </h2>
        <UButton
          icon="i-heroicons-plus-circle"
          size="sm"
          color="primary"
          variant="solid"
          label="เพิ่มอุปกรณ์"
          :trailing="false"
          @click="openAddAssetModal"
        />
      </div>
    </template>

    <!-- ส่วนของตัวกรองและการค้นหา -->
    <div
      class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-3"
    >
      <UInput
        v-model="search"
        icon="i-heroicons-magnifying-glass-20-solid"
        placeholder="Search..."
        class="w-full sm:w-80 mb-3 sm:mb-0"
      />
      <div class="flex flex-wrap gap-2 w-full sm:w-auto">
        <USelect
          v-model="selectedType"
          :options="typeOptions"
          placeholder="ประเภทอุปกรณ์"
          class="w-full sm:w-40"
        />
        <USelect
          v-model="selectedStatus"
          :options="statusOptions"
          placeholder="สถานะ"
          class="w-full sm:w-40"
        />
      </div>
    </div>
    <!-- ส่วนของการควบคุมการแสดงผลและการรีเซ็ต -->
    <div class="flex justify-between items-center w-full px-4 py-3">
      <div class="flex items-center gap-1.5">
        <span class="text-sm leading-5">Rows per page:</span>
        <USelect
          v-model="pageCount"
          :options="[3, 5, 10, 20, 30, 40]"
          class="me-2 w-20"
          size="xs"
        />
      </div>

      <div class="flex gap-1.5 items-center">
        <USelectMenu v-model="selectedColumns" :options="columns" multiple>
          <UButton icon="i-heroicons-view-columns" color="gray" size="xs">
            Columns
          </UButton>
        </USelectMenu>

        <UButton
          icon="i-heroicons-funnel"
          color="gray"
          size="xs"
          :disabled="
            search === '' &&
            selectedType === 'All' &&
            selectedStatus === 'All' &&
            selectedColumns.length === columns.length &&
            pageCount === 10
          "
          @click="resetFilters"
        >
          Reset
        </UButton>
      </div>
    </div>

    <!-- ตารางแสดงข้อมูล -->
    <UTable
      v-model:sort="sort"
      :rows="paginatedAssets"
      :columns="columnsTable"
      sort-asc-icon="i-heroicons-arrow-up"
      sort-desc-icon="i-heroicons-arrow-down"
      class="w-full"
      :ui="{
        td: { base: 'max-w-[0] truncate' },
      }"
    >
      <!-- แสดงสถานะด้วย Badge -->
      <template #status-data="{ row }">
        <UBadge
          size="xs"
          :label="row.status"
          :color="row.status === 'Active' ? 'emerald' : 'orange'"
          variant="subtle"
        />
      </template>

      <!-- ปุ่มการกระทำสำหรับแต่ละแถว -->
      <template #actions-data="{ row }">
        <div class="flex gap-2">
          <UButton
            icon="i-heroicons-pencil"
            size="xs"
            color="gray"
            variant="ghost"
            :ui="{ rounded: 'rounded-full' }"
            square
            @click="openEditAssetModal(row)"
          />
          <UButton
            icon="i-heroicons-trash"
            size="xs"
            color="red"
            variant="ghost"
            :ui="{ rounded: 'rounded-full' }"
            square
            @click="deleteAsset(row.assetID)"
          />
        </div>
      </template>
    </UTable>

    <!-- ส่วนท้ายของการ์ด แสดงจำนวนผลลัพธ์และการแบ่งหน้า -->
    <template #footer>
      <div class="flex flex-wrap justify-between items-center">
        <div>
          <span class="text-sm leading-5">
            Showing
            <span class="font-medium">{{ pageFrom }}</span>
            to
            <span class="font-medium">{{ pageTo }}</span>
            of
            <span class="font-medium">{{ pageTotal }}</span>
            results
          </span>
        </div>
        <UPagination
          v-model="page"
          :page-count="pageCount"
          :total="pageTotal"
          :ui="{
            wrapper: 'flex items-center gap-1',
            rounded: '!rounded-full min-w-[32px] justify-center',
            default: {
              activeButton: {
                variant: 'outline',
              },
            },
          }"
        />
      </div>
    </template>

    <!-- Modal สำหรับเพิ่ม/แก้ไขอุปกรณ์ -->
    <AssetModal
      v-if="isAssetModalOpen"
      :is-open="isAssetModalOpen"
      :mode="modalMode"
      :asset="editingAsset"
      @close="closeAssetModal"
      @save="saveAsset"
    />
  </UCard>
</template>
