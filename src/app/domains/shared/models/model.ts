export interface Response{
    code: string;
    message: string;
    cb: Customer;
    sb: string;
    mb: string;
    vb: Vehicle;
    vlb: string;
    vmb: string;
    vyb: string;
    qb: Quote;
    lqdb: QuoteDetail[];
    lvb: Vehicle[]
    lqb: Quote[]
    ub: User;
    urb: UserRole;
    roles: string[];
    roleAssignmentOperationResult: string;
    cl: string[];
    vl: string[];
    lines: string[];
    models: string[];
    years: string[];
}

export interface Login{
  userName: string,
  userPassword: string
}

export interface User{
  userPk: string,
  userName: string,
  userMecId: number
  userPosition: string,
  userEmail: string,
  userLocked: boolean,
  userDisabled: boolean
}

export interface CreateUserDTO extends Omit<User, 'userPk'> {
  userPassword: string
  newUserPassword: string
}

/*
    For User Roles was not necessary to create a CreateUserDTO because the user role DTO as the request will be equal to the user role DTO in the response.
    So the Service will need the same DTO as request and in the response
*/
export interface UserRole{
  adminRole: boolean;
  employeeRole: boolean;
  managerRole: boolean;
  userPkFk: string;
  roleUserGrantedDate: string;
}

export interface Customer {
  customerId: number;
  customerParticularEmpresa: boolean;
  customerPrivateEnterprise: boolean;
  customerReference: string;
  customerName: string | null;
  newCustomerName: string;
  customerEmail: string;
  customerRfcKey: string;
  customerCp: string;
  customerPhoneNumber: string;
  customerStateNameFk: string;
  customerMunicipalityNameFk: string;
}
export interface CreateCustomerDTO extends Omit<Customer, 'customerId'> {
  customerRfc: string;
  stateNameFk: string;
  municipalityNameFk: string;
}

export interface Vehicle{
  vehicleId: number;
  newVehiclePlate: string;
	vehiclePlate: string;
	vehicleColor: string;
	vehicleMillage: number;
	customerNameFk: string;
	vehicleModelNameFk: string;
	vehicleYearValueFk: number;
	vehicleLineNameFk: string;
}
export interface CreateVehicleDTO extends Omit<Vehicle, 'vehicleId'> {
}

export interface Quote{
  quoteId: number,
  quoteOrderDate: string,
  quoteDeadline: string,
  vehicleIdFk: number,
  vehicleNameFk: string,
  quoteStatusVehicle: string,
  quotePaymentMethod: boolean,
  quotePaymentStatus: boolean,
  quoteAdvancePayment: string,
  quoteRequireInvoice: boolean
}
export interface CreateQuoteDTO extends Omit<Quote, 'quoteId'>{
}

export interface QuoteDetail{
  quoteDetailId: number,
  quoteDetailMecId: number,
  quoteDetailLabour: string,
  quoteDetailAmount: number,
  quoteDetailIdFk: number
}
export interface QuoteDetailsCUD{
  lqdb: QuoteDetail[],
  lqdbForDelete: number[]
}

export interface CreateVehicleLine{
  vehicleLine: string;
}

export interface CreateVehicleModel{
  vehicleModel: string;
  vehicleLineNameFk: string;
}

export interface CreateVehicleYear{
  vehicleYearValue: string;
}
