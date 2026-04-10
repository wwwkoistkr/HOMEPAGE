// KOIST - Service & Content Page Templates (v4 - Premium Polished)
import type { SettingsMap, Department, DepPage, Notice, FAQ, ProgressItem } from '../types';

/* ────────────── Service Detail Page ────────────── */
export function servicePage(dept: Department, pages: DepPage[], currentPage: DepPage | null, settings: SettingsMap) {
  const s = settings;
  return `
  <!-- Page Header -->
  <section class="bg-gradient-to-br from-[#0F172A] to-[#1E293B] py-8 lg:py-10 relative overflow-hidden">
    <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Ccircle cx=\"1\" cy=\"1\" r=\"1\" fill=\"rgba(255,255,255,0.03)\"%2F%3E%3C/svg%3E')]"></div>
    <div class="relative max-w-[1320px] mx-auto px-4 lg:px-6">
      <nav class="flex items-center gap-2 text-slate-400 text-xs mb-3">
        <a href="/" class="hover:text-white transition-colors">홈</a>
        <i class="fas fa-chevron-right text-[8px] text-slate-600"></i>
        <a href="/services/${dept.slug}" class="hover:text-white transition-colors">${dept.name}</a>
        ${currentPage ? `<i class="fas fa-chevron-right text-[8px] text-slate-600"></i><span class="text-white">${currentPage.title}</span>` : ''}
      </nav>
      <div class="flex items-center gap-3">
        <div class="w-11 h-11 rounded-lg flex items-center justify-center" style="background:${dept.color}20">
          <i class="fas ${dept.icon} text-xl" style="color:${dept.color}"></i>
        </div>
        <div>
          <h1 class="text-white font-bold text-xl lg:text-2xl">${currentPage ? currentPage.title : dept.name}</h1>
          <p class="text-slate-400 text-xs mt-0.5">${dept.description || ''}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Content -->
  <section class="py-8 lg:py-10 bg-[#F8FAFC]">
    <div class="max-w-[1320px] mx-auto px-4 lg:px-6">
      <div class="flex flex-col lg:flex-row gap-6">

        <!-- Sidebar -->
        ${pages.length > 1 ? `
        <aside class="lg:w-56 shrink-0">
          <div class="bg-white rounded-xl border border-slate-200 overflow-hidden sticky top-[76px] shadow-sm">
            <div class="px-4 py-3 bg-primary text-sm font-semibold text-white">${dept.name}</div>
            <nav class="p-1.5">
              ${pages.filter(p => p.is_active).map(p => `
              <a href="/services/${dept.slug}/${p.slug}" 
                 class="block px-3 py-2 rounded-lg text-sm transition-colors ${currentPage?.id === p.id ? 'bg-accent/10 text-accent font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}">
                ${p.title}
              </a>
              `).join('')}
            </nav>
          </div>
        </aside>
        ` : ''}

        <!-- Main -->
        <div class="flex-1 min-w-0">
          <div class="bg-white rounded-xl border border-slate-200 p-6 lg:p-8 shadow-sm">
            <div class="prose prose-slate max-w-none prose-headings:text-primary prose-p:text-slate-600 prose-li:text-slate-600 prose-a:text-accent">
              ${currentPage ? currentPage.content : (pages.length > 0 ? pages[0].content : '<p class="text-slate-400">콘텐츠가 준비 중입니다.</p>')}
            </div>
          </div>

          <!-- CTA -->
          <div class="mt-5 bg-gradient-to-r from-primary to-primary-light rounded-xl p-5 shadow-md">
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 class="font-bold text-white text-sm">${dept.name}에 대해 궁금하신 점이 있으신가요?</h3>
                <p class="text-slate-400 text-xs mt-1">전문 상담원이 친절하게 안내해 드립니다.</p>
              </div>
              <div class="flex gap-2">
                <a href="tel:${s.phone || '02-586-1230'}" class="inline-flex items-center gap-1.5 bg-accent text-white px-4 py-2 rounded-lg font-semibold text-xs hover:bg-accent-dark transition-colors shadow shadow-accent/20">
                  <i class="fas fa-phone text-[10px]"></i> ${s.phone || '02-586-1230'}
                </a>
                <a href="/support/inquiry" class="inline-flex items-center gap-1.5 bg-white/10 text-white px-4 py-2 rounded-lg font-semibold text-xs border border-white/20 hover:bg-white/15 transition-colors">
                  <i class="fas fa-envelope text-[10px]"></i> 상담문의
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

/* ────────────── Notice List ────────────── */
export function noticeListPage(notices: Notice[], page: number, total: number, perPage: number) {
  const totalPages = Math.ceil(total / perPage);
  return `
  <section class="bg-gradient-to-br from-[#0F172A] to-[#1E293B] py-8 lg:py-10 relative overflow-hidden">
    <div class="relative max-w-[1320px] mx-auto px-4 lg:px-6">
      <h1 class="text-white font-bold text-xl lg:text-2xl flex items-center gap-2">
        <i class="fas fa-bullhorn text-blue-400"></i>공지사항
      </h1>
    </div>
  </section>
  <section class="py-8 lg:py-10 bg-[#F8FAFC]">
    <div class="max-w-[1100px] mx-auto px-4 lg:px-6">
      <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table class="w-full">
          <thead><tr class="bg-primary text-xs text-slate-300">
            <th class="py-3 px-4 text-left w-14 font-medium">번호</th>
            <th class="py-3 px-4 text-left font-medium">제목</th>
            <th class="py-3 px-4 text-center w-20 font-medium hidden sm:table-cell">조회수</th>
            <th class="py-3 px-4 text-center w-24 font-medium">작성일</th>
          </tr></thead>
          <tbody>
            ${notices.map((n, i) => `
            <tr class="border-t border-slate-100 hover:bg-blue-50/30 transition-colors">
              <td class="py-3 px-4 text-xs text-slate-400">${n.is_pinned ? '<span class="text-red-500 font-bold">공지</span>' : (total - (page - 1) * perPage - i)}</td>
              <td class="py-3 px-4"><a href="/support/notice/${n.id}" class="text-slate-800 hover:text-accent transition-colors text-sm font-medium">${n.title}</a></td>
              <td class="py-3 px-4 text-center text-xs text-slate-400 hidden sm:table-cell">${n.views}</td>
              <td class="py-3 px-4 text-center text-xs text-slate-400">${n.created_at?.split('T')[0] || ''}</td>
            </tr>
            `).join('')}
            ${notices.length === 0 ? '<tr><td colspan="4" class="py-10 text-center text-slate-400 text-sm">등록된 공지사항이 없습니다.</td></tr>' : ''}
          </tbody>
        </table>
      </div>
      ${totalPages > 1 ? `
      <div class="flex justify-center gap-1.5 mt-6">
        ${Array.from({ length: totalPages }, (_, i) => i + 1).map(p => `
        <a href="/support/notice?page=${p}" class="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium ${p === page ? 'bg-accent text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}">${p}</a>
        `).join('')}
      </div>` : ''}
    </div>
  </section>`;
}

/* ────────────── Notice Detail ────────────── */
export function noticeDetailPage(notice: Notice) {
  return `
  <section class="bg-gradient-to-br from-[#0F172A] to-[#1E293B] py-8 lg:py-10 relative overflow-hidden">
    <div class="relative max-w-[1320px] mx-auto px-4 lg:px-6">
      <nav class="flex items-center gap-2 text-slate-400 text-xs mb-3">
        <a href="/" class="hover:text-white">홈</a><i class="fas fa-chevron-right text-[8px] text-slate-600"></i>
        <a href="/support/notice" class="hover:text-white">공지사항</a><i class="fas fa-chevron-right text-[8px] text-slate-600"></i>
        <span class="text-white">상세</span>
      </nav>
      <h1 class="text-white font-bold text-lg lg:text-xl">${notice.title}</h1>
      <div class="text-slate-400 text-xs mt-2">${notice.created_at?.split('T')[0] || ''} · 조회수 ${notice.views}</div>
    </div>
  </section>
  <section class="py-8 lg:py-10 bg-[#F8FAFC]">
    <div class="max-w-[900px] mx-auto px-4 lg:px-6">
      <div class="bg-white rounded-xl border border-slate-200 p-6 lg:p-8 shadow-sm">
        <div class="prose prose-slate max-w-none prose-headings:text-primary">${notice.content}</div>
      </div>
      <div class="mt-5 text-center">
        <a href="/support/notice" class="inline-flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-primary-light transition-colors"><i class="fas fa-list text-xs"></i> 목록</a>
      </div>
    </div>
  </section>`;
}

/* ────────────── FAQ ────────────── */
export function faqPage(faqs: FAQ[]) {
  return `
  <section class="bg-gradient-to-br from-[#0F172A] to-[#1E293B] py-8 lg:py-10 relative overflow-hidden">
    <div class="relative max-w-[1320px] mx-auto px-4 lg:px-6">
      <h1 class="text-white font-bold text-xl lg:text-2xl flex items-center gap-2">
        <i class="fas fa-circle-question text-teal-400"></i>자주 묻는 질문
      </h1>
    </div>
  </section>
  <section class="py-8 lg:py-10 bg-[#F8FAFC]">
    <div class="max-w-[900px] mx-auto px-4 lg:px-6 space-y-2.5">
      ${faqs.map((f, i) => `
      <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <button onclick="toggleFaq(${i})" class="w-full flex items-center justify-between p-4 lg:p-5 text-left hover:bg-slate-50/50 transition-colors">
          <span class="font-medium text-slate-800 flex items-center gap-2.5 text-sm">
            <span class="w-6 h-6 bg-accent/10 text-accent rounded-full flex items-center justify-center text-xs font-bold shrink-0">Q</span>
            ${f.question}
          </span>
          <i class="fas fa-chevron-down text-slate-400 text-xs transition-transform ml-3 shrink-0" id="faq-icon-${i}"></i>
        </button>
        <div id="faq-body-${i}" class="hidden px-4 lg:px-5 pb-4 lg:pb-5">
          <div class="pl-9 text-slate-600 text-sm leading-relaxed">${f.answer}</div>
        </div>
      </div>
      `).join('')}
      ${faqs.length === 0 ? '<p class="text-center text-slate-400 py-14 text-sm">등록된 FAQ가 없습니다.</p>' : ''}
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

/* ────────────── Inquiry ────────────── */
export function inquiryPage(settings: SettingsMap) {
  const s = settings;
  return `
  <section class="bg-gradient-to-br from-[#0F172A] to-[#1E293B] py-8 lg:py-10 relative overflow-hidden">
    <div class="relative max-w-[1320px] mx-auto px-4 lg:px-6">
      <h1 class="text-white font-bold text-xl lg:text-2xl flex items-center gap-2">
        <i class="fas fa-envelope text-amber-400"></i>온라인 상담문의
      </h1>
    </div>
  </section>
  <section class="py-8 lg:py-10 bg-[#F8FAFC]">
    <div class="max-w-[720px] mx-auto px-4 lg:px-6">
      <div class="bg-accent/5 rounded-lg p-4 mb-5 border border-accent/10">
        <p class="text-sm text-accent"><i class="fas fa-info-circle mr-1"></i> 빠른 상담은 <strong>${s.phone || '02-586-1230'}</strong>으로 연락주시면 더욱 빠르게 안내받으실 수 있습니다.</p>
      </div>
      <form id="inquiryForm" class="bg-white rounded-xl border border-slate-200 p-6 lg:p-8 shadow-sm">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div><label class="block text-xs font-semibold text-slate-700 mb-1.5">이름 <span class="text-red-500">*</span></label><input type="text" name="name" required class="w-full px-3 py-2.5 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm transition-colors"></div>
          <div><label class="block text-xs font-semibold text-slate-700 mb-1.5">회사명</label><input type="text" name="company" class="w-full px-3 py-2.5 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm transition-colors"></div>
          <div><label class="block text-xs font-semibold text-slate-700 mb-1.5">이메일</label><input type="email" name="email" class="w-full px-3 py-2.5 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm transition-colors"></div>
          <div><label class="block text-xs font-semibold text-slate-700 mb-1.5">연락처</label><input type="tel" name="phone" class="w-full px-3 py-2.5 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm transition-colors"></div>
        </div>
        <div class="mb-4"><label class="block text-xs font-semibold text-slate-700 mb-1.5">제목 <span class="text-red-500">*</span></label><input type="text" name="subject" required class="w-full px-3 py-2.5 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm transition-colors"></div>
        <div class="mb-5"><label class="block text-xs font-semibold text-slate-700 mb-1.5">문의 내용 <span class="text-red-500">*</span></label><textarea name="message" rows="5" required class="w-full px-3 py-2.5 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm resize-y transition-colors"></textarea></div>
        <button type="submit" id="inquiryBtn" class="w-full bg-accent hover:bg-accent-dark text-white py-2.5 rounded-lg font-semibold text-sm transition-colors"><i class="fas fa-paper-plane mr-1 text-xs"></i> 문의하기</button>
        <div id="inquiryMsg" class="hidden mt-4 p-3 rounded-lg text-sm"></div>
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
          msg.className = 'mt-4 p-3 rounded-lg text-sm bg-green-50 text-green-700 border border-green-200';
          msg.innerHTML = '<i class="fas fa-check-circle mr-1"></i> 문의가 접수되었습니다.';
          form.reset();
        } else {
          msg.className = 'mt-4 p-3 rounded-lg text-sm bg-red-50 text-red-700 border border-red-200';
          msg.textContent = data.error || '전송에 실패했습니다.';
        }
      } catch(err) { msg.className = 'mt-4 p-3 rounded-lg text-sm bg-red-50 text-red-700 border border-red-200'; msg.textContent = '서버 연결 실패'; }
      msg.classList.remove('hidden');
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane mr-1"></i> 문의하기';
    });
  </script>`;
}

/* ────────────── Progress ────────────── */
export function progressPage(items: ProgressItem[]) {
  return `
  <section class="bg-gradient-to-br from-[#0F172A] to-[#1E293B] py-8 lg:py-10 relative overflow-hidden">
    <div class="relative max-w-[1320px] mx-auto px-4 lg:px-6">
      <h1 class="text-white font-bold text-xl lg:text-2xl flex items-center gap-2">
        <i class="fas fa-chart-bar text-emerald-400"></i>평가현황
      </h1>
    </div>
  </section>
  <section class="py-8 lg:py-10 bg-[#F8FAFC]">
    <div class="max-w-[1100px] mx-auto px-4 lg:px-6">
      <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead><tr class="bg-primary text-xs text-slate-300">
              <th class="py-3 px-4 text-left font-medium">구분</th>
              <th class="py-3 px-4 text-left font-medium">제품명</th>
              <th class="py-3 px-4 text-left font-medium hidden sm:table-cell">업체</th>
              <th class="py-3 px-4 text-center font-medium">상태</th>
              <th class="py-3 px-4 text-center font-medium hidden sm:table-cell">시작일</th>
            </tr></thead>
            <tbody>
              ${items.map(p => `
              <tr class="border-t border-slate-100 hover:bg-blue-50/30 transition-colors">
                <td class="py-3 px-4 text-xs text-slate-500">${p.category}</td>
                <td class="py-3 px-4 font-medium text-slate-800 text-xs">${p.product_name}</td>
                <td class="py-3 px-4 text-xs text-slate-600 hidden sm:table-cell">${p.company || '-'}</td>
                <td class="py-3 px-4 text-center"><span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${p.status === '완료' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}">${p.status}</span></td>
                <td class="py-3 px-4 text-center text-xs text-slate-400 hidden sm:table-cell">${p.start_date || '-'}</td>
              </tr>
              `).join('')}
              ${items.length === 0 ? '<tr><td colspan="5" class="py-10 text-center text-slate-400 text-sm">등록된 현황이 없습니다.</td></tr>' : ''}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>`;
}

/* ────────────── Downloads ────────────── */
export function downloadsPage(downloads: { id: number; title: string; description: string; file_name: string; category: string; download_count: number; created_at: string }[]) {
  return `
  <section class="bg-gradient-to-br from-[#0F172A] to-[#1E293B] py-8 lg:py-10 relative overflow-hidden">
    <div class="relative max-w-[1320px] mx-auto px-4 lg:px-6">
      <h1 class="text-white font-bold text-xl lg:text-2xl flex items-center gap-2">
        <i class="fas fa-download text-purple-400"></i>자료실
      </h1>
    </div>
  </section>
  <section class="py-8 lg:py-10 bg-[#F8FAFC]">
    <div class="max-w-[1100px] mx-auto px-4 lg:px-6 space-y-3">
      ${downloads.map(d => `
      <div class="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between gap-4 hover:shadow-md hover:border-slate-300 transition-all">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center shrink-0"><i class="fas fa-file-lines text-purple-500 text-sm"></i></div>
          <div class="min-w-0">
            <h3 class="font-medium text-slate-800 text-sm truncate">${d.title}</h3>
            <p class="text-xs text-slate-400 mt-0.5">${d.file_name || ''} · ${d.created_at?.split('T')[0] || ''} · 다운로드 ${d.download_count}회</p>
          </div>
        </div>
        <a href="/api/downloads/${d.id}/file" class="shrink-0 bg-accent text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-accent-dark transition-colors"><i class="fas fa-download mr-1"></i>다운로드</a>
      </div>
      `).join('')}
      ${downloads.length === 0 ? '<p class="text-center text-slate-400 py-14 text-sm">등록된 자료가 없습니다.</p>' : ''}
    </div>
  </section>`;
}
