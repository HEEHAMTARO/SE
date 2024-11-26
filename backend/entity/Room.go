package entity

import (
	"gorm.io/gorm"
)

type Room struct {
	gorm.Model
	RoomNumber string
	Score int

	//Floor []Floor `gorm:"foreignKey:RoomID"`
	Dormitory []Dormitory `gorm:"foreignKey:ID"`

	StatusID uint
	Status Status `gorm:"foreignKey:StatusID"`
}