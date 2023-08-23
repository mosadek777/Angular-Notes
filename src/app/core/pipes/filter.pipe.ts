import { Pipe, PipeTransform } from '@angular/core';
import { Notes } from '../interfaces/notes';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(notes: Notes[],term:string):Notes[] {
    return notes.filter(note=>note.title.toLowerCase().includes(term.toLowerCase()));
  }

}
