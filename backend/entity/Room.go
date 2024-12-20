package entity

import (
	"gorm.io/gorm"
)
type Room struct {
	gorm.Model
	RoomNumber string  
	Score int

	// FloorID uint
	// Floor   Floor `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"` // Belongs to one Floor

	DormitoryID uint 
	Dormitory   Dormitory `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"` // Belongs to one Dormitory

	StatusID uint
	Status   Status `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"` // Belongs to one Status
}