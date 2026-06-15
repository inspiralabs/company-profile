import { google } from "googleapis";

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(
        /\\n/g,
        "\n"
      ),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

function getSheets() {
  return google.sheets({ version: "v4", auth: getAuth() });
}

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;

export async function appendToSheet(sheetName: string, values: string[][]) {
  const sheets = getSheets();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A1`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values },
  });
}

export const SURVEY_SHEET = "Survey";
export const CONTACT_SHEET = "Kontak";

export const SURVEY_HEADERS = [
  "Timestamp",
  "Nama",
  "Tipe",
  "Detail Tipe",
  "Nama Instansi",
  "Jabatan",
  "Kota",
  "WhatsApp",
  "Email",
  "Siapa Anda",
  "Kesulitan Terbesar",
  "Cara Ditemukan",
  "Pengelolaan Data",
  "Waktu Tersita",
  "Solusi Diinginkan",
  "Minat AI",
  "Anggaran",
  "Kesiapan Tim",
  "Kapan Mulai",
  "Rekomendasi",
];

export const CONTACT_HEADERS = [
  "Timestamp",
  "Nama",
  "Tipe",
  "Detail Tipe",
  "Nama Instansi",
  "Jabatan",
  "Kota",
  "WhatsApp",
  "Email",
  "Tujuan",
  "Pesan",
];

export async function ensureHeaders(sheetName: string, headers: string[]) {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A1:Z1`,
  });
  if (!res.data.values || res.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [headers] },
    });
  }
}