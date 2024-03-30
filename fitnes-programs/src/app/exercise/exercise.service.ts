import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createPointer } from '../shared/utils/create-pointer';
import { CreatedExercise } from './types/exercise';
import { ReadingExerciseApiResponse } from '../shared/types/response';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient) { }

  getExerciseByProgramId(programId: string) {
    const pointer = {
      program: createPointer('Program', programId)
    }

    const query = encodeURIComponent(JSON.stringify(pointer));
    return this.http.get<ReadingExerciseApiResponse>(`api/Classes/Exercise?where=${query}`);
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

  delete(exerciseId: string){
    return this.http.delete<{}>(`api/classes/Exercise/${exerciseId}`);
  }
}
