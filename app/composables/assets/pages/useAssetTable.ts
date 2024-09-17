import { ref, computed, watch } from 'vue'
import { Asset } from '~/composables/assets/pages/useMockData'

export function useAssetTable(assets: Ref<Asset[]>) {
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
  ]

  const selectedColumns = ref(columns)
  const columnsTable = computed(() =>
    columns.filter((column) => selectedColumns.value.includes(column))
  )

  const search = ref("")
  const selectedType = ref("All")
  const selectedStatus = ref("All")
  const sort = ref({ column: "assetID", direction: "asc" })
  const page = ref(1)
  const pageCount = ref(10)

  const filteredAssets = computed(() => {
    let filtered = assets.value
    if (search.value) {
      const searchLower = search.value.toLowerCase()
      filtered = filtered.filter((asset) =>
        Object.values(asset).some((val) =>
          val.toString().toLowerCase().includes(searchLower)
        )
      )
    }
    if (selectedType.value && selectedType.value !== "All") {
      filtered = filtered.filter(
        (asset) =>
          asset.assetType === (selectedType.value.value || selectedType.value)
      )
    }
    if (selectedStatus.value && selectedStatus.value !== "All") {
      filtered = filtered.filter(
        (asset) =>
          asset.status === (selectedStatus.value.value || selectedStatus.value)
      )
    }
    return filtered
  })

  const sortedAssets = computed(() => {
    const sorted = [...filteredAssets.value]
    sorted.sort((a, b) => {
      if (a[sort.value.column] < b[sort.value.column])
        return sort.value.direction === "asc" ? -1 : 1
      if (a[sort.value.column] > b[sort.value.column])
        return sort.value.direction === "asc" ? 1 : -1
      return 0
    })
    return sorted
  })

  const paginatedAssets = computed(() => {
    const start = (page.value - 1) * pageCount.value
    const end = start + pageCount.value
    return sortedAssets.value.slice(start, end)
  })

  const pageTotal = computed(() => filteredAssets.value.length)
  const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1)
  const pageTo = computed(() =>
    Math.min(page.value * pageCount.value, pageTotal.value)
  )

  watch(filteredAssets, () => {
    page.value = 1
  })

  const resetFilters = () => {
    search.value = ""
    selectedType.value = "All"
    selectedStatus.value = "All"
    selectedColumns.value = columns
    pageCount.value = 10
  }

  return {
    columns,
    selectedColumns,
    columnsTable,
    search,
    selectedType,
    selectedStatus,
    sort,
    page,
    pageCount,
    filteredAssets,
    paginatedAssets,
    pageTotal,
    pageFrom,
    pageTo,
    resetFilters,
  }
}