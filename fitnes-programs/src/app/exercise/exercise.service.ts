import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createPointer } from '../shared/utils/create-pointer';
import { CreatedExercise, Exercise } from './types/exercise';
import { ReadingExerciseApiResponse } from '../shared/types/response';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private exercise$$ = new Subject<Exercise[]>();
  exercise$ = this.exercise$$.asObservable();

  constructor(private http: HttpClient) { }

  getExerciseByProgramId(programId: string) {
    const pointer = {
      program: createPointer('Program', programId)
    }

    const query = encodeURIComponent(JSON.stringify(pointer));
    return this.http.get<ReadingExerciseApiResponse>(`api/Classes/Exercise?where=${query}`)
      .pipe(tap(data => this.exercise$$.next(data.results)));
  }

  create(title: string, sets: number, repetitions: string, programId: string, ownerId: string) {
    const exerciseData = {
      title,
      sets,
      repetitions,
      program: createPointer('Program', programId),
      owner: createPointer('_User', ownerId),
    };

    return this.http.post<CreatedExercise>('api/classes/Exercise', exerciseData);
  }

  update(title: string, sets: number, repetitions: string, objectId: string, programId: string, ownerId: string) {
    const exerciseData = {
      title,
      sets,
      repetitions,
      program: createPointer('Program', programId),
      owner: createPointer('_User', ownerId),
    };

    return this.http.put<{}>(`api/Classes/Exercise/${objectId}`, exerciseData);
  }

  delete(exerciseId: string) {
    return this.http.delete<{}>(`api/classes/Exercise/${exerciseId}`);
  }
}
