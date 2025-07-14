import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePipe, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] | null = null;
  filteredUsuarios: Usuario[] = [];
  searchTerm: string = '';
  error: string | null = null;
  isLoading = false;
  success: string | null = null;

  // Available roles
  roles = [
    { value: 'admin', label: 'Administrador' },
    { value: 'medico', label: 'Médico' },
    { value: 'laboratorio', label: 'Laboratorio' },
    { value: 'recepcion', label: 'Recepción' },
    { value: 'usuario', label: 'Usuario Básico' }
  ];

  // Form for creating/editing users
  userForm: FormGroup;
  isEditing = false;
  currentUserId: number | null = null;

  // View user details
  selectedUser: Usuario | null = null;
  showUserDetails = false;

  // File upload
  selectedFile: File | null = null;
  selectedFileName: string = '';
  imagePreview: string | null = null;

  constructor(private api: ApiService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      usernick: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['usuario', [Validators.required]],
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
          this.filteredUsuarios = [...this.usuarios];
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

  searchUsuarios(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredUsuarios = this.usuarios ? [...this.usuarios] : [];
      return;
    }
    this.filteredUsuarios = (this.usuarios || []).filter(usuario =>
      Object.values(usuario).some(val =>
        val !== null && val !== undefined && val.toString().toLowerCase().includes(term)
      )
    );
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

          // If we have a file to upload and the user was created successfully
          if (this.selectedFile && resp.data && resp.data.id) {
            // Set the current user ID for the upload
            this.currentUserId = resp.data.id;

            // Upload the profile image but don't update user after (it was just created)
            this.uploadProfileImage(false);
          } else {
            // No image to upload, just refresh the list and reset the form
            this.loadUsers();
            this.resetForm();
            this.closeDrawer('drawer-right-example2');
          }
        } else {
          this.error = resp.message || 'Error al crear usuario';
          this.isLoading = false;
        }
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
      role: user.role || 'usuario',
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

    // Reset file upload state
    this.selectedFile = null;
    this.selectedFileName = '';
    this.imagePreview = null;

    // Reset password validation to required
    this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    this.userForm.get('password')?.updateValueAndValidity();
  }

  // Handle file selection in create/edit form
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;

      // Create a preview of the selected image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // Handle file selection in user details view
  onDetailsFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0 && this.selectedUser) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;

      // Set current user ID for the upload
      this.currentUserId = this.selectedUser.id;

      // Upload the image immediately
      this.uploadProfileImage(false);
    }
  }

  // Upload profile image
  uploadProfileImage(updateUserAfterUpload: boolean = true) {
    if (!this.selectedFile || !this.currentUserId) {
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.api.uploadFile<ApiResponse<Usuario>>(
      `/usuarios/${this.currentUserId}/upload-profile-image`,
      this.selectedFile,
      'profileImage'
    ).subscribe({
      next: (resp) => {
        console.log('==> Imagen de perfil actualizada:', resp);
        if (resp.success) {
          this.success = resp.message || 'Imagen de perfil actualizada exitosamente';

          // Update the photo_path in the form
          if (resp.data && resp.data.photopath) {
            this.userForm.patchValue({
              photo_path: resp.data.photopath
            });
          }

          // Reset file selection
          this.selectedFile = null;
          this.selectedFileName = '';

          // If we should update the user after upload (e.g., when editing)
          if (updateUserAfterUpload) {
            this.updateUser();
          } else {
            // If we're just uploading the image (e.g., after user creation or from user details view)
            this.loadUsers(); // Refresh the user list

            // If we're in the create/edit drawer, close it and reset the form
            if (!this.showUserDetails) {
              this.resetForm();
              this.closeDrawer('drawer-right-example2');
            } else if (this.showUserDetails && this.selectedUser && this.currentUserId) {
              // If we're in the user details view, refresh the selected user
              this.api.get<ApiResponse<Usuario>>(`/usuarios/${this.currentUserId}`).subscribe({
                next: (resp) => {
                  if (resp.success && resp.data) {
                    this.selectedUser = resp.data;
                  }
                }
              });
            }
          }
        } else {
          this.error = resp.message || 'Error al actualizar la imagen de perfil';
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.log('==> Error al actualizar la imagen de perfil:', err);
        this.error = err?.error?.message || 'No se pudo actualizar la imagen de perfil';
        this.isLoading = false;
      }
    });
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
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    // If there's a file selected and we're editing, upload it first
    if (this.selectedFile && this.isEditing && this.currentUserId) {
      // For editing an existing user with a new image
      this.uploadProfileImage(true); // true = update user after upload
      return;
    }

    // If there's a file selected and we're creating a new user
    if (this.selectedFile && !this.isEditing) {
      // First create the user
      this.createUser();
      // The image will be uploaded separately after user creation
      return;
    }

    // Otherwise proceed with normal create/update
    if (this.isEditing) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  trackUsuarioId(index: number, usuario: Usuario) {
    return usuario.id;
  }

  // Get full image URL using the ApiService
  getFullImageUrl(relativePath: string | null): string {
    return this.api.getFullImageUrl(relativePath);
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
  role: string;
  createdAt: string;
  updatedAt: string;
}
