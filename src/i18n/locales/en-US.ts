export const enUS = {
  navigation: {
    dashboard: 'Dashboard',
    fuel: 'Fuel Management',
    documents: 'Documents',
    equipment: 'Equipment',
    users: 'Users',
    settings: 'Settings'
  },
  auth: {
    login: 'Sign in',
    logout: 'Sign out',
    email: 'Email address',
    emailPlaceholder: 'Enter your email',
    password: 'Password',
    sending: 'Sending...',
    updating: 'Updating...',
    backToLogin: 'Back to login',
    resetPassword: {
      title: 'Reset Password',
      description: 'Enter your email address and we will send you a link to reset your password.',
      send: 'Send reset link',
      checkEmail: 'Check your email',
      emailSent: 'We have sent you an email with instructions to reset your password.',
      newPassword: 'Set New Password',
      enterNew: 'Please enter your new password.',
      confirm: 'Confirm password',
      update: 'Update password',
      success: 'Your password has been successfully reset.',
      invalidToken: 'Invalid or expired reset link',
      requestNew: 'Please request a new password reset link.'
    }
  },
  common: {
    actions: {
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      create: 'Create',
      update: 'Update',
      filter: 'Filter',
      select: 'Select...',
      export: 'Export Data',
      search: 'Search...',
      view: 'View',
      close: 'Close',
      status: 'Status',
      actions: 'Actions'
    },
    status: {
      active: 'Active',
      inactive: 'Inactive',
      pending: 'Pending'
    },
    pagination: {
      showing: 'Showing {{start}} to {{end}} of {{total}} results'
    },
    validation: {
      required: 'This field is required',
      invalid: 'Invalid value'
    },
    noData: 'No data available',
    notAvailable: 'N/A',
    noNotes: 'No notes available'
  },
  dashboard: {
    title: 'Dashboard',
    stats: {
      totalDiesel: 'Total Diesel',
      totalGas: 'Total Gas',
      totalMachines: 'Total Machines',
      activeEquipment: 'Active Equipment',
      maintenanceEquipment: 'In Maintenance'
    },
    charts: {
      consumptionByMachine: 'Consumption by Machine',
      fuelDistribution: 'Fuel Distribution',
      recentDocuments: 'Recent Documents',
      expiringDocuments: 'documents expiring soon'
    }
  },
  fuel: {
    title: 'Fuel Management',
    form: {
      title: 'New Fuel Record',
      datetime: 'Date & Time',
      fuelType: 'Fuel Type',
      machineId: 'Machine ID',
      quantity: 'Quantity',
      operator: 'Operator',
      location: 'Location',
      notes: 'Notes',
      notesPlaceholder: 'Additional notes...'
    },
    types: {
      all: 'All Types',
      diesel: 'Diesel',
      gas: 'Gas'
    },
    units: {
      liters: 'Liters',
      gallons: 'Gallons'
    },
    table: {
      datetime: 'Date & Time',
      machineId: 'Machine ID',
      fuelType: 'Fuel Type',
      quantity: 'Quantity',
      operator: 'Operator',
      location: 'Location'
    },
    filter: {
      startDate: 'Start Date',
      endDate: 'End Date'
    }
  },
  equipment: {
    title: 'Equipment',
    form: {
      title: 'New Equipment',
      id: 'Equipment ID',
      type: 'Type',
      brand: 'Brand',
      model: 'Model',
      serialNumber: 'Serial Number',
      year: 'Year',
      status: 'Status',
      lastMaintenance: 'Last Maintenance',
      nextMaintenance: 'Next Maintenance',
      notes: 'Notes'
    },
    types: {
      crane: 'Crane',
      forklift: 'Forklift',
      truck: 'Truck',
      loader: 'Loader',
      other: 'Other'
    },
    status: {
      active: 'Active',
      maintenance: 'In Maintenance',
      retired: 'Retired'
    },
    maintenance: {
      title: 'Maintenance',
      overdue: 'Maintenance Overdue',
      dueSoon: 'Maintenance Due Soon',
      upToDate: 'Up to Date'
    },
    list: {
      status: 'Status',
      type: 'Type',
      brandModel: 'Brand/Model',
      serialNumber: 'Serial Number',
      maintenanceStatus: 'Maintenance Status'
    }
  },
  documents: {
    title: 'Documents',
    form: {
      title: 'New Document',
      type: 'Document Type',
      number: 'Document Number',
      numberPlaceholder: 'Enter document number',
      issueDate: 'Issue Date',
      expiryDate: 'Expiry Date',
      equipment: 'Equipment',
      selectEquipment: 'Select equipment',
      file: 'File Upload',
      notes: 'Notes',
      notesPlaceholder: 'Additional notes...',
      details: 'Document Details'
    },
    types: {
      transportOrder: 'Transport Order',
      dispatchGuide: 'Dispatch Guide',
      invoice: 'Invoice',
      technicalReview: 'Technical Review',
      insurance: 'Insurance',
      circulationPermit: 'Circulation Permit',
      other: 'Other'
    },
    status: {
      active: 'Active',
      expired: 'Expired',
      expiringSoon: 'Expiring Soon'
    },
    noDocuments: 'No documents found',
    actions: {
      download: 'Download'
    }
  },
  users: {
    title: 'Users',
    form: {
      title: {
        new: 'New User',
        edit: 'Edit User'
      },
      username: 'Username',
      email: 'Email',
      fullName: 'Full Name',
      password: 'Password',
      generatePassword: 'Generate Password',
      role: 'Role',
      department: 'Department',
      phone: 'Phone',
      location: 'Location',
      status: 'Status',
      lastLogin: 'Last Login'
    },
    password: {
      weak: 'Weak',
      medium: 'Medium',
      strong: 'Strong'
    },
    roles: {
      admin: 'Administrator',
      supervisor: 'Supervisor',
      operator: 'Operator',
      visitor: 'Visitor'
    },
    status: {
      active: 'Active',
      inactive: 'Inactive',
      blocked: 'Blocked'
    },
    filter: {
      allRoles: 'All Roles',
      allStatuses: 'All Statuses'
    },
    selection: {
      count: '{{count}} users selected'
    },
    actions: {
      newUser: 'New User',
      activate: 'Activate',
      deactivate: 'Deactivate',
      block: 'Block',
      viewDetails: 'View Details'
    },
    noUsers: 'No users found',
    neverLoggedIn: 'Never logged in',
    confirmDelete: 'Are you sure you want to delete this user?',
    confirmBulkUpdate: 'Are you sure you want to update the status of selected users?'
  },
  settings: {
    title: 'Settings',
    saving: 'Saving...',
    save: 'Save Changes',
    saveSuccess: 'Settings saved successfully',
    saveError: 'Error saving settings',
    notifications: {
      title: 'Notifications',
      email: 'Email Notifications',
      browser: 'Browser Notifications',
      maintenance: 'Maintenance Alerts',
      documents: 'Document Expiry Alerts'
    },
    display: {
      title: 'Display',
      theme: 'Theme',
      themes: {
        light: 'Light',
        dark: 'Dark',
        system: 'System'
      },
      language: 'Language'
    },
    system: {
      title: 'System',
      autoLogout: 'Auto Logout (minutes)',
      sessionTimeout: 'Session Timeout (minutes)'
    }
  }
};