import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosService } from '../cursos.service';
import { AlertModalService } from '../../shared/alert-modal/alert-modal.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.css'],
})
export class CursosFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: CursosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let registro = null;

    /*   this.route.params.subscribe(
      (params: any) => {
        const id = params['id'];
        console.log(id);
        const curso$ = this.service.loadById(id);
        curso$.subscribe(curso => {
          registro = curso;
          this.updadeForm(curso);
        });

      }
   ); */
/*
    this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap((id) => this.service.loadById(id))
      )
      .subscribe((curso) => this.updadeForm(curso)); */

    const curso = this.route.snapshot.data['curso'];

    this.form = this.fb.group({
      id: [curso.id],
      nome: [
        curso.nome,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
    });
  }

/*   updadeForm(curso: any) {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome,
    });
  } */

  hasErrors(field: string) {
    return this.form?.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form?.valid) {
      console.log('submit');
      let msgSuccess = 'Curso criado com sucesso';
      let msgErro = 'Erro ao criar o curso Tente Novamente';
      if (this.form.value.id) {
        msgSuccess = 'Curso Atualizado com sucesso';
        msgErro = 'Erro ao atualizar o curso Tente Novamente';
      }

      this.service.save(this.form.value).subscribe(
        (success) => {
          this.modal.showAlertSuccess(msgSuccess);
          this.location.back();
        },
        (error) =>
          this.modal.showAlertDanger(msgErro),
        () => console.log('update completo')
      );
/*       if (this.form.value.id) {
        this.service.update(this.form.value).subscribe(
          (success) => {
            this.modal.showAlertSuccess('Curso Atualizado com sucesso');
            this.location.back();
          },
          (error) =>
            this.modal.showAlertDanger('Erro ao Atualizar o curso Tente Novamente'),
          () => console.log('update completo')
        );
      }else{
        this.service.create(this.form.value).subscribe(
          (success) => {
            this.modal.showAlertSuccess('Curso criado com sucesso');
            this.location.back();
          },
          (error) =>
            this.modal.showAlertDanger('Erro ao criar o curso Tente Novamente'),
          () => console.log('request completo')
        );
      } */
    }
  }

  onCancel() {
    this.submitted = false;
    this.form?.reset();
  }
}
