package entity

import (
	"gorm.io/gorm"
)

type Dormitory struct {
	gorm.Model
	DormName  string     
	DormDescription    string            
	DormEquipment      string    
	DormPic      []byte           
	Price      int   
	RoomID uint   	 
}