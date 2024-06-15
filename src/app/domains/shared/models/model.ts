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
    roles: string;
    rolesFromAuthentication: string;
}

export interface Login{
  userName: string,
  userPassword: string
}

export interface User{
  userPk: number,
  userName: string,
  userPosition: string,
  userEmail: string,
  userLocked: boolean,
  userDisabled: boolean
}
export interface CreateUserDTO extends Omit<User, 'userPk'> {
  userPassword: string
}


/*
    For User Roles was not necessary to create a CreateUserDTO because the user role DTO as the request will be equal to the user role DTO in the response.
    So the Service will need the same DTO as request and in the response
*/
export interface UserRole{
  roleUserPk: string,
  userPkFk: string,
  roleUserGrantedDate: string
}

export interface Customer {
  customerId: number;
  customerParticularEmpresa: boolean;
  customerReference: string;
  customerName: string;
  customerEmail: string;
  customerRfc: string;
  customerCp: string;
  customerPhoneNumber: string;
  stateNameFk: string;
  municipalityNameFk: string;
}
export interface CreateCustomerDTO extends Omit<Customer, 'customerId'> {
}

export interface Vehicle{
  vehicleId: number;
	vehiclePlate: string;
	vehicleColor: string;
	vehicleMillage: number;
	customerNameFk: string;
	vehicleModelNameFk: string;
	vehicleYearValueFk: string;
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
  quoteDetailMecId: number,
  quoteDetailLabour: string,
  quoteDetailAmount: number,
  quoteDetailIdFk: number
}
export interface QuoteDetails{
  quoteDetails: QuoteDetail[]
}
