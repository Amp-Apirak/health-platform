<script setup lang="ts">
const route = useRoute();

// กำหนดโครงสร้างเมนูหลัก
// แต่ละเมนูประกอบด้วย id, label, icon, และ to (ลิงก์ปลายทาง)

// เมนูแดชบอร์ด
const dashboard = [
  {
    id: "Dashboard",
    label: "Dashboard",
    icon: "mage:dashboard-bar",
    to: "/",
  },
];

// เมนูจัดการองค์กร
const organization = [
  {
    id: "Organization Management",
    label: "Organization Management",
    icon: "octicon:organization-24",
    to: "/organization",
  },
];

// เมนูจัดการใบอนุญาต
const license = [
  {
    id: "License Management",
    label: "License Management",
    icon: "mdi:license",
    to: "/license",
    children: [
      {
        label: "License Management",
        to: "/license/license",
        exact: true,
      },
      {
        label: "License Group",
        to: "/license/licenseGroup",
      },
      {
        label: "License Report",
        to: "/license/licenseReport",
      },
    ],
  },
];

// เมนูจัดการผู้ใช้
const user = [
  {
    id: "User Management",
    label: "User Management",
    icon: "material-symbols:account-circle-outline",
    to: "/user",
    children: [
      {
        label: "Account",
        to: "/user/account",
        exact: true,
      },
      {
        label: "User",
        to: "/user/user",
      },
      {
        label: "Group Permission",
        to: "/user/permission",
      },
    ],
  },
];

// เมนูอุปกรณ์สุขภาพ
const equipment = [
  {
    id: "Health Equipment",
    label: "Health Equipment",
    icon: "healthicons:cardiogram-e-outline",
    to: "/healthequipment",
    children: [
      {
        label: "Survey form",
        children: [
          {
            label: "Dashboard Survey",
            to: "/equipment/servey/surDash",
            exact: true,
          },
          {
            label: "Survey List",
            to: "/equipment/servey/surList",
            exact: true,
          },
          {
            label: "Survey Management",
            to: "/equipment/servey/surMng",
            exact: true,
          },
          {
            label: "Survey Report",
            to: "/equipment/servey/surReport",
            exact: true,
          },
        ],
      },
      {
        label: "Health Checkup",
        to: "/equipment/",
        children: [
          {
            label: "Health Dashboard",
            to: "/equipment/",
            exact: true,
          },
          {
            label: "Health Monitoring",
            to: "/equipment/",
            exact: true,
          },
          {
            label: "Health Setting",
            to: "/equipment/",
            exact: true,
          },
          {
            label: "Checkup Report",
            to: "/equipment/",
            exact: true,
          },
        ],
      },
      {
        label: "Urine test screen",
        to: "/urine",
        children: [
          {
            label: "Urine test dashboard",
            to: "/equipment/",
            exact: true,
          },
          {
            label: "Urine test monitoring",
            to: "/equipment/",
            exact: true,
          },
          {
            label: "Urine test settings",
            to: "/equipment/",
            exact: true,
          },
        ],
      },
    ],
  },
];

// เมนูศูนย์สุขภาพ
const sensor = [
  {
    id: "Health Center ",
    label: "Health Center ",
    to: "/sensor",
    icon: "streamline:health-medical-heart-rate-health-beauty-information-data-beat-pulse-monitor-heart-rate-info",
    children: [
      {
        label: "Health running",
        to: "/running",
        children: [
          {
            label: "Dashboard",
            to: "/",
            exact: true,
          },
          {
            label: "Monitoring",
            to: "/",
            exact: true,
          },
          {
            label: "Report",
            to: "/",
            exact: true,
          },
          {
            label: "Setting",
            to: "/",
            exact: true,
          },
        ],
        exact: true,
      },
      {
        label: "Health smart",
        to: "/smart",
        children: [
          {
            label: "Dashboard",
            to: "/",
            exact: true,
          },
          {
            label: "Monitoring",
            to: "/",
            exact: true,
          },
          {
            label: "Report",
            to: "/",
            exact: true,
          },
          {
            label: "Setting",
            to: "/",
            exact: true,
          },
        ],
      },
    ],
  },
];

// เมนูศูนย์สิ่งแวดล้อม
const environment = [
  {
    id: "Environment Center",
    label: "Environment Center",
    icon: "streamline:nature-ecology-leaf-environment-leaf-ecology-plant-plants-eco",
    to: "/environment",
    children: [
      {
        label: "Weather temperature",
        to: "/environment/weather",
        exact: true,
      },
    ],
  },
];

// เมนูสินทรัพย์
const asset = [
  {
    id: "Asset Inventory",
    label: "Asset Inventory",
    icon: "material-symbols:inventory",
    to: "/asset",
    children: [
      {
        label: "Dashboard Inventory",
        to: "/null",
        exact: true,
      },
      {
        label: "Inventory Management",
        to: "/null",
        exact: true,
      },
      {
        label: "Match usage",
        to: "/null",
        exact: true,
      },
      {
        label: "Report Inventory",
        to: "/null",
        exact: true,
      },
    ],
  },
];

