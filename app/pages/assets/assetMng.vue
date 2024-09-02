<script setup>
import { ref, computed, watch } from "vue";
import OrgModal from "~/components/AssetInventory/PopupAsset.vue";

// ข้อมูลขององค์กรต่าง ๆ
const orgs = ref([
  {
    assetID: "A001",
    assetName: "AI Tracker 1",
    assetType: "Health Sensor",
    manufacturer: "GE Healthcare",
    model: "LOGIQ E10",
    serialNumber: "GE12345678",
    location: "Room 101",
    InstallationDate: "2023-01-15",
    warranty: "3 years",
    expirationDate: "2026-01-15",
    status: "Active",
    ipAddress: "192.168.1.10",
    macAddress: "00:1A:2B:3C:4D:5E",
    firmware: "v1.2.3",
    lastMaintenanceDate: "2024-05-12",
    maintenanceDate: "2024-11-12",
    organization: "สำนักงานตำรวจแห่งชาติ",
    location: "Main Building",
    building: "A",
    floor: "1",
    owner: "Radiology Department",
  },
  {
    assetID: "A002",
    assetName: "AI Tracker 2",
    assetType: "Health Sensor",
    manufacturer: "Siemens Healthineers",
    model: "MAGNETOM Sola",
    serialNumber: "SI67891234",
    location: "Room 102",
    InstallationDate: "2022-06-20",
    warranty: "5 years",
    expirationDate: "2027-06-20",
    status: "Active",
    ipAddress: "192.168.1.11",
    macAddress: "00:1A:2B:3C:4D:5F",
    firmware: "v2.1.0",
    lastMaintenanceDate: "2024-03-18",
    maintenanceDate: "2024-09-18",
    organization: "สำนักงานตำรวจแห่งชาติ",
    location: "Main Building",
    building: "B",
    floor: "2",
    owner: "Radiology Department",
  },
  {
    assetID: "A003",
    assetName: "CT Scanner",
    assetType: "Health Sensor",
    manufacturer: "Philips",
    model: "Ingenuity CT",
    serialNumber: "PH34567891",
    location: "Room 103",
    InstallationDate: "2021-11-10",
    warranty: "4 years",
    expirationDate: "2025-11-10",
    status: "Active",
    ipAddress: "192.168.1.12",
    macAddress: "00:1A:2B:3C:4D:60",
    firmware: "v3.0.1",
    lastMaintenanceDate: "2024-02-22",
    maintenanceDate: "2024-08-22",
    organization: "สำนักงานตำรวจแห่งชาติ",
    location: "Main Building",
    building: "B",
    floor: "2",
    owner: "Radiology Department",
  },
  {
    assetID: "A004",
    assetName: "X-Ray Machine",
    assetType: "Health Sensor",
    manufacturer: "Canon Medical",
    model: "Radrex-i",
    serialNumber: "CA09876543",
    location: "Room 104",
    InstallationDate: "2020-08-05",
    warranty: "5 years",
    expirationDate: "2025-08-05",
    status: "Active",
    ipAddress: "192.168.1.13",
    macAddress: "00:1A:2B:3C:4D:61",
    firmware: "v1.5.0",
    lastMaintenanceDate: "2023-12-10",
    maintenanceDate: "2024-06-10",
    organization: "สำนักงานตำรวจแห่งชาติ",
    location: "Main Building",
    building: "A",
    floor: "1",
    owner: "Radiology Department",
  },
  {
    assetID: "A005",
    assetName: "Defibrillator",
    assetType: "Environment Sensor",
    manufacturer: "Zoll",
    model: "AED Plus",
    serialNumber: "ZL12345009",
    location: "Room 105",
    InstallationDate: "2019-02-12",
    warranty: "3 years",
    expirationDate: "2022-02-12",
    status: "Inactive",
    ipAddress: "192.168.1.14",
    macAddress: "00:1A:2B:3C:4D:62",
    firmware: "v2.3.5",
    lastMaintenanceDate: "2023-11-25",
    maintenanceDate: "2024-05-25",
    organization: "สำนักงานตำรวจแห่งชาติ",
    location: "Emergency Room",
    building: "C",
    floor: "1",
    owner: "Emergency Department",
  },
  {
    assetID: "A006",
    assetName: "Ventilator",
    assetType: "Environment Sensor",
    manufacturer: "Dräger",
    model: "Evita Infinity V500",
    serialNumber: "DR56789012",
    location: "ICU",
    InstallationDate: "2021-03-18",
    warranty: "5 years",
    expirationDate: "2026-03-18",
    status: "Active",
    ipAddress: "192.168.1.15",
    macAddress: "00:1A:2B:3C:4D:63",
    firmware: "v1.9.7",
    lastMaintenanceDate: "2024-04-15",
    maintenanceDate: "2024-10-15",
    organization: "สำนักงานตำรวจแห่งชาติ",
    location: "Main Building",
    building: "C",
    floor: "3",
    owner: "Intensive Care Unit",
  },
  {
    assetID: "A007",
    assetName: "Infusion Pump",
    assetType: "Environment Sensor",
    manufacturer: "Baxter",
    model: "Sigma Spectrum",
    serialNumber: "BA10293847",
    location: "Ward 3A",
    InstallationDate: "2020-12-22",
    warranty: "4 years",
    expirationDate: "2024-12-22",
    status: "Active",
    ipAddress: "192.168.1.16",
    macAddress: "00:1A:2B:3C:4D:64",
    firmware: "v3.4.2",
    lastMaintenanceDate: "2024-01-12",
    maintenanceDate: "2024-07-12",
    organization: "สำนักงานตำรวจแห่งชาติ",
    location: "Main Building",
    building: "D",
    floor: "3",
    owner: "General Surgery Department",
  },
]);

