import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createPointer } from '../shared/utils/create-pointer';
import { CreatedExercise } from './types/exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient) { }

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
}
