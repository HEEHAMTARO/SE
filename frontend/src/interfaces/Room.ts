export interface RoomInterface {

    ID?: number;
    RoomNumber?: string;
    Score?: number;
    Dormitory?: any; // เชื่อมโยงกับ DormitoryInterface (array)
    StatusID?: number;
  }