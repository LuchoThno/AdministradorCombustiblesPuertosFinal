export const esES = {
  navigation: {
    dashboard: 'Panel de Control',
    fuel: 'Gestión de Combustible',
    documents: 'Documentos',
    equipment: 'Equipos',
    users: 'Usuarios',
    settings: 'Configuración'
  },
  auth: {
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    email: 'Correo electrónico',
    emailPlaceholder: 'Ingrese su correo electrónico',
    password: 'Contraseña',
    sending: 'Enviando...',
    updating: 'Actualizando...',
    backToLogin: 'Volver al inicio de sesión',
    resetPassword: {
      title: 'Restablecer Contraseña',
      description: 'Ingrese su correo electrónico y le enviaremos un enlace para restablecer su contraseña.',
      send: 'Enviar enlace',
      checkEmail: 'Revise su correo',
      emailSent: 'Hemos enviado un correo con instrucciones para restablecer su contraseña.',
      newPassword: 'Nueva Contraseña',
      enterNew: 'Por favor ingrese su nueva contraseña.',
      confirm: 'Confirmar contraseña',
      update: 'Actualizar contraseña',
      success: 'Su contraseña ha sido restablecida exitosamente.',
      invalidToken: 'Enlace inválido o expirado',
      requestNew: 'Por favor solicite un nuevo enlace para restablecer su contraseña.'
    }
  },
  common: {
    actions: {
      save: 'Guardar',
      cancel: 'Cancelar',
      edit: 'Editar',
      delete: 'Eliminar',
      create: 'Crear',
      update: 'Actualizar',
      filter: 'Filtrar',
      select: 'Seleccionar...',
      export: 'Exportar Datos',
      search: 'Buscar...',
      view: 'Ver',
      close: 'Cerrar',
      status: 'Estado',
      actions: 'Acciones'
    },
    status: {
      active: 'Activo',
      inactive: 'Inactivo',
      pending: 'Pendiente'
    },
    pagination: {
      showing: 'Mostrando {{start}} a {{end}} de {{total}} resultados'
    },
    validation: {
      required: 'Este campo es requerido',
      invalid: 'Valor inválido'
    },
    noData: 'No hay datos disponibles',
    notAvailable: 'N/D',
    noNotes: 'No hay notas disponibles'
  },
  dashboard: {
    title: 'Panel de Control',
    stats: {
      totalDiesel: 'Total Diésel',
      totalGas: 'Total Gasolina',
      totalMachines: 'Total Máquinas',
      activeEquipment: 'Equipos Activos',
      maintenanceEquipment: 'En Mantenimiento'
    },
    charts: {
      consumptionByMachine: 'Consumo por Máquina',
      fuelDistribution: 'Distribución de Combustible',
      recentDocuments: 'Documentos Recientes',
      expiringDocuments: 'documentos por vencer'
    }
  },
  fuel: {
    title: 'Gestión de Combustible',
    form: {
      title: 'Nuevo Registro de Combustible',
      datetime: 'Fecha y Hora',
      fuelType: 'Tipo de Combustible',
      machineId: 'ID de Máquina',
      quantity: 'Cantidad',
      operator: 'Operador',
      location: 'Ubicación',
      notes: 'Notas',
      notesPlaceholder: 'Notas adicionales...'
    },
    types: {
      all: 'Todos los Tipos',
      diesel: 'Diésel',
      gas: 'Gasolina'
    },
    units: {
      liters: 'Litros',
      gallons: 'Galones'
    },
    table: {
      datetime: 'Fecha y Hora',
      machineId: 'ID de Máquina',
      fuelType: 'Tipo de Combustible',
      quantity: 'Cantidad',
      operator: 'Operador',
      location: 'Ubicación'
    },
    filter: {
      startDate: 'Fecha Inicial',
      endDate: 'Fecha Final'
    }
  },
  equipment: {
    title: 'Equipos',
    form: {
      title: 'Nuevo Equipo',
      id: 'ID de Equipo',
      type: 'Tipo',
      brand: 'Marca',
      model: 'Modelo',
      serialNumber: 'Número de Serie',
      year: 'Año',
      status: 'Estado',
      lastMaintenance: 'Último Mantenimiento',
      nextMaintenance: 'Próximo Mantenimiento',
      notes: 'Notas'
    },
    types: {
      crane: 'Grúa',
      forklift: 'Montacargas',
      truck: 'Camión',
      loader: 'Cargador',
      other: 'Otro'
    },
    status: {
      active: 'Activo',
      maintenance: 'En Mantenimiento',
      retired: 'Retirado'
    },
    maintenance: {
      title: 'Mantenimiento',
      overdue: 'Mantenimiento Vencido',
      dueSoon: 'Mantenimiento Próximo',
      upToDate: 'Al Día'
    },
    list: {
      status: 'Estado',
      type: 'Tipo',
      brandModel: 'Marca/Modelo',
      serialNumber: 'Número de Serie',
      maintenanceStatus: 'Estado de Mantenimiento'
    }
  },
  documents: {
    title: 'Documentos',
    form: {
      title: 'Nuevo Documento',
      type: 'Tipo de Documento',
      number: 'Número de Documento',
      numberPlaceholder: 'Ingrese número de documento',
      issueDate: 'Fecha de Emisión',
      expiryDate: 'Fecha de Vencimiento',
      equipment: 'Equipo',
      selectEquipment: 'Seleccionar equipo',
      file: 'Subir Archivo',
      notes: 'Notas',
      notesPlaceholder: 'Notas adicionales...',
      details: 'Detalles del Documento'
    },
    types: {
      transportOrder: 'Orden de Transporte',
      dispatchGuide: 'Guía de Despacho',
      invoice: 'Factura',
      technicalReview: 'Revisión Técnica',
      insurance: 'Seguro',
      circulationPermit: 'Permiso de Circulación',
      other: 'Otro'
    },
    status: {
      active: 'Activo',
      expired: 'Vencido',
      expiringSoon: 'Por Vencer'
    },
    noDocuments: 'No se encontraron documentos',
    actions: {
      download: 'Descargar'
    }
  },
  users: {
    title: 'Usuarios',
    form: {
      title: {
        new: 'Nuevo Usuario',
        edit: 'Editar Usuario'
      },
      username: 'Nombre de Usuario',
      email: 'Correo Electrónico',
      fullName: 'Nombre Completo',
      password: 'Contraseña',
      generatePassword: 'Generar Contraseña',
      role: 'Rol',
      department: 'Departamento',
      phone: 'Teléfono',
      location: 'Ubicación',
      status: 'Estado',
      lastLogin: 'Último Acceso'
    },
    password: {
      weak: 'Débil',
      medium: 'Media',
      strong: 'Fuerte'
    },
    roles: {
      admin: 'Administrador',
      supervisor: 'Supervisor',
      operator: 'Operador',
      visitor: 'Visitante'
    },
    status: {
      active: 'Activo',
      inactive: 'Inactivo',
      blocked: 'Bloqueado'
    },
    filter: {
      allRoles: 'Todos los Roles',
      allStatuses: 'Todos los Estados'
    },
    selection: {
      count: '{{count}} usuarios seleccionados'
    },
    actions: {
      newUser: 'Nuevo Usuario',
      activate: 'Activar',
      deactivate: 'Desactivar',
      block: 'Bloquear',
      viewDetails: 'Ver Detalles'
    },
    noUsers: 'No se encontraron usuarios',
    neverLoggedIn: 'Nunca ha iniciado sesión',
    confirmDelete: '¿Está seguro que desea eliminar este usuario?',
    confirmBulkUpdate: '¿Está seguro que desea actualizar el estado de los usuarios seleccionados?'
  },
  settings: {
    title: 'Configuración',
    saving: 'Guardando...',
    save: 'Guardar Cambios',
    saveSuccess: 'Configuración guardada exitosamente',
    saveError: 'Error al guardar la configuración',
    notifications: {
      title: 'Notificaciones',
      email: 'Notificaciones por Correo',
      browser: 'Notificaciones del Navegador',
      maintenance: 'Alertas de Mantenimiento',
      documents: 'Alertas de Vencimiento de Documentos'
    },
    display: {
      title: 'Visualización',
      theme: 'Tema',
      themes: {
        light: 'Claro',
        dark: 'Oscuro',
        system: 'Sistema'
      },
      language: 'Idioma'
    },
    system: {
      title: 'Sistema',
      autoLogout: 'Cierre de Sesión Automático (minutos)',
      sessionTimeout: 'Tiempo de Sesión (minutos)'
    }
  }
};