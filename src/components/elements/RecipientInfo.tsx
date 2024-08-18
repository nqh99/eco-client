import React, { useState, useEffect } from "react";
import SelectBoxList from "@/components/list/SelectBoxList";
import TextInput from "@/components/interactive/TextInput";

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
    onFormDataChange: (data: any) => void;
    touchedFields: Partial<Record<keyof typeof initialTouchedFields, boolean>>;
}

const cityOptions = [
    { id: "1", name: "Thành phố Hồ Chí Minh" },
    { id: "2", name: "Hà Nội" },
    { id: "3", name: "Đà Nẵng" },
];

const districtOptions = [
    { id: "1", name: "Quận 1" },
    { id: "2", name: "Quận 2" },
    { id: "3", name: "Quận 3" },
];

const wardOptions = [
    { id: "1", name: "Phường 1" },
    { id: "2", name: "Phường 2" },
    { id: "3", name: "Phường 3" },
];

const RecipientInfo: React.FC<RecipientInfoProps> = ({ onFormDataChange, touchedFields }) => {
    const [formData, setFormData] = useState({
        name: "", phone: "", email: "", city: null, district: null, ward: null, address: "",
    });

    const handleInputChange = (field: keyof typeof formData, value: string | null) => {
        const updatedFormData = { ...formData, [field]: value };
        setFormData(updatedFormData);
        onFormDataChange(updatedFormData);
    };

    useEffect(() => {
        onFormDataChange(formData);
    }, [formData, onFormDataChange]);

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Thông tin người nhận</h2>
            <div className="grid grid-cols-12 gap-4">
                <TextInput
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    onBlur={() => handleInputChange("name", formData.name)}
                    placeholder="Họ tên"
                    field="name"
                    isTouched={touchedFields.name || false}
                    formData={formData}
                    col="col-span-12 xs:col-span-6 md:col-span-12 lg:col-span-6"
                />
                <TextInput
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    onBlur={() => handleInputChange("phone", formData.phone)}
                    placeholder="Số điện thoại"
                    field="phone"
                    isTouched={touchedFields.phone || false}
                    formData={formData}
                    col="col-span-12 xs:col-span-6 md:col-span-12 lg:col-span-6"
                />
                <TextInput
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onBlur={() => handleInputChange("email", formData.email)}
                    placeholder="Email"
                    field="email"
                    isTouched={touchedFields.email || false}
                    formData={formData}
                    col="col-span-12 "
                />
                <SelectBoxList
                    options={cityOptions}
                    placeholder="Thành phố"
                    required
                    colSpan="col-span-12 xs:col-span-4 md:col-span-12 lg:col-span-4"
                    onChange={(person) => handleInputChange("city", person?.id || null)}
                    isTouched={touchedFields.city || false}
                />
                <SelectBoxList
                    options={districtOptions}
                    placeholder="Quận/huyện"
                    required
                    colSpan="col-span-12 xs:col-span-4 md:col-span-12 lg:col-span-4"
                    onChange={(person) => handleInputChange("district", person?.id || null)}
                    isTouched={touchedFields.district || false}
                />
                <SelectBoxList
                    options={wardOptions}
                    placeholder="Phường/xã"
                    required
                    colSpan="col-span-12 xs:col-span-4 md:col-span-12 lg:col-span-4"
                    onChange={(person) => handleInputChange("ward", person?.id || null)}
                    isTouched={touchedFields.ward || false}
                />
                <TextInput
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    onBlur={() => handleInputChange("address", formData.address)}
                    placeholder="Số nhà..."
                    field="address"
                    isTouched={touchedFields.address || false}
                    formData={formData}
                    col="col-span-12"
                    as="textarea"
                />
            </div>
        </div>
    );
};

export default RecipientInfo;
