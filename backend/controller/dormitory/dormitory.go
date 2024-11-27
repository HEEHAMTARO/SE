package dormitory


import (

   "net/http"


   "example.com/sa-67-example/config"

   "example.com/sa-67-example/entity"

   "github.com/gin-gonic/gin"

)


func GetAll(c *gin.Context) {


   db := config.DB()


   var dormitory []entity.Dormitory
   db.Find(&dormitory)


   c.JSON(http.StatusOK, &dormitory)


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

    // ตรวจสอบว่า ID เป็นเลขหรือไม่
    var dormitory entity.Dormitory
    db := config.DB()

    // ใช้ pointer ในการโหลดข้อมูล
    results := db.First(&dormitory, ID)

    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }

    // ตรวจสอบว่ามีข้อมูลใน dormitory หรือไม่
    if dormitory.ID == 0 {
        c.JSON(http.StatusNoContent, gin.H{})
        return
    }

    // ส่งข้อมูลกลับเป็น JSON
    c.JSON(http.StatusOK, dormitory)
}


func Update(c *gin.Context) {


   var dormitory entity.Dormitory


   DormitoryID := c.Param("id")


   db := config.DB()

   result := db.First(&dormitory, DormitoryID)

   if result.Error != nil {

       c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})

       return

   }


   if err := c.ShouldBindJSON(&dormitory); err != nil {

       c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})

       return

   }


   result = db.Save(&dormitory)

   if result.Error != nil {

       c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})

       return

   }


   c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})

}

func Create(c *gin.Context) {
	var newDormitory entity.Dormitory

	// Bind the incoming JSON payload to the newAdmin struct
	if err := c.ShouldBindJSON(&newDormitory); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	db := config.DB()

	// Save the new admin to the database
	if err := db.Create(&newDormitory).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create admin"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Admin created successfully", "admin": newDormitory})
}