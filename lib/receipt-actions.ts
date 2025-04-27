"use server"

interface ReceiptItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface ReceiptData {
  items: ReceiptItem[]
  subtotal: number
  tax: number
  total: number
  date: string
  cashier: string
}

export async function generateReceipt(data: ReceiptData) {
  // In a real application, this would:
  // 1. Update inventory quantities in the database
  // 2. Record the sale in the sales table
  // 3. Generate and print a physical receipt or create a PDF

  console.log("Generating receipt for:", data)

  // Simulate a delay for receipt printing
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Format receipt for printing
  const receiptText = formatReceipt(data)

  // In a real app, you would send this to a receipt printer

  return { success: true, message: "Receipt generated successfully" }
}

// Helper function to format receipt text
function formatReceipt(data: ReceiptData): string {
  const { items, subtotal, tax, total, date, cashier } = data
  const dateObj = new Date(date)

  let receipt = `
=================================
          GROCERY STORE
=================================
Date: ${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}
Cashier: ${cashier}
---------------------------------
`

  // Add items
  items.forEach((item) => {
    const itemTotal = (item.price * item.quantity).toFixed(2)
    receipt += `${item.name}
${item.quantity} x $${item.price.toFixed(2)}    $${itemTotal}
`
  })

  receipt += `
---------------------------------
Subtotal:         $${subtotal.toFixed(2)}
Tax (7%):         $${tax.toFixed(2)}
---------------------------------
TOTAL:            $${total.toFixed(2)}
=================================
      Thank you for shopping!
    Please come again soon.
=================================
`

  return receipt
}
