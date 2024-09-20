"use client";

import React, { useState } from "react";
import BInput from "../../components/CustomizableInput";
import BListbox from "../../components/CustomizableSelect";
import { UserOrderMdl } from "@/models/users/order";
import {
  FormDataKeys,
  getPlaceHolderOfFormKeys,
} from "@/constants/form/form-key";

const UserInfoForm = () => {
  const [submitData, setSubmitData] = useState<UserOrderMdl>();

  const handleInputChange =
    (field: FormDataKeys) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
        
    //   setSubmitData((prevData) => ({ ...prevData, [field]: e.target.value }));
    };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="font-semibold mb-4">Thông tin người nhận</h2>

      {/* Render Input Fields */}
      <div className="grid grid-cols-2 gap-4">
        <BInput
          key={FormDataKeys.RecipientName}
          type={"text"}
          placeholder={getPlaceHolderOfFormKeys(FormDataKeys.RecipientName)}
          value={submitData[key as FormDataKeys]}
          onChange={handleInputChange(key as FormDataKeys)}
          validate={validateInput[key as FormDataKeys]}
          triggerValidation={triggerValidation}
        />
        {inputFields.slice(0, 2).map(({ key, type, placeholder }) => (
          <BInput
            key={key}
            type={type}
            placeholder={placeholder}
            value={formData[key as FormDataKeys]}
            onChange={handleInputChange(key as FormDataKeys)}
            validate={validateInput[key as FormDataKeys]}
            triggerValidation={triggerValidation}
          />
        ))}
      </div>

      <BInput
        type="email"
        placeholder="Email"
        value={formData.recipientEmail}
        onChange={handleInputChange("recipientEmail")}
        validate={validateInput.recipientEmail}
        triggerValidation={triggerValidation}
      />

      {/* Render Select Fields */}
      <div className="grid grid-cols-3 gap-2">
        {selectFields.map(({ key, options, placeholder }) => (
          <BListbox
            key={key}
            value={formData[key as FormDataKeys]}
            onChange={handleInputChange(key as FormDataKeys)}
            options={options}
            placeholder={placeholder}
            validate={validateInput[key as FormDataKeys]}
            triggerValidation={triggerValidation}
          />
        ))}
      </div>

      <BInput
        as="textarea"
        placeholder="Số nhà..."
        value={formData.houseNumber}
        onChange={handleInputChange("houseNumber")}
        validate={validateInput.houseNumber}
        triggerValidation={triggerValidation}
      />
    </div>
  );
};

export default UserInfoForm;
