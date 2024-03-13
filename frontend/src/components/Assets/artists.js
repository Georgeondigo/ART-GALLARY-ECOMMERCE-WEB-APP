import artist1Image from './artist1.jpg';



// Define data for artists
const artistData = [
    {
      id: 1,
      name: "John Smith",
      picture: artist1Image,
      bio: "John Smith is a renowned painter known for his vibrant and expressive artworks. He specializes in landscapes and abstract art.",
      descriptionOfWork: "John Smith's works often feature bold colors and dynamic compositions. He draws inspiration from nature and his travels, capturing the essence of landscapes with his unique style.",
      artworks: [
        {
          id: 1,
          name: "Sunset in the Mountains",
          category: "Painting",
          image: artist1Image,
          price: 500.0,
          description: "An abstract interpretation of a sunset over a mountainous landscape.",
        },
        {
          id: 2,
          name: "Cityscape at Night",
          category: "Painting",
          image: artist1Image,
          price: 750.0,
          description: "A vibrant cityscape painting depicting the bustling nightlife of a metropolitan city.",
        },
        // Add more artworks as needed
      ]
    },
    {
        "id": 2,
        "name": "Alice Johnson",
        "picture": artist1Image,
        "bio": "Alice Johnson is a talented sculptor known for her intricate and thought-provoking works. She specializes in figurative sculptures and installations.",
        "descriptionOfWork": "Alice Johnson's sculptures often explore themes of identity and human relationships. She employs various materials, including marble, bronze, and wood, to bring her visions to life.",
        "artworks": [
          {
            "id": 3,
            "name": "The Embrace",
            "category": "Sculpture",
            "image": artist1Image,
            "price": 1200.0,
            "description": "A graceful sculpture depicting two figures in a tender embrace, symbolizing the bonds of love and connection."
          },
          {
            "id": 4,
            "name": "Inner Reflections",
            "category": "Installation",
            "image": artist1Image,
            "price": 1800.0,
            "description": "An immersive installation exploring the complexities of self-discovery and introspection."
          }
        ]
      },
      {
        "id": 3,
        "name": "Alice Johnson",
        "picture": artist1Image,
        "bio": "Alice Johnson is a talented sculptor known for her intricate and thought-provoking works. She specializes in figurative sculptures and installations.",
        "descriptionOfWork": "Alice Johnson's sculptures often explore themes of identity and human relationships. She employs various materials, including marble, bronze, and wood, to bring her visions to life.",
        "artworks": [
          {
            "id": 5,
            "name": "The Embrace",
            "category": "Sculpture",
            "image": artist1Image,
            "price": 1200.0,
            "description": "A graceful sculpture depicting two figures in a tender embrace, symbolizing the bonds of love and connection."
          },
          {
            "id": 6,
            "name": "Inner Reflections",
            "category": "Installation",
            "image": artist1Image ,
            "price": 1800.0,
            "description": "An immersive installation exploring the complexities of self-discovery and introspection."
          }
        ]
      },
    // Add more artists with their respective artworks
  ];
  
  export default artistData;