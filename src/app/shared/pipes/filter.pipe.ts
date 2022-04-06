import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(data: any[], search: string = ''): any[] {
    if (!search.trim()) {
      return data
    }

    return data.filter(data => {
      return data.title.toLowerCase().includes(search.toLowerCase())
    })
  }

}
