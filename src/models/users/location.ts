type AddressMdl = {
  houseNum: string;
  street: string;
  ward: WardMdl;
  district: DistrictMdl;
  province: ProvinceMdl;
};

type LocationMdl = {
  code: string;
  name: string;
  fullName: string;
};

type ProvinceMdl = LocationMdl;
type DistrictMdl = LocationMdl;
type WardMdl = LocationMdl;

export type { AddressMdl, ProvinceMdl, DistrictMdl, WardMdl };
