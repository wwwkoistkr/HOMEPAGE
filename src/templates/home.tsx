// KOIST - Home Page Template (v5.3 - Dynamic Background Images & Editable Text)
import type { SettingsMap, Department, Popup, Notice, ProgressItem } from '../types';

// Helper: generate background style with image overlay or gradient fallback
function bgStyle(imageUrl: string | undefined, fallbackGradient: string, opacity: string = '0.85'): string {
  if (imageUrl && imageUrl.trim() !== '') {
    return `background-image: linear-gradient(rgba(15,23,42,${opacity}), rgba(15,23,42,${opacity})), url('${imageUrl}'); background-size:cover; background-position:center;`;
  }
  return `background: ${fallbackGradient};`;
}

export function homePage(opts: {
  settings: SettingsMap;
  departments: Department[];
  popups: Popup[];
  notices: Notice[];
  progressItems: ProgressItem[];
}) {
  const s = opts.settings;
  const deps = opts.departments.filter(d => d.is_active);
  const popups = opts.popups;
  const notices = opts.notices.slice(0, 5);
  const progress = opts.progressItems.slice(0, 5);

  const heroOpacity = s.hero_overlay_opacity || '0.85';

  return `
  <!-- Popups -->
  ${popups.length > 0 ? `
  <div id="popupContainer">
    ${popups.map((p, i) => `
    <div class="popup-item fixed z-[100] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden" 
         style="top:clamp(60px, ${p.position_top * 0.06}vw + 30px, ${p.position_top}px); left:clamp(8px, ${p.position_left * 0.06}vw + 4px, ${p.position_left}px); width:min(${p.width}px, 90vw); max-height:85vh;"
         data-popup-id="${p.id}" id="popup-${p.id}">
      <div class="bg-slate-50 flex justify-between items-center border-b" style="padding:var(--space-sm) var(--space-md)">
        <span class="font-semibold text-gray-800 f-text-sm">${p.title}</span>
        <button onclick="closePopup(${p.id})" class="text-gray-400 hover:text-gray-600 p-1"><i class="fas fa-times f-text-xs"></i></button>
      </div>
      <div class="overflow-y-auto" style="max-height:min(${p.height}px, 70vh);">
        ${p.popup_type === 'image' && p.image_url ? `<img src="${p.image_url}" alt="${p.title}" class="w-full h-auto">` : `<div style="padding:var(--space-md)">${p.content || ''}</div>`}
      </div>
      <div class="bg-gray-50 border-t text-right" style="padding:var(--space-sm) var(--space-md)">
        <button onclick="closePopup(${p.id})" class="text-gray-500 hover:text-gray-700 rounded hover:bg-gray-100 transition-colors f-text-xs" style="padding:var(--space-xs) var(--space-sm)">닫기</button>
      </div>
    </div>
    `).join('')}
  </div>
  <script>
    (function() {
      if (sessionStorage.getItem('koist_popups_shown')) { document.getElementById('popupContainer')?.remove(); return; }
      sessionStorage.setItem('koist_popups_shown', Date.now().toString());
    })();
    function closePopup(id) { var el = document.getElementById('popup-' + id); if (el) el.style.display = 'none'; }
  </script>
  ` : ''}

  <!-- ═══════════ Hero ═══════════ -->
  <section class="relative overflow-hidden" style="${bgStyle(s.hero_bg_url, 'linear-gradient(135deg, #0F172A 0%, #162544 50%, #0F172A 100%)', heroOpacity)}">
    <!-- BG decorative layers (shown when no background image) -->
    ${!s.hero_bg_url ? `
    <div class="absolute inset-0">
      <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-950/30 to-transparent"></div>
      <div class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0B1120] to-transparent"></div>
      <div class="absolute top-16 left-[8%] text-blue-500/[0.06]" style="font-size:clamp(2rem,4vw,4rem)"><i class="fas fa-shield-halved"></i></div>
      <div class="absolute top-1/3 right-[10%] text-blue-500/[0.05]" style="font-size:clamp(1.8rem,3.5vw,3.5rem)"><i class="fas fa-lock"></i></div>
      <div class="absolute bottom-20 left-[20%] text-blue-500/[0.05]" style="font-size:clamp(1.5rem,2.5vw,2.5rem)"><i class="fas fa-key"></i></div>
    </div>
    ` : ''}

    <div class="relative fluid-container" style="padding-top:var(--space-2xl); padding-bottom:var(--space-2xl)">
      <div class="grid grid-cols-1 lg:grid-cols-5 items-center" style="gap:clamp(1.5rem, 3vw, 4rem)">

        <!-- Left -->
        <div class="lg:col-span-3" data-aos="fade-right">
          <div class="inline-flex items-center bg-blue-500/10 border border-blue-500/20 rounded-full f-text-xs" style="gap:var(--space-xs); padding:var(--space-xs) var(--space-sm)">
            <span class="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
            <span class="text-blue-300 font-medium">${s.hero_badge_text || '국가 공인 정보보안 시험·평가 전문기관'}</span>
          </div>
          <h1 class="text-white font-black leading-snug f-text-hero" style="margin-top:var(--space-md); margin-bottom:var(--space-md)">
            ${s.site_slogan || '최상의 시험·인증 서비스로<br><span class="text-blue-400">정보보안 기술</span>을 완성'}
          </h1>
          <p class="text-slate-400 leading-relaxed max-w-lg f-text-base" style="margin-bottom:var(--space-lg)">
            ${s.site_sub_slogan || '정보보안 기술은 IT제품으로 구현되고 시험·인증 서비스를 통해 완성됩니다.'}
          </p>
          <div class="flex flex-wrap" style="gap:var(--space-sm)">
            <a href="/support/inquiry" class="inline-flex items-center bg-accent hover:bg-accent-dark text-white rounded-lg font-semibold transition-all shadow-lg shadow-accent/20 f-text-sm" style="gap:var(--space-xs); padding:var(--space-sm) var(--space-lg)">
              <i class="fas fa-paper-plane f-text-xs"></i> ${s.hero_btn_primary || '온라인 상담'}
            </a>
            <a href="#services" class="inline-flex items-center bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-lg font-semibold transition-all f-text-sm" style="gap:var(--space-xs); padding:var(--space-sm) var(--space-lg)">
              <i class="fas fa-th-large f-text-xs"></i> ${s.hero_btn_secondary || '사업분야 보기'}
            </a>
          </div>
        </div>

        <!-- Right: Contact card -->
        <div class="lg:col-span-2" data-aos="fade-left" data-aos-delay="150">
          <div class="relative bg-white rounded-2xl shadow-2xl shadow-black/20" style="padding:var(--space-lg)">
            <div class="absolute top-0 left-6 right-6 h-[3px] bg-gradient-to-r from-accent to-blue-400 rounded-b-full"></div>
            <div class="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            <div class="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-60"></div>

            <p class="text-slate-500 font-semibold tracking-wider uppercase f-text-xs" style="margin-bottom:var(--space-xs)">
              <i class="fas fa-headset mr-1 text-accent"></i>상담문의
            </p>
            <a href="tel:${s.phone || '02-586-1230'}" class="block text-primary font-black hover:text-accent transition-colors tracking-tight f-text-3xl" style="margin-bottom:var(--space-md)">
              ${s.phone_display || s.phone || '02-586-1230'}
            </a>

            <div class="text-slate-600 f-text-sm" style="display:flex; flex-direction:column; gap:var(--space-sm)">
              <div class="flex items-center" style="gap:var(--space-sm)">
                <div class="shrink-0 bg-blue-50 rounded flex items-center justify-center" style="width:clamp(24px,2vw,28px); height:clamp(24px,2vw,28px)"><i class="fas fa-envelope text-accent f-text-xs"></i></div>
                <a href="mailto:${s.email || 'koist@koist.kr'}" class="hover:text-accent transition-colors">${s.email || 'koist@koist.kr'}</a>
              </div>
              <div class="flex items-center" style="gap:var(--space-sm)">
                <div class="shrink-0 bg-blue-50 rounded flex items-center justify-center" style="width:clamp(24px,2vw,28px); height:clamp(24px,2vw,28px)"><i class="fas fa-fax text-accent f-text-xs"></i></div>
                <span>FAX ${s.fax || '02-586-1238'}</span>
              </div>
              <div class="flex items-start" style="gap:var(--space-sm)">
                <div class="shrink-0 bg-blue-50 rounded flex items-center justify-center mt-0.5" style="width:clamp(24px,2vw,28px); height:clamp(24px,2vw,28px)"><i class="fas fa-location-dot text-accent f-text-xs"></i></div>
                <span class="leading-snug f-text-xs">${s.address || '서울특별시 서초구 효령로 336 윤일빌딩 4층'}</span>
              </div>
            </div>

            <div class="border-t" style="margin-top:var(--space-md); padding-top:var(--space-md)">
              <div class="flex items-center bg-green-50 border border-green-200/60 rounded-lg" style="gap:var(--space-xs); padding:var(--space-sm) var(--space-md)">
                <i class="fas fa-bolt text-yellow-500 f-text-xs"></i>
                <span class="text-green-700 font-bold f-text-sm">${s.hero_quick_badge || 'CC평가 신청 즉시 착수 가능'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════ Services ═══════════ -->
  <section id="services" class="f-section-y relative overflow-hidden" style="${s.services_bg_url ? bgStyle(s.services_bg_url, '', '0.95').replace('rgba(15,23,42,', 'rgba(255,255,255,') : 'background: #FFFFFF;'}">
    <div class="relative fluid-container">
      <div class="text-center f-mb" data-aos="fade-up">
        <p class="text-accent font-semibold tracking-widest uppercase f-text-xs" style="margin-bottom:var(--space-xs)">Our Services</p>
        <h2 class="font-bold text-primary f-text-2xl" style="margin-bottom:var(--space-xs)">${s.services_title || '핵심 사업분야'}</h2>
        <p class="text-slate-500 f-text-sm">${s.services_subtitle || 'KOIST의 전문 시험·평가 서비스를 한눈에 확인하세요'}</p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" style="gap:clamp(0.5rem, 1vw, 1.25rem)">
        ${deps.map((dept, i) => `
        <a href="/services/${dept.slug}" class="card-hover group block bg-white border border-slate-200 rounded-xl hover:border-slate-300 relative overflow-hidden" style="padding:clamp(0.75rem, 1.5vw, 1.25rem)" data-aos="fade-up" data-aos-delay="${i * 50}">
          <div class="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity" style="background:${dept.color}"></div>
          <div class="rounded-lg flex items-center justify-center" style="width:clamp(32px,3vw,44px); height:clamp(32px,3vw,44px); background:${dept.color}12; margin-bottom:var(--space-sm)">
            <i class="fas ${dept.icon}" style="color:${dept.color}; font-size:var(--text-lg)"></i>
          </div>
          <h3 class="font-bold text-primary group-hover:text-accent transition-colors f-text-sm" style="margin-bottom:var(--space-xs)">${dept.name}</h3>
          <p class="text-slate-500 leading-relaxed line-clamp-2 f-text-xs">${dept.description || ''}</p>
        </a>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- ═══════════ Notices + Progress ═══════════ -->
  <section class="f-section-y relative overflow-hidden" style="${s.notice_progress_bg_url ? bgStyle(s.notice_progress_bg_url, '', '0.03').replace('rgba(15,23,42,', 'rgba(248,250,252,') : 'background: #F8FAFC;'}">
    <div class="relative fluid-container">
      <div class="grid grid-cols-1 lg:grid-cols-2" style="gap:clamp(1rem, 2vw, 2rem)">

        <!-- Notices -->
        <div data-aos="fade-right" class="bg-white rounded-xl shadow-sm border border-slate-100" style="padding:clamp(1rem, 2vw, 2rem)">
          <div class="flex justify-between items-center" style="margin-bottom:var(--space-md)">
            <h3 class="font-bold text-primary flex items-center f-text-lg" style="gap:var(--space-sm)">
              <div class="bg-blue-50 rounded-lg flex items-center justify-center" style="width:clamp(26px,2.5vw,32px); height:clamp(26px,2.5vw,32px)"><i class="fas fa-bullhorn text-accent f-text-sm"></i></div>
              공지사항
            </h3>
            <a href="/support/notice" class="text-accent font-semibold hover:underline f-text-xs">더보기 <i class="fas fa-chevron-right" style="font-size:10px"></i></a>
          </div>
          <div class="divide-y divide-slate-100">
            ${notices.length > 0 ? notices.map(n => `
            <a href="/support/notice/${n.id}" class="flex items-center py-2.5 hover:bg-blue-50/40 -mx-2 px-2 rounded transition-colors group" style="gap:var(--space-sm)">
              ${n.is_pinned ? '<span class="shrink-0 bg-red-500 text-white rounded flex items-center justify-center font-bold" style="width:clamp(16px,1.5vw,20px); height:clamp(16px,1.5vw,20px); font-size:9px">N</span>' : '<span class="shrink-0 w-1.5 h-1.5 bg-slate-300 rounded-full"></span>'}
              <span class="flex-1 text-slate-700 truncate group-hover:text-accent transition-colors f-text-sm">${n.title}</span>
              <span class="shrink-0 text-slate-400 f-text-xs">${n.created_at ? n.created_at.split('T')[0] : ''}</span>
            </a>
            `).join('') : '<p class="text-slate-400 text-center f-text-sm" style="padding:var(--space-xl) 0">등록된 공지사항이 없습니다.</p>'}
          </div>
        </div>

        <!-- Progress -->
        <div data-aos="fade-left" class="bg-white rounded-xl shadow-sm border border-slate-100" style="padding:clamp(1rem, 2vw, 2rem)">
          <div class="flex justify-between items-center" style="margin-bottom:var(--space-md)">
            <h3 class="font-bold text-primary flex items-center f-text-lg" style="gap:var(--space-sm)">
              <div class="bg-emerald-50 rounded-lg flex items-center justify-center" style="width:clamp(26px,2.5vw,32px); height:clamp(26px,2.5vw,32px)"><i class="fas fa-chart-bar text-emerald-500 f-text-sm"></i></div>
              평가현황
            </h3>
            <a href="/support/progress" class="text-accent font-semibold hover:underline f-text-xs">더보기 <i class="fas fa-chevron-right" style="font-size:10px"></i></a>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="text-left text-slate-500 border-b border-slate-100">
                  <th class="font-medium f-text-xs" style="padding-bottom:var(--space-sm)">제품명</th>
                  <th class="font-medium f-text-xs hidden sm:table-cell" style="padding-bottom:var(--space-sm)">보증등급</th>
                  <th class="font-medium f-text-xs" style="padding-bottom:var(--space-sm); white-space:nowrap">상태</th>
                </tr>
              </thead>
              <tbody>
                ${progress.length > 0 ? progress.map(p => `
                <tr class="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td class="text-slate-700 font-medium f-text-xs" style="padding:var(--space-sm) var(--space-xs) var(--space-sm) 0">${p.product_name}</td>
                  <td class="text-slate-500 hidden sm:table-cell f-text-xs" style="padding:var(--space-sm) var(--space-xs)">
                    <span class="inline-block bg-slate-100 text-slate-600 rounded font-mono f-text-xs" style="padding:1px var(--space-xs)">${p.assurance_level || '-'}</span>
                  </td>
                  <td style="padding:var(--space-sm) 0 var(--space-sm) var(--space-xs)">
                    <span class="inline-flex items-center gap-1 rounded-full font-medium f-text-xs ${p.status === '평가완료' ? 'bg-green-50 text-green-600' : p.status === '평가진행' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}" style="padding:2px var(--space-sm); white-space:nowrap">
                      <span class="w-1.5 h-1.5 rounded-full ${p.status === '평가완료' ? 'bg-green-500' : p.status === '평가진행' ? 'bg-blue-500' : 'bg-amber-500'}"></span>
                      ${p.status}
                    </span>
                  </td>
                </tr>
                `).join('') : '<tr><td colspan="3" class="text-center text-slate-400 f-text-sm" style="padding:var(--space-xl) 0">등록된 현황이 없습니다.</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════ CTA ═══════════ -->
  <section class="relative overflow-hidden f-section-y" style="${bgStyle(s.cta_bg_url, 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #1E293B 100%)', '0.88')}">
    ${!s.cta_bg_url ? `
    <div class="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 right-1/4 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl"></div>
    ` : ''}
    <div class="relative fluid-container text-center" data-aos="fade-up">
      <p class="text-blue-300 font-semibold tracking-widest uppercase f-text-xs" style="margin-bottom:var(--space-sm)"><i class="fas fa-headset mr-1"></i>${s.cta_subtitle || '전문 상담 안내'}</p>
      <h2 class="text-white font-bold f-text-2xl" style="margin-bottom:var(--space-sm)">${s.cta_title || '정보보안 시험·인증이 필요하신가요?'}</h2>
      <p class="text-blue-200/70 max-w-xl mx-auto f-text-base" style="margin-bottom:var(--space-lg)">${s.cta_description || '전문 상담원이 빠르고 정확하게 안내해 드립니다'}</p>
      <div class="flex flex-wrap justify-center" style="gap:var(--space-sm)">
        <a href="tel:${s.phone || '02-586-1230'}" class="inline-flex items-center bg-white text-primary rounded-lg font-bold hover:shadow-xl transition-all f-text-sm" style="gap:var(--space-xs); padding:var(--space-sm) var(--space-lg)">
          <i class="fas fa-phone f-text-xs"></i> ${s.phone || '02-586-1230'}
        </a>
        <a href="/support/inquiry" class="inline-flex items-center bg-accent hover:bg-accent-dark text-white rounded-lg font-bold transition-all shadow-lg shadow-accent/20 f-text-sm" style="gap:var(--space-xs); padding:var(--space-sm) var(--space-lg)">
          <i class="fas fa-envelope f-text-xs"></i> 온라인 상담
        </a>
      </div>
    </div>
  </section>

  <!-- Mobile Fixed Phone -->
  <a href="tel:${s.phone || '02-586-1230'}" class="sm:hidden fixed bottom-5 right-5 z-50 bg-accent text-white rounded-full shadow-lg shadow-accent/30 flex items-center justify-center hover:scale-110 transition-transform" style="width:clamp(44px,5vw,52px); height:clamp(44px,5vw,52px); font-size:var(--text-lg)">
    <i class="fas fa-phone"></i>
  </a>
  `;
}
