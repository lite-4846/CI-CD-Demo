import { Component, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from './user.service';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.html',
})
export class UsersComponent {
  private http = inject(HttpClient);

  users = signal<User[]>([]);
  newUser = signal<Partial<User>>({ name: '', email: '' });

  constructor(private userService : UsersService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe((res) => {
      this.users.set(res);
    });
  }

  addUser() {
    const user = this.newUser();
    if (!user.name || !user.email) return;

    const payload = { name: user.name, email: user.email };
    this.userService.addUser(payload).subscribe((res) => {
      const addedUser: User = {
        id: Math.floor(Math.random() * 10000),
        name: res.name || user.name!,
        email: res.email || user.email!,
      };
      this.users.update((list) => [addedUser, ...list]);
      this.newUser.set({ name: '', email: '' });
    });
  }
}
