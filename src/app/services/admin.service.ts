import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminDTO, AdminsService } from 'src/api-client';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private adminsApiService: AdminsService) {}

  /**
   * Find admin by id
   * @param id the id of the admin to find
   * @returns an observable of admin
   */
  public getAdmin(id: number): Observable<AdminDTO> {
    return this.adminsApiService.getAdmin(id);
  }
}
