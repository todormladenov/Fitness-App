import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createPointer } from '../shared/utils/create-pointer';
import { CreatedProgram } from './types/program';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private http: HttpClient) { }

  createProgram(title: string, description: string, type: string, image: string, price: string, ownerId: string) {
    const programData = {
      title,
      description,
      type,
      image,
      price,
      owner: createPointer('_User', ownerId)
    }

    return this.http.post<CreatedProgram>('api/classes/Program', programData);
  }
}
