// KOIST - Service & Content Page Templates
import type { SettingsMap, Department, DepPage, Notice, FAQ, ProgressItem } from '../types';

export function servicePage(dept: Department, pages: DepPage[], currentPage: DepPage | null, settings: SettingsMap) {
  const s = settings;
  return `
  <!-- Service Header -->
  <section class="bg-gradient-to-r from-primary to-primary-light py-[clamp(2.5rem,5vh,4rem)]">
    <div class="w-[min(92vw,1400px)] mx-auto px-[clamp(1rem,3vw,3rem)]">
      <div class="flex items-center gap-3 text-white/60 text-sm mb-3">
        <a href="/" class="hover:text-white transition-colors">홈</a>
        <i class="fas fa-chevron-right text-xs"></i>
        <a href="/services/${dept.slug}" class="hover:text-white transition-colors">${dept.name}</a>
        ${currentPage ? `<i class="fas fa-chevron-right text-xs"></i><span class="text-white">${currentPage.title}</span>` : ''}
      </div>
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-xl flex items-center justify-center" style="background:${dept.color}30">
          <i class="fas ${dept.icon} text-2xl" style="color:${dept.color}"></i>
        </div>
        <div>
          <h1 class="text-white font-bold text-[clamp(1.4rem,3vw,2.2rem)]">${currentPage ? currentPage.title : dept.name}</h1>
          <p class="text-white/60 text-[clamp(0.8rem,1vw,1rem)]">${dept.description || ''}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Content -->
  <section class="py-[clamp(2rem,4vh,4rem)]">
    <div class="w-[min(92vw,1400px)] mx-auto px-[clamp(1rem,3vw,3rem)]">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Navigation -->
        ${pages.length > 1 ? `
        <aside class="lg:w-60 shrink-0">
          <div class="bg-white rounded-xl border border-gray-100 overflow-hidden sticky top-24">
            <div class="px-4 py-3 bg-gray-50 border-b font-bold text-sm text-gray-700">${dept.name}</div>
            <nav class="p-2">
              ${pages.filter(p => p.is_active).map(p => `
              <a href="/services/${dept.slug}/${p.slug}" 
                 class="block px-4 py-2.5 rounded-lg text-sm transition-colors ${currentPage?.id === p.id ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}">
                ${p.title}
              </a>
              `).join('')}
            </nav>
          </div>
        </aside>
        ` : ''}

        <!-- Main Content -->
        <div class="flex-1 min-w-0">
          <div class="bg-white rounded-xl border border-gray-100 p-[clamp(1.5rem,3vw,3rem)]">
            <div class="prose prose-gray max-w-none">
              ${currentPage ? currentPage.content : (pages.length > 0 ? pages[0].content : '<p class="text-gray-500">콘텐츠가 준비 중입니다.</p>')}
            </div>
          </div>

          <!-- Contact CTA -->
          <div class="mt-6 bg-gradient-to-r from-accent/5 to-blue-50 rounded-xl p-6 border border-accent/10">
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 class="font-bold text-gray-800">${dept.name}에 대해 궁금하신 점이 있으신가요?</h3>
                <p class="text-sm text-gray-500 mt-1">전문 상담원이 친절하게 안내해 드립니다.</p>
              </div>
              <div class="flex gap-3">
                <a href="tel:${s.phone || '02-586-1230'}" class="inline-flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-accent-dark transition-colors">
                  <i class="fas fa-phone"></i> ${s.phone || '02-586-1230'}
                </a>
                <a href="/support/inquiry" class="inline-flex items-center gap-2 bg-white text-gray-700 px-5 py-2.5 rounded-lg font-medium text-sm border hover:bg-gray-50 transition-colors">
                  <i class="fas fa-envelope"></i> 상담문의
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

export function noticeListPage(notices: Notice[], page: number, total: number, perPage: number) {
  const totalPages = Math.ceil(total / perPage);
  return `
  <section class="bg-gradient-to-r from-primary to-primary-light py-[clamp(2.5rem,5vh,4rem)]">
    <div class="w-[min(92vw,1400px)] mx-auto px-[clamp(1rem,3vw,3rem)]">
      <h1 class="text-white font-bold text-[clamp(1.4rem,3vw,2.2rem)]"><i class="fas fa-bullhorn mr-2"></i>공지사항</h1>
    </div>
  </section>
  <section class="py-[clamp(2rem,4vh,4rem)]">
    <div class="w-[min(92vw,1200px)] mx-auto px-[clamp(1rem,3vw,3rem)]">
      <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table class="w-full">
          <thead><tr class="bg-gray-50 text-sm text-gray-500">
            <th class="py-3 px-4 text-left w-16">번호</th>
            <th class="py-3 px-4 text-left">제목</th>
            <th class="py-3 px-4 text-center w-24">조회수</th>
            <th class="py-3 px-4 text-center w-28">작성일</th>
          </tr></thead>
          <tbody>
            ${notices.map((n, i) => `
            <tr class="border-t hover:bg-gray-50 transition-colors">
              <td class="py-3 px-4 text-sm text-gray-400">${n.is_pinned ? '<span class="text-red-500 font-bold">공지</span>' : (total - (page - 1) * perPage - i)}</td>
              <td class="py-3 px-4"><a href="/support/notice/${n.id}" class="text-gray-800 hover:text-accent transition-colors font-medium">${n.title}</a></td>
              <td class="py-3 px-4 text-center text-sm text-gray-400">${n.views}</td>
              <td class="py-3 px-4 text-center text-sm text-gray-400">${n.created_at?.split('T')[0] || ''}</td>
            </tr>
            `).join('')}
            ${notices.length === 0 ? '<tr><td colspan="4" class="py-8 text-center text-gray-400">등록된 공지사항이 없습니다.</td></tr>' : ''}
          </tbody>
        </table>
      </div>
      ${totalPages > 1 ? `
      <div class="flex justify-center gap-2 mt-6">
        ${Array.from({ length: totalPages }, (_, i) => i + 1).map(p => `
        <a href="/support/notice?page=${p}" class="w-9 h-9 flex items-center justify-center rounded-lg text-sm ${p === page ? 'bg-accent text-white' : 'bg-white text-gray-600 border hover:bg-gray-50'}">${p}</a>
        `).join('')}
      </div>` : ''}
    </div>
  </section>`;
}

export function noticeDetailPage(notice: Notice) {
  return `
  <section class="bg-gradient-to-r from-primary to-primary-light py-[clamp(2.5rem,5vh,4rem)]">
    <div class="w-[min(92vw,1400px)] mx-auto px-[clamp(1rem,3vw,3rem)]">
      <div class="flex items-center gap-3 text-white/60 text-sm mb-3">
        <a href="/" class="hover:text-white">홈</a><i class="fas fa-chevron-right text-xs"></i>
        <a href="/support/notice" class="hover:text-white">공지사항</a><i class="fas fa-chevron-right text-xs"></i>
        <span class="text-white">상세</span>
      </div>
      <h1 class="text-white font-bold text-[clamp(1.2rem,2.5vw,1.8rem)]">${notice.title}</h1>
      <div class="text-white/50 text-sm mt-2">${notice.created_at?.split('T')[0] || ''} | 조회수 ${notice.views}</div>
    </div>
  </section>
  <section class="py-[clamp(2rem,4vh,4rem)]">
    <div class="w-[min(92vw,1000px)] mx-auto px-[clamp(1rem,3vw,3rem)]">
      <div class="bg-white rounded-xl border border-gray-100 p-[clamp(1.5rem,3vw,3rem)]">
        <div class="prose prose-gray max-w-none">${notice.content}</div>
      </div>
      <div class="mt-4 text-center">
        <a href="/support/notice" class="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-200 transition-colors text-sm"><i class="fas fa-list"></i> 목록</a>
      </div>
    </div>
  </section>`;
}

export function faqPage(faqs: FAQ[]) {
  return `
  <section class="bg-gradient-to-r from-primary to-primary-light py-[clamp(2.5rem,5vh,4rem)]">
    <div class="w-[min(92vw,1400px)] mx-auto px-[clamp(1rem,3vw,3rem)]">
      <h1 class="text-white font-bold text-[clamp(1.4rem,3vw,2.2rem)]"><i class="fas fa-circle-question mr-2"></i>자주 묻는 질문</h1>
    </div>
  </section>
  <section class="py-[clamp(2rem,4vh,4rem)]">
    <div class="w-[min(92vw,1000px)] mx-auto px-[clamp(1rem,3vw,3rem)]">
      <div class="space-y-3">
        ${faqs.map((f, i) => `
        <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <button onclick="toggleFaq(${i})" class="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors">
            <span class="font-medium text-gray-800 flex items-center gap-3">
              <span class="w-7 h-7 bg-accent/10 text-accent rounded-full flex items-center justify-center text-xs font-bold">Q</span>
              ${f.question}
            </span>
            <i class="fas fa-chevron-down text-gray-400 transition-transform" id="faq-icon-${i}"></i>
          </button>
          <div id="faq-body-${i}" class="hidden px-5 pb-5">
            <div class="pl-10 text-gray-600 text-sm leading-relaxed prose prose-sm max-w-none">${f.answer}</div>
          </div>
        </div>
        `).join('')}
        ${faqs.length === 0 ? '<p class="text-center text-gray-400 py-12">등록된 FAQ가 없습니다.</p>' : ''}
      </div>
    </div>
  </section>
  <script>
    function toggleFaq(i) {
      const body = document.getElementById('faq-body-' + i);
      const icon = document.getElementById('faq-icon-' + i);
      body.classList.toggle('hidden');
      icon.style.transform = body.classList.contains('hidden') ? '' : 'rotate(180deg)';
    }
  </script>`;
}

export function inquiryPage(settings: SettingsMap) {
  const s = settings;
  return `
  <section class="bg-gradient-to-r from-primary to-primary-light py-[clamp(2.5rem,5vh,4rem)]">
    <div class="w-[min(92vw,1400px)] mx-auto px-[clamp(1rem,3vw,3rem)]">
      <h1 class="text-white font-bold text-[clamp(1.4rem,3vw,2.2rem)]"><i class="fas fa-envelope mr-2"></i>온라인 상담문의</h1>
    </div>
  </section>
  <section class="py-[clamp(2rem,4vh,4rem)]">
    <div class="w-[min(92vw,800px)] mx-auto px-[clamp(1rem,3vw,3rem)]">
      <div class="bg-blue-50 rounded-xl p-5 mb-6 border border-blue-100">
        <p class="text-sm text-blue-700"><i class="fas fa-info-circle mr-1"></i> 빠른 상담은 전화(<strong>${s.phone || '02-586-1230'}</strong>)로 연락주시면 더욱 빠르게 안내받으실 수 있습니다.</p>
      </div>
      <form id="inquiryForm" class="bg-white rounded-xl border border-gray-100 p-[clamp(1.5rem,3vw,2.5rem)]">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div><label class="block text-sm font-medium text-gray-700 mb-1">이름 <span class="text-red-500">*</span></label><input type="text" name="name" required class="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">회사명</label><input type="text" name="company" class="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">이메일</label><input type="email" name="email" class="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">연락처</label><input type="tel" name="phone" class="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"></div>
        </div>
        <div class="mb-4"><label class="block text-sm font-medium text-gray-700 mb-1">제목 <span class="text-red-500">*</span></label><input type="text" name="subject" required class="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"></div>
        <div class="mb-6"><label class="block text-sm font-medium text-gray-700 mb-1">문의 내용 <span class="text-red-500">*</span></label><textarea name="message" rows="6" required class="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-y"></textarea></div>
        <button type="submit" id="inquiryBtn" class="w-full bg-accent hover:bg-accent-dark text-white py-3 rounded-lg font-medium transition-colors"><i class="fas fa-paper-plane mr-1"></i> 문의하기</button>
        <div id="inquiryMsg" class="hidden mt-4 p-4 rounded-lg text-sm"></div>
      </form>
    </div>
  </section>
  <script>
    document.getElementById('inquiryForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('inquiryBtn');
      const msg = document.getElementById('inquiryMsg');
      const form = e.target;
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i> 전송 중...';
      try {
        const body = {};
        new FormData(form).forEach((v, k) => body[k] = v);
        const res = await fetch('/api/inquiries', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) });
        const data = await res.json();
        if (data.success) {
          msg.className = 'mt-4 p-4 rounded-lg text-sm bg-green-50 text-green-700 border border-green-200';
          msg.innerHTML = '<i class="fas fa-check-circle mr-1"></i> 문의가 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.';
          form.reset();
        } else {
          msg.className = 'mt-4 p-4 rounded-lg text-sm bg-red-50 text-red-700 border border-red-200';
          msg.textContent = data.error || '전송에 실패했습니다.';
        }
      } catch { msg.className = 'mt-4 p-4 rounded-lg text-sm bg-red-50 text-red-700 border border-red-200'; msg.textContent = '서버 연결 실패'; }
      msg.classList.remove('hidden');
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane mr-1"></i> 문의하기';
    });
  </script>`;
}

export function progressPage(items: ProgressItem[]) {
  return `
  <section class="bg-gradient-to-r from-primary to-primary-light py-[clamp(2.5rem,5vh,4rem)]">
    <div class="w-[min(92vw,1400px)] mx-auto px-[clamp(1rem,3vw,3rem)]">
      <h1 class="text-white font-bold text-[clamp(1.4rem,3vw,2.2rem)]"><i class="fas fa-chart-bar mr-2"></i>평가현황</h1>
    </div>
  </section>
  <section class="py-[clamp(2rem,4vh,4rem)]">
    <div class="w-[min(92vw,1200px)] mx-auto px-[clamp(1rem,3vw,3rem)]">
      <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table class="w-full text-sm">
          <thead><tr class="bg-gray-50 text-gray-500">
            <th class="py-3 px-4 text-left">구분</th>
            <th class="py-3 px-4 text-left">제품명</th>
            <th class="py-3 px-4 text-left">업체</th>
            <th class="py-3 px-4 text-center">상태</th>
            <th class="py-3 px-4 text-center">시작일</th>
          </tr></thead>
          <tbody>
            ${items.map(p => `
            <tr class="border-t hover:bg-gray-50">
              <td class="py-3 px-4 text-gray-500">${p.category}</td>
              <td class="py-3 px-4 font-medium text-gray-800">${p.product_name}</td>
              <td class="py-3 px-4 text-gray-600">${p.company || '-'}</td>
              <td class="py-3 px-4 text-center"><span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${p.status === '완료' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}">${p.status}</span></td>
              <td class="py-3 px-4 text-center text-gray-400">${p.start_date || '-'}</td>
            </tr>
            `).join('')}
            ${items.length === 0 ? '<tr><td colspan="5" class="py-8 text-center text-gray-400">등록된 현황이 없습니다.</td></tr>' : ''}
          </tbody>
        </table>
      </div>
    </div>
  </section>`;
}

export function downloadsPage(downloads: { id: number; title: string; description: string; file_name: string; category: string; download_count: number; created_at: string }[]) {
  return `
  <section class="bg-gradient-to-r from-primary to-primary-light py-[clamp(2.5rem,5vh,4rem)]">
    <div class="w-[min(92vw,1400px)] mx-auto px-[clamp(1rem,3vw,3rem)]">
      <h1 class="text-white font-bold text-[clamp(1.4rem,3vw,2.2rem)]"><i class="fas fa-download mr-2"></i>자료실</h1>
    </div>
  </section>
  <section class="py-[clamp(2rem,4vh,4rem)]">
    <div class="w-[min(92vw,1200px)] mx-auto px-[clamp(1rem,3vw,3rem)]">
      <div class="space-y-3">
        ${downloads.map(d => `
        <div class="bg-white rounded-xl border border-gray-100 p-5 flex items-center justify-between gap-4 hover:shadow-sm transition-shadow">
          <div class="flex items-center gap-4 min-w-0">
            <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0"><i class="fas fa-file-lines text-blue-500"></i></div>
            <div class="min-w-0">
              <h3 class="font-medium text-gray-800 truncate">${d.title}</h3>
              <p class="text-xs text-gray-400 mt-0.5">${d.file_name || ''} | ${d.created_at?.split('T')[0] || ''} | 다운로드 ${d.download_count}회</p>
            </div>
          </div>
          <a href="/api/downloads/${d.id}/file" class="shrink-0 bg-accent text-white px-4 py-2 rounded-lg text-sm hover:bg-accent-dark transition-colors"><i class="fas fa-download mr-1"></i>다운로드</a>
        </div>
        `).join('')}
        ${downloads.length === 0 ? '<p class="text-center text-gray-400 py-12">등록된 자료가 없습니다.</p>' : ''}
      </div>
    </div>
  </section>`;
}
