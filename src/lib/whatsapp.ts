export function getWhatsAppCheckoutUrl(
  product: { name: string; price: number; unit?: string },
  phone?: string
) {
  const number = phone || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+2348056165347";
  const message = encodeURIComponent(
    `Hi Aseeb Ventures,\n\nI'm interested in buying:\n\n*Product:* ${product.name}\n*Price:* ₦${product.price} ${product.unit || ""}\n\nPlease provide more details on how to purchase. Thank you!`
  );
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${message}`;
}
