package main


import (

   "net/http"


   "github.com/gin-gonic/gin"


   "example.com/sa-67-example/config"

   "example.com/sa-67-example/controller/genders"

   "example.com/sa-67-example/controller/report"

   "example.com/sa-67-example/controller/users"

   "example.com/sa-67-example/controller/admin"

   "example.com/sa-67-example/controller/payment"

   "example.com/sa-67-example/middlewares"

)


const PORT = "8000"


func main() {


   // open connection database

   config.ConnectionDB()


   // Generate databases

   config.SetupDatabase()


   r := gin.Default()


   r.Use(CORSMiddleware())


   // Auth Route

   r.POST("/signup", users.SignUp)

   r.POST("/signin", users.SignIn)


   router := r.Group("/")

   {

       router.Use(middlewares.Authorizes())


       // User Route

       router.PUT("/user/:id", users.Update)

       router.GET("/users", users.GetAll)

       router.GET("/user/:id", users.Get)

       router.DELETE("/user/:id", users.Delete)

       router.GET("/reports", report.GetAll)

       router.GET("/report/:id", report.Get)

       router.DELETE("/report/:id", report.Delete)

       router.POST("/report", report.Create)

       router.PUT("/report/:id", report.Update)

       router.GET("/admins", admin.GetAll)

       router.POST("/admin", admin.Create)

       router.POST("/payment", payment.Create)

       router.GET("/payments", payment.GetAll)

       router.PUT("/payment/:id", report.Update)


   }


   r.GET("/genders", genders.GetAll)


   r.GET("/", func(c *gin.Context) {

       c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)

   })


   // Run the server


   r.Run("localhost:" + PORT)


}


func CORSMiddleware() gin.HandlerFunc {

   return func(c *gin.Context) {

       c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

       c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

       c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

       c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")


       if c.Request.Method == "OPTIONS" {

           c.AbortWithStatus(204)

           return

       }


       c.Next()

   }

}