<script setup>
import { ref, computed, watch } from "vue";
import UserModal from "~/components/user/PopupUser.vue";

// ข้อมูลผู้ใช้
const users = ref([
  {
    id: 1,
    username: "jane_smith",
    role: "ผู้ใช้งานทั่วไป",
    fullName: "ร.ต.อ. อาทิตย์ สิทธิธรรม",
    organization: "สำนักงานตำรวจแห่งชาติ",
    status: "Inactive",
    createdAt: "2023-08-15",
  },
  {
    id: 2,
    username: "john_doe",
    role: "ผู้ดูแลระบบ",
    fullName: "ส.ต.ต. เกียรติศักดิ์ วงศ์วิเศษ",
    organization: "กองบังคับการตำรวจภาค 7",
    status: "Active",
    createdAt: "2023-09-01",
  },
  {
    id: 3,
    username: "alice_johnson",
    role: "ผู้จัดการ",
    fullName: "พ.ต.อ. ธนากร อัศวไกร",
    organization: "กองบังคับการตำรวจภาค 5",
    status: "Active",
    createdAt: "2023-10-05",
  },
]);

// สถานะของ Modal
const isUserModalOpen = ref(false);
const modalMode = ref("add"); // 'add' หรือ 'edit'
const editingUser = ref(null);

// เปิด Modal สำหรับเพิ่มผู้ใช้ใหม่
const openAddUserModal = () => {
  modalMode.value = "add";
  editingUser.value = null;
  isUserModalOpen.value = true;
};

// เปิด Modal สำหรับแก้ไขผู้ใช้
const openEditUserModal = (user) => {
  modalMode.value = "edit";
  editingUser.value = { ...user };
  isUserModalOpen.value = true;
};

// เพิ่มฟังก์ชัน saveUser
const saveUser = (userData) => {
  if (modalMode.value === "add") {
    addUser(userData);
  } else {
    editUser(userData);
  }
  closeUserModal();
};

// ปิด Modal
const closeUserModal = () => {
  isUserModalOpen.value = false;
  editingUser.value = null;
};

// เพิ่มผู้ใช้ใหม่
const addUser = (newUser) => {
  newUser.id = users.value.length + 1; // สร้าง ID ใหม่
  newUser.createdAt = new Date().toISOString().split("T")[0]; // วันที่ปัจจุบัน
  users.value.push(newUser);
  closeUserModal();
};

// แก้ไขข้อมูลผู้ใช้
const editUser = (updatedUser) => {
  const index = users.value.findIndex((user) => user.id === updatedUser.id);
  if (index !== -1) {
    users.value[index] = updatedUser;
  }
  closeUserModal();
};

// ลบผู้ใช้
const deleteUser = (userId) => {
  users.value = users.value.filter((user) => user.id !== userId);
};

// กำหนดคอลัมน์ของตาราง
const columns = [
  { key: "id", label: "ลำดับ", sortable: true },
  { key: "username", label: "ชื่อผู้ใช้งาน", sortable: true },
  { key: "role", label: "สิทธิ์", sortable: true },
  { key: "fullName", label: "ชื่อ-สกุล", sortable: true },
  { key: "organization", label: "องค์กร", sortable: true },
  { key: "status", label: "สถานะ", sortable: true },
  { key: "createdAt", label: "วันที่สร้าง", sortable: true },
  { key: "actions", label: "Actions", sortable: false },
];

// คอลัมน์ที่ถูกเลือกให้แสดง
const selectedColumns = ref(columns);
const columnsTable = computed(() =>
  columns.filter((column) => selectedColumns.value.includes(column))
);

// แถวที่ถูกเลือก
const selectedRows = ref([]);

// ค่าสำหรับการค้นหาและกรอง
const search = ref("");
const selectedStatus = ref("All");
const selectedRole = ref("All");
const selectedOrganization = ref("All");

// การจัดเรียงและการแบ่งหน้า
const sort = ref({ column: "id", direction: "asc" });
const page = ref(1);
const pageCount = ref(10);
const pageTotal = computed(() => filteredUsers.value.length);

// คำนวณช่วงของข้อมูลที่แสดงในแต่ละหน้า
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1);
const pageTo = computed(() =>
  Math.min(page.value * pageCount.value, pageTotal.value)
);

