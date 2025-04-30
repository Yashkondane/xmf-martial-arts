import { Facebook, Youtube, Instagram, Twitter, Linkedin } from "lucide-react"
import Link from "next/link"

export function ContactSection() {
  return (
    <section id="contact" className="py-16 bg-red-600 text-white">
      <div className="container text-center">
        <h2 className="text-3xl font-bold mb-6 text-white">CONTACT US</h2>
        <p className="max-w-2xl mx-auto mb-8 text-white">
          Interested in joining our martial arts family or have questions about our programs? We'd love to hear from
          you! Reach out directly using one of the email links below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
          <a
            href="mailto:enquiries@xmf-extreme.com"
            className="bg-black hover:bg-gray-900 text-white px-6 py-4 rounded-md transition-colors"
          >
            For Enquiries & Collaboration
          </a>

          <a
            href="mailto:admissions@xmf-extreme.com"
            className="bg-black hover:bg-gray-900 text-white px-6 py-4 rounded-md transition-colors"
          >
            For Admissions
          </a>

          <a
            href="mailto:feedback@xmf-extreme.com"
            className="bg-black hover:bg-gray-900 text-white px-6 py-4 rounded-md transition-colors"
          >
            For Feedback
          </a>

          <a
            href="mailto:help@xmf-extreme.com"
            className="bg-black hover:bg-gray-900 text-white px-6 py-4 rounded-md transition-colors"
          >
            For Help
          </a>

          <a
            href="mailto:sir@xmf-extreme.com"
            className="bg-black hover:bg-gray-900 text-white px-6 py-4 rounded-md transition-colors md:col-span-2 lg:col-span-1"
          >
            For Directly Contacting Sir
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-4">CONNECT WITH US</h3>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.facebook.com/share/1JJfjLsXmc/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black hover:bg-gray-900 text-white p-3 rounded-full transition-transform hover:scale-110"
              aria-label="Facebook"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="https://youtube.com/@farhanxmf01?si=4kWtvMGkYc8bZReK"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black hover:bg-gray-900 text-white p-3 rounded-full transition-transform hover:scale-110"
              aria-label="YouTube"
            >
              <Youtube className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com/xmf_martial_arts?igsh=MWszemN5czhmejZvOA=="
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black hover:bg-gray-900 text-white p-3 rounded-full transition-transform hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://x.com/xmf_martialarts?t=sT8ERbB-b0Q6NY8olBTIQA&s=09"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black hover:bg-gray-900 text-white p-3 rounded-full transition-transform hover:scale-110"
              aria-label="Twitter"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/farhan-khan-32a438254?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black hover:bg-gray-900 text-white p-3 rounded-full transition-transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>

        <p className="text-white text-sm max-w-2xl mx-auto mt-8">
          For any queries and questions, go through our{" "}
          <Link href="/faqs" className="underline hover:text-gray-200">
            FAQs
          </Link>
        </p>
      </div>
    </section>
  )
}
