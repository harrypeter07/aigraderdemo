// src/lib/pdfProcessor.js
import { promises as fs } from 'fs';
import pdf from 'pdf-parse';

export async function extractTextFromPDF(pdfPath) {
  try {
    console.log('Received pdfPath in pdfProcessor:', pdfPath);
    const pdfBytes = await fs.readFile(pdfPath);
    console.log('PDF file read successfully, size:', pdfBytes.length);
    const data = await pdf(pdfBytes);
    const text = data.text;

    if (!text.trim()) {
      throw new Error('No text extracted from PDF. The file might be scanned or contain only images.');
    }

    return text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error(`Error processing PDF file: ${error.message}`);
  }
}