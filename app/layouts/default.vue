<script setup lang="ts">
// นำเข้าฟังก์ชันและไลบรารีที่จำเป็น
// ใช้สำหรับดึงข้อมูล route ปัจจุบัน
// ใช้สำหรับคำนวณ property ที่เปลี่ยนแปลงไปตาม state
import { useRoute } from "vue-router";
import { computed } from "vue";

// ดึงข้อมูลเส้นทางปัจจุบันจาก Vue Router
const route = useRoute();

// กำหนดรายการเมนูที่จะแสดงในแถบด้านข้างของแดชบอร์ด
const links = [
  {
    id: "Dashboard",
    label: "Dashboard",
    icon: "mage:dashboard-bar",
    to: "/",
  },
  // เมนูจัดการองค์กร
  {
    id: "Organization Management",
    label: "Organization Management",
    icon: "octicon:organization-24",
    to: "/organization",
  },
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
  // เมนูจัดการผู้ใช้
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
  // เมนูอุปกรณ์สุขภาพ
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
            to: "/equipment/healthMonitoring",
            exact: true,
          },
          {
            label: "Health Setting",
            to: "/equipment/healthSetting",
            exact: true,
          },
          {
            label: "Checkup Report",
            to: "/equipment/checkupReport",
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
            to: "/equipment/urineDashboard",
            exact: true,
          },
          {
            label: "Urine test monitoring",
            to: "/equipment/urineMonitoring",
            exact: true,
          },
          {
            label: "Urine test settings",
            to: "/equipment/urineSetting",
            exact: true,
          },
        ],
      },
    ],
  },
  // เมนูศูนย์สุขภาพ
  {
    id: "Health Sensor ",
    label: "Health Sensor ",
    to: "/sensor",
    icon: "streamline:health-medical-heart-rate-health-beauty-information-data-beat-pulse-monitor-heart-rate-info",
    children: [
      {
        label: "Health running",
        to: "/running",
        children: [
          {
            label: "Dashboard",
            to: "/running/runningDash",
            exact: true,
          },
          {
            label: "Monitoring",
            to: "/running/runningMonitoring",
            exact: true,
          },
          {
            label: "Report",
            to: "/running/runningReport",
            exact: true,
          },
          {
            label: "Setting",
            to: "/running/runningSetting",
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
            to: "/smart/smartDash",
            exact: true,
          },
          {
            label: "Monitoring",
            to: "/smart/smartMonitoring",
            exact: true,
          },
          {
            label: "Report",
            to: "/smart/smartReport",
            exact: true,
          },
          {
            label: "Setting",
            to: "/smart/smartSetting",
            exact: true,
          },
        ],
      },
      {
        label: "Emergency",
        to: "/emergency",
        children: [
          {
            label: "Dashboard",
            to: "/emergency/emergencyDash",
            exact: true,
          },
          {
            label: "Monitoring",
            to: "/emergency/emergencyMonitoring",
            exact: true,
          },
          {
            label: "Report",
            to: "/emergency/emergencyReport",
            exact: true,
          },
          {
            label: "Setting",
            to: "/emergency/emergencySetting",
            exact: true,
          },
        ],
      },
    ],
  },
  // เมนูศูนย์สิ่งแวดล้อม
  {
    id: "Environment Sensor",
    label: "Environment Sensor",
    icon: "streamline:nature-ecology-leaf-environment-leaf-ecology-plant-plants-eco",
    to: "/environment",
    children: [
      {
        label: "Weather temperature",
        to: "/environment/weather",
        children: [
          // {
          //   label: "Dashboard",
          //   to: "/environment/weatherDash",
          //   exact: true,
          // },
          {
            label: "Monitoring",
            to: "/environment/weatherMonitoring",
            exact: true,
          },
          {
            label: "Report",
            to: "/environment/weatherReport",
            exact: true,
          },
          {
            label: "Setting",
            to: "/environment/weatherSetting",
            exact: true,
          },
        ],
      },
    ],
  },
  // เมนูสินทรัพย์
  {
    id: "Asset Inventory",
    label: "Asset Inventory",
    icon: "material-symbols:inventory",
    to: "/assets",
    children: [
      {
        label: "Dashboard Inventory",
        to: "/assets/assetDash",
        exact: true,
      },
      {
        label: "Inventory Management",
        to: "/assets/assetMng",
        exact: true,
      },
      {
        label: "Match usage",
        to: "/assets/matchUsage",
        exact: true,
      },
      {
        label: "Report Inventory",
        to: "/assets/assetReport",
        exact: true,
      },
    ],
  },
  // เมนูรายงาน
  {
    id: "Report",
    label: "Report",
    icon: "lets-icons:arhive-alt-export-light",
    to: "/report",
    children: [
      {
        label: "Organization Report",
        to: "/report/organizationReport",
        exact: true,
      },
      {
        label: "User Report",
        to: "/report/userReport",
        exact: true,
      },
      {
        label: "Account Report",
        to: "/report/accountReport",
        exact: true,
      },
    ],
  },
  // เมนูการตั้งค่า
  {
    id: "Setting",
    label: "Setting",
    icon: "uil:setting",
    to: "/setting",
    children: [
      {
        label: "Organization Setting",
        to: "/setting",
        children: [
          {
            label: "สักกัด",
            to: "/setting/settingLocation",
            exact: true,
          },
          {
            label: "Level",
            to: "/setting/settingLevel",
            exact: true,
          },
        ],
        exact: true,
      },
    ],
  },
];

