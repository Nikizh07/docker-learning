package main

import (
    "net/http"
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()

    r.GET("/", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"status": "running"})
    })

    r.GET("/hi", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"status": "hi route works"})
    })

    r.GET("/notes", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"notes": []string{}})
    })

    r.Run(":8080")
}
