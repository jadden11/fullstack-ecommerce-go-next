package controllers

import (
	"ecom/config"
	"ecom/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetAllProducts
func GetAllProducts(c *gin.Context) {
    var products []models.Product
    db := config.DB

    brand := c.Query("brand")
    sortBy := c.DefaultQuery("sortBy", "popularity")
    priceMin := c.Query("priceMin")
    priceMax := c.Query("priceMax")
    size := c.Query("size")
    color := c.Query("color")

    if brand != "" {
        db = db.Where("brand = ?", brand)
    }
    if priceMin != "" {
        db = db.Where("price >= ?", priceMin)
    }
    if priceMax != "" {
        db = db.Where("price <= ?", priceMax)
    }
    if size != "" {
        db = db.Where("size = ?", size)
    }
    if color != "" {
        db = db.Where("color = ?", color)
    }

    switch sortBy {
    case "newest":
        db = db.Order("created_at desc")
    case "price_asc":
        db = db.Order("price asc")
    case "price_desc":
        db = db.Order("price desc")
    default:
        db = db.Order("popularity desc")
    }

    if err := db.Find(&products).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch products"})
        return
    }

    c.JSON(http.StatusOK, products)
}

// GetFilterOptions
func GetFilterOptions(c *gin.Context) {
    db := config.DB

    var brands []map[string]interface{}
    db.Model(&models.Product{}).Select("brand, count(*) as count").Group("brand").Find(&brands)

    var sizes []map[string]interface{}
    db.Model(&models.Product{}).Select("size, count(*) as count").Group("size").Find(&sizes)

    c.JSON(http.StatusOK, gin.H{
        "brands": brands,
        "sizes":  sizes,
    })
}


// CreateProduct
func CreateProduct(c *gin.Context) {
    var product models.Product
    // Binding data JSON dari request body ke struct Product
    if err := c.ShouldBindJSON(&product); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if err := config.DB.Create(&product).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create product"})
        return
    }

    c.JSON(http.StatusCreated, product)
}

// UpdateProduct
func UpdateProduct(c *gin.Context) {
    var product models.Product
    id := c.Param("id")

    if err := config.DB.First(&product, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
        return
    }

    if err := c.ShouldBindJSON(&product); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    config.DB.Save(&product)
    c.JSON(http.StatusOK, product)
}

// DeleteProduct
func DeleteProduct(c *gin.Context) {
    var product models.Product
    id := c.Param("id")

    if err := config.DB.First(&product, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
        return
    }

    config.DB.Delete(&product)
    c.JSON(http.StatusOK, gin.H{"message": "Product deleted successfully"})
}
