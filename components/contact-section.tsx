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

        <p className="text-white text-sm max-w-2xl mx-auto">
          This section will also include records and communication archives in the future.
        </p>
      </div>
    </section>
  )
}
