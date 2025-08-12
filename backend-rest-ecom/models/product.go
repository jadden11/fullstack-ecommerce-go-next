package models

import "gorm.io/gorm"

type Product struct {
    gorm.Model
    Name        string  `gorm:"type:varchar(255);not null" json:"name"`
    Brand       string  `gorm:"type:varchar(100);not null" json:"brand"`
    Description string  `gorm:"type:text" json:"description"`
    Price       float64 `gorm:"not null" json:"price"`
    ImageUrl    string  `gorm:"type:varchar(255)" json:"imageUrl"`
    IsNew       bool    `gorm:"default:false" json:"isNew"`
    Stock       int     `gorm:"not null;default:0" json:"stock"`
    Popularity  int     `gorm:"not null;default:0" json:"popularity"` // Untuk sorting
    Size        string  `gorm:"type:varchar(50)" json:"size"`
    Color       string  `gorm:"type:varchar(50)" json:"color"`
}