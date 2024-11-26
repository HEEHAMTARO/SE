package entity


import (

   "time"

   "gorm.io/gorm"

)

type Report struct {

   gorm.Model

   Note string    `json:"note"`

   Contact		string  `json:"contact"`

   Photo string    `gorm:"type:longtext"`

   DateApprove  time.Time `json:"dapprove"`

   DateReport  time.Time `json:"dreport"`

   UsersID  uint      `json:"users_id"`

   Status  string      `json:"status"`

   Users    *Student  `gorm:"foreignKey: users_id" json:"users"`

   AdminID  uint      `json:"admin_id"`

   Admin    *Admin  `gorm:"foreignKey: admin_id" json:"admin"`

   BooksID  uint      `json:"books_id"`

   Books    *Books  `gorm:"foreignKey: books_id" json:"book"`

   DormitoryID  uint      `json:"dormitory_id"`

   Dormitory    *Dormitory  `gorm:"foreignKey: dormitory_id" json:"dorm"`

   RoomID  uint      `json:"room_id"`

   Room    *Room  `gorm:"foreignKey: room_id" json:"room"`

}