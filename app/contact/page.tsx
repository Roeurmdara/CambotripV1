import Navigation from "@/components/navigation"
import { Mail, MapPin, Phone, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-6xl md:text-7xl font-light text-black tracking-tight mb-3 dark:text-white">
              Get in Touch
            </h1>
            <p className="text-gray-500 text-base font-light max-w-md">
              Have questions about traveling to Cambodia? We're here to help
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-6 pb-2 border-b">
                <h2 className="text-xl font-light">Send us a Message</h2>
              </div>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-light mb-2 text-gray-600">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-light mb-2 text-gray-600">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-light mb-2 text-gray-600">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-light mb-2 text-gray-600">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
                    placeholder="Trip planning assistance"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-light mb-2 text-gray-600">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors resize-none"
                    placeholder="Tell us about your travel plans..."
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-black text-white py-3 px-6 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <div className="mb-6 pb-2 border-b">
                  <h2 className="text-xl font-light">Contact Information</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 mt-1 text-gray-600" />
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-gray-600 text-sm">info@cambodiatravel.com</p>
                      <p className="text-gray-600 text-sm">support@cambodiatravel.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 mt-1 text-gray-600" />
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-gray-600 text-sm">+855 23 123 456</p>
                      <p className="text-gray-600 text-sm">+855 12 345 678</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 mt-1 text-gray-600" />
                    <div>
                      <h3 className="font-medium mb-1">Office</h3>
                      <p className="text-gray-600 text-sm">
                        Street 240, Phnom Penh
                        <br />
                        Kingdom of Cambodia
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Quick Links */}
              <div className="border-t pt-8">
                <h3 className="text-lg font-medium mb-4">Quick Answers</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Looking for quick information? Check out our FAQ section for answers to common questions about:
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-center gap-2">
                    <span>•</span>
                    Visa requirements
                  </li>
                  <li className="flex items-center gap-2">
                    <span>•</span>
                    Best time to visit
                  </li>
                  <li className="flex items-center gap-2">
                    <span>•</span>
                    Transportation options
                  </li>
                  <li className="flex items-center gap-2">
                    <span>•</span>
                    Safety tips
                  </li>
                </ul>
                <button className="w-full mt-6 py-2 px-4 border border-gray-300 hover:border-black transition-colors text-sm">
                  View FAQ
                </button>
              </div>

              {/* Response Time */}
              <div className="border border-gray-300 p-6">
                <h3 className="font-medium mb-2">Response Time</h3>
                <p className="text-sm text-gray-600">
                  We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <section className="py-12 px-4 mt-12 border-t">
          <div className="max-w-7xl mx-auto">
           
          </div>
        </section>
      </main>
    </>
  )
}