"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { MapPin, Phone, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { TextAnimation } from "@/components/text-animation"

// Branch data
const branches = [
  {
    id: 1,
    name: "TAVEREKERE BRANCH",
    address: "Tavarekere Park, Tank Bund Road, Bhavani Nagar, S.G. Palya, Bengaluru 560029, Karnataka",
    phone: "+91 98765 43210", // Placeholder phone number
    timing: "Monday - Sunday: 5:00 AM – 10:00 PM",
    mapLink: "https://maps.app.goo.gl/TNF4cicbRKCuUu457",
  },
  {
    id: 2,
    name: "FREE KICK BRANCH",
    address: "Free Kick Sports Arena, 46, Kenchappa Road, Frazer Town, Bengaluru 560005, Karnataka",
    phone: "+91 98765 43210", // Placeholder phone number
    timing: "Monday - Sunday: 5:00 AM – 10:00 PM",
    mapLink: "https://maps.app.goo.gl/HBFJUkDwcjaGCSWK6?g_st=ac",
  },
  {
    id: 3,
    name: "THE IWAN BRANCH",
    address: "1st Floor, Church Road, Kanakapura, Basavanagudi, Bengaluru 560004, Karnataka",
    phone: "+91 98765 43210", // Placeholder phone number
    timing: "Monday - Sunday: 5:00 AM – 10:00 PM",
    mapLink: "https://maps.app.goo.gl/iz4hbRfFzQh3i8Mt6?g_st=ac",
  },
  {
    id: 4,
    name: "AVALAHALLI BRANCH",
    address: "Smile Seva Kendra, J.P. Nagar 9th Phase, J.P. Nagar, Bengaluru 560078, Karnataka",
    phone: "+91 98765 43210", // Placeholder phone number
    timing: "Monday - Sunday: 5:00 AM – 10:00 PM",
    mapLink: "https://maps.app.goo.gl/zx6oH1d2zQjqHoXr5?g_st=ac",
  },
]

export default function LocationsPage() {
  const [selectedBranch, setSelectedBranch] = useState(branches[0])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-black text-white">
        <div className="container py-8 md:py-16">
          <TextAnimation
            text="Our Locations"
            type="gradient"
            className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12"
          />

          <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
            {/* Left Panel - Branch List */}
            <div className="w-full lg:w-2/5">
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                {branches.map((branch, index) => (
                  <div key={branch.id}>
                    <button
                      onClick={() => setSelectedBranch(branch)}
                      className={cn(
                        "w-full text-left p-4 flex items-center gap-4 transition-colors hover:bg-gray-800",
                        selectedBranch.id === branch.id ? "bg-gray-800" : "",
                      )}
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-red-600">
                        {branch.id}
                      </div>
                      <div>
                        <h3 className="font-bold">{branch.name}</h3>
                      </div>
                    </button>
                    {index < branches.length - 1 && <div className="border-t border-gray-800 mx-4"></div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Panel - Branch Details */}
            <div className="w-full lg:w-3/5">
              <div className="bg-gray-900 rounded-lg p-6">
                <TextAnimation text={selectedBranch.name} type="highlight" className="text-2xl font-bold mb-6" />

                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-300">{selectedBranch.address}</p>
                      <a
                        href={selectedBranch.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-colors"
                      >
                        View on Maps <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-red-600 flex-shrink-0" />
                    <p className="text-gray-300">{selectedBranch.phone}</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -top-3 left-4 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                      Open
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 pt-5">
                      <p className="text-gray-300 font-medium">{selectedBranch.timing}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
