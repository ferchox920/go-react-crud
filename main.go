package main

import (
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		fmt.Println("No .env file found")
	}
	port := os.Getenv("PORT")
    fmt.Println("port")
    fmt.Println(port)

	if port == "" {
		port = "3000"
	}

	app := fiber.New()
	app.Use(cors.New())
	app.Static("/", "./client/dist")

	app.Get("/users", func(c *fiber.Ctx) error {
		return c.JSON(&fiber.Map{
			"data": "usuarios desde el backend",
		})
	})

	app.Listen(":" + port)
}
