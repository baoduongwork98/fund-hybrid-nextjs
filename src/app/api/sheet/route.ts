// app/api/sheet/route.ts
import { google } from 'googleapis';

export async function GET() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const sheetId = '1a6flDMnlff9jFtYky9vact5mxymgIZH-fHAttL61rsk';

  const resOuts = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId!,
    range: 'Quỹ Team Chung!B6:E100',
  });

  const resIn = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId!,
    range: 'Quỹ Team Chung!G6:K153',
  });

  const response = {
    outs: parseResOut(resOuts),
    ins: parseResIn(resIn),
  };
  return new Response(JSON.stringify(response), { status: 200 });
}

const parseResOut = (res: any) => {
  if (res.data.values) {
    const result = res?.data?.values.map((row: any) => ({
      id: row[0],
      description: row[1],
      date: row[2],
      amount: row[3],
    }));
    return result;
  }
  return [];
};
const parseResIn = (res: any) => {
  if (res.data.values) {
    const result = res?.data?.values.map((row: any, index: number) => ({
      id: index,
      date: row[0],
      member: row[1],
      description: row[2],
      amount: row[3],
      status: row[4],
    }));
    return result;
  }
  return [];
};
