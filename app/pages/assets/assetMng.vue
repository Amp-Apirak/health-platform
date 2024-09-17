<script setup>
import { ref, computed, watch } from "vue";
import AssetModal from "~/components/AssetInventory/PopupAsset.vue";
import DeletedModal from "~/components/DeletedModal.vue";
import { useMockData } from "~/composables/assets/pages/useMockData";


// Mockup data
const { assets } = useMockData();

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

// แก้ไขฟังก์ชัน addAsset
const addAsset = (newAsset) => {
  newAsset.assetID = `A${(assets.value.length + 1)
    .toString()
    .padStart(3, "0")}`;
  newAsset.dateCreated = new Date().toLocaleDateString("th-TH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  // ถ้ามีรูปภาพ ให้แปลงเป็น URL
  if (newAsset.image instanceof File) {
    newAsset.image = URL.createObjectURL(newAsset.image);
  }

  // ตั้งค่า status เป็น "Active" ถ้าไม่ได้ระบุ
  if (!newAsset.status) {
    newAsset.status = "Active";
  }

  assets.value.push(newAsset);
};

// แก้ไขฟังก์ชัน editAsset
const editAsset = (updatedAsset) => {
  const index = assets.value.findIndex(
    (asset) => asset.assetID === updatedAsset.assetID
  );
  if (index !== -1) {
    // ถ้ามีรูปภาพใหม่ ให้แปลงเป็น URL
    if (updatedAsset.image instanceof File) {
      updatedAsset.image = URL.createObjectURL(updatedAsset.image);
    }

    // รักษาค่า status เดิมถ้าไม่ได้เปลี่ยนแปลง
    if (!updatedAsset.status) {
      updatedAsset.status = assets.value[index].status;
    }

    assets.value[index] = { ...assets.value[index], ...updatedAsset };
  }
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
  if (selectedType.value && selectedType.value !== "All") {
    filtered = filtered.filter(
      (asset) =>
        asset.assetType === (selectedType.value.value || selectedType.value)
    );
  }
  if (selectedStatus.value && selectedStatus.value !== "All") {
    filtered = filtered.filter(
      (asset) =>
        asset.status === (selectedStatus.value.value || selectedStatus.value)
    );
  }
  return filtered;
});

// ปรับปรุงฟังก์ชัน resetFilters
const resetFilters = () => {
  search.value = "";
  selectedType.value = "All";
  selectedStatus.value = "All";
  selectedColumns.value = columns;
  pageCount.value = 10;
};

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

// ลบอุปกรณ์
const isDeleteModalOpen = ref(false);
const assetToDelete = ref(null);

//ฟังก์ชัน deleteAsset
const deleteAsset = (asset) => {
  assetToDelete.value = asset;
  isDeleteModalOpen.value = true;
};

//ฟังก์ชัน confirmDelete
const confirmDelete = () => {
  if (assetToDelete.value) {
    assets.value = assets.value.filter(
      (asset) => asset.assetID !== assetToDelete.value.assetID
    );
    isDeleteModalOpen.value = false;
    assetToDelete.value = null;
  }
};
</script>

<template>
  <DeletedModal
    v-model="isDeleteModalOpen"
    :asset-name="assetToDelete?.assetName"
    @confirm="confirmDelete"
    @cancel="isDeleteModalOpen = false"
  />
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
        <UInputMenu
          v-model="selectedType"
          :options="typeOptions"
          placeholder="ประเภทอุปกรณ์"
          class="w-full sm:w-40"
        />
        <UInputMenu
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
          <UButton
            icon="i-heroicons-view-columns"
            color="gray"
            size="xs"
            class="w-40"
          >
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
            @click="deleteAsset(row)"
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