// สถานะของ Modal
const isOrgModalOpen = ref(false);
const modalMode = ref("add");
const editingOrg = ref(null);

// เปิด Modal สำหรับเพิ่มองค์กร
const openAddOrgModal = () => {
  modalMode.value = "add";
  editingOrg.value = null;
  isOrgModalOpen.value = true;
};

// เปิด Modal สำหรับแก้ไของค์กร
const openEditOrgModal = (org) => {
  modalMode.value = "edit";
  editingOrg.value = { ...org };
  isOrgModalOpen.value = true;
};

// บันทึกข้อมูลองค์กร
const saveOrg = (orgData) => {
  if (modalMode.value === "add") {
    addOrg(orgData);
  } else {
    editOrg(orgData);
  }
  closeOrgModal();
};

// ปิด Modal
const closeOrgModal = () => {
  isOrgModalOpen.value = false;
  editingOrg.value = null;
};

// เพิ่มองค์กรใหม่
const addOrg = (newOrg) => {
  newOrg.no = orgs.value.length + 1;
  newOrg.date = new Date().toLocaleDateString("th-TH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  orgs.value.push(newOrg);
};

// แก้ไขข้อมูลองค์กร
const editOrg = (updatedOrg) => {
  const index = orgs.value.findIndex((org) => org.no === updatedOrg.no);
  if (index !== -1) {
    orgs.value[index] = updatedOrg;
  }
};

// ลบองค์กร
const deleteOrg = (orgNo) => {
  orgs.value = orgs.value.filter((org) => org.no !== orgNo);
};

// กำหนดโครงสร้างของคอลัมน์ในตาราง
const columns = [
  { key: "assetID", label: "Asset ID", sortable: true },
  { key: "assetName", label: "Asset Name", sortable: true },
  { key: "assetType", label: "Asset Type", sortable: true },
  { key: "serialNumber", label: "Serial Number", sortable: true },
  { key: "organization", label: "Organization", sortable: true },
  { key: "owner", label: "Owner", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "date", label: "วันที่สร้าง", sortable: true },
  { key: "actions", label: "Actions", sortable: false },
];

// คอลัมน์ที่ถูกเลือกให้แสดง
const selectedColumns = ref(columns);
const columnsTable = computed(() =>
  columns.filter((column) => selectedColumns.value.includes(column))
);

// ค่าสำหรับการค้นหาและกรอง
const search = ref("");
const selectedLevel = ref("All");
const selectedProvince = ref("All");
const selectedDistrict = ref("All");

// การจัดเรียงและการแบ่งหน้า
const sort = ref({ column: "no", direction: "asc" });
const page = ref(1);
const pageCount = ref(10);
const pageTotal = computed(() => filteredOrgs.value.length);

// คำนวณช่วงของข้อมูลที่แสดงในแต่ละหน้า
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1);
const pageTo = computed(() =>
  Math.min(page.value * pageCount.value, pageTotal.value)
);

