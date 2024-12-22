package entity

import (
	"gorm.io/gorm"
)
type Semester struct {
	gorm.Model
	Term int
}