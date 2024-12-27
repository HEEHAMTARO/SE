export interface RoomInterface {
    Dormitory: any;

    ID?: number;
    RoomNumber?: string;
    Score?: number;
    DormitoryID?: number; // เชื่อมโยงกับ DormitoryInterface (array)
    StatusID?: number;
  }