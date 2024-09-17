// composables/useAssetOptions.ts
import { ref } from 'vue'

interface Option {
  value: string;
  label: string;
}

export function useAssetOptions() {
  const typeOptions = ref<Option[]>([
    { value: "healthSmart", label: "Health Smart" },
    { value: "healthRunning", label: "Health Running" },
    { value: "healthCare", label: "Health Care" },
    { value: "environmentSecsor", label: "environmentSecsor" },
    { value: "emergency", label: "Emergency" },
  ])

  const organizationOptions = ref<Option[]>([
    { value: "ThaiPolice", label: "สำนักงานตำรวจแห่งชาติ" },
    { value: "ThreePranAcademy", label: "โรงเรียนนายร้อยสามพราน" },
  ])

  const statusOptions = ref<Option[]>([
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ])

  const warrantyOptions = ref<Option[]>([
    { value: "1", label: "Yes" },
    { value: "0", label: "No" },
  ])

  const ownerOptions = ref<Option[]>([
    { value: "owner1", label: "เจ้าของ 1" },
    { value: "owner2", label: "เจ้าของ 2" },
  ])

  const buildingOptions = ref<Option[]>([
    { value: "A", label: "อาคาร A" },
    { value: "B", label: "อาคาร B" },
  ])

  const floorOptions = ref<Option[]>([
    { value: "1", label: "ชั้น 1" },
    { value: "2", label: "ชั้น 2" },
  ])

  const groupOptions = ref<Option[]>([
    { value: "1", label: "ชุดกระเป๋าที่ 1" },
    { value: "2", label: "ชุดกระเป๋าที่ 2" },
  ])

  const roomOptions = ref<Option[]>([
    { value: "1", label: "ห้องตรวจที่ 1" },
    { value: "2", label: "ห้องทดสอบสมถณถภาพ" },

  ])

  return {
    typeOptions,
    organizationOptions,
    statusOptions,
    warrantyOptions,
    ownerOptions,
    buildingOptions,
    floorOptions,
    groupOptions,
    roomOptions
  }
}