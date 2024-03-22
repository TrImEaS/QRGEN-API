import fs from 'fs'
import qrcode from 'qrcode'
import crypto from 'crypto'

export async function createCode () {
  const randomCode = crypto.randomInt(1000000)
  const secureRandom = crypto.randomBytes(16).toString('hex')

  const htmlCodeName = `${secureRandom}.html`
  const result = {validationCode: randomCode, htmlName: htmlCodeName}

  try {
    const htmlContent = `
      <div style="
        display: flex; 
        justify-content: center; 
        align-items: center; 
        width: 100vw; 
        height: 100vh; 
        padding: 0; 
        margin: 0;
        color: white;
        font-size: 15rem;
        background: #111;"
      >
        <span>${randomCode}</span>
      </div>
    `
    //html contenedor de codigo de verificacion
    fs.writeFileSync(`./Files/Codes/${htmlCodeName}`, htmlContent, 'utf-8') 
    
    console.log('Archivo HTMLCode creado con éxito.')
    return result
  } 
  catch (error) {
    return console.error('Error al generar HTMLCode:', error)
  }
}



export async function createQR(htmlName, { user, billingNumber, company }) {
  const htmlQRName = `${user}-${billingNumber}-${company}.html`
  
  try {
    if (htmlName === undefined || htmlName === null) { 
      return console.log('La url no puede estar vacia. Vuelva a intentarlo')
    }
    
    const QR = await qrcode.toDataURL(`https://technologyline.com.ar/admin/qr-request/${htmlName}`)
    const htmlContent = `
      <div style="
        display: flex; 
        justify-content: center; 
        align-items: center; 
        width: 100vw; 
        height: 100vh; 
        padding: 0; 
        margin: 0;" 
      > 
        <img src='${QR}' >
      </div>
    `
  
    //html contenedor de QR
    fs.writeFileSync(`./Files/QRs/${htmlQRName}`, htmlContent, 'utf-8')

    console.log('QR creado con éxito.')
    return htmlQRName
  } 
  catch (error) {
    console.error('Error al generar QR:', error)
  }
}

