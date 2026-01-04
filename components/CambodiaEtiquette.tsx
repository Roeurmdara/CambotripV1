import React, { useState } from "react";
import {
  Church,
  Utensils,
  Users,
  Camera,
  Gift,
  AlertCircle,
} from "lucide-react";

const etiquetteData = [
  {
    category: "Greetings & Gestures",
    icon: Users,
    items: [
      {
        title: "The Sampeah",
        tip: "Press your palms together and bow slightly. The higher the hands, the more respect shown. Use for greetings, thanks, and apologies.",
      },
      {
        title: "Giving & Receiving",
        tip: "Always use both hands when giving or receiving items, especially to elders. This shows respect and proper etiquette.",
      },
      {
        title: "Body Language",
        tip: "Maintain calm demeanor and soft speech. Pointing with your finger is rude - use your whole hand with palm up instead.",
      },
    ],
  },
  {
    category: "Temple & Religion",
    icon: Church,
    items: [
      {
        title: "Dress Modestly",
        tip: "Cover shoulders and knees when visiting temples. Remove shoes before entering. Avoid revealing or tight clothing.",
      },
      {
        title: "Respect for Monks",
        tip: "Women should not touch monks or hand them objects directly. Monks are highly respected - give up your seat if needed.",
      },
      {
        title: "Temple Behavior",
        tip: "Speak quietly inside temples. Never climb on statues or Buddha images. Sit with feet tucked away, not pointing at Buddha.",
      },
      {
        title: "Head and Feet",
        tip: "The head is sacred - never touch anyone's head. Feet are unclean - don't point them at people, Buddha images, or monks.",
      },
    ],
  },
  {
    category: "Dining & Social Customs",
    icon: Utensils,
    items: [
      {
        title: "Respect for Elders",
        tip: "Wait for elders to start eating first. Serve elders before yourself. Address older people with proper titles of respect.",
      },
      {
        title: "Sharing Food",
        tip: "Food is often shared family-style. Don't waste food as it's considered disrespectful. Try everything offered to you.",
      },
      {
        title: "Eating Customs",
        tip: "Use a spoon in your right hand and fork in your left. The fork pushes food onto the spoon. Chopsticks are used for noodles.",
      },
    ],
  },
  {
    category: "Public Behavior",
    icon: AlertCircle,
    items: [
      {
        title: "Displays of Affection",
        tip: "Avoid public displays of affection. Holding hands is acceptable, but kissing and hugging in public is frowned upon.",
      },
      {
        title: "Voice & Temper",
        tip: "Keep your voice down and remain calm. Loud or aggressive behavior causes loss of face and is deeply embarrassing.",
      },
      {
        title: "Appropriate Dress",
        tip: "Dress neatly in public. Avoid beachwear outside beach areas. Conservative dress shows respect for local culture.",
      },
    ],
  },
  {
    category: "Photography & Media",
    icon: Camera,
    items: [
      {
        title: "Ask Permission",
        tip: "Always ask before photographing people, especially monks and children. Some may expect a small tip for photos.",
      },
      {
        title: "Temple Photography",
        tip: "Follow signs for photography rules in temples. Some areas prohibit photos entirely. Never photograph during ceremonies without permission.",
      },
    ],
  },
  {
    category: "Gift Giving",
    icon: Gift,
    items: [
      {
        title: "Proper Presentation",
        tip: "Give gifts with both hands. Wrap gifts nicely. Gifts are not opened immediately in front of the giver.",
      },
      {
        title: "Appropriate Gifts",
        tip: "Fruit, sweets, or small items from your country are appreciated. Avoid alcohol for monks. Don't give in sets of four.",
      },
    ],
  },
];

const dosAndDonts = {
  dos: [
    "Remove shoes before entering homes and temples",
    "Use the sampeah greeting for respect",
    "Dress modestly in religious sites",
    "Speak softly and remain calm",
    "Show respect to elders and monks",
    "Ask permission before taking photos",
  ],
  donts: [
    "Touch anyone's head, even children",
    "Point your feet at people or Buddha",
    "Touch monks if you're a woman",
    "Display public affection",
    "Raise your voice or show anger",
    "Climb on statues or temple structures",
  ],
};

const quizQuestions = [
  {
    question: "What is the traditional Cambodian greeting called?",
    options: ["Wai", "Sampeah", "Namaste", "Bow"],
    correct: 1,
  },
  {
    question: "Which body part is considered sacred in Cambodia?",
    options: ["Hands", "Head", "Heart", "Feet"],
    correct: 1,
  },
  {
    question: "Can women touch Buddhist monks in Cambodia?",
    options: [
      "Yes, it's encouraged",
      "No, it's forbidden",
      "Only family members",
      "Only on special occasions",
    ],
    correct: 1,
  },
  {
    question: "How should you give or receive items from elders?",
    options: [
      "With right hand only",
      "With both hands",
      "With left hand only",
      "It doesn't matter",
    ],
    correct: 1,
  },
];

export default function CambodiaEtiquette() {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-6xl md:text-7xl font-light text-black tracking-tight mb-3">
          Cambodian Etiquette & Customs
        </h2>
        <p className="text-gray-500 text-base font-light max-w-md">
          A Guide to Respectful Behavior in Cambodia
        </p>
      </div>

      {/* Etiquette Categories */}
      {etiquetteData.map((category) => {
        const Icon = category.icon;
        return (
          <div key={category.category} className="mb-12">
            <div className="flex items-center gap-2 mb-6 pb-2 border-b">
              <Icon className="w-5 h-5" />
              <h2 className="text-xl font-light">{category.category}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map((item) => (
                <div key={item.title} className="p-4 border rounded">
                  <h3 className="font-medium mb-2">{item.title}</h3>
                  <p className="text-md text-gray-600">{item.tip}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Do's and Don'ts Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-light mb-6">
          Quick Reference: Do's & Don'ts
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Do's */}
          <div className="p-6 border-2 border-green-600 rounded">
            <h3 className="text-xl font-medium mb-4 text-green-700">✓ Do's</h3>
            <ul className="space-y-2">
              {dosAndDonts.dos.map((item, index) => (
                <li key={index} className="text-md flex gap-2">
                  <span>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Don'ts */}
          <div className="p-6 border-2 border-red-600 rounded">
            <h3 className="text-xl font-medium mb-4 text-red-700">✗ Don'ts</h3>
            <ul className="space-y-2">
              {dosAndDonts.donts.map((item, index) => (
                <li key={index} className="text-md flex gap-2">
                  <span>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
