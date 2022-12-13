import dotenv from "dotenv";
import swaggerAutogen from "swagger-autogen";

dotenv.config();
const PORT = process.env.PORT || 4000;
const API_URL = process.env.API_URL || `localhost:${PORT}`;

const doc = {
  info: {
    version: "1.0.0",
    title: "BOARDCAMP REST API",
    description: "API to serve a board game rental store application",
  },
  host: API_URL,
  basePath: "/",
  schemes: ["http"],
  definitions: {
    Category: {
      id: 3,
      name: "Terror",
    },
    CategoriesList: [{ $ref: "#/definitions/Category" }],
    Customer: {
      id: 1,
      name: "Messi",
      phone: "85988774466",
      cpf: "01234567890",
      birthday: "1987-06-24",
    },
    CustomersList: [{ $ref: "#/definitions/Customer" }],
    Game: {
      id: 1,
      name: "Banco Imobiliário",
      image:
        "https://d3ddx6b2p2pevg.cloudfront.net/Custom/Content/Products/10/08/1008677_jogo-banco-imobiliario-com-aplicativo-estrela_m12_636810396920334046",
      stockTotal: 3,
      categoryId: 1,
      pricePerDay: 1500,
      categoryName: "Estratégia",
    },
    GamesList: [{ $ref: "#/definitions/Game" }],

    Rental: {
      id: 30,
      customerId: 5,
      gameId: 10,
      rentDate: "2022-03-05",
      daysRented: 20,
      returnDate: null,
      originalPrice: 33000,
      delayFee: null,
      customer: {
        id: 5,
        name: "Messi",
      },
      game: {
        id: 10,
        name: "Detetive",
        categoryId: 2,
        categoryName: "Investigação",
      },
    },
    RentalsList: [{ $ref: "#/definitions/Rental" }],

    AddCategory: {
      $name: "Terror",
    },
    AddCustomer: {
      $name: "Messi",
      $phone: "85988774466",
      $cpf: "01234567890",
      $birthday: "1987-06-24",
    },
    AddGame: {
      $name: "Jumanji",
      $image:
        "http://blogdebrinquedo.com.br/wp-content/uploads/2019/11/20191129prop-jumanji-board-game-1-1-collector-replica-01.jpg",
      $stockTotal: 1,
      $categoryId: 4,
      $pricePerDay: 1450,
    },
    AddRental: {
      $customerId: 1,
      $gameId: 10,
      $daysRented: 3,
    },
  },
  components: {
    "@schemas": {
      AddCategory: {
        type: "object",
        required: ["name"],
        properties: {
          name: {
            type: "string",
            description: "category name",
            minLength: 3,
            example: "Terror",
          },
        },
      },
      AddCustomer: {
        type: "object",
        required: ["name", "phone", "cpf", "birthday"],
        properties: {
          name: {
            type: "string",
            description: "customer name",
            example: "Messi",
          },
          phone: {
            type: "string",
            description: "customer phone number",
            minLength: 10,
            maxLength: 11,
            example: "85988774466",
          },
          cpf: {
            type: "string",
            description: "customer document CPF number",
            length: 11,
            example: "01234567890",
          },
          birthday: {
            type: "date",
            description: "customer birthday",
            format: "YYYY-MM-DD",
            example: "1987-06-24",
          },
        },
      },
      AddGame: {
        type: "object",
        required: ["name", "image", "stockTotal", "categoryId", "pricePerDay"],
        properties: {
          name: {
            type: "string",
            description: "game name",
            example: "Jumanji",
          },
          image: {
            type: "URL",
            description: "image game URL",
            example:
              "http://blogdebrinquedo.com.br/wp-content/uploads/2019/11/20191129prop-jumanji-board-game-1-1-collector-replica-01.jpg",
          },
          stockTotal: {
            type: "integer",
            description: "game stock",
            example: 1,
          },
          categoryId: {
            type: "integer",
            description: "category of game",
            example: 4,
          },
          pricePerDay: {
            type: "integer",
            description: "rent price per day in cents",
            example: 1450,
          },
        },
      },
      AddRental: {
        type: "object",
        required: ["customerId", "gameId", "daysRented"],
        properties: {
          customerId: {
            type: "integer",
            description: "customer id",
            example: 1,
          },
          gameId: {
            type: "integer",
            description: "gamed id",
            example: 10,
          },
          daysRented: {
            type: "integer",
            description: "rental days",
            example: 3,
          },
        },
      },
    },
  },
};

const outputFile = "./swagger/swagger_output.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
