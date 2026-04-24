// Admin - System Docs (시스템 문서 관리)
// downloads 테이블의 category='system-docs'를 사용
// - R2 파일 업로드 (HTML/PDF/Office/이미지 등, 최대 20MB)
// - 외부/내부 URL 등록
// - 프론트 경로: /support/documents
// - 사용 API: window.apiCall (JSON), window.apiUpload (multipart) from admin-fetch.js

(function () {
  'use strict';

  const API_BASE = '/api/admin/system-docs';
  const PUBLIC_URL = '/support/documents';
  let currentItems = [];
  let r2Available = false;

  const container = document.getElementById('admin-content');
  if (!container) return;

  // ── Utility ──────────────────────────────────────────────
  function esc(s) {
    if (s === null || s === undefined) return '';
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function fmtSize(bytes) {
    const b = Number(bytes) || 0;
    if (b <= 0) return '-';
    if (b < 1024) return b + ' B';
    if (b < 1024 * 1024) return (b / 1024).toFixed(1) + ' KB';
    return (b / 1024 / 1024).toFixed(2) + ' MB';
  }
  function fmtDate(s) {
    if (!s) return '-';
    return String(s).replace('T', ' ').substring(0, 16);
  }
  function iconOf(url, name) {
    const src = String(name || url || '').toLowerCase();
    if (src.endsWith('.pdf')) return { icon: 'fa-file-pdf', color: '#DC2626' };
    if (src.match(/\.(html|htm)$/)) return { icon: 'fa-file-code', color: '#2563EB' };
    if (src.match(/\.(docx?|hwp)$/)) return { icon: 'fa-file-word', color: '#1D4ED8' };
    if (src.match(/\.(xlsx?|csv)$/)) return { icon: 'fa-file-excel', color: '#059669' };
    if (src.match(/\.(pptx?)$/)) return { icon: 'fa-file-powerpoint', color: '#EA580C' };
    if (src.match(/\.(png|jpe?g|gif|webp)$/)) return { icon: 'fa-file-image', color: '#7C3AED' };
    if (src.match(/\.zip$/)) return { icon: 'fa-file-zipper', color: '#64748B' };
    if (src.match(/\.txt$/)) return { icon: 'fa-file-lines', color: '#475569' };
    return { icon: 'fa-file', color: '#64748B' };
  }

  function toast(msg, ok) {
    const el = document.createElement('div');
    el.textContent = msg;
    el.style.cssText = 'position:fixed;top:20px;right:20px;padding:12px 20px;border-radius:8px;color:#fff;z-index:9999;font-weight:600;box-shadow:0 4px 12px rgba(0,0,0,.15);'
      + (ok ? 'background:#10B981;' : 'background:#EF4444;');
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, 3000);
  }

  // ── Fetch ────────────────────────────────────────────────
  async function fetchList() {
    const data = await window.apiCall(API_BASE, 'GET');
    if (!data || !data.success) throw new Error((data && data.error) || '불러오기 실패');
    currentItems = data.data || [];
    r2Available = !!data.r2_available;
    render();
  }

  // ── Render ───────────────────────────────────────────────
  function render() {
    const rows = currentItems.map(function (item) {
      const ic = iconOf(item.file_url, item.file_name);
      const isR2 = (item.file_url || '').startsWith('/api/docs/system-docs/');
      return '<tr class="hover:bg-gray-50">'
        + '<td class="p-3 align-top">'
        +   '<div class="flex items-start gap-3">'
        +     '<div class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style="background:' + ic.color + '1A">'
        +       '<i class="fas ' + ic.icon + '" style="color:' + ic.color + ';font-size:18px"></i>'
        +     '</div>'
        +     '<div class="min-w-0">'
        +       '<div class="font-semibold text-gray-800">' + esc(item.title) + '</div>'
        +       '<div class="text-xs text-gray-500 mt-1 break-all">' + esc(item.description || '') + '</div>'
        +       '<div class="text-xs text-gray-400 mt-1">'
        +         '<span class="inline-block px-2 py-0.5 rounded ' + (isR2 ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700') + '" style="font-size:10px">'
        +           (isR2 ? '<i class="fas fa-cloud mr-1"></i>R2 업로드' : '<i class="fas fa-link mr-1"></i>외부 URL')
        +         '</span>'
        +         '<span class="ml-2">' + esc(item.file_name || '-') + '</span>'
        +       '</div>'
        +     '</div>'
        +   '</div>'
        + '</td>'
        + '<td class="p-3 text-sm text-gray-600 text-center">' + fmtSize(item.file_size) + '</td>'
        + '<td class="p-3 text-sm text-gray-600 text-center">' + (item.download_count || 0) + '</td>'
        + '<td class="p-3 text-sm text-gray-500">' + fmtDate(item.created_at) + '</td>'
        + '<td class="p-3 text-right whitespace-nowrap">'
        +   '<a href="' + esc(item.file_url) + '" target="_blank" class="inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded bg-blue-50 text-blue-700 hover:bg-blue-100">'
        +     '<i class="fas fa-eye"></i> 보기'
        +   '</a>'
        +   '<button data-id="' + item.id + '" class="edit-btn ml-1 inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded bg-gray-100 text-gray-700 hover:bg-gray-200">'
        +     '<i class="fas fa-pen"></i> 편집'
        +   '</button>'
        +   '<button data-id="' + item.id + '" data-title="' + esc(item.title) + '" class="del-btn ml-1 inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded bg-red-50 text-red-600 hover:bg-red-100">'
        +     '<i class="fas fa-trash"></i> 삭제'
        +   '</button>'
        + '</td>'
      + '</tr>';
    }).join('');

    container.innerHTML = ''
      + '<div class="mb-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">'
      +   '<div class="flex items-start gap-3">'
      +     '<i class="fas fa-info-circle text-purple-600 mt-1"></i>'
      +     '<div class="text-sm text-gray-700">'
      +       '<div class="font-semibold text-purple-900 mb-1">시스템 문서 관리</div>'
      +       '<div>여기서 등록/수정한 문서는 <a href="' + PUBLIC_URL + '" target="_blank" class="text-blue-600 underline font-medium">' + PUBLIC_URL + '</a> 페이지에 자동 반영됩니다.</div>'
      +       '<div class="mt-1 text-xs text-gray-500">'
      +         'R2 업로드 ' + (r2Available ? '<span class="text-green-600 font-semibold">● 사용 가능</span>' : '<span class="text-red-600 font-semibold">● 비활성</span>')
      +         ' · 허용 파일: HTML, PDF, Word, Excel, PPT, HWP, 이미지, ZIP (최대 20MB)'
      +       '</div>'
      +     '</div>'
      +   '</div>'
      + '</div>'
      + '<div class="flex items-center justify-between mb-4">'
      +   '<div class="text-sm text-gray-600">총 <span class="font-bold text-gray-900">' + currentItems.length + '</span>건</div>'
      +   '<div class="flex gap-2">'
      +     '<button id="btn-new-url" class="inline-flex items-center gap-1 px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">'
      +       '<i class="fas fa-link"></i> URL로 등록'
      +     '</button>'
      +     '<button id="btn-new-upload" class="inline-flex items-center gap-1 px-4 py-2 text-sm rounded-lg bg-purple-600 text-white hover:bg-purple-700" ' + (r2Available ? '' : 'disabled title="R2가 설정되지 않았습니다"') + '>'
      +       '<i class="fas fa-cloud-arrow-up"></i> 파일 업로드'
      +     '</button>'
      +   '</div>'
      + '</div>'
      + '<div class="overflow-x-auto border border-gray-200 rounded-lg">'
      +   '<table class="w-full text-sm">'
      +     '<thead class="bg-gray-50 text-gray-600">'
      +       '<tr>'
      +         '<th class="p-3 text-left font-semibold">문서</th>'
      +         '<th class="p-3 text-center font-semibold" style="width:100px">크기</th>'
      +         '<th class="p-3 text-center font-semibold" style="width:80px">다운로드</th>'
      +         '<th class="p-3 text-left font-semibold" style="width:140px">등록일</th>'
      +         '<th class="p-3 text-right font-semibold" style="width:260px">작업</th>'
      +       '</tr>'
      +     '</thead>'
      +     '<tbody class="divide-y divide-gray-100">'
      +       (rows || '<tr><td colspan="5" class="p-8 text-center text-gray-400">등록된 시스템 문서가 없습니다.</td></tr>')
      +     '</tbody>'
      +   '</table>'
      + '</div>'
      + '<div id="sys-doc-modal" class="hidden fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">'
      +   '<div class="bg-white rounded-xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">'
      +     '<div class="p-6 border-b border-gray-100 flex items-center justify-between">'
      +       '<h3 id="modal-title" class="text-lg font-bold text-gray-800">시스템 문서</h3>'
      +       '<button id="modal-close" class="text-gray-400 hover:text-gray-600"><i class="fas fa-times"></i></button>'
      +     '</div>'
      +     '<div class="p-6 space-y-4" id="modal-body"></div>'
      +   '</div>'
      + '</div>';

    // 이벤트 바인딩
    document.getElementById('btn-new-url').addEventListener('click', function () { openModal('url', null); });
    const uploadBtn = document.getElementById('btn-new-upload');
    if (!uploadBtn.disabled) uploadBtn.addEventListener('click', function () { openModal('upload', null); });

    container.querySelectorAll('.edit-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = btn.getAttribute('data-id');
        const item = currentItems.find(function (x) { return String(x.id) === String(id); });
        if (item) openModal('edit', item);
      });
    });
    container.querySelectorAll('.del-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = btn.getAttribute('data-id');
        const t = btn.getAttribute('data-title');
        onDelete(id, t);
      });
    });
    document.getElementById('modal-close').addEventListener('click', closeModal);
  }

  // ── Modal ────────────────────────────────────────────────
  function openModal(mode, item) {
    const modal = document.getElementById('sys-doc-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');

    if (mode === 'upload') {
      title.innerHTML = '<i class="fas fa-cloud-arrow-up text-purple-600 mr-2"></i>파일 업로드';
      body.innerHTML = ''
        + '<div>'
        +   '<label class="block text-sm font-semibold text-gray-700 mb-1">제목 <span class="text-red-500">*</span></label>'
        +   '<input id="f-title" type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="예: 시스템 설계서 (Architecture Diagram)">'
        + '</div>'
        + '<div>'
        +   '<label class="block text-sm font-semibold text-gray-700 mb-1">설명</label>'
        +   '<textarea id="f-desc" rows="2" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="예: v8.0 | 시스템 아키텍처, 10개 사업 카테고리, DB 스키마, API 설계"></textarea>'
        + '</div>'
        + '<div>'
        +   '<label class="block text-sm font-semibold text-gray-700 mb-1">파일 <span class="text-red-500">*</span></label>'
        +   '<input id="f-file" type="file" class="w-full text-sm" accept=".html,.htm,.pdf,.docx,.xlsx,.pptx,.doc,.xls,.ppt,.hwp,.txt,.zip,.png,.jpg,.jpeg,.gif,.webp">'
        +   '<div class="text-xs text-gray-400 mt-1">최대 20MB · HTML/PDF/Office/이미지/ZIP</div>'
        + '</div>'
        + '<div class="pt-2 flex justify-end gap-2">'
        +   '<button id="f-cancel" class="px-4 py-2 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">취소</button>'
        +   '<button id="f-submit" class="px-4 py-2 text-sm rounded-lg bg-purple-600 text-white hover:bg-purple-700"><i class="fas fa-upload"></i> 업로드</button>'
        + '</div>';
      document.getElementById('f-cancel').addEventListener('click', closeModal);
      document.getElementById('f-submit').addEventListener('click', onUpload);
    } else if (mode === 'url') {
      title.innerHTML = '<i class="fas fa-link text-blue-600 mr-2"></i>URL로 등록';
      body.innerHTML = ''
        + '<div>'
        +   '<label class="block text-sm font-semibold text-gray-700 mb-1">제목 <span class="text-red-500">*</span></label>'
        +   '<input id="f-title" type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">'
        + '</div>'
        + '<div>'
        +   '<label class="block text-sm font-semibold text-gray-700 mb-1">설명</label>'
        +   '<textarea id="f-desc" rows="2" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"></textarea>'
        + '</div>'
        + '<div>'
        +   '<label class="block text-sm font-semibold text-gray-700 mb-1">파일 URL <span class="text-red-500">*</span></label>'
        +   '<input id="f-url" type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="예: /static/docs/architecture-diagram.html 또는 https://example.com/doc.pdf">'
        +   '<div class="text-xs text-gray-400 mt-1">기존 /static/ 경로 또는 외부 URL 입력</div>'
        + '</div>'
        + '<div>'
        +   '<label class="block text-sm font-semibold text-gray-700 mb-1">파일명 (표시용)</label>'
        +   '<input id="f-fname" type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="architecture-diagram.html">'
        + '</div>'
        + '<div class="pt-2 flex justify-end gap-2">'
        +   '<button id="f-cancel" class="px-4 py-2 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">취소</button>'
        +   '<button id="f-submit" class="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"><i class="fas fa-plus"></i> 등록</button>'
        + '</div>';
      document.getElementById('f-cancel').addEventListener('click', closeModal);
      document.getElementById('f-submit').addEventListener('click', onCreateUrl);
    } else if (mode === 'edit' && item) {
      title.innerHTML = '<i class="fas fa-pen text-gray-600 mr-2"></i>문서 편집';
      body.innerHTML = ''
        + '<div>'
        +   '<label class="block text-sm font-semibold text-gray-700 mb-1">제목</label>'
        +   '<input id="f-title" type="text" value="' + esc(item.title) + '" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">'
        + '</div>'
        + '<div>'
        +   '<label class="block text-sm font-semibold text-gray-700 mb-1">설명</label>'
        +   '<textarea id="f-desc" rows="2" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">' + esc(item.description || '') + '</textarea>'
        + '</div>'
        + '<div>'
        +   '<label class="block text-sm font-semibold text-gray-700 mb-1">파일 URL</label>'
        +   '<input id="f-url" type="text" value="' + esc(item.file_url) + '" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">'
        +   '<div class="text-xs text-gray-400 mt-1">파일을 교체하려면 기존 항목 삭제 후 새로 업로드하세요.</div>'
        + '</div>'
        + '<div>'
        +   '<label class="block text-sm font-semibold text-gray-700 mb-1">파일명 (표시용)</label>'
        +   '<input id="f-fname" type="text" value="' + esc(item.file_name || '') + '" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">'
        + '</div>'
        + '<div class="pt-2 flex justify-end gap-2">'
        +   '<button id="f-cancel" class="px-4 py-2 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">취소</button>'
        +   '<button id="f-submit" class="px-4 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700"><i class="fas fa-save"></i> 저장</button>'
        + '</div>';
      document.getElementById('f-cancel').addEventListener('click', closeModal);
      document.getElementById('f-submit').addEventListener('click', function () { onUpdate(item.id); });
    }
    modal.classList.remove('hidden');
  }
  function closeModal() {
    document.getElementById('sys-doc-modal').classList.add('hidden');
  }

  // ── Actions ──────────────────────────────────────────────
  async function onUpload() {
    const title = document.getElementById('f-title').value.trim();
    const desc = document.getElementById('f-desc').value.trim();
    const fileInput = document.getElementById('f-file');
    const file = fileInput.files && fileInput.files[0];
    if (!title) { toast('제목을 입력해주세요.', false); return; }
    if (!file) { toast('파일을 선택해주세요.', false); return; }
    if (file.size > 20 * 1024 * 1024) { toast('파일 크기는 20MB 이하만 가능합니다.', false); return; }

    const btn = document.getElementById('f-submit');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 업로드 중...';

    try {
      const form = new FormData();
      form.append('file', file);
      form.append('title', title);
      form.append('description', desc);

      const data = await window.apiUpload(API_BASE, form);
      if (!data || !data.success) throw new Error((data && data.error) || '업로드 실패');

      toast('업로드 성공', true);
      closeModal();
      await fetchList();
    } catch (err) {
      toast(err.message || '업로드 실패', false);
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-upload"></i> 업로드';
    }
  }

  async function onCreateUrl() {
    const title = document.getElementById('f-title').value.trim();
    const desc = document.getElementById('f-desc').value.trim();
    const url = document.getElementById('f-url').value.trim();
    const fname = document.getElementById('f-fname').value.trim();
    if (!title) { toast('제목을 입력해주세요.', false); return; }
    if (!url) { toast('URL을 입력해주세요.', false); return; }

    try {
      const data = await window.apiCall(API_BASE, 'POST', {
        title: title, description: desc, file_url: url, file_name: fname, file_size: 0,
      });
      if (!data || !data.success) throw new Error((data && data.error) || '등록 실패');
      toast('등록 완료', true);
      closeModal();
      await fetchList();
    } catch (err) {
      toast(err.message || '등록 실패', false);
    }
  }

  async function onUpdate(id) {
    const title = document.getElementById('f-title').value.trim();
    const desc = document.getElementById('f-desc').value.trim();
    const url = document.getElementById('f-url').value.trim();
    const fname = document.getElementById('f-fname').value.trim();
    if (!title) { toast('제목을 입력해주세요.', false); return; }

    try {
      const data = await window.apiCall(API_BASE + '/' + id, 'PUT', {
        title: title, description: desc, file_url: url, file_name: fname,
      });
      if (!data || !data.success) throw new Error((data && data.error) || '저장 실패');
      toast('저장 완료', true);
      closeModal();
      await fetchList();
    } catch (err) {
      toast(err.message || '저장 실패', false);
    }
  }

  async function onDelete(id, title) {
    if (!confirm('"' + title + '" 문서를 삭제하시겠습니까? R2에 업로드된 파일도 함께 삭제됩니다.')) return;
    try {
      const data = await window.apiCall(API_BASE + '/' + id, 'DELETE');
      if (!data || !data.success) throw new Error((data && data.error) || '삭제 실패');
      toast('삭제 완료', true);
      await fetchList();
    } catch (err) {
      toast(err.message || '삭제 실패', false);
    }
  }

  // ── Init ─────────────────────────────────────────────────
  fetchList().catch(function (err) {
    container.innerHTML = '<div class="p-6 text-center text-red-600">불러오기 실패: ' + esc(err.message) + '</div>';
  });
})();
