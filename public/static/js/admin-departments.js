// Admin - Departments Management (Full CRUD + Sub-pages)
(async function(){
  const c = document.getElementById('admin-content');
  let deptList = [];
  await load();

  async function load(){
    const d = await apiCall('/api/admin/departments');
    if(!d) return;
    deptList = d.data || [];
    let h = '<div class="flex justify-between items-center mb-4">';
    h += '<span class="text-gray-500 text-sm">총 '+deptList.length+'개</span>';
    h += '<button onclick="showDeptForm()" class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"><i class="fas fa-plus mr-1"></i>추가</button>';
    h += '</div><div id="deptFormArea" class="hidden mb-4"></div><div class="space-y-2" id="deptList">';
    deptList.forEach(dept => {
      h += '<div class="border rounded-lg p-4">';
      h += '<div class="flex items-center justify-between gap-4">';
      h += '<div class="flex items-center gap-3 min-w-0">';
      h += dept.image_url ? '<img src="'+dept.image_url+'" alt="'+dept.name+'" class="w-10 h-10 rounded-lg object-cover shrink-0" style="border:1px solid '+dept.color+'30">' : '<div class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style="background:'+dept.color+'15"><i class="fas '+dept.icon+'" style="color:'+dept.color+'"></i></div>';
      h += '<div class="min-w-0"><div class="font-medium">'+dept.name+'</div>';
      h += '<div class="text-xs text-gray-400">/'+dept.slug+' | 순서:'+dept.sort_order+' | '+(dept.is_active?'<span class="text-green-600">활성</span>':'<span class="text-red-500">비활성</span>')+'</div></div></div>';
      h += '<div class="flex gap-2 shrink-0">';
      h += '<button onclick="showSubPages('+dept.id+',\''+dept.name.replace(/'/g,"\\'")+'\')" class="text-xs px-3 py-1.5 rounded-lg border bg-blue-50 text-blue-600 hover:bg-blue-100"><i class="fas fa-file-lines mr-1"></i>하위페이지</button>';
      h += '<button onclick="editDept('+dept.id+')" class="text-xs px-3 py-1.5 rounded-lg border hover:bg-gray-50">수정</button>';
      h += '<button onclick="toggleDept('+dept.id+','+(dept.is_active?0:1)+')" class="text-xs px-3 py-1.5 rounded-lg border">'+(dept.is_active?'비활성화':'활성화')+'</button>';
      h += '<button onclick="deleteDept('+dept.id+')" class="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50">삭제</button>';
      h += '</div></div>';
      h += '<div id="subpages-'+dept.id+'" class="hidden mt-3 pt-3 border-t"></div>';
      h += '</div>';
    });
    h += '</div>';
    c.innerHTML = h;
  }

  function deptFormHtml(dept){
    const isEdit = !!dept;
    return '<div class="border rounded-lg p-4 bg-gray-50"><h4 class="font-medium mb-3">'+(isEdit?'사업분야 수정':'사업분야 추가')+'</h4>'
      +'<div class="grid grid-cols-2 gap-3 mb-3">'
      +'<input id="dName" value="'+(dept?.name||'')+'" placeholder="이름" class="px-3 py-2 border rounded-lg text-sm">'
      +'<input id="dSlug" value="'+(dept?.slug||'')+'" placeholder="슬러그(영문)" class="px-3 py-2 border rounded-lg text-sm">'
      +'<input id="dIcon" value="'+(dept?.icon||'fa-shield-halved')+'" placeholder="아이콘 (fa-xxx)" class="px-3 py-2 border rounded-lg text-sm">'
      +'<input id="dColor" value="'+(dept?.color||'#3B82F6')+'" type="color" class="px-3 py-2 border rounded-lg h-[42px]">'
      +'<input id="dOrder" type="number" value="'+(dept?.sort_order||0)+'" placeholder="순서" class="px-3 py-2 border rounded-lg text-sm">'
      +'</div>'
      +'<textarea id="dDesc" rows="2" placeholder="설명" class="w-full px-3 py-2 border rounded-lg text-sm mb-3">'+(dept?.description||'')+'</textarea>'
      +'<div class="mb-3"><label class="block text-xs font-medium text-gray-500 mb-1"><i class="fas fa-image mr-1"></i>사업분야 아이콘 이미지 URL</label>'
      +'<div class="flex gap-2 items-center">'
      +'<input id="dImageUrl" value="'+(dept?.image_url||'')+'" placeholder="/static/images/dept-icons/... 또는 /api/images/..." class="flex-1 px-3 py-2 border rounded-lg text-sm">'
      +(dept?.image_url ? '<img src="'+dept.image_url+'" class="w-10 h-10 rounded-lg object-cover border">' : '')+'</div></div>'
      +'<div class="mb-3"><label class="block text-xs font-medium text-gray-500 mb-1"><i class="fas fa-panorama mr-1"></i>헤더 배경 이미지 URL (비워두면 기본 그라데이션 사용)</label>'
      +'<input id="dHeaderBg" value="'+(dept?.header_bg_url||'')+'" placeholder="/api/images/background/... 또는 외부 URL" class="w-full px-3 py-2 border rounded-lg text-sm"></div>'
      +'<div class="flex gap-2">'
      +'<button onclick="saveDept('+(dept?.id||'null')+')" class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">저장</button>'
      +'<button onclick="document.getElementById(\'deptFormArea\').classList.add(\'hidden\')" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm">취소</button>'
      +'</div></div>';
  }

  window.showDeptForm = function(){ 
    const a = document.getElementById('deptFormArea'); 
    a.classList.remove('hidden'); 
    a.innerHTML = deptFormHtml(null); 
  };

  window.editDept = function(id){
    const dept = deptList.find(d => d.id === id);
    if(!dept) return;
    const a = document.getElementById('deptFormArea');
    a.classList.remove('hidden');
    a.innerHTML = deptFormHtml(dept);
    a.scrollIntoView({behavior:'smooth'});
  };

  window.saveDept = async function(id){
    const body = {
      name: document.getElementById('dName').value,
      slug: document.getElementById('dSlug').value,
      description: document.getElementById('dDesc').value,
      icon: document.getElementById('dIcon').value,
      color: document.getElementById('dColor').value,
      sort_order: parseInt(document.getElementById('dOrder').value)||0,
      image_url: document.getElementById('dImageUrl').value,
      header_bg_url: document.getElementById('dHeaderBg').value
    };
    if(id) await apiCall('/api/admin/departments/'+id, 'PUT', body);
    else await apiCall('/api/admin/departments', 'POST', body);
    document.getElementById('deptFormArea').classList.add('hidden');
    await load();
  };

  window.toggleDept = async function(id,v){ await apiCall('/api/admin/departments/'+id,'PUT',{is_active:v}); await load(); };
  window.deleteDept = async function(id){ if(!confirm('이 사업분야와 하위 페이지가 모두 삭제됩니다. 삭제하시겠습니까?')) return; await apiCall('/api/admin/departments/'+id,'DELETE'); await load(); };

  // ========== Sub-pages Management ==========
  window.showSubPages = async function(deptId, deptName){
    const container = document.getElementById('subpages-'+deptId);
    if(!container.classList.contains('hidden')){
      container.classList.add('hidden');
      return;
    }
    container.classList.remove('hidden');
    container.innerHTML = '<p class="text-gray-400 text-sm"><i class="fas fa-spinner fa-spin mr-1"></i>로딩...</p>';

    const d = await apiCall('/api/admin/departments/'+deptId+'/pages');
    if(!d) return;
    const pages = d.data || [];

    let h = '<div class="flex justify-between items-center mb-3">';
    h += '<span class="text-sm font-medium text-gray-600"><i class="fas fa-file-lines mr-1"></i>'+deptName+' 하위 페이지 ('+pages.length+'개)</span>';
    h += '<button onclick="showPageForm('+deptId+',null)" class="bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs hover:bg-green-600"><i class="fas fa-plus mr-1"></i>페이지 추가</button>';
    h += '</div>';
    h += '<div id="pageForm-'+deptId+'" class="hidden mb-3"></div>';

    if(pages.length === 0){
      h += '<p class="text-gray-400 text-sm py-2">등록된 하위 페이지가 없습니다.</p>';
    } else {
      pages.forEach(p => {
        h += '<div class="bg-white border rounded-lg p-3 mb-2 flex items-center justify-between gap-3">';
        h += '<div class="min-w-0"><div class="text-sm font-medium">'+p.title+'</div>';
        h += '<div class="text-xs text-gray-400">/'+p.slug+' | 순서:'+p.sort_order+' | '+(p.is_active?'활성':'비활성')+'</div></div>';
        h += '<div class="flex gap-2 shrink-0">';
        h += '<button onclick="editPage('+deptId+','+p.id+')" class="text-xs px-2 py-1 rounded border hover:bg-gray-50">수정</button>';
        h += '<button onclick="deletePage('+p.id+','+deptId+')" class="text-xs px-2 py-1 rounded border border-red-200 text-red-500 hover:bg-red-50">삭제</button>';
        h += '</div></div>';
      });
    }
    container.innerHTML = h;
    container._pages = pages;
  };

  window.showPageForm = function(deptId, page){
    const f = document.getElementById('pageForm-'+deptId);
    f.classList.remove('hidden');
    const isEdit = !!page;
    const escapedContent = (page?.content||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    f.innerHTML = '<div class="bg-green-50 border border-green-200 rounded-lg p-3">'
      +'<h5 class="text-sm font-medium mb-2">'+(isEdit?'페이지 수정':'새 페이지 추가')+'</h5>'
      +'<div class="grid grid-cols-3 gap-2 mb-2">'
      +'<input id="pTitle-'+deptId+'" value="'+(page?.title||'')+'" placeholder="제목" class="px-2 py-1.5 border rounded text-sm">'
      +'<input id="pSlug-'+deptId+'" value="'+(page?.slug||'')+'" placeholder="슬러그(영문)" class="px-2 py-1.5 border rounded text-sm">'
      +'<input id="pOrder-'+deptId+'" type="number" value="'+(page?.sort_order||0)+'" placeholder="순서" class="px-2 py-1.5 border rounded text-sm">'
      +'</div>'
      // Rich text toolbar
      +'<div class="border rounded-t bg-white px-2 py-1.5 flex flex-wrap items-center gap-1" style="border-bottom:none;">'
      +'<button type="button" onclick="editorCmd(\'bold\')" class="px-2 py-1 rounded text-xs font-bold hover:bg-gray-100 border" title="굵게"><i class="fas fa-bold"></i></button>'
      +'<button type="button" onclick="editorCmd(\'italic\')" class="px-2 py-1 rounded text-xs hover:bg-gray-100 border" title="기울임"><i class="fas fa-italic"></i></button>'
      +'<button type="button" onclick="editorCmd(\'underline\')" class="px-2 py-1 rounded text-xs hover:bg-gray-100 border" title="밑줄"><i class="fas fa-underline"></i></button>'
      +'<span class="w-px h-5 bg-gray-200 mx-1"></span>'
      +'<select onchange="editorFontSize(this.value,'+deptId+')" class="px-1 py-1 border rounded text-xs" title="글자 크기">'
      +'<option value="">크기</option>'
      +'<option value="0.8em">작게</option>'
      +'<option value="1em">보통</option>'
      +'<option value="1.3em">크게</option>'
      +'<option value="1.6em">아주크게</option>'
      +'<option value="2em">특대</option>'
      +'</select>'
      +'<span class="w-px h-5 bg-gray-200 mx-1"></span>'
      +'<label class="flex items-center gap-1 px-1 py-1 rounded hover:bg-gray-100 border cursor-pointer text-xs" title="글자색">'
      +'<i class="fas fa-palette" style="color:#EF4444;font-size:11px"></i>'
      +'<input type="color" value="#EF4444" onchange="editorColor(this.value,'+deptId+')" class="w-0 h-0 opacity-0 absolute">'
      +'</label>'
      +'<label class="flex items-center gap-1 px-1 py-1 rounded hover:bg-gray-100 border cursor-pointer text-xs" title="배경색">'
      +'<i class="fas fa-fill-drip" style="color:#FEF08A;font-size:11px"></i>'
      +'<input type="color" value="#FEF08A" onchange="editorBgColor(this.value,'+deptId+')" class="w-0 h-0 opacity-0 absolute">'
      +'</label>'
      +'<span class="w-px h-5 bg-gray-200 mx-1"></span>'
      +'<button type="button" onclick="editorCmd(\'insertUnorderedList\')" class="px-2 py-1 rounded text-xs hover:bg-gray-100 border" title="목록"><i class="fas fa-list-ul"></i></button>'
      +'<button type="button" onclick="editorCmd(\'justifyLeft\')" class="px-2 py-1 rounded text-xs hover:bg-gray-100 border" title="왼쪽 정렬"><i class="fas fa-align-left"></i></button>'
      +'<button type="button" onclick="editorCmd(\'justifyCenter\')" class="px-2 py-1 rounded text-xs hover:bg-gray-100 border" title="가운데 정렬"><i class="fas fa-align-center"></i></button>'
      +'<span class="w-px h-5 bg-gray-200 mx-1"></span>'
      +'<button type="button" onclick="editorCmd(\'removeFormat\')" class="px-2 py-1 rounded text-xs hover:bg-gray-100 border text-red-400" title="서식 제거"><i class="fas fa-eraser"></i></button>'
      +'<button type="button" onclick="toggleSourceView('+deptId+')" class="px-2 py-1 rounded text-xs hover:bg-gray-100 border text-gray-400 ml-auto" title="HTML 소스보기"><i class="fas fa-code"></i></button>'
      +'</div>'
      // Rich editor area
      +'<div id="pEditor-'+deptId+'" contenteditable="true" class="w-full px-3 py-2 border rounded-b text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500/30" style="min-height:150px; max-height:400px; overflow-y:auto; line-height:1.7;">'+(page?.content||'')+'</div>'
      // Hidden textarea for source view toggle
      +'<textarea id="pContent-'+deptId+'" rows="6" class="w-full px-2 py-1.5 border rounded text-sm mb-2 font-mono hidden" style="min-height:150px;">'+(page?.content||'').replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</textarea>'
      +'<div class="flex gap-2 mt-2">'
      +'<button onclick="savePage('+deptId+','+(page?.id||'null')+')" class="bg-green-500 text-white px-3 py-1.5 rounded text-xs">저장</button>'
      +'<button onclick="document.getElementById(\'pageForm-'+deptId+'\').classList.add(\'hidden\')" class="bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs">취소</button>'
      +'</div></div>';
  };

  window.editPage = function(deptId, pageId){
    const container = document.getElementById('subpages-'+deptId);
    const pages = container._pages || [];
    const page = pages.find(p => p.id === pageId);
    if(page) window.showPageForm(deptId, page);
  };

  window.savePage = async function(deptId, pageId){
    // Get content from rich editor or source textarea
    var editor = document.getElementById('pEditor-'+deptId);
    var textarea = document.getElementById('pContent-'+deptId);
    var content = '';
    if (editor && !editor.classList.contains('hidden')) {
      content = editor.innerHTML;
    } else if (textarea) {
      content = textarea.value;
    }
    const body = {
      title: document.getElementById('pTitle-'+deptId).value,
      slug: document.getElementById('pSlug-'+deptId).value,
      content: content,
      sort_order: parseInt(document.getElementById('pOrder-'+deptId).value)||0
    };
    if(pageId) await apiCall('/api/admin/dep-pages/'+pageId, 'PUT', body);
    else await apiCall('/api/admin/departments/'+deptId+'/pages', 'POST', body);
    const dept = deptList.find(d => d.id === deptId);
    await window.showSubPages(deptId, dept?.name||'');
  };

  window.deletePage = async function(pageId, deptId){
    if(!confirm('이 페이지를 삭제하시겠습니까?')) return;
    await apiCall('/api/admin/dep-pages/'+pageId, 'DELETE');
    const dept = deptList.find(d => d.id === deptId);
    await window.showSubPages(deptId, dept?.name||'');
  };

  // ========== Rich Text Editor Helpers ==========
  window.editorCmd = function(cmd) {
    document.execCommand(cmd, false, null);
  };

  window.editorFontSize = function(size, deptId) {
    if (!size) return;
    var sel = window.getSelection();
    if (!sel.rangeCount) return;
    var range = sel.getRangeAt(0);
    if (range.collapsed) return;
    var span = document.createElement('span');
    span.style.fontSize = size;
    range.surroundContents(span);
    sel.removeAllRanges();
  };

  window.editorColor = function(color, deptId) {
    document.execCommand('foreColor', false, color);
  };

  window.editorBgColor = function(color, deptId) {
    document.execCommand('hiliteColor', false, color);
  };

  window.toggleSourceView = function(deptId) {
    var editor = document.getElementById('pEditor-'+deptId);
    var textarea = document.getElementById('pContent-'+deptId);
    if (!editor || !textarea) return;
    if (editor.classList.contains('hidden')) {
      // Switch back to rich editor
      editor.innerHTML = textarea.value;
      editor.classList.remove('hidden');
      textarea.classList.add('hidden');
    } else {
      // Switch to source view
      textarea.value = editor.innerHTML;
      textarea.classList.remove('hidden');
      editor.classList.add('hidden');
    }
  };
})();
