// Update the existing idGenerator.ts file to include user ID generation
export class IdGenerator {
  private static instance: IdGenerator;
  private currentEquipmentId: number = 0;
  private currentUserId: number = 0;
  private readonly EQUIPMENT_PREFIX = 'EQ';
  private readonly USER_PREFIX = 'USR';
  
  private constructor() {
    const lastEquipmentId = localStorage.getItem('lastEquipmentId');
    const lastUserId = localStorage.getItem('lastUserId');
    
    if (lastEquipmentId) {
      this.currentEquipmentId = parseInt(lastEquipmentId);
    }
    if (lastUserId) {
      this.currentUserId = parseInt(lastUserId);
    }
  }

  public static getInstance(): IdGenerator {
    if (!IdGenerator.instance) {
      IdGenerator.instance = new IdGenerator();
    }
    return IdGenerator.instance;
  }

  public generateEquipmentId(): string {
    this.currentEquipmentId++;
    localStorage.setItem('lastEquipmentId', this.currentEquipmentId.toString());
    return `${this.EQUIPMENT_PREFIX}${this.currentEquipmentId.toString().padStart(6, '0')}`;
  }

  public generateUserId(): string {
    this.currentUserId++;
    localStorage.setItem('lastUserId', this.currentUserId.toString());
    return `${this.USER_PREFIX}${this.currentUserId.toString().padStart(6, '0')}`;
  }

  public validateEquipmentId(id: string): boolean {
    return /^EQ\d{6}$/.test(id);
  }

  public validateUserId(id: string): boolean {
    return /^USR\d{6}$/.test(id);
  }
}

export const idGenerator = IdGenerator.getInstance();