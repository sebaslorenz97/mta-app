export interface Customer{
  customerName: string;
  customerParticularEmpresa: boolean;
  customerReference: string;
  customerRfc: string;
  customerCp: string;
  customerEmail: string;
  customerPhoneNumber: string;
  stateNameFk: string;
  municipalityNameFk: string;
}

export interface Login{
  userName: string,
  userPassword: string
}
