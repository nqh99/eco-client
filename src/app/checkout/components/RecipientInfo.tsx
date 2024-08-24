import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import SelectBoxList from "@/components/list/SelectBoxList";
import FromInput, { InputType, validationRules } from "@/components/interactive/TextInput";

const initialTouchedFields = {
  name: false,
  phone: false,
  email: false,
  city: false,
  district: false,
  ward: false,
  address: false,
};

interface RecipientInfoProps {
  initialData?: {
    name?: string;
    phone?: string;
    email?: string;
    city?: string | null;
    district?: string | null;
    ward?: string | null;
    address?: string;
  };
  onFormDataChange: (data: any) => void;
  touchedFields: Partial<Record<keyof typeof initialTouchedFields, boolean>>;
}

const createOptions = (items: string[]) =>
  items.map((name, index) => ({ id: (index + 1).toString(), name }));

const options = {
  city: createOptions(["Thành phố Hồ Chí Minh", "Hà Nội", "Đà Nẵng"]),
  district: createOptions(["Quận 1", "Quận 2", "Quận 3"]),
  ward: createOptions(["Phường 1", "Phường 2", "Phường 3"]),
};

const initialFormData = {
  name: "",
  phone: "",
  email: "",
  city: null,
  district: null,
  ward: null,
  address: "",
};

const RecipientInfo = forwardRef<{
  validateFields: () => boolean;
}, RecipientInfoProps>(({ initialData = {}, onFormDataChange }, ref) => {
  const [formData, setFormData] = useState({ ...initialFormData, ...initialData });
  const [touchedFields, setTouchedFields] = useState(initialTouchedFields);

  const handleFieldChange = (field: keyof typeof formData, value: string | null) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);
    setTouchedFields({ ...touchedFields, [field]: true });
    onFormDataChange(updatedFormData);
  };

  const validateFields = () => {
    let isValid = true;

    (Object.keys(formData) as Array<keyof typeof formData>).forEach((field) => {
      const value = formData[field] as string;

      if (field in validationRules) {
        const fieldIsValid = (validationRules as any)[field](value);
        if (!fieldIsValid) {
          setTouchedFields((prev) => ({ ...prev, [field]: true }));
          isValid = false;
        }
      } else if (['city', 'district', 'ward'].includes(field)) {
        if (!formData[field]) {
          setTouchedFields((prev) => ({ ...prev, [field]: true }));
          isValid = false;
        }
      }
    });

    return isValid;
  };

  useImperativeHandle(ref, () => ({
    validateFields,
  }));

  useEffect(() => {
    onFormDataChange(formData);
  }, [formData, onFormDataChange]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Thông tin người nhận</h2>
      <div className="grid grid-cols-12 gap-4">
        {(["name", "phone", "email"] as const).map((field) => (
          <FromInput
            key={field}
            value={formData[field]}
            onChange={(e) => handleFieldChange(field, e.target.value)}
            onBlur={() => handleFieldChange(field, formData[field])}
            placeholder={
              field === "name" ? "Họ tên"
              : field === "phone" ? "Số điện thoại"
              : "Email"
            }
            field={field}
            isTouched={touchedFields[field] || false}
            formData={formData}
            col={field === "email" ? "col-span-12" : "col-span-12 xs:col-span-6 md:col-span-12 lg:col-span-6"}
            as={InputType.Input}
          />
        ))}
        {(["city", "district", "ward"] as const).map((field) => (
          <SelectBoxList
            key={field}
            options={options[field]}
            placeholder={field === "city" ? "Thành phố" : field === "district" ? "Quận/huyện" : "Phường/xã"}
            colSpan="col-span-12 xs:col-span-4 md:col-span-12 lg:col-span-4"
            onChange={(selectedOption) => handleFieldChange(field, selectedOption?.id || null)}
            isTouched={touchedFields[field] || false}
            required
          />
        ))}
        <FromInput
          value={formData.address}
          onChange={(e) => handleFieldChange("address", e.target.value)}
          onBlur={() => handleFieldChange("address", formData.address)}
          placeholder="Số nhà..."
          field="address"
          isTouched={touchedFields.address || false}
          formData={formData}
          col="col-span-12"
          as={InputType.Textarea}
        />
      </div>
    </div>
  );
});

export default RecipientInfo;
