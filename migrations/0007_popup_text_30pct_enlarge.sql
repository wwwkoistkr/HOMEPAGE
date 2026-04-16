-- Migration: 팝업 #1 (id=3) HTML 콘텐츠 글자 30% 확대 (v35.5.3)
-- v35.5.2 기준 → ×1.3 확대:
-- 배지: 15px → 20px, 본문: 15px → 20px, 라벨: 14px → 18px
-- 전화번호: 18px → 23px, 아이콘: 14px → 18px
-- 아이콘박스: 34×34 → 44×44, 패딩: 31px 34px → 40px 44px
-- gap: 14px → 18px, border-radius: 17px → 22px, 24px → 31px, 10px → 13px

UPDATE popups SET content = '<div style="background:linear-gradient(135deg,#0a1628 0%,#132845 50%,#0d2137 100%); color:#e0e6ed; border-radius:22px; padding:40px 44px;">
<div style="display:inline-block; background:rgba(0,200,180,0.15); border:1px solid rgba(0,200,180,0.4); border-radius:31px; padding:9px 26px; margin-bottom:26px;">
<span style="color:#00d4aa; font-size:20px; font-weight:500;">● 국가 공인 시험기관 지정</span>
</div>
<div style="margin-bottom:31px;">
<p style="font-size:20px; font-weight:bold; color:#ffffff; line-height:1.7;">KOIST(한국정보보안기술원)은 <span style="color:#f0c040;">2026. 3. 16일</span> 부로 <span style="color:#00d4aa;">CCTV, IPTV</span> 분야의 국가 공인 시험기관으로 지정되었습니다.</p>
</div>
<div style="border-top:1px solid rgba(255,255,255,0.12); padding-top:26px;">
<p style="font-size:18px; color:#8899aa; margin-bottom:22px; letter-spacing:0.5px;">담당부서 연락처</p>
<div style="display:flex; align-items:center; gap:18px; margin-bottom:18px;">
<div style="width:44px; height:44px; background:rgba(0,200,180,0.2); border-radius:13px; display:flex; align-items:center; justify-content:center;"><i class="fas fa-phone" style="color:#00d4aa; font-size:18px;"></i></div>
<div><p style="font-size:18px; color:#8899aa; margin-bottom:1px;">평가팀 (직통)</p><p style="font-size:23px; font-weight:bold; color:#00d4aa;">070-4265-0886</p></div>
</div>
<div style="display:flex; align-items:center; gap:18px; margin-bottom:18px;">
<div style="width:44px; height:44px; background:rgba(100,200,140,0.2); border-radius:13px; display:flex; align-items:center; justify-content:center;"><i class="fas fa-envelope" style="color:#64c88c; font-size:18px;"></i></div>
<div><p style="font-size:18px; color:#8899aa; margin-bottom:1px;">E-MAIL</p><p style="font-size:23px; font-weight:600; color:#e0e6ed;">jhchoi@koist.kr</p></div>
</div>
<div style="display:flex; align-items:center; gap:18px;">
<div style="width:44px; height:44px; background:rgba(80,160,220,0.2); border-radius:13px; display:flex; align-items:center; justify-content:center;"><i class="fas fa-home" style="color:#50a0dc; font-size:18px;"></i></div>
<div><p style="font-size:18px; color:#8899aa; margin-bottom:1px;">KOIST 대표</p><p style="font-size:23px; font-weight:600; color:#e0e6ed;">02-586-1230</p></div>
</div>
</div>
</div>' WHERE id = 3;
