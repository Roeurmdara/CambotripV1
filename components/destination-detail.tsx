"use client"

export default function DestinationDetail({ destination }: { destination: any }) {
  return (
    <main className="pt-20 max-w-4xl mx-auto px-4">
      <img
        src={destination.hero_image || destination.image || "/placeholder.svg"}
        alt={destination.name}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />
      <h1 className="text-4xl font-bold mb-2">{destination.name}</h1>
      <p className="text-gray-600 mb-6">{destination.location}</p>
      <p className="leading-relaxed">{destination.description}</p>
    </main>
  )
}
