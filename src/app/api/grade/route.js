// src/app/api/grade/route.js
import { extractTextFromPDF } from '@/lib/pdfProcessor';
import { gradeAssignment } from '@/lib/gemini';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const studentFile = formData.get('student_assignment');
    const modelFile = formData.get('model_answer');

    console.log('Received student file name:', studentFile ? studentFile.name : 'None');
    console.log('Received model file name:', modelFile ? modelFile.name : 'None');

    if (!studentFile) {
      return new Response(JSON.stringify({ error: 'Student assignment is required' }), { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), 'tmp/uploads');
    console.log('Upload directory:', uploadDir);

    await fs.mkdir(uploadDir, { recursive: true });

    const sanitizeFileName = (name) => name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const studentFileName = sanitizeFileName(studentFile.name);
    const studentPath = path.join(uploadDir, studentFileName);
    console.log('Target student file path:', studentPath);

    // Write the file
    const studentBuffer = Buffer.from(await studentFile.arrayBuffer());
    await fs.writeFile(studentPath, studentBuffer);
    console.log('Student file written to:', studentPath);
    console.log('File exists after write:', await fs.stat(studentPath).then(() => true).catch(() => false));

    // List files in tmp/uploads to confirm
    const filesInDir = await fs.readdir(uploadDir);
    console.log('Files in tmp/uploads:', filesInDir);

    // Pass the path to pdfProcessor
    const studentText = await extractTextFromPDF(studentPath);
    console.log('Extracted student text length:', studentText.length);

    let modelText = null;
    if (modelFile) {
      const modelFileName = sanitizeFileName(modelFile.name);
      const modelPath = path.join(uploadDir, modelFileName);
      console.log('Target model file path:', modelPath);
      await fs.writeFile(modelPath, Buffer.from(await modelFile.arrayBuffer()));
      console.log('Model file written to:', modelPath);
      modelText = await extractTextFromPDF(modelPath);
      await fs.unlink(modelPath);
      console.log('Model file deleted');
    }

    await fs.unlink(studentPath);
    console.log('Student file deleted');

    const result = await gradeAssignment(studentText, modelText);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error('Grading error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}