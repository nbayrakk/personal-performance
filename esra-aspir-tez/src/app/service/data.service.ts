import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data:any = {}
  constructor() { }
  getData(){
    return this.data
  }
  setData(field:any,fieldData:any){
    this.data[field] = fieldData
  }
}
