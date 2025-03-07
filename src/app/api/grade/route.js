// app/api/grade/route.js
// import { extractTextFromPDF } from '../../lib/pdfProcessor';
import { extractTextFromPDF } from '@/lib/pdfProcessor';
// import { gradeAssignment } from '../../lib/gemini';
import { gradeAssignment } from '@/lib/gemini';
import { promises as fs } from 'fs';
import path from 'path';
// app/api/grade/route.js
// import { extractTextFromPDF } from '../../lib/pdfProcessor';
// import { gradeAssignment } from '../../lib/gemini';
// import { promises as fs } from 'fs';
// import path from 'path';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const studentFile = formData.get('student_assignment');
    const modelFile = formData.get('model_answer');

    if (!studentFile) {
      return new Response(JSON.stringify({ error: 'Student assignment is required' }), { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), 'tmp/uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    const studentPath = path.join(uploadDir, studentFile.name);
    await fs.writeFile(studentPath, Buffer.from(await studentFile.arrayBuffer()));

    const studentText = await extractTextFromPDF(studentPath);
    let modelText = null;
    if (modelFile) {
      const modelPath = path.join(uploadDir, modelFile.name);
      await fs.writeFile(modelPath, Buffer.from(await modelFile.arrayBuffer()));
      modelText = await extractTextFromPDF(modelPath);
      await fs.unlink(modelPath);
    }

    await fs.unlink(studentPath);

    const result = await gradeAssignment(studentText, modelText);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error('Grading error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}