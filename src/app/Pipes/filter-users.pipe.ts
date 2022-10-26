import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../Modals/IUser';

@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {

  transform(users: IUser[], searchTerm: string): IUser[] {
    if (users || !searchTerm) {
      return users
    }
    return users.filter((users) => { users.username.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 })
  }

}
