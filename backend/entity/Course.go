package entity

import "gorm.io/gorm"

type Course struct{
	gorm.Model

	CourseCode string

	CourseName string

	Credit uint

	Group string

	MaxSeat uint

	Status bool

	// LecturerID *uint
	// Lecturer   Lecturer `gorm:"foreignKey:LecturerID"`

}