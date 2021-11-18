import { Component, OnInit, ViewChild } from '@angular/core';
import { EMPTY, empty, Observable, Subject } from 'rxjs';
import { catchError, take, switchMap } from 'rxjs/operators';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { AlertModalService } from '../../shared/alert-modal/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  //cursos?: Curso[] ;
  //bsModalRef?: BsModalRef;
  deleteModalRef?: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;

  cursos$?: Observable<Curso[]>
  error$ = new Subject<boolean>();
  cursoSelecionado: any ;

  constructor(private cursoService: CursosService,
              private modalService: BsModalService,
              private alertService: AlertModalService,
              private router: Router,
              private route: ActivatedRoute) { }

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
        return EMPTY;
      })
    );
  }

  handleError(){
    this.alertService.showAlertDanger('Erro ao carregar curso tente novamente mais tarde');
//    this.bsModalRef = this.modalService.show(AlertModalComponent);
//    this.bsModalRef.content.type = 'danger';
//    this.bsModalRef.content.message = 'Erro ao carregar curso tente novamente mais tarde';
  }

  onEdit(id: number){
    this.router.navigate(['editar', id], { relativeTo: this.route});
  }

  onDelete(curso: Curso){
    this.cursoSelecionado = curso;
    //this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover esse curso?');
    result$?.asObservable().pipe(
      take(1),
      switchMap(result => result ? this.cursoService.remover(curso.id) : EMPTY)
    )
    .subscribe(
      success => {
        this.onRefresh();
        this.deleteModalRef?.hide();
      },
    error => this.alertService.showAlertDanger('Erro ao remover Curso. Tente Novamente mais tarde')
    )
  }

  onConfirmDelete(): void {
    this.cursoService.remover(this.cursoSelecionado.id)
    .subscribe(
      success => {
        this.onRefresh();
        this.deleteModalRef?.hide();
      },
    error => this.alertService.showAlertDanger('Erro ao remover Curso. Tente Novamente mais tarde')
    );
  }

  onDeclineDelete(): void {
    this.deleteModalRef?.hide();
  }

}
