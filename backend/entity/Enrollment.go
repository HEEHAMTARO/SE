package entity

import "gorm.io/gorm"

type Enrollment struct {
	gorm.Model

	Status bool

	StudentID *uint
	Student   Student `gorm:"foreignKey:StudentID"`

	CourseID *uint
	Course   Course `gorm:"foreignKey:CourseID"`
}
