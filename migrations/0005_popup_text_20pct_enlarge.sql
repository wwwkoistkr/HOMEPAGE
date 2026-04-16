-- Migration: 팝업 #1 (id=3) HTML 콘텐츠 글자 20% 확대 (v35.5.1)
-- 50% 축소 후 → 20% 확대 적용:
-- 배지: 9px → 11px, 본문: 9px → 11px, 라벨: 8px → 10px
-- 전화번호: 11px → 13px, 아이콘: 8px → 10px
-- 아이콘박스: 20×20 → 24×24, 패딩: 18px 20px → 22px 24px
-- gap: 8px → 10px, border-radius: 14px → 17px, 10px → 12px, 6px → 7px

UPDATE popups SET content = '<div style="background:linear-gradient(135deg,#0a1628 0%,#132845 50%,#0d2137 100%); color:#e0e6ed; border-radius:12px; padding:22px 24px;">
<div style="display:inline-block; background:rgba(0,200,180,0.15); border:1px solid rgba(0,200,180,0.4); border-radius:17px; padding:5px 14px; margin-bottom:14px;">
<span style="color:#00d4aa; font-size:11px; font-weight:500;">● 국가 공인 시험기관 지정</span>
</div>
<div style="margin-bottom:17px;">
<p style="font-size:11px; font-weight:bold; color:#ffffff; line-height:1.7;">KOIST(한국정보보안기술원)은 <span style="color:#f0c040;">2026. 3. 16일</span> 부로 <span style="color:#00d4aa;">CCTV, IPTV</span> 분야의 국가 공인 시험기관으로 지정되었습니다.</p>
</div>
<div style="border-top:1px solid rgba(255,255,255,0.12); padding-top:14px;">
<p style="font-size:10px; color:#8899aa; margin-bottom:12px; letter-spacing:0.5px;">담당부서 연락처</p>
<div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
<div style="width:24px; height:24px; background:rgba(0,200,180,0.2); border-radius:7px; display:flex; align-items:center; justify-content:center;"><i class="fas fa-phone" style="color:#00d4aa; font-size:10px;"></i></div>
<div><p style="font-size:10px; color:#8899aa; margin-bottom:1px;">평가팀 (직통)</p><p style="font-size:13px; font-weight:bold; color:#00d4aa;">070-4265-0886</p></div>
</div>
<div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
<div style="width:24px; height:24px; background:rgba(100,200,140,0.2); border-radius:7px; display:flex; align-items:center; justify-content:center;"><i class="fas fa-envelope" style="color:#64c88c; font-size:10px;"></i></div>
<div><p style="font-size:10px; color:#8899aa; margin-bottom:1px;">E-MAIL</p><p style="font-size:13px; font-weight:600; color:#e0e6ed;">jhchoi@koist.kr</p></div>
</div>
<div style="display:flex; align-items:center; gap:10px;">
<div style="width:24px; height:24px; background:rgba(80,160,220,0.2); border-radius:7px; display:flex; align-items:center; justify-content:center;"><i class="fas fa-home" style="color:#50a0dc; font-size:10px;"></i></div>
<div><p style="font-size:10px; color:#8899aa; margin-bottom:1px;">KOIST 대표</p><p style="font-size:13px; font-weight:600; color:#e0e6ed;">02-586-1230</p></div>
</div>
</div>
</div>' WHERE id = 3;