// เมนูรายงาน
const report = [
  {
    id: "Report",
    label: "Report",
    icon: "lets-icons:arhive-alt-export-light",
    to: "/report",
    children: [
      {
        label: "Organization Report",
        to: "/report",
        exact: true,
      },
      {
        label: "User Report",
        to: "/report",
        exact: true,
      },
      {
        label: "Account Report",
        to: "/report",
        exact: true,
      },
    ],
  },
];

// เมนูการตั้งค่า
const setting = [
  {
    id: "Setting",
    label: "Setting",
    icon: "uil:setting",
    to: "/setting",
    children: [
      {
        label: "Organization Setting",
        to: "/running",
        children: [
          {
            label: "สักกัด",
            to: "/",
            exact: true,
          },
          {
            label: "Level",
            to: "/",
            exact: true,
          },
        ],
        exact: true,
      },
    ],
  },
];

// สร้างกลุ่มเมนูสำหรับการค้นหาและการนำทาง
const groups = [
  {
    key: "links",
    label: "Go to",
    commands: [
      ...dashboard,
      ...organization,
      ...license,
      ...user,
      ...equipment,
      ...sensor,
      ...environment,
      ...asset,
      ...report,
      ...setting,
    ],
  },
  {
    key: "code",
    label: "Code",
    commands: [
      {
        id: "source",
        label: "View page source",
        icon: "i-simple-icons-github",
        click: () => {
          window.open(
            `https://github.com/nuxt-ui-pro/dashboard/blob/main/pages${
              route.path === "/" ? "/index" : route.path
            }.vue, '_blank'`
          );
        },
      },
    ],
  },
];
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel
      :width="250"
      :resizable="{ min: 200, max: 300 }"
      collapsible
    >
      <UDashboardSidebar>
        <!-- ส่วนหัวของ sidebar -->
        <template #header>
          <img src="/images/logo.jpg" alt="Platform Logo" class="logo" />
        </template>

        <!-- แสดงเมนูต่างๆ โดยใช้ UNavigationTree -->
        <UNavigationTree :links="dashboard" class="fontdashboard" />
        <UDivider />
        <UNavigationTree :links="organization" class="fontdashboard" />
        <UDivider />
        <UNavigationTree :links="license" default-open />
        <UDivider />
        <UNavigationTree :links="user" default-open />
        <UDivider />
        <UNavigationTree :links="equipment" default-open />
        <UDivider />
        <UNavigationTree :links="sensor" default-open />
        <UDivider />
        <UNavigationTree :links="environment" default-open />
        <UDivider />
        <UNavigationTree :links="asset" default-open />
        <UDivider />
        <UNavigationTree :links="report" default-open />
        <UDivider />
        <UNavigationTree :links="setting" default-open />

        <div class="flex-1" />

        <UDivider class="sticky bottom-0" />

        <!-- ส่วนท้ายของ sidebar -->
        <template #footer>
          <UserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />

    <!-- คอมโพเนนต์สำหรับแสดงความช่วยเหลือ -->
    <HelpSlideover />
    <!-- คอมโพเนนต์สำหรับแสดงการแจ้งเตือน -->
    <NotificationsSlideover />

    <!-- คอมโพเนนต์สำหรับการค้นหา -->
    <ClientOnly>
      <LazyUDashboardSearch :groups="groups" />
    </ClientOnly>
  </UDashboardLayout>
</template>

<style>
/* สไตล์สำหรับตัวอักษรหนาในแดชบอร์ด */
.fontdashboard {
  font-weight: bold;
}

/* สไตล์สำหรับสีตัวอักษรในแดชบอร์ด */
.fontdashboard-color {
  color: #767d8a;
}

/* สไตล์สำหรับการจัดการรูปภาพให้คงสัดส่วน */
.object-contain {
  object-fit: contain;
}

/* สไตล์สำหรับโลโก้ */
.logo {
  width: 100%;
  max-width: 150px; /* ปรับขนาดสูงสุดตามต้องการ */
  height: auto;
  margin: 0 auto; /* จัดให้อยู่กึ่งกลาง */
}

/* สไตล์สำหรับส่วนหัว */
.header {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* สไตล์สำหรับลิงก์ในแถบด้านข้างของแดชบอร์ด */
.dashboard-sidebar-link-class {
  font-size: 0.875rem; /* ขนาดตัวอักษร */
  line-height: 1.5rem; /* ความสูงบรรทัด */
  font-weight: 600; /* ความหนาของตัวอักษร */
  overflow: hidden; /* ซ่อนข้อความที่เกินขอบเขต */
  text-overflow: ellipsis; /* แสดงจุดไข่ปลาเมื่อข้อความเกิน */
  white-space: nowrap; /* ไม่ขึ้นบรรทัดใหม่ */
}
</style>
