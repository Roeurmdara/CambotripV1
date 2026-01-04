import { notFound } from "next/navigation";
import DestinationDetail from "@/components/destination-detail";
import Navigation from "@/components/navigation";

const destinations = [
  {
    id: "1",
    name: "Angkor Wat",
    location: "Siem Reap",
    image: "/angkor-wat-temple-cambodia-ancient.jpg",
    heroImage: "/angkor-wat-sunrise-golden-hour-cambodia-temple.jpg",
    description:
      "Angkor Wat is the largest religious monument in the world and a UNESCO World Heritage site. Built in the early 12th century by King Suryavarman II, this magnificent temple complex was originally dedicated to the Hindu god Vishnu before gradually transforming into a Buddhist temple.",
    bestTime: "November to March",
    rating: 5,
    coordinates: { lat: 13.4125, lng: 103.867 },
    highlights: [
      "Watch the sunrise over the iconic temple towers",
      "Explore intricate bas-reliefs depicting Hindu mythology",
      "Visit the central sanctuary with its steep stairs",
      "Discover hidden galleries and courtyards",
    ],
    tips: [
      "Arrive before sunrise for the best photo opportunities",
      "Wear modest clothing covering shoulders and knees",
      "Bring plenty of water and sun protection",
      "Consider hiring a local guide for historical context",
    ],
    placesToVisit: [
      { name: "Angkor Wat Main Temple", description: "The iconic main temple complex with stunning sunrise views", type: "Temple" },
      { name: "Bayon Temple", description: "Famous for its massive stone faces and intricate carvings", type: "Temple" },
      { name: "Ta Prohm", description: "Jungle temple with trees growing through the ruins", type: "Temple" },
      { name: "Angkor Thom", description: "Ancient walled city with multiple temples and monuments", type: "Historical Site" },
      { name: "Pub Street", description: "Vibrant nightlife area with restaurants and bars", type: "Entertainment" },
    ],
    accommodations: [
      { name: "Mad Monkey Hostel", type: "Budget", price: "$8-15/night", description: "Social hostel with pool, bar, and organized tours" },
      { name: "Templation Hotel", type: "Mid-Range", price: "$40-70/night", description: "Boutique hotel near Pub Street with rooftop pool" },
      { name: "Park Hyatt Siem Reap", type: "Luxury", price: "$200+/night", description: "5-star luxury resort with spa and fine dining" },
    ],
    restaurants: [
      { name: "Chanrey Tree", cuisine: "Khmer Fine Dining", price: "$$$", specialty: "Traditional Cambodian cuisine in elegant setting" },
      { name: "Genevieve's Restaurant", cuisine: "International", price: "$$", specialty: "Western and Asian fusion, supports local community" },
      { name: "Pou Restaurant", cuisine: "Street Food", price: "$", specialty: "Authentic local dishes at budget prices" },
    ],
    transportation: {
      gettingThere: "Fly to Siem Reap International Airport (REP) or take a bus from Phnom Penh (6 hours)",
      gettingAround: "Tuk-tuks are the main transport. Rent a bicycle for short distances or hire a car with driver for temple tours",
      costs: "Tuk-tuk: $15-20/day, Bicycle: $2-5/day, Car with driver: $40-60/day",
    },
    gallery: [
      "/angkor-wat-temple-cambodia-ancient.jpg",
      "/angkor-wat-sunrise-golden-hour-cambodia-temple.jpg",
      "/bayon-temple-faces-cambodia-angkor.jpg",
    ],
    healthAndSafety: [
      "Drink bottled water and avoid ice in drinks",
      "Use sunscreen and insect repellent",
      "The nearest hospital is Kantha Bopha Children's Hospital, Siem Reap",
      "Keep basic medications for stomach issues and allergies",
    ],
  },
  {
    id: "royal-palace",
    name: "Royal Palace",
    location: "Phnom Penh",
    image: "/royal-palace-phnom-penh-cambodia-golden.jpg",
    heroImage: "/royal-palace-phnom-penh-cambodia-golden.jpg",
    description:
      "The Royal Palace of Cambodia is a complex of buildings serving as the royal residence of the King of Cambodia. Built in 1866, the palace features stunning Khmer architecture with golden spires, ornate details, and beautiful gardens. The Silver Pagoda within the complex houses many national treasures.",
    bestTime: "November to February",
    rating: 4.8,
    coordinates: { lat: 11.5564, lng: 104.9282 },
    highlights: [
      "Marvel at the Silver Pagoda with its floor of silver tiles",
      "See the Emerald Buddha and other precious artifacts",
      "Explore the Throne Hall with its traditional Khmer design",
      "Stroll through the manicured royal gardens",
    ],
    tips: [
      "Dress modestly - no shorts or sleeveless tops",
      "Photography is restricted in some areas",
      "Visit in the morning to avoid crowds and heat",
      "Combine with a visit to the nearby National Museum",
    ],
    placesToVisit: [
      { name: "Royal Palace Complex", description: "Main palace with Throne Hall and royal gardens", type: "Palace" },
      { name: "Silver Pagoda", description: "Temple with floor made of 5,000 silver tiles", type: "Temple" },
      { name: "National Museum", description: "Largest collection of Khmer art in the world", type: "Museum" },
      { name: "Riverside Promenade", description: "Scenic walkway along the Mekong River", type: "Outdoor" },
      { name: "Central Market", description: "Art Deco market selling everything from jewelry to food", type: "Shopping" },
    ],
    accommodations: [
      { name: "Onederz Hostel", type: "Budget", price: "$6-12/night", description: "Popular backpacker hostel with rooftop bar" },
      { name: "Pavilion Hotel", type: "Mid-Range", price: "$60-90/night", description: "Charming boutique hotel in French colonial building" },
      { name: "Raffles Hotel Le Royal", type: "Luxury", price: "$250+/night", description: "Historic 5-star hotel with colonial elegance" },
    ],
    restaurants: [
      { name: "Romdeng", cuisine: "Khmer", price: "$$", specialty: "Traditional dishes including insects, supports former street children" },
      { name: "Malis Restaurant", cuisine: "Fine Dining", price: "$$$", specialty: "Contemporary Cambodian cuisine in beautiful garden setting" },
      { name: "Friends the Restaurant", cuisine: "International", price: "$$", specialty: "Tapas-style dishes, social enterprise training street youth" },
    ],
    transportation: {
      gettingThere: "Fly to Phnom Penh International Airport (PNH) or take a bus from other cities",
      gettingAround: "Tuk-tuks, PassApp (local ride-hailing), or rent a bicycle. Walking is pleasant in the riverside area",
      costs: "Tuk-tuk: $2-5 per trip, PassApp: $1-3 per trip, Bicycle: $2-3/day",
    },
    gallery: ["/royal-palace-phnom-penh-cambodia-golden.jpg"],
    healthAndSafety: [
      "Stay hydrated and wear light clothing in the heat",
      "The nearest hospital is Calmette Hospital, Phnom Penh",
      "Carry sunscreen and insect repellent",
      "Avoid drinking tap water; use bottled water",
    ],
  },
  // Add the same pattern for all other destinations (Bokor Mountain, Koh Rong, Bayon Temple, Tonle Sap Lake, Kep, Mondulkiri)
];

export default function DestinationPage({ params }: { params: { id: string } }) {
  const destination = destinations.find((d) => d.id === params.id);

  if (!destination) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <DestinationDetail destination={destination} />
    </>
  );
}
