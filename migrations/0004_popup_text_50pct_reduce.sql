-- Migration: 팝업 #1 (id=3) HTML 콘텐츠 글자 50% 축소 (v35.5)
-- 원본 → 50% 축소 (최소 8px 하한선 적용):
-- 배지: 18px → 9px, 본문: 16.5px → 9px(하한), 라벨: 12.6px → 8px(하한)
-- 전화번호: 21px → 11px, 아이콘: 14px → 8px(하한)
-- 아이콘박스: 34×34 → 20×20, 패딩: 36px 40px → 18px 20px
-- gap: 12px → 8px, margin-bottom: 28px → 14px, 24px → 12px
-- border-radius: 24px → 14px, 16px → 10px, 9px → 6px

UPDATE popups SET content = '<div style="background:linear-gradient(135deg,#0a1628 0%,#132845 50%,#0d2137 100%); color:#e0e6ed; border-radius:10px; padding:18px 20px;">
<div style="display:inline-block; background:rgba(0,200,180,0.15); border:1px solid rgba(0,200,180,0.4); border-radius:14px; padding:4px 12px; margin-bottom:12px;">
<span style="color:#00d4aa; font-size:9px; font-weight:500;">● 국가 공인 시험기관 지정</span>
</div>
<div style="margin-bottom:14px;">
<p style="font-size:9px; font-weight:bold; color:#ffffff; line-height:1.7;">KOIST(한국정보보안기술원)은 <span style="color:#f0c040;">2026. 3. 16일</span> 부로 <span style="color:#00d4aa;">CCTV, IPTV</span> 분야의 국가 공인 시험기관으로 지정되었습니다.</p>
</div>
<div style="border-top:1px solid rgba(255,255,255,0.12); padding-top:12px;">
<p style="font-size:8px; color:#8899aa; margin-bottom:10px; letter-spacing:0.5px;">담당부서 연락처</p>
<div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
<div style="width:20px; height:20px; background:rgba(0,200,180,0.2); border-radius:6px; display:flex; align-items:center; justify-content:center;"><i class="fas fa-phone" style="color:#00d4aa; font-size:8px;"></i></div>
<div><p style="font-size:8px; color:#8899aa; margin-bottom:1px;">평가팀 (직통)</p><p style="font-size:11px; font-weight:bold; color:#00d4aa;">070-4265-0886</p></div>
</div>
<div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
<div style="width:20px; height:20px; background:rgba(100,200,140,0.2); border-radius:6px; display:flex; align-items:center; justify-content:center;"><i class="fas fa-envelope" style="color:#64c88c; font-size:8px;"></i></div>
<div><p style="font-size:8px; color:#8899aa; margin-bottom:1px;">E-MAIL</p><p style="font-size:11px; font-weight:600; color:#e0e6ed;">jhchoi@koist.kr</p></div>
</div>
<div style="display:flex; align-items:center; gap:8px;">
<div style="width:20px; height:20px; background:rgba(80,160,220,0.2); border-radius:6px; display:flex; align-items:center; justify-content:center;"><i class="fas fa-home" style="color:#50a0dc; font-size:8px;"></i></div>
<div><p style="font-size:8px; color:#8899aa; margin-bottom:1px;">KOIST 대표</p><p style="font-size:11px; font-weight:600; color:#e0e6ed;">02-586-1230</p></div>
</div>
</div>
</div>' WHERE id = 3;
