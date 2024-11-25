package admin


import (

   "net/http"


   "example.com/sa-67-example/config"

   "example.com/sa-67-example/entity"

   "github.com/gin-gonic/gin"

)


func GetAll(c *gin.Context) {


   db := config.DB()


   var admin []entity.Admin

   db.Find(&admin)


   c.JSON(http.StatusOK, &admin)


}

func Delete(c *gin.Context) {


   id := c.Param("id")

   db := config.DB()

   if tx := db.Exec("DELETE FROM admin WHERE id = ?", id); tx.RowsAffected == 0 {

       c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})

       return

   }

   c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

// func Get(c *gin.Context) {


//    ID := c.Param("id")

//    var user entity.Admin


//    db := config.DB()

//    results := db.Preload("Gender").First(&user, ID)

//    if results.Error != nil {

//        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})

//        return

//    }

//    if user.ID == 0 {

//        c.JSON(http.StatusNoContent, gin.H{})

//        return

//    }

//    c.JSON(http.StatusOK, user)


// }

func Update(c *gin.Context) {


   var report entity.Admin


   AdminID := c.Param("id")


   db := config.DB()

   result := db.First(&report, AdminID)

   if result.Error != nil {

       c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})

       return

   }


   if err := c.ShouldBindJSON(&report); err != nil {

       c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})

       return

   }


   result = db.Save(&report)

   if result.Error != nil {

       c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})

       return

   }


   c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})

}

func Create(c *gin.Context) {
	var newAdmin entity.Admin

	// Bind the incoming JSON payload to the newAdmin struct
	if err := c.ShouldBindJSON(&newAdmin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	db := config.DB()

	// Save the new admin to the database
	if err := db.Create(&newAdmin).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create admin"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Admin created successfully", "admin": newAdmin})
}