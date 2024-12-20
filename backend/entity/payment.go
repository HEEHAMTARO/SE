package entity


import (

   "gorm.io/gorm"

)

type Payment struct {

   gorm.Model

   UsersID  uint      `json:"users_id"`

   Users    *Student  `gorm:"foreignKey: users_id" json:"users"`

   Wages 	float64  `json:"wages"`

   DormitoryID  uint      `json:"dormitory_id"`

   Dormitory    *Dormitory  `gorm:"foreignKey: dormitory_id" json:"dorm"`

   StatusDor string    `json:"statusdor"`

   StatusStudent string    `json:"statusstudent"`

}