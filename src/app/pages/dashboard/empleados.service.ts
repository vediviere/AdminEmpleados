import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const APIBaseUrl = "http://localhost:7013/api/";

@Injectable({
  providedIn: 'root'
})


export class EmpleadosService {

  constructor(private http: HttpClient) { }

  getEmpleados() {
    return this.http.get(`${APIBaseUrl}empleados`).pipe();
  }

  addEmpleados(body:any) {
    return this.http.post(`${APIBaseUrl}empleados`,body).pipe();
  }

  updateEmpleados(body:any, id:number) {
    return this.http.put(`${APIBaseUrl}empleados/${id}`,body).pipe();
  }

  addBeneficiario(body:any) {
    return this.http.post(`${APIBaseUrl}beneficiarios`,body).pipe();
  }

  deleteEmpleados(id:number) {
    console.log("Id", id);    
    return this.http.delete(`${APIBaseUrl}empleados/${id}`);
  }

  EmpleadosById(id:number) {
    return this.http.get(`${APIBaseUrl}empleados/${id}`);
  }

  updateBeneficiario(body:any,id:number){
    return this.http.put(`${APIBaseUrl}beneficiarios/${id}`,body).pipe();
  }
}