// ฟังก์ชันสำหรับค้นหาเมนูจาก path
const findMenuByPath = (menus, path) => {
  for (const menu of menus) {
    if (menu.to === path) {
      return menu;
    }
    if (menu.children) {
      const found = findMenuByPath(menu.children, path);
      if (found) return found;
    }
  }
  return null;
};

// ฟังก์ชันสร้างลิงก์สำหรับ Breadcrumb
const generateBreadcrumbLinks = (currentPath) => {
  const breadcrumbLinks = [];
  let currentMenu = findMenuByPath(links, currentPath);

  while (currentMenu) {
    breadcrumbLinks.unshift({
      label: currentMenu.label,
      icon: currentMenu.icon,
      to: currentMenu.to,
    });

    const parentPath = currentMenu.to.substring(
      0,
      currentMenu.to.lastIndexOf("/")
    ); 
    currentMenu = findMenuByPath(links, parentPath);
  }

  return breadcrumbLinks;
};

// คำนวณลิงก์ Breadcrumb ปัจจุบัน
const breadcrumbLinks = computed(() => generateBreadcrumbLinks(route.path));
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel
      :width="250"
      :resizable="{ min: 50, max: 300, storage: 'local' }"
      collapsible
    >
      <UDashboardSidebar>
        <!-------------------- LOGO -------------------->
        <template #header>
          <img
            src="/images/logo.jpg"
            alt="Platform Logo"
            style="width: 100%; max-width: 150px; height: auto; margin: 0 auto"
          />
        </template>
        <!-------------------- LOGO -------------------->

        <!-- แสดงเมนูต่างๆ โดยใช้ UNavigationTree -->
        <UNavigationTree :links="links" :default-open="true" />

        <!-- เว้นที่ว่างเพื่อให้ footer อยู่ด้านล่าง -->
        <div class="flex-1" />

        <UDivider class="sticky bottom-0" />

        <!-- ส่วนท้ายของ sidebar -->
        <template #footer>
          <UserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <div class="flex-1 flex flex-col overflow-hidden">
      <!-------------------- Topbar -------------------->
      <LayoutsTopbar />
      <!-------------------- Topbar -------------------->
      <div class="flex-1 overflow-auto p-4">
        <!-------------------- เนื้อหา -------------------->
        <UBreadcrumb :links="breadcrumbLinks" class="mb-4" />
        <slot />
        <!-------------------- เนื้อหา -------------------->
      </div>
    </div>

    <!-- คอมโพเนนต์สำหรับแสดงความช่วยเหลือ -->
    <HelpSlideover />
    <NotificationsSlideover />

    <!-- คอมโพเนนต์สำหรับการค้นหา -->
    <ClientOnly>
      <LazyUDashboardSearch :groups="groups" />
    </ClientOnly>
  </UDashboardLayout>
</template>

<style></style>
