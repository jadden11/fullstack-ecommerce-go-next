package config

import (
	"ecom/models"
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
    var err error
    dsn := "root:@tcp(127.0.0.1:3306)/go_api_db?charset=utf8mb4&parseTime=True&loc=Local"
    DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})

    if err != nil {
        log.Fatal("Failed to connect to database!")
    }
    log.Println("Database connection established successfully!")

    DB.AutoMigrate(&models.Product{})
}