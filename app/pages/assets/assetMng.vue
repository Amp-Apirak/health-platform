<script setup>
import { ref, computed, watch } from "vue";
import OrgModal from "~/components/AssetInventory/PopupAsset.vue";

// ข้อมูลขององค์กรต่าง ๆ
const orgs = ref([
  {
    no: 1,
    nameOrg: "ศูนย์ฝึกอบรมตำรวจกลาง (ฝรก.) 2",
    level: "ระดับสูงสุด",
    district: "ปทุมวัน",
    county: "ปทุมวัน",
    province: "กรุงเทพฯ",
    date: "21/08/2567 08.32",
  },
  {
    no: 2,
    nameOrg: "ศูนย์ฝึกอบรมตำรวจกลาง (ฝรก.)",
    level: "ระดับ 1",
    district: "ปทุมวัน",
    county: "ปทุมวัน",
    province: "กรุงเทพฯ",
    date: "21/08/2567 08.22",
  },
  {
    no: 3,
    nameOrg: "ศูนย์ฝึกอบรมยุทธวิธีตำรวจกลาง",
    level: "ระดับ 2",
    district: "ปากช่อง",
    county: "หนองสาหร่าย",
    province: "นครราชสีมา",
    date: "21/08/2567 09.02",
  },
  {
    no: 4,
    nameOrg: "ศูนย์ฝึกอบรมยุทธวิธีตำรวจกลาง 1",
    level: "ระดับ 3",
    district: "ปทุมวัน",
    county: "ปทุมวัน",
    province: "กรุงเทพฯ",
    date: "21/08/2567 08.22",
  },
  {
    no: 5,
    nameOrg: "ศูนย์ฝึกอบรมตำรวจภูธรภาค 1",
    level: "ระดับ 4",
    district: "เมือง",
    county: "เมือง",
    province: "นครปฐม",
    date: "22/08/2567 10.15",
  },
  {
    no: 6,
    nameOrg: "ศูนย์ฝึกอบรมตำรวจภูธรภาค 2",
    level: "ระดับ 3",
    district: "ศรีราชา",
    county: "ศรีราชา",
    province: "ชลบุรี",
    date: "22/08/2567 14.30",
  },
  {
    no: 7,
    nameOrg: "ศูนย์ฝึกอบรมตำรวจภูธรภาค 3",
    level: "ระดับ 2",
    district: "เมือง",
    county: "เมือง",
    province: "นครราชสีมา",
    date: "23/08/2567 09.45",
  },
  {
    no: 8,
    nameOrg: "ศูนย์ฝึกอบรมตำรวจภูธรภาค 4",
    level: "ระดับ 1",
    district: "เมือง",
    county: "เมือง",
    province: "ขอนแก่น",
    date: "23/08/2567 13.20",
  },
  {
    no: 9,
    nameOrg: "ศูนย์ฝึกอบรมตำรวจภูธรภาค 5",
    level: "ระดับสูงสุด",
    district: "เมือง",
    county: "เมือง",
    province: "ลำปาง",
    date: "24/08/2567 11.00",
  },
  {
    no: 10,
    nameOrg: "ศูนย์ฝึกอบรมตำรวจภูธรภาค 6",
    level: "ระดับ 4",
    district: "เมือง",
    county: "เมือง",
    province: "พิษณุโลก",
    date: "24/08/2567 15.50",
  },
  {
    no: 11,
    nameOrg: "ศูนย์ฝึกอบรมตำรวจภูธรภาค 7",
    level: "ระดับ 3",
    district: "เมือง",
    county: "เมือง",
    province: "นครปฐม",
    date: "25/08/2567 08.30",
  },
  {
    no: 12,
    nameOrg: "ศูนย์ฝึกอบรมตำรวจภูธรภาค 8",
    level: "ระดับ 2",
    district: "เมือง",
    county: "เมือง",
    province: "ภูเก็ต",
    date: "25/08/2567 12.10",
  },
  {
    no: 13,
    nameOrg: "ศูนย์ฝึกอบรมตำรวจภูธรภาค 9",
    level: "ระดับ 1",
    district: "หาดใหญ่",
    county: "หาดใหญ่",
    province: "สงขลา",
    date: "26/08/2567 10.40",
  },
  {
    no: 14,
    nameOrg: "ศูนย์ฝึกอบรมตำรวจตระเวนชายแดน",
    level: "ระดับสูงสุด",
    district: "ปากช่อง",
    county: "ปากช่อง",
    province: "นครราชสีมา",
    date: "26/08/2567 16.25",
  },
  {
    no: 15,
    nameOrg: "ศูนย์ฝึกอบรมตำรวจนครบาล",
    level: "ระดับ 4",
    district: "บางเขน",
    county: "บางเขน",
    province: "กรุงเทพฯ",
    date: "27/08/2567 09.15",
  },
  {
    no: 16,
    nameOrg: "ศูนย์ฝึกอบรมตำรวจทางหลวง",
    level: "ระดับ 3",
    district: "ปากเกร็ด",
    county: "ปากเกร็ด",
    province: "นนทบุรี",
    date: "27/08/2567 13.05",
  },
  {
    no: 17,
    nameOrg: "ศูนย์ฝึกอบรมตำรวจน้ำ",
    level: "ระดับ 2",
    district: "เมือง",
    county: "เมือง",
    province: "สมุทรปราการ",
    date: "28/08/2567 11.30",
  },
  {
    no: 18,
    nameOrg: "ศูนย์ฝึกอบรมตำรวจรถไฟ",
    level: "ระดับ 1",
    district: "ธนบุรี",
    county: "ธนบุรี",
    province: "กรุงเทพฯ",
    date: "28/08/2567 14.45",
  },
  {
    no: 19,
    nameOrg: "ศูนย์ฝึกอบรมตำรวจท่องเที่ยว",
    level: "ระดับสูงสุด",
    district: "บางพลัด",
    county: "บางพลัด",
    province: "กรุงเทพฯ",
    date: "29/08/2567 10.00",
  },
  {
    no: 20,
    nameOrg: "ศูนย์ฝึกอบรมตำรวจปราบปรามยาเสพติด",
    level: "ระดับ 4",
    district: "เมือง",
    county: "เมือง",
    province: "ปทุมธานี",
    date: "29/08/2567 15.35",
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
  { key: "no", label: "No.", sortable: true },
  { key: "nameOrg", label: "ชื่อขององค์กร", sortable: true },
  { key: "level", label: "ระดับองค์กร", sortable: true },
  { key: "district", label: "อำเภอ/เขต", sortable: true },
  { key: "county", label: "เมือง/แขวง", sortable: true },
  { key: "province", label: "จังหวัด", sortable: true },
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
          Organization Management
        </h2>
        <UButton
          icon="i-heroicons-plus-circle"
          size="sm"
          color="primary"
          variant="solid"
          label="เพิ่มองค์กร"
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
