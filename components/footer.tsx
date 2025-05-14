import { TextAnimation } from "@/components/text-animation"

export function Footer() {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container text-center">
        <TextAnimation
          text={`© ${new Date().getFullYear()} XMF-EXTREME MARTIAL ARTS AND FITNESS. All rights reserved.`}
          type="fade"
          className="text-sm"
        />
      </div>
    </footer>
  )
}
