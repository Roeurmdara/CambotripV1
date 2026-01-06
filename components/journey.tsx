import { FeatureSteps } from '@/components/feature-section'

const features = [
  { 
    step: 'Step 1', 
    title: ' Choose Your Destination ',
    content: 'Select from thousands of beautiful places', 
    image: 'https://i.pinimg.com/1200x/92/9c/81/929c81d0c69ec2c169eb1c9858fd1bbf.jpg' 
  },
  { 
    step: 'Step 2',
    title: 'Personalize Your Trip',
    content: 'Customize your itinerary to match your interests and pace.',
    image: 'https://i.pinimg.com/1200x/59/6d/bc/596dbcb1424cfcaa87d16ea93d7e905c.jpg'
  },
  { 
    step: 'Step 3',
    title: 'Travel Effortlessly',
    content: 'Enjoy a seamless travel experience with our smart planning tools and local insights.',
    image: 'https://i.pinimg.com/1200x/f3/fe/02/f3fe02a5e8c9d96b468cc0b0178b5107.jpg'
  },
]

export function Journey() {
  return (
    <div className="py-32 px-6 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Title matching DestinationSlider style */}
        <div className="mb-20">
          <h2 className="text-6xl md:text-7xl font-light text-black dark:text-white tracking-tight mb-3">
            Your Journey Starts Here
          </h2>
          <p className="text-gray-500 dark:text-gray-300 text-base font-light max-w-md">
            Set your travel goals, optimize your itinerary, and explore Cambodia with ease. Our smart technology helps you plan the perfect adventure, from ancient temples to vibrant markets.
          </p>
        </div>

        {/* Feature Steps Component */}
        <FeatureSteps 
          features={features}
          autoPlayInterval={4000}
          imageHeight="h-[500px]"
        />
      </div>
    </div>
  )
}
