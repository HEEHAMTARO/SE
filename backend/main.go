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

   "example.com/sa-67-example/controller/dormitory"

   "example.com/sa-67-example/controller/room"

   "example.com/sa-67-example/controller/books"

   "example.com/sa-67-example/controller/enrollment"

   "example.com/sa-67-example/controller/course"

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

       router.DELETE("/user/:id", users.Delete) //users

       router.GET("/reports", report.GetAll)

       router.GET("/report/:id", report.Get)

       router.DELETE("/report/:id", report.Delete)

       router.POST("/report", report.Create)

       router.PUT("/report/:id", report.Update) //report

       router.GET("/enrollment/:id", enrollment.Get)

       router.GET("/enrollments", enrollment.GetAll)

       router.DELETE("/enrollment/:id", enrollment.Delete)

       router.POST("/enrollment", enrollment.Create) //enrollment

       router.GET("/course/:id", course.Get)

       router.GET("/courses", course.GetAll)

       router.DELETE("/course/:id", course.Delete)

       router.POST("/course", course.Create) //course

       router.GET("/admins", admin.GetAll)

       router.POST("/admin", admin.Create) //admin

       router.POST("/payment", payment.Create)

       router.GET("/payments", payment.GetAll)

       router.GET("/payment/:id", payment.Get)

       router.PUT("/payment/:id", payment.Update) //payment

       router.POST("/dormitory", dormitory.Create)

       router.GET("/dormitorys", dormitory.GetAll)

       router.GET("/dormitory/:id", dormitory.Get)

       router.PUT("/dormitory/:id", dormitory.Update) //dormitory

       router.POST("/room", room.Create)

       router.GET("/rooms", room.GetAll)

       router.PUT("/room/:id", room.Update) //room

       router.POST("/book", books.Create)

       router.GET("/books", books.GetAll)

       router.DELETE("/book/:id", books.Delete)

       router.PUT("/book/:id", books.Update) //books


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