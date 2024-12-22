package entity


import (

   "time"

   "gorm.io/gorm"

)

type Student struct {

   gorm.Model

   FirstName string    

   LastName  string    `json:"last_name"`

   Email     string    `json:"email"`

   Profile   string `gorm:"type:longtext"`

   Age       uint8     `json:"age"`

   Password  string    `json:"-"`

   BirthDay  time.Time `json:"birthday"`

   GenderID  uint      `json:"gender_id"`

   Gender    *Genders  `gorm:"foreignKey: gender_id" json:"gender"`
   
   Wages  float64 `json:"wages"`

   SemesterID  uint      `json:"semester_id"`

   Semester    *Semester  `gorm:"foreignKey: semester_id" json:"semester"`

   YearOfStudy int

}