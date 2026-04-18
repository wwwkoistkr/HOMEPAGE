-- Migration: 팝업3 텍스트 변경 (v25)
UPDATE popups SET content = '<div style="background:linear-gradient(135deg,#0a1628 0%,#132845 50%,#0d2137 100%); color:#e0e6ed; border-radius:16px; padding:36px 40px;">
<div style="display:inline-block; background:rgba(0,200,180,0.15); border:1.5px solid rgba(0,200,180,0.4); border-radius:24px; padding:8px 24px; margin-bottom:24px;">
<span style="color:#00d4aa; font-size:18px; font-weight:500;">● 국가 공인 시험기관 지정</span>
</div>
<div style="margin-bottom:28px;">
<p style="font-size:16.5px; font-weight:bold; color:#ffffff; line-height:1.7;">KOIST(한국정보보안기술원)은 <span style="color:#f0c040;">2026. 3. 16일</span> 부로 <span style="color:#00d4aa;">CCTV, IPTV</span> 분야의 국가 공인 시험기관으로 지정되었습니다.</p>
</div>
<div style="border-top:1px solid rgba(255,255,255,0.12); padding-top:24px;">
<p style="font-size:12.6px; color:#8899aa; margin-bottom:18px; letter-spacing:1px;">담당부서 연락처</p>
<div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
<div style="width:34px; height:34px; background:rgba(0,200,180,0.2); border-radius:9px; display:flex; align-items:center; justify-content:center;"><i class="fas fa-phone" style="color:#00d4aa; font-size:14px;"></i></div>
<div><p style="font-size:12.6px; color:#8899aa; margin-bottom:2px;">평가팀 (직통)</p><p style="font-size:21px; font-weight:bold; color:#00d4aa;">070-4265-0886</p></div>
</div>
<div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
<div style="width:34px; height:34px; background:rgba(100,200,140,0.2); border-radius:9px; display:flex; align-items:center; justify-content:center;"><i class="fas fa-envelope" style="color:#64c88c; font-size:14px;"></i></div>
<div><p style="font-size:12.6px; color:#8899aa; margin-bottom:2px;">E-MAIL</p><p style="font-size:21px; font-weight:600; color:#e0e6ed;">jhchoi@koist.kr</p></div>
</div>
<div style="display:flex; align-items:center; gap:12px;">
<div style="width:34px; height:34px; background:rgba(80,160,220,0.2); border-radius:9px; display:flex; align-items:center; justify-content:center;"><i class="fas fa-home" style="color:#50a0dc; font-size:14px;"></i></div>
<div><p style="font-size:12.6px; color:#8899aa; margin-bottom:2px;">KOIST 대표</p><p style="font-size:21px; font-weight:600; color:#e0e6ed;">02-586-1230</p></div>
</div>
</div>
</div>' WHERE id = 3;
