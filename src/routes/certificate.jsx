// import React, { useState } from 'react';
// import jsPDF from 'jspdf';
// import certificateim from "./certificateimage.png"
// const ImageEditor = () => {
//   const [userName, setUserName] = useState('');

//   const generateCertificate = () => {
//     // Create a new jsPDF instance with portrait orientation
//     const doc = new jsPDF({
//       orientation: 'landscape',
//       unit: 'mm', // Use millimeters as the unit
//     });

//     // Create a temporary canvas to draw the image and text
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');

//     // Load the certificate background image
//     const backgroundImage = new Image();
//     backgroundImage.src = certificateim

//     backgroundImage.onload = () => {
//       // Set canvas dimensions based on the image size
//       canvas.width = backgroundImage.width;
//       canvas.height = backgroundImage.height;

//       // Draw the background image
//       ctx.drawImage(backgroundImage, 0, 0);

//       // Add text to the canvas
//       ctx.font = '40px Arial';
//       ctx.fillStyle = 'black';
//       ctx.textAlign = 'center';
//       ctx.fillText(userName, canvas.width / 2, canvas.height / 2);

//       // Convert canvas to data URL
//       const dataUrl = canvas.toDataURL();

//       // Add the image to the PDF
//       doc.addImage(dataUrl, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

//       // Save the PDF
//       doc.save('certificate.pdf');
//     };
//   };

//   return (
//     <div>
//       <label>
//         Enter Your Name:
//         <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
//       </label>
//       <button onClick={generateCertificate}>Generate Certificate</button>
//     </div>
//   );
// };

// export default ImageEditor;
