<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

// ฟังก์ชันสร้างเมนู
const createMenu = (id, label, icon, to, children = []) => ({
  id, label, icon, to, children
});

// สร้างเมนูหลัก
const menus = [
  createMenu("Dashboard", "Dashboard", "mage:dashboard-bar", "/"),
  createMenu("Organization Management", "Organization Management", "octicon:organization-24", "/organization"),
  createMenu("License Management", "License Management", "mdi:license", "/license", [
    { label: "License Management", to: "/license/license", exact: true },
    { label: "License Group", to: "/license/licenseGroup" },
    { label: "License Report", to: "/license/licenseReport" },
  ]),
  createMenu("User Management", "User Management", "material-symbols:account-circle-outline", "/user", [
    { label: "Account", to: "/user/account", exact: true },
    { label: "User", to: "/user/user" },
    { label: "Group Permission", to: "/user/permission" },
  ]),
  createMenu("Health Equipment", "Health Equipment", "healthicons:cardiogram-e-outline", "/healthequipment", [
    {
      label: "Survey form",
      children: [
        { label: "Dashboard Survey", to: "/equipment/servey/surDash", exact: true },
        { label: "Survey List", to: "/equipment/servey/surList", exact: true },
        { label: "Survey Management", to: "/equipment/servey/surMng", exact: true },
        { label: "Survey Report", to: "/equipment/servey/surReport", exact: true },
      ]
    },
    {
      label: "Health Checkup",
      to: "/equipment/",
      children: [
        { label: "Health Dashboard", to: "/equipment/", exact: true },
        { label: "Health Monitoring", to: "/equipment/", exact: true },
        { label: "Health Setting", to: "/equipment/", exact: true },
        { label: "Checkup Report", to: "/equipment/", exact: true },
      ]
    },
    {
      label: "Urine test screen",
      to: "/urine",
      children: [
        { label: "Urine test dashboard", to: "/equipment/", exact: true },
        { label: "Urine test monitoring", to: "/equipment/", exact: true },
        { label: "Urine test settings", to: "/equipment/", exact: true },
      ]
    },
  ]),
  createMenu("Health Center", "Health Center", "streamline:health-medical-heart-rate-health-beauty-information-data-beat-pulse-monitor-heart-rate-info", "/sensor", [
    {
      label: "Health running",
      to: "/running",
      children: [
        { label: "Dashboard", to: "/", exact: true },
        { label: "Monitoring", to: "/", exact: true },
        { label: "Report", to: "/", exact: true },
        { label: "Setting", to: "/", exact: true },
      ],
      exact: true
    },
    {
      label: "Health smart",
      to: "/smart",
      children: [
        { label: "Dashboard", to: "/", exact: true },
        { label: "Monitoring", to: "/", exact: true },
        { label: "Report", to: "/", exact: true },
        { label: "Setting", to: "/", exact: true },
      ]
    },
  ]),
  createMenu("Environment Center", "Environment Center", "streamline:nature-ecology-leaf-environment-leaf-ecology-plant-plants-eco", "/environment", [
    { label: "Weather temperature", to: "/environment/weather", exact: true },
  ]),
  createMenu("Asset Inventory", "Asset Inventory", "material-symbols:inventory", "/asset", [
    { label: "Dashboard Inventory", to: "/null", exact: true },
    { label: "Inventory Management", to: "/null", exact: true },
    { label: "Match usage", to: "/null", exact: true },
    { label: "Report Inventory", to: "/null", exact: true },
  ]),
  createMenu("Report", "Report", "lets-icons:arhive-alt-export-light", "/report", [
    { label: "Organization Report", to: "/report", exact: true },
    { label: "User Report", to: "/report", exact: true },
    { label: "Account Report", to: "/report", exact: true },
  ]),
  createMenu("Setting", "Setting", "uil:setting", "/setting", [
    {
      label: "Organization Setting",  
      to: "/running",
      children: [
        { label: "สักกัด", to: "/", exact: true },
        { label: "Level", to: "/", exact: true },
      ],
      exact: true
    },
  ]),
];

// สร้างกลุ่มเมนูสำหรับการค้นหาและการนำทาง
const groups = [
  {
    key: "links",
    label: "Go to",
    commands: menus,
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
    <UDashboardPanel :width="300" :resizable="{ min: 200, max: 400 }">
      <UDashboardSidebar>
        <template #header>
          <img src="/images/logo.jpg" alt="Platform Logo" class="logo" />
        </template>

        <!-- แสดงเมนูต่างๆ โดยใช้ UNavigationTree -->
        <template v-for="(menu, index) in menus" :key="menu.id">
          <UNavigationTree 
            :links="[menu]" 
            :default-open="true" 
            :class="{ 'font-bold': index < 2, 'text-gray-500': index >= 2 }" 
          />
          <UDivider v-if="index < menus.length - 1" />
        </template>

        <div class="flex-1" />
        <UDivider class="sticky bottom-0" />

        <template #footer>
          <UserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />

    <HelpSlideover />
    <NotificationsSlideover />

    <ClientOnly>
      <LazyUDashboardSearch :groups="groups" />
    </ClientOnly>
  </UDashboardLayout>
</template>

<style scoped>
.logo {
  width: 100%;
  max-width: 150px;
  height: auto;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.dashboard-sidebar-link-class) {
  font-size: 0.875rem;
  line-height: 1.5rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>