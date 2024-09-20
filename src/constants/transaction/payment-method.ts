import { BankAccountMdl, BankMdl } from "@/models/users/bank";

enum PaymentMethod {
  Cash = "COD",
  BankTransfer = "TT",
}

const DisplayMethodMsg: { [key in PaymentMethod]?: string } = {
  [PaymentMethod.Cash]: "Thanh toán tiền mặt (COD)",
  [PaymentMethod.BankTransfer]: "Chuyển khoản ngân hàng",
};

// TODO: [EW-126] enhance later
const PaymentMethodMapping: { [key in PaymentMethod]?: unknown } = {
  [PaymentMethod.BankTransfer]: [
    {
      id: 1,
      name: "Cty TNHH đầu tư thương mại và dịch vụ quốc tế Eco-HHB",
      accountNumber: "152704073686868",
      nickname: "",
      bankBranch: {
        id: 1,
        name: "Ngân hàng thương mại cổ phần Phát triển Thành phố Hồ Chí Minh",
        nickname: "HD Bank",
      } as unknown as BankMdl,
    } as unknown as BankAccountMdl,
    {
      id: 2,
      name: "Hồ Thị Hồng",
      accountNumber: "0908265127",
      nickname: "",
      bankBranch: {
        id: 1,
        name: "Ngân hàng thương mại cổ phần Sài Gòn Thương Tín",
        nickname: "Sacombank",
      } as unknown as BankMdl,
    } as unknown as BankAccountMdl,
  ],
};

const getDisplayMethodMsg = (method: PaymentMethod) => {
  return DisplayMethodMsg[method];
};

// TODO: [EW-126] enhance later
const getDataMappingWithPaymentMethod = (method: PaymentMethod) => {
  return PaymentMethodMapping[method];
};

export {
  PaymentMethod,
  getDisplayMethodMsg,
  // TODO: [EW-126] enhance later
  getDataMappingWithPaymentMethod,
};
