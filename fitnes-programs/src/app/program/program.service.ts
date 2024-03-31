import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createPointer } from '../shared/utils/create-pointer';
import { CreatedProgram, Program } from './types/program';
import { ReadingProgramApiResponse } from '../shared/types/response';
import { BehaviorSubject, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private programs$$ = new Subject<Program[]>();
  programs$ = this.programs$$.asObservable();

  private singleProgram$$ = new BehaviorSubject<Program | undefined>(undefined);
  singleProgram$ = this.singleProgram$$.asObservable();

  constructor(private http: HttpClient) { }

  private fetchPrograms(limit: number, skip: number) {
    return this.http.get<ReadingProgramApiResponse>(`api/classes/Program?limit=${limit}&skip=${skip}`)
      .pipe(tap((data) => {
        this.programs$$.next(data.results);
      }))
  }

  getPrograms(limit: number, skip: number) {
    return this.fetchPrograms(limit, skip);
  }

  getNewestProgram() {
    return this.http.get<ReadingProgramApiResponse>('api/classes/Program?order=-createdAt&limit=1');
  }

  getProgramById(programId: string) {
    return this.http.get<Program>(`api/classes/Program/${programId}`)
      .pipe(tap(data => this.singleProgram$$.next(data)));
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

  updateProgram(programId: string, title: string, type: string, image: string, price: string, description: string, ownerId: string) {
    const programData = {
      title,
      description,
      type,
      image,
      price,
      owner: createPointer('_User', ownerId)
    };

    return this.http.put<{}>(`api/classes/Program/${programId}`, programData);
  }
}