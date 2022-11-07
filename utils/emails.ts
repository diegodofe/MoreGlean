import emailjs from '@emailjs/browser'

emailjs.init('pYCyGWxq70zTe4o2T')

export default async function sendEmail(address: string, mes: string) {
  emailjs.send('service_4h81029', 'template_9ahz1j6', {
    to: address,
    message: mes,
  })
}
