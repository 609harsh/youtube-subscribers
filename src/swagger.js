const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Youtube-Subscribers Api",
      version: "1.0.0",
      description: "Swagger Documentation",
    },
    tags: [
      {
        name: "Subscribers",
      },
    ],
    paths: {
      "/": {
        get: {
          summary: "Redirect to the API page",
          tags: ["Subscribers"],
          description: "This endpoint redirects the client to the `/api` page.",
          responses: {
            302: {
              description: "Redirects to the `/api` endpoint.",
            },
          },
        },
      },
      "/api": {
        get: {
          summary: "Swagger API Documentation",
          tags: ["Subscribers"],
          description: "Serves the Swagger UI for exploring API documentation.",
          responses: {
            200: {
              description: "Successfully served the Swagger UI.",
              content: {
                "text/html": {
                  schema: {
                    type: "string",
                    example: "<html>Swagger UI content</html>",
                  },
                },
              },
            },
          },
        },
      },
      "/subscribers": {
        get: {
          summary: "Retrieve a list of subscribers",
          tags: ["Subscribers"],
          description:
            "Fetches all subscribers from the database, excluding the `__v` field.",
          responses: {
            200: {
              description: "A list of subscribers.",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          description:
                            "The unique identifier for the subscriber.",
                          example: "60b8d295f1b6c8a4d4e8f3e1",
                        },
                        name: {
                          type: "string",
                          description: "The name of the subscriber.",
                          example: "John Doe",
                        },
                        subscribedChannel: {
                          type: "string",
                          description:
                            "The channel the subscriber is subscribed to.",
                          example: "Tech Insights",
                        },
                        subscribedDate: {
                          type: "string",
                          format: "date-time",
                          description: "The date the subscriber joined.",
                          example: "2023-11-02T14:48:00.000Z",
                        },
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "Database Error.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                        description: "Error message.",
                        example: "Database Error",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/subscribers/name": {
        get: {
          summary: "Retrieve subscriber names",
          tags: ["Subscribers"],
          description:
            "Fetches a list of subscribers, excluding the `__v`, `_id`, and `subscribedDate` fields.",
          responses: {
            200: {
              description:
                "A list of subscribers with their names and subscribed channels.",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                          description: "The name of the subscriber.",
                          example: "Jane Doe",
                        },
                        subscribedChannel: {
                          type: "string",
                          description:
                            "The channel the subscriber is subscribed to.",
                          example: "Science Today",
                        },
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "Invalid URL or other error.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                        description: "Error message.",
                        example: "Invalid name Url",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/subscribers/{id}": {
        get: {
          summary: "Retrieve subscriber details by ID",
          tags: ["Subscribers"],
          description:
            "Fetches details of a subscriber based on the provided ID, excluding the `__v` field.",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              description: "The unique identifier of the subscriber.",
              schema: {
                type: "string",
                example: "60b8d295f1b6c8a4d4e8f3e1",
              },
            },
          ],
          responses: {
            200: {
              description: "Subscriber details for the given ID.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        description:
                          "The unique identifier for the subscriber.",
                        example: "60b8d295f1b6c8a4d4e8f3e1",
                      },
                      name: {
                        type: "string",
                        description: "The name of the subscriber.",
                        example: "Alice Smith",
                      },
                      subscribedChannel: {
                        type: "string",
                        description:
                          "The channel the subscriber is subscribed to.",
                        example: "Tech Reviews",
                      },
                      subscribedDate: {
                        type: "string",
                        format: "date-time",
                        description: "The date the subscriber joined.",
                        example: "2023-11-02T14:48:00.000Z",
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "Invalid ID or other error.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                        description: "Error message.",
                        example: "Invalid Id",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["src/*.js"], // Path to your API routes
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi,
};
