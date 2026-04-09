// KOIST - Home Page Template
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
  <!-- Popups -->
  ${popups.length > 0 ? `
  <div id="popupContainer">
    ${popups.map((p, i) => `
    <div class="popup-item fixed z-[100] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden" 
         style="top:${p.position_top}px;left:${p.position_left}px;width:min(${p.width}px, 90vw);max-height:90vh;"
         data-popup-id="${p.id}" id="popup-${p.id}">
      <div class="bg-primary/5 px-4 py-2 flex justify-between items-center border-b">
        <span class="text-sm font-medium text-gray-700">${p.title}</span>
        <button onclick="closePopup(${p.id})" class="text-gray-400 hover:text-gray-600 transition-colors p-1">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="p-4 overflow-y-auto" style="max-height:${p.height}px;">
        ${p.popup_type === 'image' && p.image_url ? `<img src="${p.image_url}" alt="${p.title}" class="w-full h-auto">` : p.content || ''}
      </div>
      <div class="px-4 py-2 bg-gray-50 border-t flex justify-end gap-2">
        <button onclick="closePopup(${p.id})" class="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors">닫기</button>
      </div>
    </div>
    `).join('')}
  </div>
  <script>
    (function() {
      const POPUP_KEY = 'koist_popups_shown';
      if (sessionStorage.getItem(POPUP_KEY)) {
        document.getElementById('popupContainer')?.remove();
        return;
      }
      sessionStorage.setItem(POPUP_KEY, Date.now().toString());
    })();
    function closePopup(id) {
      const el = document.getElementById('popup-' + id);
      if (el) el.style.display = 'none';
    }
  </script>
  ` : ''}

  <!-- Hero Section - Modern Bright US/EU Style -->
  <section class="relative min-h-[clamp(420px,60vh,700px)] bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center overflow-hidden">
    <!-- Background Pattern - Light -->
    <div class="absolute inset-0">
      <div class="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-blue-100/40 to-transparent"></div>
      <div class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-blue-50/50 to-transparent"></div>
      <svg class="absolute bottom-0 left-0 w-full opacity-30" viewBox="0 0 1440 320" fill="none">
        <path d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,202.7C1248,192,1344,160,1392,144L1440,128V320H0Z" fill="#DBEAFE"/>
      </svg>
      <!-- Floating decorative elements -->
      <div class="absolute top-[15%] left-[8%] text-blue-200/30 text-6xl animate-pulse"><i class="fas fa-shield-halved"></i></div>
      <div class="absolute top-[35%] right-[12%] text-blue-200/20 text-5xl animate-pulse" style="animation-delay:1s"><i class="fas fa-lock"></i></div>
      <div class="absolute bottom-[25%] left-[22%] text-blue-200/20 text-4xl animate-pulse" style="animation-delay:2s"><i class="fas fa-key"></i></div>
    </div>

    <div class="relative w-[min(92vw,1400px)] mx-auto px-[clamp(1rem,3vw,3rem)]">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(2rem,4vw,4rem)] items-center">
        
        <!-- Left: Slogan -->
        <div data-aos="fade-right">
          <div class="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full mb-6">
            <span class="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
            <span class="text-accent font-medium text-[clamp(0.7rem,1vw,0.85rem)]">국가 공인 정보보안 시험·평가 전문기관</span>
          </div>
          <h1 class="text-gray-800 font-black text-[clamp(1.1rem,2.2vw,1.9rem)] leading-[1.3] mb-6">
            ${s.site_slogan || '최상의 시험·인증 서비스로<br><span class="text-accent">정보보안 기술</span>을 완성'}
          </h1>
          <p class="text-gray-500 text-[clamp(0.7rem,0.8vw,0.85rem)] leading-relaxed mb-8 max-w-lg">
            ${s.site_sub_slogan || '정보보안 기술은 IT제품으로 구현되고 시험·인증 서비스를 통해 완성됩니다.'}
          </p>
          <div class="flex flex-wrap gap-3">
            <a href="/support/inquiry" class="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-full font-medium transition-all hover:shadow-lg hover:shadow-accent/25 text-[clamp(0.8rem,1vw,1rem)]">
              <i class="fas fa-paper-plane"></i> 온라인 상담
            </a>
            <a href="#services" class="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-medium transition-all text-[clamp(0.8rem,1vw,1rem)]">
              <i class="fas fa-grid-2"></i> 사업분야 보기
            </a>
          </div>
        </div>

        <!-- Right: Contact Badge - Bright Card Style -->
        <div data-aos="fade-left" data-aos-delay="200" class="flex justify-center lg:justify-end">
          <div class="relative bg-white rounded-2xl shadow-xl shadow-blue-100/50 border border-gray-100 p-[clamp(1.5rem,3vw,2.5rem)] max-w-md w-full">
            <!-- Accent top border -->
            <div class="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-accent to-blue-400 rounded-b-full"></div>
            <!-- Pulse effect -->
            <div class="absolute -top-2.5 -right-2.5 w-5 h-5 bg-green-400 rounded-full animate-ping opacity-75"></div>
            <div class="absolute -top-2.5 -right-2.5 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
            
            <div class="text-gray-400 text-[clamp(0.7rem,1vw,0.9rem)] font-medium mb-2 tracking-wider uppercase">
              <i class="fas fa-headset mr-1 text-accent"></i> 상담문의
            </div>
            
            <a href="tel:${s.phone || '02-586-1230'}" 
               class="block text-gray-800 font-black text-[clamp(1.2rem,2.5vw,2rem)] leading-tight mb-4 hover:text-accent transition-colors tracking-tight">
              ${s.phone_display || s.phone || '02-586-1230'}
            </a>
            
            <div class="space-y-2.5 text-gray-600">
              <div class="flex items-center gap-2.5 text-[clamp(0.75rem,1.1vw,1rem)]">
                <div class="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center shrink-0"><i class="fas fa-envelope text-accent text-xs"></i></div>
                <a href="mailto:${s.email || 'koist@koist.kr'}" class="hover:text-accent transition-colors">${s.email || 'koist@koist.kr'}</a>
              </div>
              <div class="flex items-center gap-2.5 text-[clamp(0.75rem,1.1vw,1rem)]">
                <div class="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center shrink-0"><i class="fas fa-fax text-accent text-xs"></i></div>
                <span>FAX ${s.fax || '02-586-1238'}</span>
              </div>
              <div class="flex items-start gap-2.5 text-[clamp(0.7rem,1vw,0.9rem)]">
                <div class="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5"><i class="fas fa-location-dot text-accent text-xs"></i></div>
                <span class="leading-snug">${s.address || '서울특별시 서초구 효령로 336 윤일빌딩 4층'}</span>
              </div>
            </div>

            <!-- CC평가 즉시착수 배지 -->
            <div class="mt-4 pt-4 border-t border-gray-100">
              <div class="flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-2 rounded-lg">
                <i class="fas fa-bolt text-yellow-500"></i>
                <span class="text-green-700 font-bold text-[clamp(0.75rem,1vw,0.95rem)]">CC평가 신청 즉시 착수 가능</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section id="services" class="py-[clamp(3rem,6vh,6rem)] bg-gradient-to-b from-white to-blue-50/30">
    <div class="w-[min(92vw,1400px)] mx-auto px-[clamp(1rem,3vw,3rem)]">
      <div class="text-center mb-[clamp(2rem,4vh,4rem)]" data-aos="fade-up">
        <h2 class="text-[clamp(1.4rem,3vw,2.5rem)] font-bold text-gray-800 mb-3">핵심 사업분야</h2>
        <p class="text-gray-500 text-[clamp(0.85rem,1.2vw,1.1rem)]">KOIST의 모든 사업 분야를 한눈에 확인하세요</p>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[clamp(0.8rem,1.5vw,1.5rem)]">
        ${deps.map((dept, i) => `
        <a href="/services/${dept.slug}" class="service-card group block bg-white border border-gray-100 rounded-xl p-[clamp(1.2rem,2vw,1.8rem)] hover:border-transparent relative overflow-hidden" data-aos="fade-up" data-aos-delay="${i * 60}">
          <div class="absolute top-0 left-0 right-0 h-1 transition-all group-hover:h-1.5" style="background:${dept.color}"></div>
          <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style="background:${dept.color}15">
            <i class="fas ${dept.icon} text-xl" style="color:${dept.color}"></i>
          </div>
          <h3 class="font-bold text-gray-800 text-[clamp(0.9rem,1.1vw,1.1rem)] mb-2 group-hover:text-accent transition-colors">${dept.name}</h3>
          <p class="text-gray-500 text-[clamp(0.7rem,0.9vw,0.85rem)] leading-relaxed line-clamp-2">${dept.description || ''}</p>
          <div class="mt-3 flex items-center gap-1 text-accent text-[clamp(0.7rem,0.85vw,0.8rem)] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            자세히 보기 <i class="fas fa-arrow-right text-xs"></i>
          </div>
        </a>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Info Section: Notices + Progress -->
  <section class="py-[clamp(3rem,6vh,6rem)] bg-white">
    <div class="w-[min(92vw,1400px)] mx-auto px-[clamp(1rem,3vw,3rem)]">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(1.5rem,3vw,3rem)]">
        
        <!-- Notices -->
        <div data-aos="fade-right" class="bg-white rounded-2xl p-[clamp(1.5rem,2.5vw,2.5rem)] shadow-sm border border-gray-100">
          <div class="flex justify-between items-center mb-5">
            <h3 class="text-[clamp(1.1rem,1.5vw,1.4rem)] font-bold text-gray-800 flex items-center gap-2">
              <i class="fas fa-bullhorn text-accent"></i> 공지사항
            </h3>
            <a href="/support/notice" class="text-accent text-sm hover:underline">더보기 <i class="fas fa-chevron-right text-xs"></i></a>
          </div>
          <div class="space-y-1">
            ${notices.length > 0 ? notices.map(n => `
            <a href="/support/notice/${n.id}" class="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors group">
              ${n.is_pinned ? '<span class="shrink-0 w-5 h-5 bg-red-500 text-white text-[10px] rounded flex items-center justify-center font-bold">N</span>' : '<span class="shrink-0 w-1.5 h-1.5 bg-gray-300 rounded-full"></span>'}
              <span class="flex-1 text-sm text-gray-700 truncate group-hover:text-accent transition-colors">${n.title}</span>
              <span class="shrink-0 text-xs text-gray-400">${n.created_at ? n.created_at.split('T')[0] : ''}</span>
            </a>
            `).join('') : '<p class="text-gray-400 text-sm py-4 text-center">등록된 공지사항이 없습니다.</p>'}
          </div>
        </div>

        <!-- Progress -->
        <div data-aos="fade-left" class="bg-white rounded-2xl p-[clamp(1.5rem,2.5vw,2.5rem)] shadow-sm border border-gray-100">
          <div class="flex justify-between items-center mb-5">
            <h3 class="text-[clamp(1.1rem,1.5vw,1.4rem)] font-bold text-gray-800 flex items-center gap-2">
              <i class="fas fa-chart-bar text-accent"></i> 평가현황
            </h3>
            <a href="/support/progress" class="text-accent text-sm hover:underline">더보기 <i class="fas fa-chevron-right text-xs"></i></a>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-left text-gray-500 border-b">
                  <th class="pb-2 font-medium">구분</th>
                  <th class="pb-2 font-medium">제품명</th>
                  <th class="pb-2 font-medium">상태</th>
                </tr>
              </thead>
              <tbody>
                ${progress.length > 0 ? progress.map(p => `
                <tr class="border-b border-gray-50 hover:bg-gray-50">
                  <td class="py-2.5 text-xs text-gray-500">${p.category}</td>
                  <td class="py-2.5 text-gray-700">${p.product_name}</td>
                  <td class="py-2.5">
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${p.status === '완료' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}">
                      <span class="w-1.5 h-1.5 rounded-full ${p.status === '완료' ? 'bg-green-500' : 'bg-yellow-500'}"></span>
                      ${p.status}
                    </span>
                  </td>
                </tr>
                `).join('') : '<tr><td colspan="3" class="text-center py-4 text-gray-400">등록된 현황이 없습니다.</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section - Bright Style -->
  <section class="py-[clamp(3rem,5vh,5rem)] bg-gradient-to-r from-accent to-blue-500">
    <div class="w-[min(92vw,1400px)] mx-auto px-[clamp(1rem,3vw,3rem)] text-center" data-aos="fade-up">
      <h2 class="text-white font-bold text-[clamp(1.3rem,2.5vw,2.2rem)] mb-4">정보보안 시험·인증이 필요하신가요?</h2>
      <p class="text-white/90 text-[clamp(0.85rem,1.2vw,1.1rem)] mb-6">전문 상담원이 빠르고 정확하게 안내해 드립니다</p>
      <div class="flex flex-wrap justify-center gap-4">
        <a href="tel:${s.phone || '02-586-1230'}" class="inline-flex items-center gap-2 bg-white text-accent px-8 py-3.5 rounded-full font-bold hover:shadow-lg transition-all text-[clamp(0.9rem,1.2vw,1.1rem)]">
          <i class="fas fa-phone"></i> ${s.phone || '02-586-1230'}
        </a>
        <a href="/support/inquiry" class="inline-flex items-center gap-2 bg-white/20 text-white border-2 border-white/40 px-8 py-3.5 rounded-full font-bold hover:bg-white/30 transition-all text-[clamp(0.9rem,1.2vw,1.1rem)]">
          <i class="fas fa-envelope"></i> 온라인 상담
        </a>
      </div>
    </div>
  </section>

  <!-- Mobile Fixed Phone Button -->
  <a href="tel:${s.phone || '02-586-1230'}" class="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent text-white rounded-full shadow-lg shadow-accent/30 flex items-center justify-center text-xl hover:scale-110 transition-transform">
    <i class="fas fa-phone"></i>
  </a>
  `;
}
