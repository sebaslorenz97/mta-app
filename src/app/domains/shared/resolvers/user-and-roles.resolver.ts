//RESOLVER IMPORTS
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot } from "@angular/router";

//LOCAL IMPORTS
import { Response } from '../models/model';
import { UserService } from '../../shared/services/user.service'

export const userAndRolesResolverByUsername: ResolveFn<Response> = (route, state) => {
  route: ActivatedRouteSnapshot
  return inject(UserService).searchUserAndUserRolesByUsername(route.paramMap.get('userPkDos'));
};

export const userAndRolesResolverByMecId: ResolveFn<Response> = (route, state) => {
  route: ActivatedRouteSnapshot
  return inject(UserService).searchUserAndUserRolesByMecId(route.paramMap.get('userMecIdDosString'));
};

export const userAndRolesResolverForAccountOwner: ResolveFn<Response> = (route, state) => {
  route: ActivatedRouteSnapshot
  return inject(UserService).searchUserAndUserRolesForAccountOwner();
};
