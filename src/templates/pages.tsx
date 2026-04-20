// KOIST - Service & Content Page Templates (v7.0 - Ultra Premium 4K/8K HiDPI)
import type { SettingsMap, Department, DepPage, Notice, FAQ, ProgressItem } from '../types';
import { sanitizeHtml, escapeHtml } from '../utils/sanitize';

/* ══════════════════════════════════════════════════════════
   SHARED: Premium Page Header Component
   ══════════════════════════════════════════════════════════ */
function pageHeader(opts: {
  title: string;
  subtitle?: string;
  icon: string;
  iconColor: string;
  breadcrumbs?: { label: string; href?: string }[];
  settings: SettingsMap;
  bgUrl?: string;
  contactInfo?: { dept?: string; name?: string; phone?: string };
}) {
  const s = opts.settings;
  const bg = opts.bgUrl || s.page_header_bg_url || '';
  return `
  <section class="page-header relative overflow-hidden" style="padding: clamp(2.5rem,4vw,4.5rem) 0; ${bg ? `background-image: linear-gradient(135deg, rgba(10,15,30,0.88), rgba(15,25,50,0.92)), url('${bg}'); background-size:cover; background-position:center;` : 'background: linear-gradient(135deg, #0A0F1E 0%, #111D35 50%, #0D1525 100%);'}">
    <!-- Decorative particles -->
    <div class="absolute top-4 right-[10%] w-32 h-32 rounded-full blur-3xl pointer-events-none" style="background: radial-gradient(circle, rgba(59,130,246,0.06), transparent);"></div>
    <div class="absolute bottom-2 left-[15%] w-24 h-24 rounded-full blur-3xl pointer-events-none" style="background: radial-gradient(circle, rgba(6,182,212,0.05), transparent);"></div>
    <!-- Dot pattern overlay -->
    <div class="absolute inset-0 opacity-30" style="background-image: radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 24px 24px;"></div>

    <div class="relative fluid-container">
      ${opts.breadcrumbs ? `
      <nav class="flex items-center flex-wrap text-slate-400 f-text-xs" style="gap:6px; margin-bottom:var(--space-sm)">
        ${opts.breadcrumbs.map((b, i) => `
          ${i > 0 ? '<i class="fas fa-chevron-right text-[7px] text-slate-600/60"></i>' : ''}
          ${b.href ? `<a href="${b.href}" class="hover:text-white/90 transition-colors">${b.label}</a>` : `<span class="text-white/90 font-medium">${b.label}</span>`}
        `).join('')}
      </nav>` : ''}
      <div class="flex items-center justify-between flex-wrap" style="gap:var(--space-sm)">
        <div class="flex items-center" style="gap:var(--space-sm)">
          <div class="rounded-lg flex items-center justify-center shrink-0" style="width:clamp(38px,3.2vw,46px); height:clamp(38px,3.2vw,46px); background: linear-gradient(135deg, ${opts.iconColor}20, ${opts.iconColor}10); border: 1px solid ${opts.iconColor}15;">
            <i class="fas ${opts.icon}" style="color:${opts.iconColor}; font-size:var(--text-lg)"></i>
          </div>
          <div>
            <h1 class="text-white font-bold f-text-xl tracking-tight">${opts.title}</h1>
            ${opts.subtitle ? `<p class="text-slate-400/80 f-text-xs" style="margin-top:3px">${opts.subtitle}</p>` : ''}
          </div>
        </div>
        ${opts.contactInfo && (opts.contactInfo.dept || opts.contactInfo.name || opts.contactInfo.phone) ? `
        <div class="hidden sm:flex items-center shrink-0 rounded-xl" style="gap:clamp(14px,1.8vw,24px); padding:clamp(12px,1.2vw,20px) clamp(20px,2.4vw,36px); background:rgba(255,255,255,0.07); backdrop-filter:blur(12px); border:1.5px solid rgba(255,255,255,0.12); box-shadow:0 4px 24px rgba(0,0,0,0.15); -webkit-font-smoothing:antialiased; text-rendering:optimizeLegibility;">
          <div class="rounded-lg flex items-center justify-center shrink-0" style="width:clamp(48px,5vw,60px);height:clamp(48px,5vw,60px);background:linear-gradient(135deg,rgba(59,130,246,0.25),rgba(6,182,212,0.20));">
            <i class="fas fa-headset text-blue-400" style="font-size:clamp(22px,2.4vw,28px)"></i>
          </div>
          <div style="line-height:1.5">
            <div class="text-slate-200 font-bold" style="white-space:nowrap; font-size:clamp(0.85rem,0.9vw,1.05rem); letter-spacing:0.02em;">
              ${opts.contactInfo.dept ? `<span>${opts.contactInfo.dept}</span>` : ''}${opts.contactInfo.dept && opts.contactInfo.name ? '<span class="text-slate-500 mx-2">|</span>' : ''}${opts.contactInfo.name ? `<span>${opts.contactInfo.name}</span>` : ''}
            </div>
            ${opts.contactInfo.phone ? `<a href="tel:${opts.contactInfo.phone}" class="text-blue-400 font-extrabold hover:text-blue-300 transition-colors" style="white-space:nowrap; font-size:clamp(1.05rem,1.2vw,1.35rem); letter-spacing:0.03em;"><i class="fas fa-phone" style="font-size:clamp(13px,1.1vw,16px);margin-right:6px"></i>${opts.contactInfo.phone}</a>` : ''}
          </div>
        </div>` : ''}
      </div>
    </div>
  </section>`;
}

/* ══════════════════════════════════════════════════════════
   SHARED: Premium Status Badge
   ══════════════════════════════════════════════════════════ */
function statusBadge(status: string) {
  // 원본 koist.kr 사이트 상태값 반영: 평가완료/발급완료(완료), 평가진행/시험진행(진행), 평가접수/시험접수(접수)
  const isComplete = status === '평가완료' || status === '발급완료';
  const isProgress = status === '평가진행' || status === '시험진행';
  const cls = isComplete ? 'badge-complete' : isProgress ? 'badge-progress' : 'badge-received';
  return `<span class="badge-status ${cls}"><span class="badge-dot"></span>${status}</span>`;
}


