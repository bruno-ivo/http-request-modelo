import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud-service';
import { Curso } from './curso';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService2Service extends CrudService<Curso>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}cursos`);
   }
}
