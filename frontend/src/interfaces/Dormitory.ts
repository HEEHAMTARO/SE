export interface DormitoryInterface {

    ID?: number;
    DormName?: string;    
    DormDescription?: string;           
    DormEquipment?: string;    
    DormPic: Uint8Array; // ใช้ `Uint8Array` สำหรับจัดการไฟล์ใน JavaScript
    Price?: number;
  }