// กรองข้อมูลตามเงื่อนไขที่กำหนด
const filteredOrgs = computed(() => {
  let filtered = orgs.value;
  if (search.value) {
    const searchLower = search.value.toLowerCase();
    filtered = filtered.filter((org) =>
      Object.values(org).some((val) =>
        val.toString().toLowerCase().includes(searchLower)
      )
    );
  }
  if (selectedLevel.value !== "All") {
    filtered = filtered.filter((org) => org.level === selectedLevel.value);
  }
  if (selectedProvince.value !== "All") {
    filtered = filtered.filter(
      (org) => org.province === selectedProvince.value
    );
  }
  if (selectedDistrict.value !== "All") {
    filtered = filtered.filter(
      (org) => org.district === selectedDistrict.value
    );
  }
  return filtered;
});

// จัดเรียงข้อมูลตามคอลัมน์ที่เลือก
const sortedOrgs = computed(() => {
  const sorted = [...filteredOrgs.value];
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
const paginatedOrgs = computed(() => {
  const start = (page.value - 1) * pageCount.value;
  const end = start + pageCount.value;
  return sortedOrgs.value.slice(start, end);
});

// รีเซ็ตตัวกรองทั้งหมด
const resetFilters = () => {
  search.value = "";
  selectedLevel.value = "All";
  selectedProvince.value = "All";
  selectedDistrict.value = "All";
  selectedColumns.value = columns;
  pageCount.value = 10;
};

// อัพเดทหน้าปัจจุบันเมื่อข้อมูลที่กรองเปลี่ยนแปลง
watch(filteredOrgs, () => {
  page.value = 1;
});

// สร้างตัวเลือกสำหรับ dropdown ระดับองค์กร
const levelOptions = computed(() => {
  const levels = new Set(orgs.value.map((org) => org.level));
  return [
    { label: "All", value: "All" },
    ...Array.from(levels).map((level) => ({ label: level, value: level })),
  ];
});

// สร้างตัวเลือกสำหรับ dropdown จังหวัด
const provinceOptions = computed(() => {
  const provinces = new Set(orgs.value.map((org) => org.province));
  return [
    { label: "All", value: "All" },
    ...Array.from(provinces).map((province) => ({
      label: province,
      value: province,
    })),
  ];
});

// สร้างตัวเลือกสำหรับ dropdown อำเภอ
const districtOptions = computed(() => {
  let districts;
  if (selectedProvince.value === "All") {
    districts = new Set(orgs.value.map((org) => org.district));
  } else {
    districts = new Set(
      orgs.value
        .filter((org) => org.province === selectedProvince.value)
        .map((org) => org.district)
    );
  }
  return [
    { label: "All", value: "All" },
    ...Array.from(districts).map((district) => ({
      label: district,
      value: district,
    })),
  ];
});

// รีเซ็ตอำเภอเมื่อเปลี่ยนจังหวัด
watch(selectedProvince, () => {
  selectedDistrict.value = "All";
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
          @click="openAddOrgModal"
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
          v-model="selectedLevel"
          :options="levelOptions"
          placeholder="ระดับองค์กร"
          class="w-full sm:w-40"
        />
        <USelect
          v-model="selectedProvince"
          :options="provinceOptions"
          placeholder="จังหวัด"
          class="w-full sm:w-40"
        />
        <USelect
          v-model="selectedDistrict"
          :options="districtOptions"
          placeholder="อำเภอ"
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
            selectedLevel === 'All' &&
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
      :rows="paginatedOrgs"
      :columns="columnsTable"
      sort-asc-icon="i-heroicons-arrow-up"
      sort-desc-icon="i-heroicons-arrow-down"
      class="w-full"
      :ui="{
        td: { base: 'max-w-[0] truncate' },
      }"
    >
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
            @click="openEditOrgModal(row)"
          />
          <UButton
            icon="i-heroicons-trash"
            size="xs"
            color="red"
            variant="ghost"
            :ui="{ rounded: 'rounded-full' }"
            square
            @click="deleteOrg(row.no)"
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

    <!-- Modal สำหรับเพิ่ม/แก้ไของค์กร -->
    <OrgModal
      v-if="isOrgModalOpen"
      :is-open="isOrgModalOpen"
      :mode="modalMode"
      :org="editingOrg"
      @close="closeOrgModal"
      @save="saveOrg"
    />
  </UCard>
</template>
