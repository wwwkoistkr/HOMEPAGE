/**
 * generate-contact-popup.js
 * ─────────────────────────
 * 이 스크립트는 HTML 파일을 Playwright 브라우저로 열어서
 * 스크린샷을 찍어 PNG 이미지로 저장합니다.
 * 
 * 사용법: node scripts/generate-contact-popup.js
 * 결과물: public/static/images/popup-contact.png
 */

const { chromium } = require('playwright');
const path = require('path');

async function generateContactPopupImage() {
  console.log('🎨 연락처 팝업 이미지 생성 시작...');
  console.log('');

  // 1. 브라우저를 열어요 (눈에 보이지 않는 백그라운드 브라우저)
  console.log('  📌 Step 1: 브라우저 실행중...');
  const browser = await chromium.launch({ headless: true });
  
  // 2. 새 페이지(탭)를 만들어요 - 2배 해상도로 고화질 캡처
  console.log('  📌 Step 2: 고해상도 페이지 준비중...');
  const page = await browser.newPage({
    viewport: { width: 800, height: 600 },
    deviceScaleFactor: 2  // 2배 해상도 = Retina 품질
  });

  // 3. HTML 파일을 브라우저에서 엽니다
  const htmlPath = path.join(__dirname, 'generate-contact-popup.html');
  console.log(`  📌 Step 3: HTML 파일 로딩중... (${htmlPath})`);
  await page.goto(`file://${htmlPath}`);
  
  // 4. 폰트가 완전히 로딩될 때까지 잠깐 기다려요
  console.log('  📌 Step 4: 폰트 로딩 대기중 (3초)...');
  await page.waitForTimeout(3000);

  // 5. 캡처할 영역(카드)을 찾아서 스크린샷 찍어요
  console.log('  📌 Step 5: 스크린샷 캡처중...');
  const card = await page.$('#captureTarget');
  
  if (!card) {
    console.error('❌ 에러: 캡처할 카드를 찾을 수 없습니다!');
    await browser.close();
    return;
  }

  // 6. PNG 파일로 저장합니다
  const outputPath = path.join(__dirname, '..', 'public', 'static', 'images', 'popup-contact.png');
  await card.screenshot({ 
    path: outputPath,
    type: 'png',
    omitBackground: true  // 배경 투명
  });

  // 7. 브라우저 닫기
  await browser.close();

  console.log('');
  console.log(`  ✅ 이미지 생성 완료!`);
  console.log(`  📂 저장 위치: ${outputPath}`);
  console.log('');
}

generateContactPopupImage().catch(err => {
  console.error('❌ 오류 발생:', err);
  process.exit(1);
});
