enum FormDataKeys {
  RecipientName,
  RecipientPhone,
  RecipientEmail,
  City,
  District,
  Ward,
  Address,
}

const PlaceHolderOfFormDataKeys: { [key in FormDataKeys]?: string } = {
  [FormDataKeys.RecipientName]: "Tên người nhận",
  [FormDataKeys.RecipientPhone]: "Số điện thoại",
  [FormDataKeys.RecipientEmail]: "Email",
  [FormDataKeys.City]: "Tỉnh thành",
  [FormDataKeys.District]: "Quận/huyện",
  [FormDataKeys.Ward]: "Phường/xã",
  [FormDataKeys.Address]: "Địa chỉ...",
};

const getPlaceHolderOfFormKeys = (key: FormDataKeys) => {
  return PlaceHolderOfFormDataKeys[key];
};

export { FormDataKeys, getPlaceHolderOfFormKeys };
