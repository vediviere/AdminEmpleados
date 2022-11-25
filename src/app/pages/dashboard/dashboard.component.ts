import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EmpleadosService } from './empleados.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

 listaEmpleados : any;
 idEmpledadoEdit = 0;
 idBeneficiarioEdit = 0;
 
 form:FormGroup;
 editar:FormGroup;

  constructor(private services : EmpleadosService, public fb: FormBuilder) {
    this.form = this.fb.group({
      nombre:[null,[Validators.required]],
      puesto:[null,[Validators.required]],
      salario:[null,[Validators.required]],
      estatus:[null,[Validators.required]],
      fecha:[null,[Validators.required]],
      nombreB:[null,[Validators.required]],
      parentesco:[null,[Validators.required]],
      fechaN:[null,[Validators.required]],
      sexo:[null,[Validators.required]],
      
    }),
    this.editar = this.fb.group({
      nombre:[null,[Validators.required]],
      puesto:[null,[Validators.required]],
      salario:[null,[Validators.required]],
      estatus:[null,[Validators.required]],
      fecha:[null,[Validators.required]],
      nombreB:[null,[Validators.required]],
      parentesco:[null,[Validators.required]],
      fechaN:[null,[Validators.required]],
      sexo:[null,[Validators.required]],
    })
   }

  ngOnInit(): void {
    
    this.getEmpleados();
  }

  getEmpleados(){
    let empleados = this.services.getEmpleados().subscribe(res => {
      this.listaEmpleados = res;    
    });
  }

  agregarEmpleado(){
   let body = 
   {
    "id": 0,
    "nombre": this.form.controls["nombre"].value,
    "puesto": this.form.controls["puesto"].value,
    "salario": this.form.controls["salario"].value,
    "estatus": this.form.controls["estatus"].value == "Activo" ? true : false,
    "fechaContratacion": this.form.controls["fecha"].value,
    "beneficiarios": []
  }

  this.services.addEmpleados(body).subscribe(res => {
    let idEmpledado = res;     
    let bodyB = 
    {
      "id": 0,
      "nombre": this.form.controls["nombreB"].value,
      "parentesco": this.form.controls["parentesco"].value,
      "fechaNacimiento": this.form.controls["fechaN"].value,
      "sexo": this.form.controls["sexo"].value,
      "empleadoId": idEmpledado
  }

    this.services.addBeneficiario(bodyB).subscribe(resB => {
      this.getEmpleados();
    });
  });
  }

  eliminarEmpleado(id:number){
    this.services.deleteEmpleados(id).subscribe(res => {
      this.getEmpleados();
    });
  }

  getEmpleadoById(id:number){
    this.idEmpledadoEdit = id;
    this.services.EmpleadosById(id).subscribe(resp => {
      let objeto: any = resp    
      this.idBeneficiarioEdit = objeto.beneficiarios.id;
      this.editar.controls['nombre'].setValue(objeto.nombre);
      this.editar.controls['puesto'].setValue(objeto.puesto);
      this.editar.controls['salario'].setValue(objeto.salario);
      this.editar.controls['estatus'].setValue(objeto.estatus);
      this.editar.controls['fecha'].setValue(objeto.fechaContratacion.substring(0,10));

      this.editar.controls['nombreB'].setValue(objeto.beneficiarios[0].nombre);
      this.editar.controls['parentesco'].setValue(objeto.beneficiarios[0].parentesco);
      this.editar.controls['fechaN'].setValue(objeto.beneficiarios[0].fechaNacimiento.substring(0,10));
      this.editar.controls['sexo'].setValue(objeto.beneficiarios[0].sexo);


    });
  }

  editarEmpleados(){
    
      let body = 
      {
       "id": this.idEmpledadoEdit,
       "nombre": this.editar.controls["nombre"].value,
       "puesto": this.editar.controls["puesto"].value,       
       "salario": this.editar.controls["salario"].value,
       "estatus": this.editar.controls["estatus"].value == "Activo" ? true : false,
       "fechaContratacion": this.editar.controls["fecha"].value,
       "beneficiarios": []
     }
   
     this.services.updateEmpleados(body, this.idEmpledadoEdit).subscribe(res => {
      console.log("id ", this.idEmpledadoEdit);
       let bodyB = 
       {
         "id": this.idBeneficiarioEdit,
         "nombre": this.editar.controls["nombreB"].value,
         "parentesco": this.editar.controls["parentesco"].value,
         "fechaNacimiento": this.editar.controls["fechaN"].value,
         "sexo": this.editar.controls["sexo"].value,
         "empleadoId": this.idEmpledadoEdit
     }
   
       this.services.updateBeneficiario(bodyB, this.idBeneficiarioEdit).subscribe(resB => {
         this.getEmpleados();
       });
       this.getEmpleados();
     });
  }
}
