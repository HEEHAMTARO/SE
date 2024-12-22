package semester


import (

   "net/http"


   "example.com/sa-67-example/config"

   "example.com/sa-67-example/entity"

   "github.com/gin-gonic/gin"

)


func GetAll(c *gin.Context) {


   db := config.DB()


   var semester []entity.Semester

   db.Find(&semester)


   c.JSON(http.StatusOK, &semester)


}