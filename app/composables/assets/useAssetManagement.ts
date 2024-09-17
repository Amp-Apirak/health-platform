// app/composables/useAssetManagement.ts
import { ref } from "vue";

// สร้างอินเตอร์เฟสสำหรับข้อมูลสินทรัพย์
interface Asset {
  assetID: string;
  assetName: string;
  assetGroup: string;
  assetType: string;
  manufacturer: string;
  brand: string;
  model: string;
  serialNumber: string;
  room: string;
  warranty: string;
  dateWarranty: string;
  expirationDate: string;
  status: string;
  ipAddress: string;
  macAddress: string;
  firmware: string;
  organization: string;
  location: string;
  building: string;
  floor: string;
  owner: string;
  assetsImage: string;
  dateCreated: string;
}

// ฟังก์ชันหลักที่ใช้ในการจัดการสินทรัพย์
export function useAssetManagement() {
  const assets = ref<Asset[]>([
    {
      assetID: "A001",
      assetName: "AI Tracker 1",
      assetGroup: "G001",
      assetType: "Health Sensor",
      manufacturer: "GE Healthcare",
      brand: "GE",
      model: "LOGIQ E10",
      serialNumber: "GE12345678",
      room: "Room 101",
      warranty: "3 years",
      dateWarranty: "2023-01-15",
      expirationDate: "2026-01-15",
      status: "Active",
      ipAddress: "192.168.1.10",
      macAddress: "00:1A:2B:3C:4D:5E",
      firmware: "v1.2.3",
      organization: "สำนักงานตำรวจแห่งชาติ",
      location: "Main Building",
      building: "A",
      floor: "1",
      owner: "Radiology Department",
      assetsImage: "image1.jpg",
      dateCreated: "21/08/2567 08.32",
    },
    {
      assetID: "A002",
      assetName: "AI Tracker 2",
      assetGroup: "G001",
      assetType: "Health Sensor",
      manufacturer: "Siemens Healthineers",
      brand: "Siemens",
      model: "MAGNETOM Sola",
      serialNumber: "SI67891234",
      room: "Room 102",
      warranty: "5 years",
      dateWarranty: "2022-06-20",
      expirationDate: "2027-06-20",
      status: "Active",
      ipAddress: "192.168.1.11",
      macAddress: "00:1A:2B:3C:4D:5F",
      firmware: "v2.1.0",
      organization: "สำนักงานตำรวจแห่งชาติ",
      location: "Main Building",
      building: "B",
      floor: "2",
      owner: "Radiology Department",
      assetsImage: "image2.jpg",
      dateCreated: "21/08/2567 08.32",
    },
    {
      assetID: "A003",
      assetName: "CT Scanner",
      assetGroup: "G002",
      assetType: "Health Sensor",
      manufacturer: "Philips",
      brand: "Philips",
      model: "Ingenuity CT",
      serialNumber: "PH34567891",
      room: "Room 103",
      warranty: "4 years",
      dateWarranty: "2021-11-10",
      expirationDate: "2025-11-10",
      status: "Active",
      ipAddress: "192.168.1.12",
      macAddress: "00:1A:2B:3C:4D:60",
      firmware: "v3.0.1",
      organization: "สำนักงานตำรวจแห่งชาติ",
      location: "Main Building",
      building: "B",
      floor: "2",
      owner: "Radiology Department",
      assetsImage: "image3.jpg",
      dateCreated: "21/08/2567 08.32",
    },
    {
      assetID: "A004",
      assetName: "X-Ray Machine",
      assetGroup: "G002",
      assetType: "Health Sensor",
      manufacturer: "Canon Medical",
      brand: "Canon",
      model: "Radrex-i",
      serialNumber: "CA09876543",
      room: "Room 104",
      warranty: "5 years",
      dateWarranty: "2020-08-05",
      expirationDate: "2025-08-05",
      status: "Active",
      ipAddress: "192.168.1.13",
      macAddress: "00:1A:2B:3C:4D:61",
      firmware: "v1.5.0",
      organization: "สำนักงานตำรวจแห่งชาติ",
      location: "Main Building",
      building: "A",
      floor: "1",
      owner: "Radiology Department",
      assetsImage: "image4.jpg",
      dateCreated: "21/08/2567 08.32",
    },
    {
      assetID: "A005",
      assetName: "Defibrillator",
      assetGroup: "G003",
      assetType: "Environment Sensor",
      manufacturer: "Zoll",
      brand: "Zoll",
      model: "AED Plus",
      serialNumber: "ZL12345009",
      room: "Room 105",
      warranty: "3 years",
      dateWarranty: "2019-02-12",
      expirationDate: "2022-02-12",
      status: "Inactive",
      ipAddress: "192.168.1.14",
      macAddress: "00:1A:2B:3C:4D:62",
      firmware: "v2.3.5",
      organization: "สำนักงานตำรวจแห่งชาติ",
      location: "Emergency Room",
      building: "C",
      floor: "1",
      owner: "Emergency Department",
      assetsImage: "image5.jpg",
      dateCreated: "21/08/2567 08.32",
    },
    {
      assetID: "A006",
      assetName: "Ventilator",
      assetGroup: "G003",
      assetType: "Environment Sensor",
      manufacturer: "Dräger",
      brand: "Dräger",
      model: "Evita Infinity V500",
      serialNumber: "DR56789012",
      room: "ICU",
      warranty: "5 years",
      dateWarranty: "2021-03-18",
      expirationDate: "2026-03-18",
      status: "Active",
      ipAddress: "192.168.1.15",
      macAddress: "00:1A:2B:3C:4D:63",
      firmware: "v1.9.7",
      organization: "สำนักงานตำรวจแห่งชาติ",
      location: "Main Building",
      building: "C",
      floor: "3",
      owner: "Intensive Care Unit",
      assetsImage: "image6.jpg",
      dateCreated: "21/08/2567 08.32",
    },
    {
      assetID: "A007",
      assetName: "Infusion Pump",
      assetGroup: "G004",
      assetType: "Environment Sensor",
      manufacturer: "Baxter",
      brand: "Baxter",
      model: "Sigma Spectrum",
      serialNumber: "BA10293847",
      room: "Ward 3A",
      warranty: "4 years",
      dateWarranty: "2020-12-22",
      expirationDate: "2024-12-22",
      status: "Active",
      ipAddress: "192.168.1.16",
      macAddress: "00:1A:2B:3C:4D:64",
      firmware: "v3.4.2",
      organization: "สำนักงานตำรวจแห่งชาติ",
      location: "Main Building",
      building: "D",
      floor: "3",
      owner: "General Surgery Department",
      assetsImage: "image7.jpg",
      dateCreated: "21/08/2567 08.32",
    },
    {
      assetID: "A008",
      assetName: "Ultrasound Machine",
      assetGroup: "G005",
      assetType: "Health Sensor",
      manufacturer: "Hitachi",
      brand: "Hitachi",
      model: "ARIETTA 850",
      serialNumber: "HT56781234",
      room: "Room 106",
      warranty: "4 years",
      dateWarranty: "2022-01-10",
      expirationDate: "2026-01-10",
      status: "Active",
      ipAddress: "192.168.1.17",
      macAddress: "00:1A:2B:3C:4D:65",
      firmware: "v2.0.0",
      organization: "สำนักงานตำรวจแห่งชาติ",
      location: "Main Building",
      building: "D",
      floor: "2",
      owner: "Radiology Department",
      assetsImage: "image8.jpg",
      dateCreated: "21/08/2567 08.32",
    },
    // เพิ่มสินทรัพย์อื่นๆ ตามที่คุณมี
  ]);

  // ฟังก์ชันเพิ่มอุปกรณ์
  const addAsset = (newAsset: Asset) => {
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

    // ตรวจสอบว่ามีการอัพโหลดรูปภาพใหม่หรือไม่
    if (newAsset.assetsImage instanceof File) {
      newAsset.assetsImage = URL.createObjectURL(newAsset.assetsImage);
    }

    if (!newAsset.status) {
      newAsset.status = "Active";
    }

    assets.value.push(newAsset);
  };

  // ฟังก์ชันแก้ไขอุปกรณ์
  const editAsset = (updatedAsset: Asset) => {
    const index = assets.value.findIndex(
      (asset) => asset.assetID === updatedAsset.assetID
    );
    if (index !== -1) {
      // ถ้ามีรูปภาพใหม่ ให้แปลงเป็น URL
      if (updatedAsset.assetsImage instanceof File) {
        updatedAsset.assetsImage = URL.createObjectURL(
          updatedAsset.assetsImage
        );
      }
      // รักษาค่า status เดิมถ้าไม่ได้เปลี่ยนแปลง
      if (!updatedAsset.status) {
        updatedAsset.status = assets.value[index].status;
      }

      assets.value[index] = { ...assets.value[index], ...updatedAsset };
    }
  };

  // ฟังก์ชันลบอุปกรณ์
  const deleteAsset = (assetID: string) => {
    assets.value = assets.value.filter((asset) => asset.assetID !== assetID);
  };

  return {
    assets,
    addAsset,
    editAsset,
    deleteAsset,
  };
}
