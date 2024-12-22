package entity

import "gorm.io/gorm"

type Enrollment struct {
	gorm.Model

	Status bool

	StudentID *uint
	Student   Student `gorm:"foreignKey:StudentID"`

	CourseID *uint
	Course   Course `gorm:"foreignKey:CourseID"`

	SemesterID  uint      `json:"semester_id"`
   	Semester    *Semester  `gorm:"foreignKey: semester_id" json:"semester"`
}
