// KOIST - Home Page Template (v4 - Premium Polished)
import type { SettingsMap, Department, Popup, Notice, ProgressItem } from '../types';

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

  return `
  <!-- ═══════════ Popups ═══════════ -->
  ${popups.length > 0 ? `
  <div id="popupContainer">
    ${popups.map((p, i) => `
    <div class="popup-item fixed z-[100] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden" 
         style="top:${p.position_top}px;left:${p.position_left}px;width:min(${p.width}px, 90vw);max-height:90vh;"
         data-popup-id="${p.id}" id="popup-${p.id}">
      <div class="bg-slate-50 px-4 py-2.5 flex justify-between items-center border-b">
        <span class="text-sm font-semibold text-gray-800">${p.title}</span>
        <button onclick="closePopup(${p.id})" class="text-gray-400 hover:text-gray-600 p-1"><i class="fas fa-times text-xs"></i></button>
      </div>
      <div class="overflow-y-auto" style="max-height:${p.height}px;">
        ${p.popup_type === 'image' && p.image_url ? `<img src="${p.image_url}" alt="${p.title}" class="w-full h-auto">` : `<div class="p-4">${p.content || ''}</div>`}
      </div>
      <div class="px-4 py-2 bg-gray-50 border-t text-right">
        <button onclick="closePopup(${p.id})" class="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded hover:bg-gray-100 transition-colors">닫기</button>
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
  <section class="relative bg-[#0F172A] overflow-hidden">
    <!-- BG layers -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#162544] to-[#0F172A]"></div>
      <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-950/30 to-transparent"></div>
      <div class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0B1120] to-transparent"></div>
      <!-- Decorative dots -->
      <div class="absolute top-16 left-[8%] text-blue-500/[0.06] text-6xl"><i class="fas fa-shield-halved"></i></div>
      <div class="absolute top-1/3 right-[10%] text-blue-500/[0.05] text-5xl"><i class="fas fa-lock"></i></div>
      <div class="absolute bottom-20 left-[20%] text-blue-500/[0.05] text-4xl"><i class="fas fa-key"></i></div>
    </div>

    <div class="relative max-w-[1320px] mx-auto px-4 lg:px-6 py-16 lg:py-24">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">

        <!-- Left — 3 cols -->
        <div class="lg:col-span-3" data-aos="fade-right">
          <div class="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-5">
            <span class="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
            <span class="text-blue-300 font-medium text-xs">국가 공인 정보보안 시험·평가 전문기관</span>
          </div>
          <h1 class="text-white font-black text-2xl lg:text-[2.5rem] leading-snug mb-5">
            ${s.site_slogan || '최상의 시험·인증 서비스로<br><span class="text-blue-400">정보보안 기술</span>을 완성'}
          </h1>
          <p class="text-slate-400 text-sm lg:text-base leading-relaxed mb-8 max-w-lg">
            ${s.site_sub_slogan || '정보보안 기술은 IT제품으로 구현되고 시험·인증 서비스를 통해 완성됩니다.'}
          </p>
          <div class="flex flex-wrap gap-3">
            <a href="/support/inquiry" class="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg shadow-accent/20 text-sm">
              <i class="fas fa-paper-plane text-xs"></i> 온라인 상담
            </a>
            <a href="#services" class="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 px-6 py-3 rounded-lg font-semibold transition-all text-sm">
              <i class="fas fa-th-large text-xs"></i> 사업분야 보기
            </a>
          </div>
        </div>

        <!-- Right — 2 cols: Contact card -->
        <div class="lg:col-span-2" data-aos="fade-left" data-aos-delay="150">
          <div class="relative bg-white rounded-2xl shadow-2xl shadow-black/20 p-6 lg:p-7">
            <div class="absolute top-0 left-6 right-6 h-[3px] bg-gradient-to-r from-accent to-blue-400 rounded-b-full"></div>
            <!-- Online badge -->
            <div class="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            <div class="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-60"></div>

            <p class="text-slate-500 text-xs font-semibold mb-1 tracking-wider uppercase">
              <i class="fas fa-headset mr-1 text-accent"></i>상담문의
            </p>
            <a href="tel:${s.phone || '02-586-1230'}" class="block text-primary font-black text-2xl lg:text-3xl mb-4 hover:text-accent transition-colors tracking-tight">
              ${s.phone_display || s.phone || '02-586-1230'}
            </a>

            <div class="space-y-2.5 text-slate-600 text-sm">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 bg-blue-50 rounded flex items-center justify-center shrink-0"><i class="fas fa-envelope text-accent text-xs"></i></div>
                <a href="mailto:${s.email || 'koist@koist.kr'}" class="hover:text-accent transition-colors">${s.email || 'koist@koist.kr'}</a>
              </div>
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 bg-blue-50 rounded flex items-center justify-center shrink-0"><i class="fas fa-fax text-accent text-xs"></i></div>
                <span>FAX ${s.fax || '02-586-1238'}</span>
              </div>
              <div class="flex items-start gap-2.5">
                <div class="w-7 h-7 bg-blue-50 rounded flex items-center justify-center shrink-0 mt-0.5"><i class="fas fa-location-dot text-accent text-xs"></i></div>
                <span class="leading-snug text-xs">${s.address || '서울특별시 서초구 효령로 336 윤일빌딩 4층'}</span>
              </div>
            </div>

            <div class="mt-5 pt-4 border-t">
              <div class="flex items-center gap-2 bg-green-50 border border-green-200/60 px-3 py-2 rounded-lg">
                <i class="fas fa-bolt text-yellow-500 text-xs"></i>
                <span class="text-green-700 font-bold text-sm">CC평가 신청 즉시 착수 가능</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════ Services ═══════════ -->
  <section id="services" class="py-14 lg:py-20 bg-white">
    <div class="max-w-[1320px] mx-auto px-4 lg:px-6">
      <div class="text-center mb-10 lg:mb-14" data-aos="fade-up">
        <p class="text-accent font-semibold text-xs tracking-widest uppercase mb-2">Our Services</p>
        <h2 class="text-2xl lg:text-3xl font-bold text-primary mb-3">핵심 사업분야</h2>
        <p class="text-slate-500 text-sm lg:text-base">KOIST의 전문 시험·평가 서비스를 한눈에 확인하세요</p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
        ${deps.map((dept, i) => `
        <a href="/services/${dept.slug}" class="card-hover group block bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 relative overflow-hidden" data-aos="fade-up" data-aos-delay="${i * 50}">
          <div class="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity" style="background:${dept.color}"></div>
          <div class="w-11 h-11 rounded-lg flex items-center justify-center mb-3" style="background:${dept.color}12">
            <i class="fas ${dept.icon} text-lg" style="color:${dept.color}"></i>
          </div>
          <h3 class="font-bold text-primary text-sm mb-1.5 group-hover:text-accent transition-colors">${dept.name}</h3>
          <p class="text-slate-500 text-xs leading-relaxed line-clamp-2">${dept.description || ''}</p>
        </a>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- ═══════════ Notices + Progress ═══════════ -->
  <section class="py-14 lg:py-20 bg-[#F8FAFC]">
    <div class="max-w-[1320px] mx-auto px-4 lg:px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

        <!-- Notices -->
        <div data-aos="fade-right" class="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-slate-100">
          <div class="flex justify-between items-center mb-5">
            <h3 class="text-lg font-bold text-primary flex items-center gap-2">
              <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center"><i class="fas fa-bullhorn text-accent text-sm"></i></div>
              공지사항
            </h3>
            <a href="/support/notice" class="text-accent text-xs font-semibold hover:underline">더보기 <i class="fas fa-chevron-right text-[10px]"></i></a>
          </div>
          <div class="divide-y divide-slate-100">
            ${notices.length > 0 ? notices.map(n => `
            <a href="/support/notice/${n.id}" class="flex items-center gap-3 py-3 hover:bg-blue-50/40 -mx-2 px-2 rounded transition-colors group">
              ${n.is_pinned ? '<span class="shrink-0 w-5 h-5 bg-red-500 text-white text-[10px] rounded flex items-center justify-center font-bold">N</span>' : '<span class="shrink-0 w-1.5 h-1.5 bg-slate-300 rounded-full"></span>'}
              <span class="flex-1 text-sm text-slate-700 truncate group-hover:text-accent transition-colors">${n.title}</span>
              <span class="shrink-0 text-xs text-slate-400">${n.created_at ? n.created_at.split('T')[0] : ''}</span>
            </a>
            `).join('') : '<p class="text-slate-400 text-sm py-6 text-center">등록된 공지사항이 없습니다.</p>'}
          </div>
        </div>

        <!-- Progress -->
        <div data-aos="fade-left" class="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-slate-100">
          <div class="flex justify-between items-center mb-5">
            <h3 class="text-lg font-bold text-primary flex items-center gap-2">
              <div class="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center"><i class="fas fa-chart-bar text-emerald-500 text-sm"></i></div>
              평가현황
            </h3>
            <a href="/support/progress" class="text-accent text-xs font-semibold hover:underline">더보기 <i class="fas fa-chevron-right text-[10px]"></i></a>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-left text-slate-500 border-b border-slate-100">
                  <th class="pb-2.5 font-medium text-xs">구분</th>
                  <th class="pb-2.5 font-medium text-xs">제품명</th>
                  <th class="pb-2.5 font-medium text-xs">상태</th>
                </tr>
              </thead>
              <tbody>
                ${progress.length > 0 ? progress.map(p => `
                <tr class="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td class="py-2.5 text-xs text-slate-500">${p.category}</td>
                  <td class="py-2.5 text-slate-700 font-medium text-xs">${p.product_name}</td>
                  <td class="py-2.5">
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${p.status === '완료' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}">
                      <span class="w-1.5 h-1.5 rounded-full ${p.status === '완료' ? 'bg-green-500' : 'bg-amber-500'}"></span>
                      ${p.status}
                    </span>
                  </td>
                </tr>
                `).join('') : '<tr><td colspan="3" class="text-center py-6 text-slate-400 text-sm">등록된 현황이 없습니다.</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════ CTA ═══════════ -->
  <section class="py-14 lg:py-20 bg-gradient-to-br from-[#0F172A] via-[#1E3A5F] to-[#1E293B] relative overflow-hidden">
    <div class="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 right-1/4 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl"></div>
    <div class="relative max-w-[1320px] mx-auto px-4 lg:px-6 text-center" data-aos="fade-up">
      <p class="text-blue-300 text-xs font-semibold tracking-widest uppercase mb-3"><i class="fas fa-headset mr-1"></i>전문 상담 안내</p>
      <h2 class="text-white font-bold text-xl lg:text-3xl mb-3">정보보안 시험·인증이 필요하신가요?</h2>
      <p class="text-blue-200/70 text-sm lg:text-base mb-8 max-w-xl mx-auto">전문 상담원이 빠르고 정확하게 안내해 드립니다</p>
      <div class="flex flex-wrap justify-center gap-3">
        <a href="tel:${s.phone || '02-586-1230'}" class="inline-flex items-center gap-2 bg-white text-primary px-7 py-3 rounded-lg font-bold text-sm hover:shadow-xl transition-all">
          <i class="fas fa-phone text-xs"></i> ${s.phone || '02-586-1230'}
        </a>
        <a href="/support/inquiry" class="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-7 py-3 rounded-lg font-bold text-sm transition-all shadow-lg shadow-accent/20">
          <i class="fas fa-envelope text-xs"></i> 온라인 상담
        </a>
      </div>
    </div>
  </section>

  <!-- Mobile Fixed Phone -->
  <a href="tel:${s.phone || '02-586-1230'}" class="sm:hidden fixed bottom-5 right-5 z-50 w-12 h-12 bg-accent text-white rounded-full shadow-lg shadow-accent/30 flex items-center justify-center text-lg hover:scale-110 transition-transform">
    <i class="fas fa-phone"></i>
  </a>
  `;
}