// กรองข้อมูลตามเงื่อนไขที่กำหนด
const filteredUsers = computed(() => {
  let filtered = users.value;
  if (search.value) {
    const searchLower = search.value.toLowerCase();
    filtered = filtered.filter((user) =>
      Object.values(user).some((val) =>
        val.toString().toLowerCase().includes(searchLower)
      )
    );
  }
  if (selectedStatus.value !== "All") {
    filtered = filtered.filter((user) => user.status === selectedStatus.value);
  }
  if (selectedRole.value !== "All") {
    filtered = filtered.filter((user) => user.role === selectedRole.value);
  }
  if (selectedOrganization.value !== "All") {
    filtered = filtered.filter(
      (user) => user.organization === selectedOrganization.value
    );
  }
  return filtered;
});

// จัดเรียงข้อมูลตามคอลัมน์ที่เลือก
const sortedUsers = computed(() => {
  const sorted = [...filteredUsers.value];
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
const paginatedUsers = computed(() => {
  const start = (page.value - 1) * pageCount.value;
  const end = start + pageCount.value;
  return sortedUsers.value.slice(start, end);
});

// เลือก/ยกเลิกการเลือกแถว
function select(row) {
  const index = selectedRows.value.findIndex((item) => item.id === row.id);
  if (index === -1) {
    selectedRows.value.push(row);
  } else {
    selectedRows.value.splice(index, 1);
  }
}

// รีเซ็ตตัวกรองทั้งหมด
const resetFilters = () => {
  search.value = "";
  selectedStatus.value = "All";
  selectedRole.value = "All";
  selectedOrganization.value = "All";
  selectedColumns.value = columns;
  pageCount.value = 10;
};

// อัพเดทหน้าปัจจุบันเมื่อข้อมูลที่กรองเปลี่ยนแปลง
watch(filteredUsers, () => {
  page.value = 1;
});

// สร้างตัวเลือกสำหรับ dropdown จากข้อมูลที่มี
const roleOptions = computed(() => {
  const roles = new Set(users.value.map((user) => user.role));
  return [
    { label: "All", value: "All" },
    ...Array.from(roles).map((role) => ({ label: role, value: role })),
  ];
});

const organizationOptions = computed(() => {
  const organizations = new Set(users.value.map((user) => user.organization));
  return [
    { label: "All", value: "All" },
    ...Array.from(organizations).map((org) => ({ label: org, value: org })),
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
          User Management
        </h2>
        <UButton
          icon="i-heroicons-plus-circle"
          size="sm"
          color="primary"
          variant="solid"
          label="เพิ่มผู้ใช้"
          :trailing="false"
          @click="openAddUserModal"
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
          v-model="selectedStatus"
          :options="[
            { label: 'All', value: 'All' },
            { label: 'Active', value: 'Active' },
            { label: 'Inactive', value: 'Inactive' },
          ]"
          placeholder="Status"
          class="w-full sm:w-40"
        />
        <USelect
          v-model="selectedRole"
          :options="roleOptions"
          placeholder="สิทธิ์"
          class="w-full sm:w-40"
        />
        <USelect
          v-model="selectedOrganization"
          :options="organizationOptions"
          placeholder="องค์กร"
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
            selectedStatus === 'All' &&
            selectedRole === 'All' &&
            selectedOrganization === 'All' &&
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
      v-model="selectedRows"
      v-model:sort="sort"
      :rows="paginatedUsers"
      :columns="columnsTable"
      sort-asc-icon="i-heroicons-arrow-up"
      sort-desc-icon="i-heroicons-arrow-down"
      class="w-full"
      :ui="{
        td: { base: 'max-w-[0] truncate' },
        default: { checkbox: { color: 'gray' } },
      }"
      @select="select"
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
            @click="openEditUserModal(row)"
          />
          <UButton
            icon="i-heroicons-trash"
            size="xs"
            color="red"
            variant="ghost"
            :ui="{ rounded: 'rounded-full' }"
            square
            @click="deleteUser(row.id)"
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
    <!-- Modal สำหรับเพิ่มผู้ใช้ -->
    <UserModal
      v-if="isUserModalOpen"
      :is-open="isUserModalOpen"
      :mode="modalMode"
      :user="editingUser"
      @close="closeUserModal"
      @save="saveUser"
    />
  </UCard>
</template>


