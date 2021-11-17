import { Component, OnInit } from '@angular/core';
import { empty, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  //cursos?: Curso[] ;

  cursos$?: Observable<Curso[]>
  error$ = new Subject<boolean>();

  constructor(private cursoService: CursosService) { }

  ngOnInit(): void {
    //this.cursoService.list().subscribe(dados => this.cursos= dados);
    this.onRefresh();
  }

  onRefresh(){
    this.cursos$ = this.cursoService.list()
    .pipe(
      catchError(error => {
        console.error(error);
        this.error$.next(true);
        return empty();
      })
    );
  }

}
