import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BuyerDTO, BuyersService, IdBuyer } from 'src/api-client';

@Injectable({
  providedIn: 'root',
})
export class BuyerService {
  constructor(private buyersApiService: BuyersService) {}

  /**
   * Create a new buyer in the database
   * @param buyer to save in the databse
   * @returns an obserable containing the id of the buyer created
   */
  public createBuyer(buyer: BuyerDTO): Observable<IdBuyer> {
    return this.buyersApiService.createBuyer(buyer);
  }

  /**
   * Find a buyer by id
   * @param id the id of the buyer
   * @returns an observable of buyer
   */
  public getBuyer(id: number): Observable<BuyerDTO> {
    return this.buyersApiService.getBuyer(id);
  }

  /**
   * Retrieve all buyers from the database
   * @returns an observable of buyers
   */
  public getBuyers(): Observable<BuyerDTO[]> {
    return this.buyersApiService.getBuyers();
  }

  /**
   * Update a buyer in the database
   * @param buyer the buyer to update
   */
  public updateBuyer(buyer: BuyerDTO): Observable<any> {
    return this.buyersApiService.updateBuyer(buyer);
  }
}
