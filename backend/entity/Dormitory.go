package entity

import (
	"gorm.io/gorm"
)

type Dormitory struct {
	gorm.Model
	DormName  string     
	DormDescription    string            
	DormType      string    
	DormPic      []byte           
	Price      int      
	Rooms           []Room `gorm:"foreignKey:DormitoryID"` // One-to-many relationship with Room 
}