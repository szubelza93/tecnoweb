import { Routes } from '@angular/router';
import { VamTipoDonComponent } from './pages/vamTipoDon/vamTipoDon.component';
import { VamTipoDonFormComponent } from './pages/vamTipoDon/vamTipoDon-form.component';
import { LoginComponent } from './pages/login/login.component';
import { loginGuard } from './guards/login.guard';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then(m => m.LoginComponent),
        canActivate: [loginGuard]
    },
    {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then(m => m.RegisterComponent),
        canActivate: [loginGuard]
    },
    {
        path: '',
        loadComponent: () => import('./shared/components/layout/layout.component'),
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./business/dashboard/dashboard.component')
            },
            {
                path: 'blank',
                loadComponent: () => import('./pages/blank/blank.component').then(m => m.BlankComponent)
            },
            {
                path: 'profile',
                loadComponent: () => import('./business/profile/profile.component')
            },
            {
                path: 'tables',
                loadComponent: () => import('./business/tables/tables.component')
            },
            // Rutas del módulo de donantes
            {
                path: 'donantes',
                loadComponent: () => import('./pages/donantes/donantes.component').then(m => m.DonantesComponent)
            },
            {
                path: 'donantes/crear',
                loadComponent: () => import('./pages/donantes/donante-form.component').then(m => m.DonanteFormComponent)
            },
            {
                path: 'donantes/editar/:id',
                loadComponent: () => import('./pages/donantes/donante-form.component').then(m => m.DonanteFormComponent)
            },
            {
                path: 'donantes/ver/:id',
                loadComponent: () => import('./pages/donantes/donante-detail.component').then(m => m.DonanteDetailComponent)
            },
            // Rutas del módulo de centros de donación (vamcentdon)
            {
                path: 'vamcentdon',
                loadComponent: () => import('./pages/vamcentdon/vamcentdon.component').then(m => m.VamcentdonComponent)
            },
            {
                path: 'vamcentdon/crear',
                loadComponent: () => import('./pages/vamcentdon/vamcentdon-form.component').then(m => m.VamcentdonFormComponent)
            },
            {
                path: 'vamcentdon/editar/:id',
                loadComponent: () => import('./pages/vamcentdon/vamcentdon-form.component').then(m => m.VamcentdonFormComponent)
            },
            {
                path: 'vamcentdon/detalle/:id',
                loadComponent: () => import('./pages/vamcentdon/vamcentdon-detail.component').then(m => m.VamcentdonDetailComponent)
            },
            // Rutas del módulo de cuestionarios-numeros
            {
                path: 'cuestionarios-numeros',
                loadComponent: () => import('./pages/cuestionarios-numeros/cuestionarios-numeros.component').then(m => m.CuestionariosNumerosComponent)
            },
            {
                path: 'cuestionarios-numeros/crear',
                loadComponent: () => import('./pages/cuestionarios-numeros/cuestionario-numero-form.component').then(m => m.CuestionarioNumeroFormComponent)
            },
            {
                path: 'cuestionarios-numeros/editar/:id',
                loadComponent: () => import('./pages/cuestionarios-numeros/cuestionario-numero-form.component').then(m => m.CuestionarioNumeroFormComponent)
            },

            // Rutas del módulo de preguntas de cuestionario (vamcuestio)
            {
                path: 'vamcuestio',
                loadComponent: () => import('./pages/vamcuestio/vamcuestio.component').then(m => m.VamcuestioComponent)
            },
            {
                path: 'vamcuestio/crear',
                loadComponent: () => import('./pages/vamcuestio/vamcuestio-form.component').then(m => m.VamcuestioFormComponent)
            },
            {
                path: 'vamcuestio/editar/:id',
                loadComponent: () => import('./pages/vamcuestio/vamcuestio-form.component').then(m => m.VamcuestioFormComponent)
            },
            {
                path: 'vamcuestio/detalle/:id',
                loadComponent: () => import('./pages/vamcuestio/vamcuestio-detail.component').then(m => m.VamcuestioDetailComponent)
            },
            {
                path: 'cuestionarios-numeros/ver/:id',
                loadComponent: () => import('./pages/cuestionarios-numeros/cuestionario-numero-detail.component').then(m => m.CuestionarioNumeroDetailComponent)
            },
            // Rutas del módulo de equipos de almacén
            {
                path: 'equipos-almacen',
                loadComponent: () => import('./pages/equipos-almacen/equipos-almacen.component').then(m => m.EquiposAlmacenComponent)
            },
            {
                path: 'equipos-almacen/crear',
                loadComponent: () => import('./pages/equipos-almacen/equipo-almacen-form.component').then(m => m.EquipoAlmacenFormComponent)
            },
            {
                path: 'equipos-almacen/editar/:id',
                loadComponent: () => import('./pages/equipos-almacen/equipo-almacen-form.component').then(m => m.EquipoAlmacenFormComponent)
            },
            {
                path: 'equipos-almacen/ver/:id',
                loadComponent: () => import('./pages/equipos-almacen/equipo-almacen-detail.component').then(m => m.EquipoAlmacenDetailComponent)
            },
            // Rutas del módulo de vamGrupSan
            {
                path: 'vam-grup-san',
                loadComponent: () => import('./pages/vamGrupSan/vamGrupSan.component').then(m => m.VamGrupSanComponent)
            },
            {
                path: 'vam-grup-san/crear',
                loadComponent: () => import('./pages/vamGrupSan/vamGrupSan-form.component').then(m => m.VamGrupSanFormComponent)
            },
            {
                path: 'vam-grup-san/editar/:id',
                loadComponent: () => import('./pages/vamGrupSan/vamGrupSan-form.component').then(m => m.VamGrupSanFormComponent)
            },
            // Rutas del módulo de vamTipoDon
            {
                path: 'vam-tipo-don',
                loadComponent: () => import('./pages/vamTipoDon/vamTipoDon.component').then(m => m.VamTipoDonComponent)
            },
            {
                path: 'vam-tipo-don/crear',
                loadComponent: () => import('./pages/vamTipoDon/vamTipoDon-form.component').then(m => m.VamTipoDonFormComponent)
            },
            {
                path: 'vam-tipo-don/editar/:id',
                loadComponent: () => import('./pages/vamTipoDon/vamTipoDon-form.component').then(m => m.VamTipoDonFormComponent)
            },
            {
                path: 'tipos-documento',
                loadComponent: () => import('./pages/tipos-documento/tipos-documento.component').then(m => m.TiposDocumentoComponent)
            },
            {
                path: 'tipos-documento/crear',
                loadComponent: () => import('./pages/tipos-documento/tipo-documento-form.component').then(m => m.TipoDocumentoFormComponent)
            },
            {
                path: 'tipos-documento/editar/:id',
                loadComponent: () => import('./pages/tipos-documento/tipo-documento-form.component').then(m => m.TipoDocumentoFormComponent)
            },
            {
                path: 'ocupaciones',
                loadComponent: () => import('./pages/ocupaciones/ocupaciones.component').then(m => m.OcupacionesComponent)
            },
            {
                path: 'ocupaciones/crear',
                loadComponent: () => import('./pages/ocupaciones/ocupacion-form.component').then(m => m.OcupacionFormComponent)
            },
            {
                path: 'ocupaciones/editar/:id',
                loadComponent: () => import('./pages/ocupaciones/ocupacion-form.component').then(m => m.OcupacionFormComponent)
            },
            // Rutas del módulo de lugares de nacimiento
            {
                path: 'lugares-nacimiento',
                loadComponent: () => import('./pages/lugar-nacimiento/lugar-nacimiento.component').then(m => m.LugarNacimientoComponent)
            },
            {
                path: 'lugares-nacimiento/crear',
                loadComponent: () => import('./pages/lugar-nacimiento/lugar-nacimiento-form.component').then(m => m.LugarNacimientoFormComponent)
            },
            {
                path: 'lugares-nacimiento/editar/:id',
                loadComponent: () => import('./pages/lugar-nacimiento/lugar-nacimiento-form.component').then(m => m.LugarNacimientoFormComponent)
            },
            // Rutas del módulo de grados de instrucción
            {
                path: 'grados-instruccion',
                loadComponent: () => import('./pages/grado-instruccion/grado-instruccion.component').then(m => m.GradoInstruccionComponent)
            },
            {
                path: 'grados-instruccion/crear',
                loadComponent: () => import('./pages/grado-instruccion/grado-instruccion-form.component').then(m => m.GradoInstruccionFormComponent)
            },
            {
                path: 'grados-instruccion/editar/:id',
                loadComponent: () => import('./pages/grado-instruccion/grado-instruccion-form.component').then(m => m.GradoInstruccionFormComponent)
            },
            // Rutas del módulo de club de donantes
            {
                path: 'club-donantes',
                loadComponent: () => import('./pages/club-donantes/club-donantes.component').then(m => m.ClubDonantesComponent)
            },
            // Rutas del módulo de zona de dirección
            {
                path: 'zona-direccion',
                loadComponent: () => import('./pages/zona-direccion/zona-direccion.component').then(m => m.ZonaDireccionComponent)
            },
            // Rutas del módulo de usuarios
            {
                path: 'usuarios',
                loadComponent: () => import('./pages/usuarios/usuarios.component').then(m => m.UsuariosComponent)
            },
            {
                path: 'vamobsequi',
                loadComponent: () => import('./pages/vamobsequi/vamobsequi.component').then(m => m.VamobsequiComponent)
            },
            {
                path: 'vamobsequi/crear',
                loadComponent: () => import('./pages/vamobsequi/vamobsequi-form.component').then(m => m.VamobsequiFormComponent)
            },
            {
                path: 'vamobsequi/editar/:id',
                loadComponent: () => import('./pages/vamobsequi/vamobsequi-form.component').then(m => m.VamobsequiFormComponent)
            },
            // Rutas del módulo de tipos de centro
            {
                path: 'vamtipocen',
                loadComponent: () => import('./pages/vamtipocen/vamtipocen.component').then(m => m.VamtipocenComponent)
            },
            {
                path: 'vamtipocen/crear',
                loadComponent: () => import('./pages/vamtipocen/vamtipocen-form.component').then(m => m.VamtipocenFormComponent)
            },
            {
                path: 'vamtipocen/editar/:id',
                loadComponent: () => import('./pages/vamtipocen/vamtipocen-form.component').then(m => m.VamtipocenFormComponent)
            },
            {
                path: 'vamtipocen/detalle/:id',
                loadComponent: () => import('./pages/vamtipocen/vamtipocen-detail.component').then(m => m.VamtipocenDetailComponent)
            },
            // Rutas del módulo de refrigeradores
            {
                path: 'vamrefrige',
                loadComponent: () => import('./pages/vamrefrige/vamrefrige.component').then(m => m.VamrefrigeComponent)
            },
            {
                path: 'vamrefrige/crear',
                loadComponent: () => import('./pages/vamrefrige/vamrefrige-form.component').then(m => m.VamrefrigeFormComponent)
            },
            {
                path: 'vamrefrige/editar/:id',
                loadComponent: () => import('./pages/vamrefrige/vamrefrige-form.component').then(m => m.VamrefrigeFormComponent)
            },
            {
                path: 'vamrefrige/:id',
                loadComponent: () => import('./pages/vamrefrige/vamrefrige-detail.component').then(m => m.VamrefrigeDetailComponent)
            },
            {
                path: 'vamobsequi/ver/:id',
                loadComponent: () => import('./pages/vamobsequi/vamobsequi-detail.component').then(m => m.VamobsequiDetailComponent)
            },
            {
                path: 'extraccion',
                loadComponent: () => import('./pages/blank/blank.component').then(m => m.BlankComponent)
            },
            {
                path: 'laboratorio',
                loadComponent: () => import('./pages/blank/blank.component').then(m => m.BlankComponent)
            },
            {
                path: 'produccion',
                loadComponent: () => import('./pages/blank/blank.component').then(m => m.BlankComponent)
            },
            {
                path: 'distribucion',
                loadComponent: () => import('./pages/blank/blank.component').then(m => m.BlankComponent)
            },
            {
                path: 'unidad-movil',
                loadComponent: () => import('./pages/blank/blank.component').then(m => m.BlankComponent)
            },

            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }


        ]
    },
  { path: '**', redirectTo: 'dashboard' }
];
