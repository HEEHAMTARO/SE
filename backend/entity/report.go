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

   Users    *Users  `gorm:"foreignKey: users_id" json:"users"`

   AdminID  uint      `json:"admin_id"`

   Admin    *Admin  `gorm:"foreignKey: admin_id" json:"admin"`

}