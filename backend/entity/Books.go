package entity

import (
	"gorm.io/gorm"
	"time"	
)

type Books struct {
	gorm.Model
	BooksTime time.Time

	StudentID  uint      `json:"student_id"`
   	Student    *Student  `gorm:"foreignKey: student_id" json:"student"`

    RoomID  uint      
   	Room    Room  `gorm:"foreignKey:RoomID"`
	
}