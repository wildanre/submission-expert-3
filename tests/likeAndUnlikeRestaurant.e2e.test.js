/* eslint-disable no-undef */
const puppeteer = require('puppeteer');

let browser;
let page;

beforeAll(async () => {
  try {
    browser = await puppeteer.launch({
      headless: true, // Mode headless
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Menonaktifkan sandbox jika perlu
    });
    page = await browser.newPage(); // Membuka halaman baru untuk pengujian
  } catch (error) {
    console.error('Error saat meluncurkan browser:', error);
  }
});

afterAll(async () => {
  try {
    if (browser) {
      await browser.close(); // Pastikan browser ada sebelum menutupnya
    } else {
      console.log('Browser sudah tidak ada atau gagal diluncurkan');
    }
  } catch (error) {
    console.error('Error saat menutup browser:', error);
  }
});

describe('End-to-End Test - Menyukai dan Batal Menyukai Restoran', () => {
  it('seharusnya dapat menyukai restoran', async () => {
    await page.goto('http://localhost:8000'); // Ganti dengan URL yang sesuai
    await page.click('#likeButton'); // Contoh interaksi dengan tombol
    const liked = await page.$eval('#likeButton', (el) => el.textContent);
    expect(liked).toBe('Liked');
  });

  it('seharusnya dapat batal menyukai restoran', async () => {
    await page.click('#likeButton'); // Klik lagi untuk membatalkan like
    const liked = await page.$eval('#likeButton', (el) => el.textContent);
    expect(liked).toBe('Like');
  });
});
