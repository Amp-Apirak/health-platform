<script setup lang="ts">
import { ref, watch } from 'vue';

const isOpen = ref(true); // ควบคุมการแสดงผลของ Popup
const loading = ref(false);
const state = ref();

const form = ref({
  nameOrg: '',
  codeOrg: '',
  Affiliation: '',
  level: null,
  levelOrg: null,
  district: '',
  subdistrict: '',
  province: '',
  email: '',
  website: '',
  facebook: '',
  line: '',
  details: '',
  zipcode: '',
  phonenumber: '',
  username: '',
  password: '',
  confirm_password: ''
});

const onImageUpload = (files) => {
  // Handle the uploaded files here
  console.log('Uploaded files:', files);
};

const levelOptions = [
  { value: 'LvMax', label: 'ระดับสูงสุด' },
  { value: 'Lv1', label: 'ระดับ 1' },
  { value: 'Lv2', label: 'ระดับ 2' },
  { value: 'Lv3', label: 'ระดับ 3' },
  { value: 'Lv4', label: 'ระดับ 4' },
  { value: 'Lv5', label: 'ระดับ 5' },
  { value: 'Lv6', label: 'ระดับ 6' },
  { value: 'Lv7', label: 'ระดับ 7' }
];

const orgOptions = [
  { value:  'MainOrg', label: 'ระดับขององค์กรหลัก'},
  { value:  'SubOrg', label: 'ระดับขององค์กรย่อย'}
];

const underOrg = [
  { value:  'ThaiPolice', label: 'สำนักงานตำรวจแห่งชาติ'},
  { value:  'ThreePranAcademy', label: 'โรงเรียนนายร้อยสามพราน'}
];

const provinceOptions = [
  { value: 'bangkok', label: 'กรุงเทพมหานคร' },
  { value: 'chonburi', label: 'ชลบุรี' }
];

const districtOptions = [
  { value: 'phra_nakhon', label: 'เขตพระนคร' },
  { value: 'dusit', label: 'เขตดุสิต' },
  { value: 'nang_loeng', label: 'เขตหนองเลิง' },
  { value: 'bang_rak', label: 'เขตบางรัก' },
  { value: 'bang_kapi', label: 'เขตบางกะปิ' },
  { value: 'pathumwan', label: 'เขตปทุมวัน' },
  { value: 'pom_prap_sattru_phai', label: 'เขตป้อมปราบศัตรูพ่าย' }
];

const subdistrictOptions = [
  { value: 'bang_chak', label: 'แขวงบางจาก' },
  { value: 'prasert_manukitch', label: 'แขวงพระโขนงเหนือ' },
  { value: 'prakhanong', label: 'แขวงพระโขนง' },
  { value: 'klong_toei_nuea', label: 'แขวงคลองเตยเหนือ' },
  { value: 'bang_nuea', label: 'แขวงบางนาเหนือ' }
];

const emit = defineEmits(['close']);

watch(isOpen, (value) => {
  if (!value) {
    emit('close');
  }
});

const validate = (state) => {
  // ตรวจสอบความถูกต้องของข้อมูลในฟอร์ม
  // ... และกำหนดค่า state ให้เหมาะสม
};

const submit = () => {
  // ส่งข้อมูลไปยังเซิร์ฟเวอร์หรือจัดการข้อมูลตามที่ต้องการ
  // ... และปิด Popup เมื่อเสร็จสิ้น
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    isOpen.value = false;
  }, 2000);
};

</script>

