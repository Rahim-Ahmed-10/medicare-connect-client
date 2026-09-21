
"use server" // 👈 এটি অবশ্যই "use server" হতে হবে!

export const subscription = async (data) => {
  
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://medicare-connect-server-nine.vercel.app"
  
  try {
    const targetUrl = `${baseUrl.replace(/\/$/, '')}/subscription`
    console.log("🚀 Server Action hitting endpoint:", targetUrl)

    const res = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error("Express Server Error:", errorText)
      return { success: false, error: `Backend status: ${res.status}` }
    }

    const resData = await res.json()
    return resData
  } catch (error) {
    console.error("🚨 Connection to Express failed:", error.message)
    return { success: false, error: error.message }
  }
}