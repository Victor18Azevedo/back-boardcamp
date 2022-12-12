import swaggerAutogen from "swagger-autogen";

const doc = {
  definitions: {
    Category: {
      id: 3,
      name: "Terror",
    },
    Customer: {
      id: 1,
      name: "Messi",
      phone: "85988774466",
      cpf: "01234567890",
      birthday: "1987-06-24",
    },
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
        name: "Messe",
      },
      game: {
        id: 10,
        name: "Detetive",
        categoryId: 2,
        categoryName: "Investigação",
      },
    },
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
      $name: "jumanji",
      $image:
        "http://blogdebrinquedo.com.br/wp-content/uploads/2019/11/20191129prop-jumanji-board-game-1-1-collector-replica-01.jpg",
      $stockTotal: 1,
      $categoryId: 9,
      $pricePerDay: 1450,
    },
    AddRental: {
      $customerId: 1,
      $gameId: 10,
      $daysRented: 20,
    },
  },
};

const outputFile = "./swagger/swagger_output.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
