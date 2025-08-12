package main

import (
	"ecom/config"
	"ecom/controllers"
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
    config.Connect()

    router := gin.Default()

    router.Use(cors.New(cors.Config{
        AllowOrigins:  []string{"*"},
        AllowMethods:  []string{"GET", "POST", "PUT", "DELETE"},
        AllowHeaders:  []string{"Origin", "Content-Type", "Accept"},
        AllowCredentials: true,
        MaxAge:        12 * time.Hour,
    }))

    // Endpoint CRUD Produk
    router.GET("/api/products", controllers.GetAllProducts)
    router.POST("/api/products", controllers.CreateProduct)
    router.PUT("/api/products/:id", controllers.UpdateProduct)
    router.DELETE("/api/products/:id", controllers.DeleteProduct)
	router.GET("/api/filter-options", controllers.GetFilterOptions)


    log.Println("Server is running on port 8080")
    router.Run(":8080")
}