import { ref } from "vue";

export function useFormValidation() {
  //showAlert Validation
  const showAlert = ref(false);
  const alertMessage = ref("");

  //การ Validate ข้อมูล
  const validateForm = (
    formData: Record<string, any>,
    requiredFields: string[]
  ) => {
    const errors: string[] = [];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors.push(`กรุณากรอก${getFieldLabel(field)}`);
      }
    });

    if (errors.length > 0) {
      alertMessage.value = errors.join(", ");
      showAlert.value = true;
      return false;
    }

    return true;
  };

  const getFieldLabel = (field: string): string => {
    const labels: Record<string, string> = {
      assetName: "ชื่ออุปกรณ์",
      serialNumber: "Serial Number",
      assetType: "ประเภทอุปกรณ์",
      organization: "องค์กร/หน่วยงาน",
    };
    return labels[field] || field;
  };

  return {
    showAlert,
    alertMessage,
    validateForm,
    getFieldLabel,
  };
}