<template>
  <UModal v-model="isOpen" :ui="{ overlay: { blur: 'sm' } } " class="fixed inset-0 flex items-center justify-center">
    <UCard :ui="{ ring: 'ring-4 ring-blue-500', divide: 'divide-y divide-gray-200 dark:divide-gray-800' }" class="w-[800px] h-auto bg-white shadow-md rounded-lg">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            เพิ่มข้อมูลองค์กร
          </h3>
          <UButton
            icon="i-heroicons-x-mark-20-solid"
            color="gray"
            variant="ghost"
            size="xs"
            @click="$emit('close')"
          />
        </div>
      </template>

      <div>
        <!-- <UForm :validate="validate" :state="state"> -->
        <UForm  :state="state" class="grid grid-cols-3 gap-4">

          <UFormGroup label="ระดับองค์กร" name="level" required class="col-span-1">
            <USelectMenu placeholder="เลือกระดับองค์กรระดับองค์กร" v-model="form.level" :options="levelOptions"/>
          </UFormGroup>

          <UFormGroup label="องค์กร" name="levelOrg" required class="col-span-1">
            <USelectMenu placeholder="เลือกองค์กร" v-model="form.levelOrg" :options="orgOptions"/>
          </UFormGroup>

          <div class="col-span-1"></div>

          <div class="flex items-center justify-between col-span-2">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              ข้อมูลองค์กร/หน่วยงาน
            </h3>
          </div>

          <div class="col-span-1"></div>

          <UFormGroup label="รหัสองค์กร/หน่วยงาน" name="codeOrg" required class="col-span-1 ">
            <UInput placeholder="ใส่รหัสขององค์กร/หน่วยงาน" v-model="form.codeOrg"/>
          </UFormGroup>

          <UFormGroup label="สังกัด" name="Affiliation" required class="col-span-1">
            <USelectMenu placeholder="เลือกสังกัด" v-model="form.Affiliation" :options="underOrg"/>
          </UFormGroup>

          <div class="col-span-1 row-span-4 flex items-center justify-center">
          <UCard class="w-full h-full flex items-center justify-center">
            <!-- Upload รูป ใช้งานไม่ได้ -->
            <NUpload :on-change="onImageUpload">
              <NButton type="primary">Upload Files</NButton>
            </NUpload>
          </UCard>
        </div>

          <UFormGroup label="ชื่อองค์กร/หน่วยงาน" name="nameOrg" required class="col-span-2 ">
            <UInput placeholder="ใส่ชื่อขององค์กร/หน่วยงาน" v-model="form.nameOrg"/>
          </UFormGroup>

          <!-- <div class="col-span-1"></div> -->

          <UFormGroup label="จังหวัด" name="province" required class="col-span-1">
            <USelectMenu placeholder="เลือกจังหวัด" v-model="form.province" :options="provinceOptions"/>
          </UFormGroup>

          <UFormGroup label="อำเภอ/เขต" name="district" required class="col-span-1">
            <USelectMenu placeholder="เลือกอำเภอ/เขต" v-model="form.district" :options="districtOptions"/>
          </UFormGroup>

          <!-- <div class="col-span-1"></div> -->

          <UFormGroup label="ตำบล/แขวง" name="subdistrict" required class="col-span-1" >
            <USelectMenu placeholder="เลือกตำบล/แขวง" v-model="form.subdistrict" :options="subdistrictOptions"/>
          </UFormGroup>

          <UFormGroup label="รหัสไปรษณีย์" name="zipcode" required class="col-span-1"> 
            <UInput placeholder="ใส่รหัสไปรษณีย์" v-model="form.zipcode" />
          </UFormGroup>

          <!-- <div class="col-span-1"></div> -->

          <UFormGroup label="เบอร์โทรศัพท์" name="phonenumber" required class="col-span-1"> 
            <UInput placeholder="ใส่เบอร์โทรศัพท์" v-model="form.phonenumber" />
          </UFormGroup>

          <div class="col-span-2"></div>

          <UFormGroup label="อีเมลล์" name="email" required class="col-span-2"> 
            <UInput placeholder="ใส่อีเมลล์" v-model="form.email" />
          </UFormGroup>

          <div class="col-span-1"></div>

          <UFormGroup label="เว็บไซต์" name="website" required class="col-span-2"> 
            <UInput placeholder="ใส่เว็บไซต์" v-model="form.website" />
          </UFormGroup>

          <div class="col-span-1"></div>

          <UFormGroup label="facebook" name="facebook" required class="col-span-2"> 
            <UInput placeholder="ใส่ facebook" v-model="form.facebook" />
          </UFormGroup>
          
          <div class="col-span-1"></div>

          <UFormGroup label="Line OA" name="line" required class="col-span-2"> 
            <UInput placeholder="ใส่ Line OA" v-model="form.line" />
          </UFormGroup>

          <div class="col-span-1"></div>

          <UFormGroup label="แผนที่" name="map" required class="col-span-3"> 
            <UTextarea placeholder="MAP" v-model="form.details" />
          </UFormGroup>

          <UFormGroup name="details: " label="รายละเอียดเพิ่มเติม" class="col-span-3">
            <UTextarea placeholder="ใส่รายละเอียดเพิ่มเติม (ถ้ามี)" v-model="form.details" />
          </UFormGroup>
        
        <div class="flex items-center justify-between col-span-3">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            ข้อมูลบัญชี
          </h3>
        </div>

          <UFormGroup label="Admin@หน่วยงาน" name="admin" required class="col-span-1"> 
            <UInput placeholder="ใส่ชื่อผู้ใช้งาน/หน่วยงาน" v-model="form.username" />
          </UFormGroup>

          <div class="col-span-2"></div>

          <UFormGroup label="รหัสผ่าน" name="password" required class="col-span-1"> 
            <UInput placeholder="ใส่รหัสผ่าน" v-model="form.password" />
          </UFormGroup>

          <UFormGroup label="ยืนยันรหัสผ่าน" name="confirm_password" required class="col-span-1"> 
            <UInput placeholder="ยืนยันรหัสผ่าน" v-model="form.confirm_password" />
          </UFormGroup>

          <div class="col-span-1"></div>

          <div class="col-span-2"></div>

        <UButton
            type="submit"
            class="w-full"
            color="primary"
            label="บันทึก"
            :loading="loading"
            @click="submit"
          />

        </UForm>
      </div>
    </UCard>
  </UModal>
</template>