<script setup lang="ts">
const route = useRoute();


const dashboard = [
  {
    id: "Dashboard",
    label: "Dashboard",
    icon: "mage:dashboard-bar",
    to: "/",
  },
];

const organization = [
  {
    id: "Organization Management",
    label: "Organization Management",
    icon: "octicon:organization-24",
    to: "/organization",
  },
];

const license = [
  {
    id: "License Management",
    label: "License Management",
    icon: "mdi:license",
    to: "/license",
    children: [
      {
        label: "License Management",
        to: "/license",
        exact: true,
      },
      {
        label: "License Group",
        to: "/licenseGroup",
      },
      {
        label: "License Report",
        to: "/licenseReport",
      },
    ],
  },
];

const user = [
  {
    id: "User Management",
    label: "User Management",
    icon: "material-symbols:account-circle-outline",
    to: "/user",
    children: [
      {
        label: "Account",
        to: "/account",
        exact: true,
      },
      {
        label: "User",
        to: "/user",
      },
      {
        label: "Group Permission",
        to: "/permission",
      },
    ],
  },
];


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
            to: "/dashboardsurvey",
            exact: true,
          },
          {
            label: "Survey List",
            to: "/surveylist",
            exact: true,
          },
          {
            label: "Survey Management",
            to: "/surveymanagement",
            exact: true,
          },
          {
            label: "Survey Report",
            to: "/surveyreport",
            exact: true,
          },
        ],
      },
      {
        label: "Health Checkup",
        to: "/health",
        children: [
          {
            label: "Health Dashboard",
            to: "/healthdashboard",
            exact: true,
          },
          {
            label: "Health Monitoring",
            to: "/healthmonitoring",
            exact: true,
          },
          {
            label: "Health Setting",
            to: "/healthsetting",
            exact: true,
          },
          {
            label: "Checkup Report",
            to: "/checkupreport",
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
            to: "/healthdashboard",
            exact: true,
          },
          {
            label: "Urine test monitoring",
            to: "/healthmonitoring",
            exact: true,
          },
          {
            label: "Urine test settings",
            to: "/healthsetting",
            exact: true,
          },
        ],
      },
    ],
  },
];

const sensor = [
  {
    id: "Health Center ",
    label: "Health Center ",
    to: "/",
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

const environment = [
  {
    id: "Environment Center",
    label: "Environment Center",
    icon: "streamline:nature-ecology-leaf-environment-leaf-ecology-plant-plants-eco",
    to: "/",
    children: [
      {
        label: "Weather temperature",
        to: "/weather",
        exact: true,
      },
    ],
  },
];

const asset = [
  {
    id: "Asset Inventory",
    label: "Asset Inventory",
    icon: "material-symbols:inventory",
    to: "/",
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

const report = [
  {
    id: "Report",
    label: "Report",
    icon: "lets-icons:arhive-alt-export-light",
    to: "/",
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

const setting = [
  {
    id: "Setting",
    label: "Setting",
    icon: "uil:setting",
    to: "/",
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


// สร้าง `groups` ให้ใช้ตัวแปรที่ถูกต้อง
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
    <UDashboardPanel :width="300" :resizable="{ min: 200, max: 400 }">
      <!-- <UDashboardNavbar
        class="!border-transparent"
        :ui="{ left: 'flex-1' }"
      >
        <template #left>
          <TeamsDropdown />
        </template>
      </UDashboardNavbar> -->

      <UDashboardSidebar>
        <template #header>
          <img src="/images/logo.jpg" alt="Platform Logo" class="logo" />
          <!-- <UDashboardSearchButton /> -->
        </template>

        <UDashboardSidebarLinks :links="dashboard" />
        <UDivider />
        <UDashboardSidebarLinks :links="organization" />
        <UDivider />
        <UDashboardSidebarLinks :links="license" />
        <UDivider />
        <UNavigationAccordion :links="user" />
        <UDivider />
        <UNavigationAccordion :links="equipment" />
        <UDivider />
        <UNavigationAccordion :links="sensor" />
        <UDivider />
        <UNavigationAccordion :links="environment" />
        <UDivider />
        <UNavigationAccordion :links="asset" />
        <UDivider />
        <UNavigationAccordion :links="report" />
        <UDivider />
        <UNavigationAccordion :links="setting" />

        <!-- <UDashboardSidebarLinks
          :links="[{ label: 'Colors', draggable: true, children: colors }]"
          @update:links="colors => defaultColors = colors"
        /> -->

        <div class="flex-1" />

        <!-- <UDashboardSidebarLinks :links="footerLinks" /> -->

        <UDivider class="sticky bottom-0" />

        <template #footer>
          <!-- ~/components/UserDropdown.vue -->
          <UserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />

    <!-- ~/components/HelpSlideover.vue -->
    <HelpSlideover />
    <!-- ~/components/NotificationsSlideover.vue -->
    <NotificationsSlideover />

    <ClientOnly>
      <LazyUDashboardSearch :groups="groups" />
    </ClientOnly>
  </UDashboardLayout>
</template>

<style>
.object-contain {
  object-fit: contain;
}
.logo {
  width: 100%;
  max-width: 150px; /* Adjust max-width as needed */
  height: auto;
  margin: 0 auto; /* Center the logo if needed */
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dashboard-sidebar-link-class {
  font-size: 0.875rem; /* text-sm */
  line-height: 1.5rem; /* /6 - คำนวณจาก 0.875rem * 1.5 = 1.3125rem ปัดขึ้นเป็น 1.5rem */
  font-weight: 600; /* font-semibold */
  overflow: hidden; /* truncate */
  text-overflow: ellipsis; /* truncate */
  white-space: nowrap; /* truncate */
}
</style>
