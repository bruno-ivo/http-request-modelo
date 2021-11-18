import { Component, OnInit } from '@angular/core';
import { empty, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { AlertModalService } from '../../shared/alert-modal/alert-modal.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  //cursos?: Curso[] ;
  //bsModalRef?: BsModalRef;

  cursos$?: Observable<Curso[]>
  error$ = new Subject<boolean>();

  constructor(private cursoService: CursosService,
  //            private modalService: BsModalService
              private alertService: AlertModalService) { }

  ngOnInit(): void {
    //this.cursoService.list().subscribe(dados => this.cursos= dados);
    this.onRefresh();
  }

  onRefresh(){
    this.cursos$ = this.cursoService.list()
    .pipe(
      catchError(error => {
        console.error(error);
        this.handleError();
       // this.error$.next(true);
        return empty();
      })
    );
  }

  handleError(){
    this.alertService.showAlertDanger('Erro ao carregar curso tente novamente mais tarde');
//    this.bsModalRef = this.modalService.show(AlertModalComponent);
//    this.bsModalRef.content.type = 'danger';
//    this.bsModalRef.content.message = 'Erro ao carregar curso tente novamente mais tarde';
  }

}
