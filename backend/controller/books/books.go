package books


import (

   "net/http"


   "example.com/sa-67-example/config"

   "example.com/sa-67-example/entity"

   "github.com/gin-gonic/gin"

)


func GetAll(c *gin.Context) {


   db := config.DB()


   var books []entity.Books
   db.Preload("Student").Preload("Room").Find(&books)


   c.JSON(http.StatusOK, &books)


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

   var books entity.Books


   db := config.DB()

   results := db.Preload("Student").Preload("Room").First(books, ID)

   if results.Error != nil {

       c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})

       return

   }

   if books.ID == 0 {

       c.JSON(http.StatusNoContent, gin.H{})

       return

   }

   c.JSON(http.StatusOK, books)


}

func Update(c *gin.Context) {


   var books entity.Books


   BooksID := c.Param("id")


   db := config.DB()

   result := db.First(&books, BooksID)

   if result.Error != nil {

       c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})

       return

   }


   if err := c.ShouldBindJSON(&books); err != nil {

       c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})

       return

   }


   result = db.Save(&books)

   if result.Error != nil {

       c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})

       return

   }


   c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})

}

func Create(c *gin.Context) {
	var newBooks entity.Books

	// Bind the incoming JSON payload to the newAdmin struct
	if err := c.ShouldBindJSON(&newBooks); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	db := config.DB()

	// Save the new admin to the database
	if err := db.Create(&newBooks).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create admin"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Admin created successfully", "admin": newBooks})
}