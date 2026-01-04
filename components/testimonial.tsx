"use client";
import * as React from 'react';
import { motion } from 'framer-motion';
import { MasonryGrid } from '@/components/image-testimonial-grid'; 

// --- Data for the cards ---
const testimonials = [
    {
        profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
        name: 'Liam Harrison',
        feedback: "Exploring the Mystical Angkor Wat at Sunrise",
        mainImage: 'https://i.pinimg.com/1200x/de/50/12/de501235350df4301c4c2517f5f79619.jpg',
    },
    {
        profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
        name: 'Sophie Taylor',
        feedback: 'Kayaking Through Tonle Sap Lake was unforgettable',
        mainImage: 'https://www.luxetravelfamily.com/wp-content/uploads/2017/03/Kayking-Tonle-Sap-Lake-Smiling-Albino-forest.jpg',
    },
    {
        profileImage: 'https://i.pinimg.com/736x/61/e7/9d/61e79d852225159ec001760494eafee1.jpg',
        name: 'Rithy Sok', // Khmer name
        feedback: 'The Temples of Angkor Showcase Timeless Khmer Architecture',
        mainImage: 'https://i.pinimg.com/1200x/ad/11/39/ad1139a32a6bf2534c2b57c716c00333.jpg',
    },
    {
        profileImage: 'https://randomuser.me/api/portraits/men/78.jpg',
        name: 'Marcus Lee',
        feedback: 'Sunset Views Over Phnom Penh Riverfront',
        mainImage: 'https://www.khmertimeskh.com/wp-content/uploads/2024/11/Phnom-Penh-condos-riverside-living-1.jpg',
    },
    {
        profileImage: 'https://randomuser.me/api/portraits/women/68.jpg',
        name: 'Camille Dubois',
        feedback: 'Discovering Cambodia’s Rich Culinary Culture',
        mainImage: 'https://www.eliteplusmagazine.com/assets/ckeditor_fileupload/uploads/IMG_3676_1864035033.jpg',
    },
    {
        profileImage: 'https://www.pinterest.com/pin/607704543500299384/',
        name: 'Sokunthea Chum', // Khmer name
        feedback: 'The Floating Villages of Siem Reap are a Must-See',
        mainImage: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/15/39/f5/3f.jpg',
    },
    {
        profileImage: 'https://randomuser.me/api/portraits/men/21.jpg',
        name: 'Oliver Smith',
        feedback: 'Climbing Phnom Bok for Breathtaking Views',
        mainImage: 'https://i.pinimg.com/736x/7b/42/60/7b42600ada342c731ae07d4fee259c4e.jpg',
    },
    {
        profileImage: 'https://randomuser.me/api/portraits/women/11.jpg',
        name: 'Emma Johnson',
        feedback: 'Sunrise Yoga Among the Ancient Temples of Angkor',
        mainImage: 'https://i.pinimg.com/736x/d1/55/bc/d155bc02eb4af8ac330d391c30e00991.jpg',
    },
];


// --- Reusable Card Component ---
const TestimonialCard = ({ profileImage, name, feedback, mainImage }: (typeof testimonials)[0]) => (
  <div className="group cursor-pointer">
    <div className="relative rounded-lg overflow-hidden mb-4 bg-gray-200">
      <img
        src={mainImage}
        alt={feedback}
        className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105"
        onError={(e) => {
          e.currentTarget.src = 'https://placehold.co/800x600/1a1a1a/ffffff?text=Image';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
    
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <img
          src={profileImage}
          className="w-6 h-6 rounded-full"
          alt={name}
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/40x40/EFEFEF/333333?text=A';
          }}
        />
        <p className="text-xs uppercase tracking-widest text-gray-400 font-light">
          {name}
        </p>
      </div>
      <p className="text-sm text-gray-600 font-light leading-relaxed group-hover:text-black transition-colors">
        {feedback}
      </p>
    </div>
  </div>
);

// --- Demo Component ---
const MasonryGridDemo = () => {
  const [columns, setColumns] = React.useState(4);

  // Function to determine columns based on screen width
  const getColumns = (width: number) => {
    if (width < 640) return 1;    // sm
    if (width < 1024) return 2;   // lg
    if (width < 1280) return 3;   // xl
    return 4;                     // 2xl and up
  };

  React.useEffect(() => {
    const handleResize = () => {
      setColumns(getColumns(window.innerWidth));
    };

    handleResize(); // Set initial columns on mount

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-20">
          <h2 className="text-6xl md:text-7xl font-light text-black tracking-tight mb-3">
            What People Are Saying
          </h2>
          <p className="text-gray-500 text-base font-light max-w-md">
            Explore stories and experiences from our community
          </p>
        </div>

        {/* Masonry Grid */}
        <MasonryGrid columns={columns} gap={4}>
          {testimonials.map((card, index) => (
            <TestimonialCard key={index} {...card} />
          ))}
        </MasonryGrid>
      </div>
    </section>
  );
};

export default MasonryGridDemo;