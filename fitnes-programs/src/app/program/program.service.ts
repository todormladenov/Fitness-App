import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createPointer } from '../shared/utils/create-pointer';
import { CreatedProgram, Program } from './types/program';
import { ReadingApiResponse } from '../shared/types/response';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private http: HttpClient) { }

  getPrograms() {
    return this.http.get<ReadingApiResponse>('api/classes/Program');
  }

  getNewestProgram() {
    return this.http.get<ReadingApiResponse>('api/classes/Program?order=-createdAt&limit=1');
  }

  getProgramById(programId: string) {
    return this.http.get<Program>(`api/classes/Program/${programId}`);
  }

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

  deleteProgram(programId: string) {
    return this.http.delete<{}>(`api/classes/Program/${programId}`);
  }
}