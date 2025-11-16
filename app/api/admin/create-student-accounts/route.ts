import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const students = [
  { email: "zhsanimates@gmail.com", name: "Syed zubair Bilal Zameer" },
  { email: "shireentaj912@gmail.com", name: "Mohammed ayan" },
  { email: "tripathitanu539@gmail.com", name: "Tanu Tripathi" },
  { email: "asraadoni@gmail.com", name: "Syeda Noor Afshaan" },
  { email: "ikramxmf@gmail.com", name: "Mohamed Ikram Ulla" },
  { email: "bijut8879@gmail.com", name: "CHRISHA MARY BIJU" },
  { email: "maryamtousif6@gmail.com", name: "Sayeda maryam tousif" },
  { email: "Mohsinaaslam023@gmail.com", name: "Yusra Aslam" },
  { email: "mannanabdul993311@gmail.com", name: "Abdul Mannan" },
  { email: "lintamariyaj@gmail.com", name: "Elano Emil Jose" },
  { email: "aswathyksinfy@gmail.com", name: "Ryan Biju" },
  { email: "khajaaahil95@gmail.com", name: "Khaja aahil" },
  { email: "rajsunar574@gmail.com", name: "Raj sunar" },
  { email: "maryamkaunain2@gmail.com", name: "Maryam kaunain" },
  { email: "sameena.tashif@gmail.com", name: "Manha Kaunain" },
  { email: "ruhihameed035@gmail.com", name: "Hadiya sabahat" },
  { email: "suhail_21k@yahoo.com", name: "SAFIYA KHAN" },
  { email: "keerthimd.93@gmail.com", name: "AARAV NM" },
  { email: "syeda.heena3@gmail.com", name: "Syeda Israh" },
  { email: "zaibxmf@gmail.com", name: "MOHAMED ZAIB TABREZ" },
  { email: "Btsj60183@gmail.com", name: "Kulsum Shasmeen" },
  { email: "Fathima89rida@gmail.com", name: "Fazal ul haadi" },
  { email: "siddiquaayesha835@gmail.co", name: "Mohammed Rayan" },
  { email: "Nidawahid604@gmail.com", name: "Nida" },
  { email: "naveedakhanum798@gmail.com", name: "C.Abdul Nihal saqlain" },
  { email: "najmanajma52757@gmail.com", name: "K.Ayaan pasha" },
  { email: "shaiksalman1245@gmail.com", name: "Mohammad umair" },
  { email: "mahboobp240@gmail.com", name: "Mohammed arham" },
  { email: "sajidakousar01011980@gmail.com", name: "HUSNAIN" },
  { email: "jophyjames@gmail.com", name: "Daniel Abraham" },
  { email: "Hey.itsaura3007@gmail.com", name: "Swathi Kathirvel" },
  { email: "Sammuadil01@gmail.com", name: "Manha sultana" },
  { email: "interactkhan@gmail.com", name: "Mohammed Imran khan" },
  { email: "qwurukskdbfh@gmail.com", name: "Syeda rabiya" },
  { email: "juveriyasana123@gmail.com", name: "Juveriya Sana" },
  { email: "yasmeen22120407@gmail.com", name: "Mohammad Arsh Mahir" },
  { email: "Asifulla32221@gmail.com", name: "Asfiya Fathima" },
  { email: "buharim@gmail.com", name: "FATHIMAT ZAHRA S B" },
  { email: "Raiqfiro@gmail.com", name: "M.y.Tooba" },
  { email: "farhaafzk@gmail.com", name: "Umme Ayesha" },
  { email: "shalinimj553@gmail.com", name: "Shalini MJ" },
  { email: "malinimj24@gmail.com", name: "Malini MJ" },
  { email: "jananimj5@gmail.com", name: "Janani MJ" },
  { email: "Nashraxmf01@gmail.com", name: "Nashra Fathima" },
]

export async function POST() {
  try {
    // Use service role key for admin operations
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )

    const results = []
    const errors = []

    for (const student of students) {
      try {
        const { data, error } = await supabase.auth.admin.createUser({
          email: student.email,
          password: "123456",
          email_confirm: true,
          user_metadata: {
            name: student.name,
          },
        })

        if (error) {
          // If user already exists, that's okay
          if (error.message.includes("already registered")) {
            results.push({ email: student.email, status: "already_exists" })
          } else {
            errors.push(`${student.email}: ${error.message}`)
          }
        } else {
          results.push({ email: student.email, status: "created", id: data.user?.id })
        }
      } catch (err) {
        errors.push(`${student.email}: ${err instanceof Error ? err.message : "Unknown error"}`)
      }
    }

    return NextResponse.json({
      message: "Bulk creation completed",
      created: results.filter(r => r.status === "created").length,
      already_existed: results.filter(r => r.status === "already_exists").length,
      failed: errors.length,
      errors,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create accounts" },
      { status: 500 }
    )
  }
}
