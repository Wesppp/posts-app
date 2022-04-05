import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private snackBar: MatSnackBar) {
  }

  update = new BehaviorSubject<any>('');
  updateObservable$ = this.update.asObservable();

  updateComponent(data: any) {
    if (data) {
      this.update.next(data);
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(`${message}`, '', {
      duration: 2000
    })
  }

  customConfirm() {
    return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)

      console.log(`${operation} failed: ${error.message}`)

      return of(result as T);
    }
  }
}
