package main

import (
	"context"
	"fmt"
	"os"
	"github.com/ferchox920/go-react-crud.git/models"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	if err := godotenv.Load(); err != nil {
		fmt.Println("No .env file found")
	}
	port := os.Getenv("PORT")
	mongodb := os.Getenv("MONGODB_URI")

	// Verifica si la cadena de conexión está vacía

	if port == "" {
		port = "3000"
	}
	if mongodb == "" {
		mongodb = "mongodb://localhost:27017/gomongodb"
	}

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(mongodb))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(context.TODO())

	app := fiber.New()
	app.Use(cors.New())
	app.Static("/", "./client/dist")

	app.Get("/users", func(c *fiber.Ctx) error {
		var users []models.User

		coll := client.Database("gomongodb").Collection("users")
		results, err := coll.Find(context.TODO(), bson.M{})
		if err != nil {
			panic(err)
		}
		defer results.Close(context.TODO())

		for results.Next(context.TODO()) {
			var user models.User
			results.Decode(&user)
			users = append(users, user)
		}

		return c.JSON(&fiber.Map{
			"users": users,
		})
	})

	app.Post("/users", func(c *fiber.Ctx) error {
		var user models.User
		c.BodyParser(&user)
		coll := client.Database("gomongodb").Collection("users")
		result, err := coll.InsertOne(context.TODO(), bson.D{
			{Key: "name", Value: user.Name},
		})
		if err != nil {
			panic(err)
		}

		return c.JSON(&fiber.Map{
			"data": result,
		})
	})

	app.Put("/users/:id", func(c *fiber.Ctx) error {
		userIDParam := c.Params("id")
		userID, err := primitive.ObjectIDFromHex(userIDParam)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"error": "Invalid user ID format",
			})
		}
	
		var user models.User
		if err := c.BodyParser(&user); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"error": "Invalid request body",
			})
		}
	
		update := bson.M{
			"$set": bson.M{
				"name": user.Name,
			},
		}
	
		coll := client.Database("gomongodb").Collection("users")
		result, err := coll.UpdateOne(context.TODO(), bson.M{"_id": userID}, update)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{
				"error": "Failed to update user",
			})
		}
	
		if result.ModifiedCount == 0 {
			return c.Status(fiber.StatusNotFound).JSON(&fiber.Map{
				"error": "User not found",
			})
		}
	
		return c.JSON(&fiber.Map{
			"message": "User updated successfully",
		})
	})
	

	app.Delete("/users/:id", func(c *fiber.Ctx) error {
		userIDParam := c.Params("id")
		userID, err := primitive.ObjectIDFromHex(userIDParam)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"error": "Invalid user ID format",
			})
		}
	
		coll := client.Database("gomongodb").Collection("users")
		result, err := coll.DeleteOne(context.TODO(), bson.M{"_id": userID})
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{
				"error": "Failed to delete user",
			})
		}
	
		if result.DeletedCount == 0 {
			return c.Status(fiber.StatusNotFound).JSON(&fiber.Map{
				"error": "User not found",
			})
		}
	
		return c.JSON(&fiber.Map{
			"message": "User deleted successfully",
		})
	})
	
	app.Listen(":" + port)
}
