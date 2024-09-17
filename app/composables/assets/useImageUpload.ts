import { ref } from "vue";

export function useImageUpload() {
  // การจัดการรูปภาพ
  const selectedImage = ref<File | null>(null);
  const imagePreview = ref<string>("");

  //ฟังก์ชันสำหรับจัดการการอัพโหลดรูปภาพ
  const handleImageUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      selectedImage.value = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.value = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return {
    selectedImage,
    imagePreview,
    handleImageUpload,
  };
}
