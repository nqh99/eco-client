type BankMdl = {
  id: string;
  name: string;
  accountNumber: string;
  nickname: string,
  location: string;
  logo: string;
};

type BankAccountMdl = {
  id: string;
  name: string;
  accountNumber: string;
  balance: number;
  nickname: string;
  bankBranch: BankMdl;
};

type PaymentMethodMdl = {
  id: string;
  name: string;
};

export type { BankMdl, BankAccountMdl, PaymentMethodMdl };
