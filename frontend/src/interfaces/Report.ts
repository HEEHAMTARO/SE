export interface ReportInterface {
    dreport: string | number | Date | null | undefined;
    dapprove: string | number  | Date | null | undefined;
    users: any;
    room: any;
    dorm: any;

    ID?: number;
  
    note?: string;

    contact?: string;

    Photo?: string;

    DateReport?: string;

    DateApprove?: string;
  
    status?: string;
  
    admin_id?: number;

    users_id?: number;

    dormitory_id?: number;

    books_id?: number;

    room_id?: number;
  
  }