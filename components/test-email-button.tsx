"use client"

import { useState } from "react"
import { testEmail } from "@/lib/actions"
import { Button } from "@/components/ui/button"

export default function TestEmailButton() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleTest = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await testEmail()
      setResult(response)
      console.log("Test result:", response)
    } catch (error) {
      console.error("Test error:", error)
      setResult({ success: false, message: "Test failed", error: String(error) })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Email Test</h2>

      <Button onClick={handleTest} disabled={isLoading} className="w-full mb-4">
        {isLoading ? "Testing..." : "Test Email"}
      </Button>

      {result && (
        <div className={`p-4 rounded-md ${result.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          <p className="font-semibold">{result.success ? "✅ Success" : "❌ Failed"}</p>
          <p className="text-sm mt-1">{result.message}</p>
          {result.messageId && <p className="text-xs mt-1">Message ID: {result.messageId}</p>}
          {result.error && (
            <details className="mt-2">
              <summary className="cursor-pointer text-xs">Error Details</summary>
              <pre className="text-xs mt-1 overflow-auto">{result.error}</pre>
            </details>
          )}
        </div>
      )}
    </div>
  )
}
