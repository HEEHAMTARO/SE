package room


import (

   "net/http"


   "example.com/sa-67-example/config"

   "example.com/sa-67-example/entity"

   "github.com/gin-gonic/gin"

)


func GetAll(c *gin.Context) {


   db := config.DB()


   var room []entity.Room
   db.Preload("Dormitory").Preload("Status").Find(&room)


   c.JSON(http.StatusOK, &room)


}

// func Delete(c *gin.Context) {


//    id := c.Param("id")

//    db := config.DB()

//    if tx := db.Exec("DELETE FROM report WHERE id = ?", id); tx.RowsAffected == 0 {

//        c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})

//        return

//    }

//    c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

// }

func Get(c *gin.Context) {
    ID := c.Param("id")
    var room entity.Room

    // ดึงข้อมูล Room พร้อม Dormitory และ Status
    db := config.DB()
    if err := db.Preload("Dormitory").Preload("Status").First(&room, "id = ?", ID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
        return
    }

    // ตรวจสอบว่า Room มีข้อมูลหรือไม่
    if room.ID == 0 {
        c.JSON(http.StatusNoContent, gin.H{})
        return
    }

    // ส่งข้อมูลกลับในรูปแบบ JSON
    c.JSON(http.StatusOK, room)
}

func Update(c *gin.Context) {


   var room entity.Room


   RoomID := c.Param("id")


   db := config.DB()

   result := db.First(&room, RoomID)

   if result.Error != nil {

       c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})

       return

   }


   if err := c.ShouldBindJSON(&room); err != nil {

       c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})

       return

   }


   result = db.Save(&room)

   if result.Error != nil {

       c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})

       return

   }


   c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})

}

func Create(c *gin.Context) {
	var newRoom entity.Room

	// Bind the incoming JSON payload to the newAdmin struct
	if err := c.ShouldBindJSON(&newRoom); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	db := config.DB()

	// Save the new admin to the database
	if err := db.Create(&newRoom).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create admin"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Admin created successfully", "admin": newRoom})
}