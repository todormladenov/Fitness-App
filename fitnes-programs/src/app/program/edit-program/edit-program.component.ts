import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Program } from '../types/program';
import { ProgramService } from '../program.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalLoaderService } from 'src/app/core/global-loader.service';

@Component({
  selector: 'app-edit-program',
  templateUrl: './edit-program.component.html',
  styleUrls: ['./edit-program.component.css']
})
export class EditProgramComponent implements OnInit {
  programId: string = '';
  program = {} as Program;

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(25)]],
    type: ['', [Validators.required]],
    image: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(0)]],
    description: ['', [Validators.required, Validators.minLength(20)]],
  })

  constructor(
    private programService: ProgramService,
    private activeRoute: ActivatedRoute,
    private globalLoaderService: GlobalLoaderService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getProgram();
  }

  edit() {
    
  }

  get globalLoaderIsLoading() {
    return this.globalLoaderService.isLoading;
  }

  getProgram() {
    this.globalLoaderService.showLoader();
    this.activeRoute.params.subscribe((data) => {
      this.programId = data['programId'];

      this.programService.getProgramById(this.programId).subscribe((data) => {
        this.program = data;
        const { title, type, image, price, description } = data;

        this.form.setValue({
          title,
          type,
          image,
          price,
          description
        });

        this.globalLoaderService.hideLoader();
      });
    })
  }
}
