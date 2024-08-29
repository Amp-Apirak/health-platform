<script setup lang="ts">
import { ref } from "vue";
import PopupComponent from "../components/organization/PopupComponent.vue";

// สร้างตัวแปรเพื่อตรวจสอบสถานะของ Popup
const isPopupOpen = ref(false);
console.log(isPopupOpen.value);

// ฟังก์ชันเปิด Popup
const openPopup = () => {
  isPopupOpen.value = true;
  console.log(isPopupOpen.value);
};

// นำเข้าฟังก์ชันเพื่อจัดการแถบการแจ้งเตือน
const { isNotificationsSlideoverOpen } = useDashboard();

// กำหนดโครงสร้างของคอลัมน์ในตาราง
const columns = [
  { key: "no", label: "No.", sortable: true },
  { key: "nameOrg", label: "ชื่อขององค์กร", sortable: true },
  { key: "level", label: "ระดับองค์กร", sortable: true },
  { key: "district", label: "อำเภอ/เขต", sortable: true },
  { key: "county", label: "เมือง/แขวง", sortable: true },
  { key: "province", label: "จังหวัด", sortable: true },
  { key: "date", label: "วันที่สร้าง", sortable: true },
  { key: "actions" },
];

const selectedColumns = ref([...columns]);

// ข้อมูลขององค์กรต่าง ๆ
const people = [
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
];

// สร้างตัวแปรสำหรับข้อมูลที่เลือก
const selectedPerson = ref(null);

// ฟังก์ชันสร้างเมนูการกระทำสำหรับแต่ละแถว
const items = (row) => [
  [
    {
      label: "View",
      icon: "material-symbols:pageview-outline",
      click: () => console.log("view", row.no),
    },
  ],
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit", row.id),
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => console.log("Delete", row.id),
    },
  ],
];

// ตัวแปรสำหรับเก็บคำค้นหา
const q = ref("");
const page = ref(1);
const pageCount = 10;

// เมื่อมีการเปลี่ยนแปลงใน q จะรีเซ็ตหน้าที่แสดง
watch(q, () => {
  page.value = 1;
});

// คำนวณข้อมูลที่กรองตามคำค้นหา
const filteredRows = computed(() => {
  if (!q.value) {
    return people;
  }

  return people.filter((person) => {
    return Object.values(person).some((value) => {
      // ลบช่องว่างก่อนทำการเปรียบเทียบ
      return String(value)
        .toLowerCase()
        .replace(/\s/g, "")
        .includes(q.value.toLowerCase().replace(/\s/g, ""));
    });
  });
});

// คำนวณข้อมูลที่แสดงในหน้าปัจจุบัน
const paginatedFilteredRows = computed(() => {
  return filteredRows.value.slice(
    (page.value - 1) * pageCount,
    page.value * pageCount
  );
});
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardPanelContent>
        <!-- ส่วนค้นหาและปุ่มเพิ่มข้อมูล -->
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center px-3 py-3.5 border-b border-gray-200 dark:border-gray-700 space-y-3 sm:space-y-0"
        >
          <div
           class="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto"
          >
            <!-- ใช้ flex และ space-x-3 สำหรับเว้นระยะห่างระหว่าง Columns และ Filter -->
            <USelectMenu
              v-model="selectedColumns"
              :options="columns"
              multiple
              placeholder="Columns"
              class="w-48"
            />
            <UInput
              v-model="q"
              placeholder="Filter ..."
              class="flex-grow w-80"
            />
          </div>
          <UButton color="primary" @click="openPopup" class="">
            เพิ่มข้อมูลองค์กร
          </UButton>
        </div>

        <!-- ตารางแสดงข้อมูลองค์กร -->
        <div class="overflow-x-auto">
          <UTable :rows="paginatedFilteredRows" :columns="selectedColumns">
            <template #actions-data="{ row }">
              <UDropdown :items="items(row)">
                <!-- <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-ellipsis-horizontal-20-solid"
                size="xs"
              /> -->
              </UDropdown>
            </template>
          </UTable>
        </div>

        <!-- แสดงจำนวนรายการและการแบ่งหน้า -->
        <div
          class="flex flex-col sm:flex-row justify-between items-center px-3 py-3.5 border-t border-gray-200 dark:border-gray-700 space-y-3 sm:space-y-0"
        >
          Total: {{ filteredRows.length }} entries

          <UPagination
            v-model="page"
            :page-count="pageCount"
            :total="filteredRows.length"
          />
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>

    <!-- แสดง PopupComponent เมื่อ isPopupOpen เป็น true -->
    <PopupComponent v-if="isPopupOpen" @close="isPopupOpen = false" />
  </UDashboardPage>
</template>

