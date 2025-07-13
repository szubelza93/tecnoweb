import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePipe],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] | null = null;
  error: string | null = null;
  isLoading = false;
  success: string | null = null;

  // Form for creating/editing users
  userForm: FormGroup;
  isEditing = false;
  currentUserId: number | null = null;

  // View user details
  selectedUser: Usuario | null = null;
  showUserDetails = false;

  constructor(private api: ApiService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      usernick: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      photo_path: ['']
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    console.log('==> Cargando usuarios');
    this.isLoading = true;
    this.api.get<ApiResponse<{usuarios: Usuario[], pagination: any}>>('/usuarios').subscribe({
      next: (resp) => {
        console.log('==> Usuarios cargados:', resp);
        // Check if resp.data exists and has usuarios property
        if (resp.data && resp.data.usuarios && Array.isArray(resp.data.usuarios)) {
          this.usuarios = resp.data.usuarios;
        } else {
          // If resp.data.usuarios is not an array, set usuarios to empty array
          console.error('Error: resp.data.usuarios is not an array', resp.data);
          this.usuarios = [];
          this.error = 'Error al cargar los usuarios: formato de respuesta incorrecto';
        }

        if (!resp.success) {
          this.error = 'Error inesperado';
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.log('==> Error al cargar usuarios:', err);
        this.error = err?.error?.message || 'No se pudo cargar la lista';
        this.usuarios = null;
        this.isLoading = false;
      },
    });
  }

  // Create a new user
  createUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.success = null;

    this.api.post<ApiResponse<Usuario>>('/usuarios', this.userForm.value).subscribe({
      next: (resp) => {
        console.log('==> Usuario creado:', resp);
        if (resp.success) {
          this.success = resp.message || 'Usuario creado exitosamente';
          this.loadUsers();
          this.resetForm();
          this.closeDrawer('drawer-right-example2');
        } else {
          this.error = resp.message || 'Error al crear usuario';
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.log('==> Error al crear usuario:', err);
        this.error = err?.error?.message || 'No se pudo crear el usuario';
        this.isLoading = false;
      }
    });
  }

  // Edit user
  editUser(user: Usuario) {
    this.isEditing = true;
    this.currentUserId = user.id;

    // Reset password field as we don't want to update it unless explicitly changed
    this.userForm.patchValue({
      name: user.nombre,
      email: user.email,
      usernick: user.username,
      photo_path: user.photopath,
      password: '' // Clear password field
    });

    // Make password optional when editing
    this.userForm.get('password')?.setValidators([Validators.minLength(6)]);
    this.userForm.get('password')?.updateValueAndValidity();

    // Open the drawer
    this.openDrawer('drawer-right-example2');
  }

  // Update user
  updateUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.success = null;

    // Remove empty password from payload if not changed
    const payload = {...this.userForm.value};
    if (!payload.password) {
      delete payload.password;
    }

    this.api.put<ApiResponse<Usuario>>(`/usuarios/${this.currentUserId}`, payload).subscribe({
      next: (resp) => {
        console.log('==> Usuario actualizado:', resp);
        if (resp.success) {
          this.success = resp.message || 'Usuario actualizado exitosamente';
          this.loadUsers();
          this.resetForm();
          this.closeDrawer('drawer-right-example2');
        } else {
          this.error = resp.message || 'Error al actualizar usuario';
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.log('==> Error al actualizar usuario:', err);
        this.error = err?.error?.message || 'No se pudo actualizar el usuario';
        this.isLoading = false;
      }
    });
  }

  // Delete user
  deleteUser(id: number) {
    if (!confirm('¿Está seguro de eliminar este usuario?')) {
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.success = null;

    this.api.delete<ApiResponse<any>>(`/usuarios/${id}`).subscribe({
      next: (resp) => {
        console.log('==> Usuario eliminado:', resp);
        if (resp.success) {
          this.success = resp.message || 'Usuario eliminado exitosamente';
          this.loadUsers();
        } else {
          this.error = resp.message || 'Error al eliminar usuario';
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.log('==> Error al eliminar usuario:', err);
        this.error = err?.error?.message || 'No se pudo eliminar el usuario';
        this.isLoading = false;
      }
    });
  }

  // View user details
  viewUserDetails(user: Usuario) {
    this.selectedUser = user;
    this.showUserDetails = true;
    this.openDrawer('drawer-user-details');
  }

  // Reset form
  resetForm() {
    this.userForm.reset();
    this.isEditing = false;
    this.currentUserId = null;

    // Reset password validation to required
    this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    this.userForm.get('password')?.updateValueAndValidity();
  }

  // Método para limpiar el formulario
  limpiarFormulario() {
    this.userForm.reset();
    // Si quieres que el formulario vuelva a estado inicial, puedes agregar aquí valores por defecto si es necesario
  }

  // Open drawer
  openDrawer(drawerId: string) {
    const drawer = document.getElementById(drawerId);
    if (drawer) {
      drawer.classList.remove('translate-x-full');
    }
  }

  // Close drawer
  closeDrawer(drawerId: string) {
    const drawer = document.getElementById(drawerId);
    if (drawer) {
      drawer.classList.add('translate-x-full');
    }

    if (drawerId === 'drawer-right-example2') {
      this.resetForm();
    } else if (drawerId === 'drawer-user-details') {
      this.selectedUser = null;
      this.showUserDetails = false;
    }
  }

  // Submit form handler
  onSubmit() {
    if (this.isEditing) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  username: string;
  photopath: string | null;
  createdAt: string;
  updatedAt: string;
}