/* ────────────── Service Detail Page ────────────── */
export function servicePage(dept: Department, pages: DepPage[], currentPage: DepPage | null, settings: SettingsMap) {
  const s = settings;
  const headerBg = (currentPage as any)?.header_bg_url || dept.header_bg_url || s.page_header_bg_url || '';

  return `
  ${pageHeader({
    title: currentPage ? currentPage.title : dept.name,
    subtitle: dept.description || '',
    icon: dept.icon,
    iconColor: dept.color,
    breadcrumbs: [
      { label: '홈', href: '/' },
      { label: dept.name, href: '/services/' + dept.slug },
      ...(currentPage ? [{ label: currentPage.title }] : [])
    ],
    settings: s,
    bgUrl: headerBg,
    contactInfo: {
      dept: (dept as any).contact_dept || '',
      name: (dept as any).contact_name || '',
      phone: (dept as any).contact_phone || '',
    },
  })}

  <!-- Content -->
  <section style="padding:var(--space-xl) 0; background: var(--grad-surface);">
    <div class="fluid-container">
      <div class="flex flex-col lg:flex-row" style="gap:clamp(1rem, 2vw, 1.5rem)">

        <!-- Sidebar -->
        ${pages.length > 1 ? `
        <aside class="shrink-0" style="width:clamp(180px, 15vw, 224px)">
          <div class="bg-white rounded-xl border border-slate-200/60 overflow-hidden sticky" style="top:calc(var(--gnb-h) + var(--space-sm)); box-shadow: var(--shadow-sm);">
            <div class="font-semibold text-white f-text-sm" style="padding:var(--space-sm) var(--space-md); background: linear-gradient(135deg, #0F172A, #1E293B);">${dept.name}</div>
            <nav style="padding:var(--space-xs)">
              ${pages.filter(p => p.is_active).map(p => `
              <a href="/services/${dept.slug}/${p.slug}" 
                 class="block rounded-lg transition-all f-text-sm ${currentPage?.id === p.id ? 'font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}"
                 style="padding:var(--space-sm) var(--space-md); ${currentPage?.id === p.id ? `background: rgba(59,130,246,0.06); color: #2563EB; border-left: 3px solid #2563EB; padding-left: calc(var(--space-md) - 3px);` : ''}">
                ${p.title}
              </a>
              `).join('')}
            </nav>
          </div>
        </aside>
        ` : ''}

        <!-- Main -->
        <div class="flex-1 min-w-0">
          <div class="bg-white rounded-xl border border-slate-200/60" style="padding:clamp(1.25rem, 2.5vw, 2.25rem); box-shadow: var(--shadow-sm);">
            <div class="prose prose-slate max-w-none prose-headings:text-primary prose-p:text-slate-600 prose-li:text-slate-600 prose-a:text-accent" style="font-size:var(--text-sm)">
              ${currentPage ? sanitizeHtml(currentPage.content) : (pages.length > 0 ? sanitizeHtml(pages[0].content) : '<p class="text-slate-400">콘텐츠가 준비 중입니다.</p>')}
            </div>
          </div>

          <!-- CTA -->
          <div class="rounded-xl relative overflow-hidden" style="margin-top:var(--space-md); padding:var(--space-md); background: linear-gradient(135deg, #0F172A, #1A2E4A);">
            <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 20px 20px;"></div>
            <div class="relative flex flex-col sm:flex-row items-center justify-between" style="gap:var(--space-md)">
              <div>
                <h3 class="font-bold text-white f-text-sm">${dept.name}에 대해 궁금하신 점이 있으신가요?</h3>
                <p class="text-slate-400/80 f-text-xs" style="margin-top:3px">${(dept as any).contact_dept || (dept as any).contact_name ? `${(dept as any).contact_dept ? `담당부서: ${(dept as any).contact_dept}` : ''}${(dept as any).contact_dept && (dept as any).contact_name ? ' | ' : ''}${(dept as any).contact_name ? `담당자: ${(dept as any).contact_name}` : ''}` : '전문 상담원이 친절하게 안내해 드립니다.'}</p>
              </div>
              <div class="flex shrink-0" style="gap:var(--space-sm)">
                <a href="tel:${(dept as any).contact_phone || s.phone || '02-586-1230'}" class="btn-primary f-text-xs ripple-btn" style="padding:var(--space-sm) var(--space-md)">
                  <i class="fas fa-phone" style="font-size:10px"></i> ${(dept as any).contact_phone || s.phone || '02-586-1230'}
                </a>
                <a href="/support/inquiry" class="btn-ghost f-text-xs" style="padding:var(--space-sm) var(--space-md)">
                  <i class="fas fa-envelope" style="font-size:10px"></i> 상담문의
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}


/* ────────────── Notice List (Premium Table) ────────────── */
export function noticeListPage(notices: Notice[], page: number, total: number, perPage: number, settings: SettingsMap = {}) {
  const s = settings;
  const totalPages = Math.ceil(total / perPage);
  return `
  ${pageHeader({
    title: '공지사항',
    icon: 'fa-bullhorn',
    iconColor: '#60A5FA',
    settings: s,
  })}

  <section style="padding:var(--space-xl) 0; background: var(--grad-surface);">
    <div class="fluid-container" style="max-width:min(1100px, 100% - var(--container-pad) * 2)">
      <div class="bg-white rounded-xl border border-slate-200/60 overflow-hidden" style="box-shadow: var(--shadow-sm);">
        <table class="w-full table-compact">
          <thead>
            <tr style="background: linear-gradient(135deg, #0F172A, #1E293B);">
              <th class="text-left text-slate-300 f-text-xs" style="padding:var(--space-sm) var(--space-md); width:50px">번호</th>
              <th class="text-left text-slate-300 f-text-xs" style="padding:var(--space-sm) var(--space-md)">제목</th>
              <th class="text-center text-slate-300 f-text-xs hidden sm:table-cell" style="padding:var(--space-sm) var(--space-md); width:70px">조회수</th>
              <th class="text-center text-slate-300 f-text-xs" style="padding:var(--space-sm) var(--space-md); width:90px">작성일</th>
            </tr>
          </thead>
          <tbody>
            ${notices.map((n, i) => `
            <tr class="border-t border-slate-100/70 hover:bg-blue-50/30 transition-colors">
              <td class="text-slate-400 f-text-xs" style="padding:var(--space-sm) var(--space-md)">${n.is_pinned ? '<span class="inline-flex items-center justify-center bg-red-500 text-white rounded font-bold" style="width:18px;height:18px;font-size:9px">N</span>' : (total - (page - 1) * perPage - i)}</td>
              <td style="padding:var(--space-sm) var(--space-md)"><a href="/support/notice/${n.id}" class="text-slate-800 hover:text-accent transition-colors font-medium f-text-sm">${escapeHtml(n.title)}</a></td>
              <td class="text-center text-slate-400 hidden sm:table-cell f-text-xs" style="padding:var(--space-sm) var(--space-md)">${n.views}</td>
              <td class="text-center text-slate-400 f-text-xs" style="padding:var(--space-sm) var(--space-md)">${n.created_at?.split('T')[0] || ''}</td>
            </tr>
            `).join('')}
            ${notices.length === 0 ? '<tr><td colspan="4" class="text-center text-slate-400 f-text-sm" style="padding:var(--space-2xl) 0"><i class="fas fa-inbox text-slate-300 block" style="font-size:1.5rem;margin-bottom:var(--space-sm)"></i>등록된 공지사항이 없습니다.</td></tr>' : ''}
          </tbody>
        </table>
      </div>
      ${totalPages > 1 ? `
      <div class="flex justify-center" style="gap:var(--space-xs); margin-top:var(--space-lg)">
        ${Array.from({ length: totalPages }, (_, i) => i + 1).map(p => `
        <a href="/support/notice?page=${p}" class="flex items-center justify-center rounded-lg font-medium f-text-xs transition-all ${p === page ? 'text-white' : 'bg-white text-slate-600 border border-slate-200/70 hover:bg-slate-50 hover:border-slate-300'}" style="width:clamp(30px,2.5vw,34px); height:clamp(30px,2.5vw,34px); ${p === page ? 'background: linear-gradient(135deg, #2563EB, #3B82F6); box-shadow: 0 2px 8px rgba(37,99,235,0.25);' : ''}">${p}</a>
        `).join('')}
      </div>` : ''}
    </div>
  </section>`;
}


/* ────────────── Notice Detail ────────────── */
export function noticeDetailPage(notice: Notice, settings: SettingsMap = {}) {
  const s = settings;
  return `
  ${pageHeader({
    title: notice.title,
    subtitle: (notice.created_at?.split('T')[0] || '') + ' · 조회수 ' + notice.views,
    icon: 'fa-bullhorn',
    iconColor: '#60A5FA',
    breadcrumbs: [
      { label: '홈', href: '/' },
      { label: '공지사항', href: '/support/notice' },
      { label: '상세' }
    ],
    settings: s,
  })}

  <section style="padding:var(--space-xl) 0; background: var(--grad-surface);">
    <div class="fluid-container" style="max-width:min(900px, 100% - var(--container-pad) * 2)">
      <div class="bg-white rounded-xl border border-slate-200/60" style="padding:clamp(1.25rem, 2.5vw, 2.25rem); box-shadow: var(--shadow-sm);">
        <div class="prose prose-slate max-w-none prose-headings:text-primary" style="font-size:var(--text-sm)">${sanitizeHtml(notice.content)}</div>
      </div>
      <div class="text-center" style="margin-top:var(--space-md)">
        <a href="/support/notice" class="btn-primary f-text-sm ripple-btn" style="padding:var(--space-sm) var(--space-lg)"><i class="fas fa-list f-text-xs"></i> 목록</a>
      </div>
    </div>
  </section>`;
}


/* ────────────── FAQ (Accordion) ────────────── */
export function faqPage(faqs: FAQ[], settings: SettingsMap = {}) {
  const s = settings;
  return `
  ${pageHeader({
    title: '자주 묻는 질문',
    icon: 'fa-circle-question',
    iconColor: '#22D3EE',
    settings: s,
  })}

  <section style="padding:var(--space-xl) 0; background: var(--grad-surface);">
    <div class="fluid-container" style="max-width:min(900px, 100% - var(--container-pad) * 2); display:flex; flex-direction:column; gap:var(--space-sm)">
      ${faqs.map((f, i) => `
      <div class="bg-white rounded-xl border border-slate-200/60 overflow-hidden transition-all hover:border-slate-300/70" style="box-shadow: var(--shadow-xs);">
        <button onclick="toggleFaq(${i})" class="w-full flex items-center justify-between text-left hover:bg-slate-50/50 transition-colors" style="padding:clamp(0.85rem, 1.5vw, 1.3rem)">
          <span class="font-medium text-slate-800 flex items-center f-text-sm" style="gap:var(--space-sm)">
            <span class="rounded-full flex items-center justify-center shrink-0 font-bold f-text-xs" style="width:clamp(22px,2vw,26px); height:clamp(22px,2vw,26px); background: linear-gradient(135deg, rgba(59,130,246,0.10), rgba(6,182,212,0.08)); color: #2563EB;">Q</span>
            ${escapeHtml(f.question)}
          </span>
          <i class="fas fa-chevron-down text-slate-400 transition-transform duration-300 ml-3 shrink-0 f-text-xs" id="faq-icon-${i}"></i>
        </button>
        <div id="faq-body-${i}" class="hidden" style="padding:0 clamp(0.85rem, 1.5vw, 1.3rem) clamp(0.85rem, 1.5vw, 1.3rem)">
          <div class="text-slate-600 leading-relaxed f-text-sm" style="padding-left:calc(clamp(22px,2vw,26px) + var(--space-sm)); border-left: 2px solid rgba(59,130,246,0.12); padding-top: 2px; padding-bottom: 2px; margin-left: 0;">${sanitizeHtml(f.answer)}</div>
        </div>
      </div>
      `).join('')}
      ${faqs.length === 0 ? '<p class="text-center text-slate-400 f-text-sm" style="padding:var(--space-2xl) 0"><i class="fas fa-comment-slash text-slate-300 block" style="font-size:1.5rem;margin-bottom:var(--space-sm)"></i>등록된 FAQ가 없습니다.</p>' : ''}
    </div>
  </section>
  <script>
    function toggleFaq(i) {
      var body = document.getElementById('faq-body-' + i);
      var icon = document.getElementById('faq-icon-' + i);
      body.classList.toggle('hidden');
      icon.style.transform = body.classList.contains('hidden') ? '' : 'rotate(180deg)';
    }
  </script>`;
}


/* ────────────── Inquiry Form (Premium) ────────────── */
export function inquiryPage(settings: SettingsMap) {
  const s = settings || {};
  return `
  ${pageHeader({
    title: '온라인 상담문의',
    icon: 'fa-envelope',
    iconColor: '#F59E0B',
    settings: s,
  })}

  <section style="padding:var(--space-xl) 0; background: var(--grad-surface);">
    <div class="fluid-container" style="max-width:min(720px, 100% - var(--container-pad) * 2)">
      <!-- Info banner -->
      <div class="rounded-xl flex items-center" style="padding:var(--space-md); margin-bottom:var(--space-md); gap:var(--space-sm); background: linear-gradient(135deg, rgba(59,130,246,0.04), rgba(6,182,212,0.03)); border: 1px solid rgba(59,130,246,0.10);">
        <div class="shrink-0 rounded-lg flex items-center justify-center" style="width:36px; height:36px; background: linear-gradient(135deg, rgba(59,130,246,0.10), rgba(6,182,212,0.08));">
          <i class="fas fa-info-circle text-accent f-text-sm"></i>
        </div>
        <p class="text-slate-600 f-text-sm">빠른 상담은 <strong class="text-accent">${s.phone || '02-586-1230'}</strong>으로 연락주시면 더욱 빠르게 안내받으실 수 있습니다.</p>
      </div>

      <form id="inquiryForm" class="bg-white rounded-xl border border-slate-200/60" style="padding:clamp(1.25rem, 2.5vw, 2.25rem); box-shadow: var(--shadow-sm);">
        <div class="grid grid-cols-1 sm:grid-cols-2" style="gap:var(--space-md); margin-bottom:var(--space-md)">
          <div>
            <label class="block font-semibold text-slate-700 f-text-xs" style="margin-bottom:var(--space-xs)">이름 <span class="text-red-500">*</span></label>
            <input type="text" name="name" required class="input-premium">
          </div>
          <div>
            <label class="block font-semibold text-slate-700 f-text-xs" style="margin-bottom:var(--space-xs)">회사명</label>
            <input type="text" name="company" class="input-premium">
          </div>
          <div>
            <label class="block font-semibold text-slate-700 f-text-xs" style="margin-bottom:var(--space-xs)">이메일</label>
            <input type="email" name="email" class="input-premium">
          </div>
          <div>
            <label class="block font-semibold text-slate-700 f-text-xs" style="margin-bottom:var(--space-xs)">연락처</label>
            <input type="tel" name="phone" class="input-premium">
          </div>
        </div>
        <div style="margin-bottom:var(--space-md)">
          <label class="block font-semibold text-slate-700 f-text-xs" style="margin-bottom:var(--space-xs)">제목 <span class="text-red-500">*</span></label>
          <input type="text" name="subject" required class="input-premium">
        </div>
        <div style="margin-bottom:var(--space-lg)">
          <label class="block font-semibold text-slate-700 f-text-xs" style="margin-bottom:var(--space-xs)">문의 내용 <span class="text-red-500">*</span></label>
          <textarea name="message" rows="5" required class="input-premium" style="resize:vertical;"></textarea>
        </div>
        <button type="submit" id="inquiryBtn" class="w-full btn-primary justify-center f-text-sm ripple-btn" style="padding:var(--space-sm) 0; border-radius: var(--radius-md);">
          <i class="fas fa-paper-plane f-text-xs"></i> 문의하기
        </button>
        <div id="inquiryMsg" class="hidden rounded-lg f-text-sm" style="margin-top:var(--space-md); padding:var(--space-sm) var(--space-md)"></div>
      </form>
    </div>
  </section>
  <script>
    document.getElementById('inquiryForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      var btn = document.getElementById('inquiryBtn');
      var msg = document.getElementById('inquiryMsg');
      var form = e.target;
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i> 전송 중...';
      try {
        var body = {};
        new FormData(form).forEach(function(v, k) { body[k] = v; });
        var res = await fetch('/api/inquiries', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) });
        var data = await res.json();
        if (data.success) {
          msg.className = 'rounded-lg f-text-sm bg-green-50 text-green-700 border border-green-200';
          msg.style.cssText = 'margin-top:var(--space-md); padding:var(--space-sm) var(--space-md)';
          msg.innerHTML = '<i class="fas fa-check-circle mr-1"></i> 문의가 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.';
          form.reset();
        } else {
          msg.className = 'rounded-lg f-text-sm bg-red-50 text-red-700 border border-red-200';
          msg.style.cssText = 'margin-top:var(--space-md); padding:var(--space-sm) var(--space-md)';
          msg.textContent = data.error || '전송에 실패했습니다.';
        }
      } catch(err) {
        msg.className = 'rounded-lg f-text-sm bg-red-50 text-red-700 border border-red-200';
        msg.style.cssText = 'margin-top:var(--space-md); padding:var(--space-sm) var(--space-md)';
        msg.textContent = '서버 연결 실패';
      }
      msg.classList.remove('hidden');
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane mr-1"></i> 문의하기';
    });
  </script>`;
}


/* ══════════════════════════════════════════════════════════
   Category Definitions (10 Business Types)
   ══════════════════════════════════════════════════════════ */
// 원본 koist.kr 실제 카테고리 구조 (4개 핵심 + 6개 확장)
// CC평가 → /cc_progress: 제품명, 보증등급, 인증구분, 신청구분, 진행상태
// 보안기능시험 → /test1_progress: 제품명, 제품유형, 발급유형, 신청구분, 진행상태
// 암호모듈검증 → /test3_progress: 암호모듈, 개발사, 모듈형태, 보안수준, 진행현황
// 성능평가 → /test2_progress: 제품유형, 제품명, 운영체제, 개발사, 발급일
const CATEGORY_META: Record<string, { icon: string; color: string; col2: string; col3: string; col4: string }> = {
  'CC평가':       { icon: 'fa-shield-halved', color: '#3B82F6', col2: '보증등급', col3: '인증구분', col4: '신청구분' },
  '보안기능시험':   { icon: 'fa-file-shield', color: '#8B5CF6', col2: '제품유형', col3: '발급유형', col4: '신청구분' },
  '암호모듈검증':   { icon: 'fa-lock', color: '#EC4899', col2: '보안수준', col3: '모듈형태', col4: '-' },
  '성능평가':      { icon: 'fa-gauge-high', color: '#F59E0B', col2: '제품유형', col3: '운영체제', col4: '개발사' },
  '보안적합성검증':  { icon: 'fa-clipboard-check', color: '#10B981', col2: '적합등급', col3: '검증구분', col4: '검증기준' },
  '취약점분석평가':  { icon: 'fa-bug', color: '#EF4444', col2: '위험등급', col3: '분석유형', col4: '평가범위' },
  '정보보호제품평가': { icon: 'fa-box-archive', color: '#06B6D4', col2: '평가등급', col3: '제품유형', col4: '평가기준' },
  '클라우드보안인증': { icon: 'fa-cloud-arrow-up', color: '#6366F1', col2: '인증등급', col3: '서비스유형', col4: '인증기준' },
  'IoT보안인증':   { icon: 'fa-microchip', color: '#14B8A6', col2: '인증등급', col3: '기기유형', col4: '인증기준' },
  '기타시험평가':   { icon: 'fa-flask', color: '#78716C', col2: '등급', col3: '유형', col4: '기준' },
};

function getCatMeta(cat: string) {
  return CATEGORY_META[cat] || { icon: 'fa-chart-bar', color: '#64748B', col2: '등급', col3: '구분', col4: '유형' };
}

/* ══════════════════════════════════════════════════════════
   Progress Page (Full-featured with Category Tabs)
   ══════════════════════════════════════════════════════════ */
export function progressPage(items: ProgressItem[], page: number = 1, total: number = 0, perPage: number = 15, search: string = '', statusFilter: string = '', categoryFilter: string = '', categoryCounts: {category:string;cnt:number}[] = [], settings: SettingsMap = {}) {
  const s = settings;
  const totalPages = Math.ceil(total / perPage);
  const startNum = total - (page - 1) * perPage;
  const meta = getCatMeta(categoryFilter);
  const grandTotal = categoryCounts.reduce((sum, c) => sum + c.cnt, 0);

  function pageUrl(p: number) {
    const params = new URLSearchParams();
    params.set('page', String(p));
    if (categoryFilter) params.set('category', categoryFilter);
    if (search) params.set('q', search);
    if (statusFilter) params.set('status', statusFilter);
    return '/support/progress?' + params.toString();
  }

  function catUrl(cat: string) {
    const params = new URLSearchParams();
    if (cat) params.set('category', cat);
    return '/support/progress' + (params.toString() ? '?' + params.toString() : '');
  }

  return `
  ${pageHeader({
    title: categoryFilter ? categoryFilter + ' 현황' : '평가·시험·인증 현황',
    subtitle: '총 ' + total + '건의 현황' + (categoryFilter ? '' : ' (전체 사업)'),
    icon: categoryFilter ? meta.icon : 'fa-chart-bar',
    iconColor: categoryFilter ? meta.color : '#34D399',
    settings: s,
  })}

  <section style="padding:var(--space-xl) 0; background: var(--grad-surface);">
    <div class="fluid-container">

      <!-- Category Tabs -->
      <div class="bg-white rounded-xl border border-slate-200/60 overflow-hidden" style="margin-bottom:var(--space-md); box-shadow: var(--shadow-xs);">
        <div class="flex items-center overflow-x-auto" style="gap:0; -webkit-overflow-scrolling:touch; scrollbar-width:none;">
          <a href="${catUrl('')}" class="shrink-0 flex items-center transition-all f-text-xs font-medium border-b-2 ${!categoryFilter ? 'text-blue-600 border-blue-500 bg-blue-50/60' : 'text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-50'}" style="padding:12px 16px; gap:6px; white-space:nowrap;">
            <i class="fas fa-layer-group" style="font-size:11px"></i> 전체 <span class="text-slate-400 font-normal">${grandTotal}</span>
          </a>
          ${categoryCounts.map(cc => {
            const m = getCatMeta(cc.category);
            const active = categoryFilter === cc.category;
            return `<a href="${catUrl(cc.category)}" class="shrink-0 flex items-center transition-all f-text-xs font-medium border-b-2 ${active ? 'border-blue-500 bg-blue-50/60' : 'text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-50'}" style="padding:12px 16px; gap:6px; white-space:nowrap; ${active ? `color:${m.color};` : ''}">
              <i class="fas ${m.icon}" style="font-size:11px; ${active ? `color:${m.color}` : ''}"></i> ${cc.category} <span class="text-slate-400 font-normal">${cc.cnt}</span>
            </a>`;
          }).join('')}
        </div>
      </div>

      <!-- Search & Filter Bar -->
      <form method="GET" action="/support/progress" class="bg-white rounded-xl border border-slate-200/60" style="padding:var(--space-md); margin-bottom:var(--space-md); box-shadow: var(--shadow-xs);">
        ${categoryFilter ? `<input type="hidden" name="category" value="${categoryFilter}">` : ''}
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center" style="gap:var(--space-sm)">
          <select name="status" class="input-premium" style="width:auto; min-width:140px; padding-right:2rem;" onchange="this.form.submit()">
            <option value="">전체 상태</option>
            <option value="평가완료" ${statusFilter === '평가완료' ? 'selected' : ''}>평가완료</option>
            <option value="발급완료" ${statusFilter === '발급완료' ? 'selected' : ''}>발급완료</option>
            <option value="평가진행" ${statusFilter === '평가진행' ? 'selected' : ''}>평가진행</option>
            <option value="시험진행" ${statusFilter === '시험진행' ? 'selected' : ''}>시험진행</option>
            <option value="평가접수" ${statusFilter === '평가접수' ? 'selected' : ''}>평가접수</option>
            <option value="시험접수" ${statusFilter === '시험접수' ? 'selected' : ''}>시험접수</option>
          </select>
          <div class="flex-1 relative">
            <input type="text" name="q" value="${search}" placeholder="제품명 검색..." class="input-premium" style="padding-right:2.5rem">
            <button type="submit" class="absolute right-0 top-0 bottom-0 text-slate-400 hover:text-accent transition-colors" style="padding:0 var(--space-md)">
              <i class="fas fa-search f-text-sm"></i>
            </button>
          </div>
          ${search || statusFilter ? `<a href="${catUrl(categoryFilter)}" class="shrink-0 text-slate-500 hover:text-red-500 transition-colors f-text-xs flex items-center" style="padding:var(--space-sm)"><i class="fas fa-times mr-1"></i>필터 초기화</a>` : ''}
        </div>
      </form>

      <!-- Data Table -->
      <div class="bg-white rounded-xl border border-slate-200/60 overflow-hidden" style="box-shadow: var(--shadow-sm);">
        <div class="overflow-x-auto">
          <table class="w-full" style="table-layout:fixed; min-width:680px;">
            <colgroup>
              <col style="width:52px">
              ${!categoryFilter ? '<col style="width:100px">' : ''}
              <col style="width:auto">
              <col style="width:90px">
              <col style="width:88px" class="hidden sm:table-column">
              <col style="width:88px" class="hidden md:table-column">
              <col style="width:96px">
            </colgroup>
            <thead>
              <tr style="background: linear-gradient(135deg, #0F172A, #1E293B);">
                <th class="text-center text-slate-300 f-text-xs font-semibold" style="padding:11px 10px">번호</th>
                ${!categoryFilter ? '<th class="text-center text-slate-300 f-text-xs font-semibold" style="padding:11px 10px">사업분류</th>' : ''}
                <th class="text-left text-slate-300 f-text-xs font-semibold" style="padding:11px 14px">제품명</th>
                <th class="text-center text-slate-300 f-text-xs font-semibold" style="padding:11px 10px">${categoryFilter ? meta.col2 : '등급'}</th>
                <th class="text-center text-slate-300 f-text-xs font-semibold hidden sm:table-cell" style="padding:11px 10px">${categoryFilter ? meta.col3 : '구분'}</th>
                <th class="text-center text-slate-300 f-text-xs font-semibold hidden md:table-cell" style="padding:11px 10px">${categoryFilter ? meta.col4 : '유형'}</th>
                <th class="text-center text-slate-300 f-text-xs font-semibold" style="padding:11px 10px">진행상태</th>
              </tr>
            </thead>
            <tbody>
              ${items.map((p, i) => {
                const cm = getCatMeta(p.category);
                return `
              <tr class="border-t border-slate-100/70 hover:bg-blue-50/25 transition-colors" style="border-left:3px solid transparent;">
                <td class="text-center text-slate-400 f-text-xs" style="padding:10px 10px">${startNum - i}</td>
                ${!categoryFilter ? `<td class="text-center" style="padding:10px 10px"><span class="inline-flex items-center gap-1 rounded-full f-text-xs font-medium" style="padding:2px 8px; background:${cm.color}10; color:${cm.color}; white-space:nowrap;"><i class="fas ${cm.icon}" style="font-size:8px"></i>${p.category}</span></td>` : ''}
                <td style="padding:10px 14px"><span class="font-medium text-slate-800 f-text-sm truncate block" style="max-width:100%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${p.product_name}</span></td>
                <td class="text-center" style="padding:10px 10px"><span class="inline-block bg-slate-100 text-slate-700 rounded font-mono font-medium f-text-xs" style="padding:2px 8px; white-space:nowrap">${p.assurance_level || '-'}</span></td>
                <td class="text-center text-slate-600 hidden sm:table-cell f-text-xs" style="padding:10px 10px; white-space:nowrap">${p.cert_type || '-'}</td>
                <td class="text-center text-slate-600 hidden md:table-cell f-text-xs" style="padding:10px 10px; white-space:nowrap">${p.eval_type || '-'}</td>
                <td class="text-center" style="padding:10px 10px">${statusBadge(p.status)}</td>
              </tr>`;
              }).join('')}
              ${items.length === 0 ? `<tr><td colspan="${categoryFilter ? 6 : 7}" class="text-center text-slate-400 f-text-sm" style="padding:var(--space-2xl) 0">
                <i class="fas fa-search text-slate-300 block" style="font-size:1.8rem; margin-bottom:var(--space-sm)"></i>
                ${search ? '검색 결과가 없습니다.' : '등록된 현황이 없습니다.'}
              </td></tr>` : ''}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      ${totalPages > 1 ? `
      <div class="flex flex-col sm:flex-row justify-between items-center" style="margin-top:var(--space-lg); gap:var(--space-md)">
        <p class="text-slate-500 f-text-xs">${total}건 중 ${(page - 1) * perPage + 1}~${Math.min(page * perPage, total)}건 표시 <span class="text-slate-400">(${page}/${totalPages})</span></p>
        <div class="flex items-center" style="gap:4px">
          ${page > 1 ? `<a href="${pageUrl(1)}" class="flex items-center justify-center rounded-lg bg-white border border-slate-200/70 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all f-text-xs" style="width:32px; height:32px" title="처음"><i class="fas fa-angles-left"></i></a>
          <a href="${pageUrl(page - 1)}" class="flex items-center justify-center rounded-lg bg-white border border-slate-200/70 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all f-text-xs" style="width:32px; height:32px" title="이전"><i class="fas fa-chevron-left"></i></a>` : ''}
          ${Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(p => p === 1 || p === totalPages || (p >= page - 2 && p <= page + 2))
            .map((p, idx, arr) => {
              let dots = idx > 0 && p - arr[idx - 1] > 1 ? '<span class="text-slate-400 f-text-xs" style="padding:0 3px">…</span>' : '';
              return dots + `<a href="${pageUrl(p)}" class="flex items-center justify-center rounded-lg font-medium f-text-xs transition-all ${p === page ? 'text-white' : 'bg-white text-slate-600 border border-slate-200/70 hover:bg-slate-50 hover:text-slate-700'}" style="width:32px; height:32px; ${p === page ? 'background: linear-gradient(135deg, #2563EB, #3B82F6); box-shadow: 0 2px 8px rgba(37,99,235,0.25);' : ''}">${p}</a>`;
            }).join('')}
          ${page < totalPages ? `<a href="${pageUrl(page + 1)}" class="flex items-center justify-center rounded-lg bg-white border border-slate-200/70 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all f-text-xs" style="width:32px; height:32px" title="다음"><i class="fas fa-chevron-right"></i></a>
          <a href="${pageUrl(totalPages)}" class="flex items-center justify-center rounded-lg bg-white border border-slate-200/70 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all f-text-xs" style="width:32px; height:32px" title="맨끝"><i class="fas fa-angles-right"></i></a>` : ''}
        </div>
      </div>` : ''}
    </div>
  </section>`;
}


/* ══════════════════════════════════════════════════════════
   Embedded Progress Table (for service sub-pages)
   ══════════════════════════════════════════════════════════ */
export function serviceProgressContent(items: ProgressItem[], page: number = 1, total: number = 0, perPage: number = 15, search: string = '', statusFilter: string = '', categoryFilter: string = '', categoryCounts: {category:string;cnt:number}[] = []) {
  const totalPages = Math.ceil(total / perPage);
  const startNum = total - (page - 1) * perPage;

  function pageUrl(p: number) {
    const params = new URLSearchParams();
    params.set('page', String(p));
    if (search) params.set('q', search);
    if (statusFilter) params.set('status', statusFilter);
    return '?' + params.toString();
  }

  const meta = getCatMeta(categoryFilter);
  const grandTotal = categoryCounts.reduce((sum, c) => sum + c.cnt, 0);

  return `
    <h2 class="font-bold text-primary f-text-lg flex items-center" style="margin-bottom:var(--space-md); gap: var(--space-sm)">
      <div class="rounded-lg flex items-center justify-center" style="width:28px;height:28px; background: linear-gradient(135deg, rgba(16,185,129,0.10), rgba(6,182,212,0.08));">
        <i class="fas ${categoryFilter ? meta.icon : 'fa-chart-bar'} text-emerald-500" style="font-size:12px"></i>
      </div>
      ${categoryFilter ? categoryFilter + ' 현황' : '평가·시험·인증 현황'} <span class="text-slate-400 font-normal f-text-sm">(총 ${total}건)</span>
    </h2>

    <!-- Category Tabs (inline) -->
    ${categoryCounts.length > 1 ? `
    <div class="flex items-center flex-wrap mb-3" style="gap:6px">
      <a href="?" class="inline-flex items-center gap-1 rounded-full f-text-xs font-medium transition-all ${!categoryFilter ? 'text-white' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'}" style="padding:4px 12px; ${!categoryFilter ? 'background:linear-gradient(135deg,#2563EB,#3B82F6);' : ''}">전체 ${grandTotal}</a>
      ${categoryCounts.map(cc => {
        const m = getCatMeta(cc.category);
        const active = categoryFilter === cc.category;
        return `<a href="?category=${encodeURIComponent(cc.category)}" class="inline-flex items-center gap-1 rounded-full f-text-xs font-medium transition-all ${active ? 'text-white' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'}" style="padding:4px 12px; ${active ? `background:${m.color};` : ''}"><i class="fas ${m.icon}" style="font-size:8px"></i>${cc.category} ${cc.cnt}</a>`;
      }).join('')}
    </div>` : ''}

    <!-- Search & Filter -->
    <form method="GET" class="rounded-lg border border-slate-200/70" style="padding:var(--space-md); margin-bottom:var(--space-md); background: rgba(248,250,252,0.80);">
      ${categoryFilter ? `<input type="hidden" name="category" value="${categoryFilter}">` : ''}
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center" style="gap:var(--space-sm)">
        <select name="status" class="input-premium" style="width:auto; min-width:140px;" onchange="this.form.submit()">
          <option value="">전체 상태</option>
          <option value="평가완료" ${statusFilter === '평가완료' ? 'selected' : ''}>평가완료</option>
          <option value="발급완료" ${statusFilter === '발급완료' ? 'selected' : ''}>발급완료</option>
          <option value="평가진행" ${statusFilter === '평가진행' ? 'selected' : ''}>평가진행</option>
          <option value="시험진행" ${statusFilter === '시험진행' ? 'selected' : ''}>시험진행</option>
          <option value="평가접수" ${statusFilter === '평가접수' ? 'selected' : ''}>평가접수</option>
          <option value="시험접수" ${statusFilter === '시험접수' ? 'selected' : ''}>시험접수</option>
        </select>
        <div class="flex-1 relative">
          <input type="text" name="q" value="${search}" placeholder="제품명 검색..." class="input-premium" style="padding-right:2.5rem">
          <button type="submit" class="absolute right-0 top-0 bottom-0 text-slate-400 hover:text-accent transition-colors" style="padding:0 var(--space-md)">
            <i class="fas fa-search f-text-sm"></i>
          </button>
        </div>
        ${search || statusFilter ? `<a href="?${categoryFilter ? 'category=' + encodeURIComponent(categoryFilter) : ''}" class="shrink-0 text-slate-500 hover:text-red-500 transition-colors f-text-xs flex items-center" style="padding:var(--space-sm)"><i class="fas fa-times mr-1"></i>초기화</a>` : ''}
      </div>
    </form>

    <!-- Table -->
    <div class="rounded-lg border border-slate-200/60 overflow-hidden" style="box-shadow: var(--shadow-xs);">
      <div class="overflow-x-auto">
        <table class="w-full" style="table-layout:fixed; min-width:680px;">
          <colgroup>
            <col style="width:52px">
            <col style="width:auto">
            <col style="width:90px">
            <col style="width:88px" class="hidden sm:table-column">
            <col style="width:88px" class="hidden md:table-column">
            <col style="width:96px">
          </colgroup>
          <thead>
            <tr style="background: linear-gradient(135deg, #0F172A, #1E293B);">
              <th class="text-center text-slate-300 f-text-xs font-semibold" style="padding:11px 10px">번호</th>
              <th class="text-left text-slate-300 f-text-xs font-semibold" style="padding:11px 14px">제품명</th>
              <th class="text-center text-slate-300 f-text-xs font-semibold" style="padding:11px 10px">${categoryFilter ? meta.col2 : '등급'}</th>
              <th class="text-center text-slate-300 f-text-xs font-semibold hidden sm:table-cell" style="padding:11px 10px">${categoryFilter ? meta.col3 : '구분'}</th>
              <th class="text-center text-slate-300 f-text-xs font-semibold hidden md:table-cell" style="padding:11px 10px">${categoryFilter ? meta.col4 : '유형'}</th>
              <th class="text-center text-slate-300 f-text-xs font-semibold" style="padding:11px 10px">진행상태</th>
            </tr>
          </thead>
          <tbody>
            ${items.map((p, i) => `
            <tr class="border-t border-slate-100/70 hover:bg-blue-50/25 transition-colors">
              <td class="text-center text-slate-400 f-text-xs" style="padding:10px 10px">${startNum - i}</td>
              <td style="padding:10px 14px">
                <span class="font-medium text-slate-800 f-text-sm truncate block" style="max-width:100%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${p.product_name}</span>
              </td>
              <td class="text-center" style="padding:10px 10px">
                <span class="inline-block bg-slate-100 text-slate-700 rounded font-mono font-medium f-text-xs" style="padding:2px 8px; white-space:nowrap">${p.assurance_level || '-'}</span>
              </td>
              <td class="text-center text-slate-600 hidden sm:table-cell f-text-xs" style="padding:10px 10px; white-space:nowrap">${p.cert_type || '-'}</td>
              <td class="text-center text-slate-600 hidden md:table-cell f-text-xs" style="padding:10px 10px; white-space:nowrap">${p.eval_type || '-'}</td>
              <td class="text-center" style="padding:10px 10px">
                ${statusBadge(p.status)}
              </td>
            </tr>
            `).join('')}
            ${items.length === 0 ? `<tr><td colspan="6" class="text-center text-slate-400 f-text-sm" style="padding:var(--space-2xl) 0">
              <i class="fas fa-search text-slate-300 block" style="font-size:1.8rem; margin-bottom:var(--space-sm)"></i>
              ${search ? '검색 결과가 없습니다.' : '등록된 현황이 없습니다.'}
            </td></tr>` : ''}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    ${totalPages > 1 ? `
    <div class="flex flex-col sm:flex-row justify-between items-center" style="margin-top:var(--space-lg); gap:var(--space-md)">
      <p class="text-slate-500 f-text-xs">${total}건 중 ${(page - 1) * perPage + 1}~${Math.min(page * perPage, total)}건 표시 <span class="text-slate-400">(${page}/${totalPages})</span></p>
      <div class="flex items-center" style="gap:4px">
        ${page > 1 ? `<a href="${pageUrl(1)}" class="flex items-center justify-center rounded-lg bg-white border border-slate-200/70 text-slate-500 hover:bg-slate-50 transition-all f-text-xs" style="width:32px; height:32px"><i class="fas fa-angles-left"></i></a>
        <a href="${pageUrl(page - 1)}" class="flex items-center justify-center rounded-lg bg-white border border-slate-200/70 text-slate-500 hover:bg-slate-50 transition-all f-text-xs" style="width:32px; height:32px"><i class="fas fa-chevron-left"></i></a>` : ''}
        ${Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(p => p === 1 || p === totalPages || (p >= page - 2 && p <= page + 2))
          .map((p, idx, arr) => {
            let dots = idx > 0 && p - arr[idx - 1] > 1 ? '<span class="text-slate-400 f-text-xs" style="padding:0 3px">…</span>' : '';
            return dots + `<a href="${pageUrl(p)}" class="flex items-center justify-center rounded-lg font-medium f-text-xs transition-all ${p === page ? 'text-white' : 'bg-white text-slate-600 border border-slate-200/70 hover:bg-slate-50'}" style="width:32px; height:32px; ${p === page ? 'background: linear-gradient(135deg, #2563EB, #3B82F6); box-shadow: 0 2px 8px rgba(37,99,235,0.25);' : ''}">${p}</a>`;
          }).join('')}
        ${page < totalPages ? `<a href="${pageUrl(page + 1)}" class="flex items-center justify-center rounded-lg bg-white border border-slate-200/70 text-slate-500 hover:bg-slate-50 transition-all f-text-xs" style="width:32px; height:32px"><i class="fas fa-chevron-right"></i></a>
        <a href="${pageUrl(totalPages)}" class="flex items-center justify-center rounded-lg bg-white border border-slate-200/70 text-slate-500 hover:bg-slate-50 transition-all f-text-xs" style="width:32px; height:32px"><i class="fas fa-angles-right"></i></a>` : ''}
      </div>
    </div>` : ''}
  `;
}


/* ────────────── Downloads (Premium Cards) ────────────── */
export function downloadsPage(downloads: { id: number; title: string; description: string; file_name: string; category: string; download_count: number; created_at: string }[], settings: SettingsMap = {}) {
  const s = settings;
  return `
  ${pageHeader({
    title: '자료실',
    icon: 'fa-download',
    iconColor: '#A78BFA',
    settings: s,
  })}

  <section style="padding:var(--space-xl) 0; background: var(--grad-surface);">
    <div class="fluid-container" style="max-width:min(1100px, 100% - var(--container-pad) * 2); display:flex; flex-direction:column; gap:var(--space-sm)">
      ${downloads.map(d => `
      <div class="bg-white rounded-xl border border-slate-200/60 flex items-center justify-between transition-all hover:border-slate-300/70 group" style="padding:var(--space-md); gap:var(--space-md); box-shadow: var(--shadow-xs);">
        <div class="flex items-center min-w-0" style="gap:var(--space-sm)">
          <div class="rounded-lg flex items-center justify-center shrink-0" style="width:clamp(34px,2.8vw,40px); height:clamp(34px,2.8vw,40px); background: linear-gradient(135deg, rgba(167,139,250,0.10), rgba(139,92,246,0.06));">
            <i class="fas fa-file-lines text-purple-500 f-text-sm"></i>
          </div>
          <div class="min-w-0">
            <h3 class="font-medium text-slate-800 truncate f-text-sm group-hover:text-accent transition-colors">${escapeHtml(d.title)}</h3>
            <p class="text-slate-400 f-text-xs" style="margin-top:2px">${d.file_name || ''} · ${d.created_at?.split('T')[0] || ''} · 다운로드 ${d.download_count}회</p>
          </div>
        </div>
        <a href="/api/downloads/${d.id}/file" class="shrink-0 btn-primary f-text-xs ripple-btn" style="padding:var(--space-xs) var(--space-md); border-radius: var(--radius-sm);">
          <i class="fas fa-download" style="font-size:10px"></i> 다운로드
        </a>
      </div>
      `).join('')}
      ${downloads.length === 0 ? '<div class="text-center text-slate-400 f-text-sm" style="padding:var(--space-2xl) 0"><i class="fas fa-folder-open text-slate-300 block" style="font-size:1.8rem;margin-bottom:var(--space-sm)"></i>등록된 자료가 없습니다.</div>' : ''}
    </div>
  </section>`;
}
