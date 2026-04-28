#!/bin/bash
# 커스텀 도메인 연결 검증 스크립트 (koist.ai.kr)
# 사용법: bash scripts/verify-domain.sh

set -e

DOMAINS=("koist.ai.kr" "www.koist.ai.kr")
PAGES_URL="koist-website.pages.dev"

echo "=================================="
echo "🌐 커스텀 도메인 연결 검증"
echo "=================================="

# 1. DNS 조회 (Google DoH API 활용)
echo ""
echo "📡 [1/5] DNS 레코드 확인"
for d in "${DOMAINS[@]}"; do
    result=$(curl -s -H 'Accept: application/dns-json' "https://dns.google/resolve?name=$d&type=A")
    ip=$(echo "$result" | python3 -c "import sys,json; d=json.load(sys.stdin); a=d.get('Answer',[]); print(a[0]['data'] if a else 'NONE')")
    echo "  $d → $ip"
done

# 2. CNAME 확인
echo ""
echo "🔗 [2/5] CNAME 레코드 확인"
for d in "${DOMAINS[@]}"; do
    result=$(curl -s -H 'Accept: application/dns-json' "https://dns.google/resolve?name=$d&type=CNAME")
    cname=$(echo "$result" | python3 -c "import sys,json; d=json.load(sys.stdin); a=d.get('Answer',[]); print(a[0]['data'] if a else 'NONE')")
    echo "  $d → CNAME: $cname"
done

# 3. HTTP/HTTPS 응답 확인
echo ""
echo "🌍 [3/5] HTTPS 응답 확인"
for d in "${DOMAINS[@]}"; do
    code=$(curl -sk -o /dev/null -w "%{http_code}" --max-time 15 "https://$d/" || echo "FAIL")
    echo "  https://$d/ → HTTP $code"
done

# 4. SSL 인증서 검증
echo ""
echo "🔐 [4/5] SSL 인증서 검증"
for d in "${DOMAINS[@]}"; do
    cert=$(echo | timeout 10 openssl s_client -servername "$d" -connect "$d:443" 2>/dev/null | openssl x509 -noout -subject -issuer -dates 2>/dev/null || echo "FAIL")
    if [[ "$cert" == "FAIL" ]]; then
        echo "  $d → ❌ SSL 검증 실패"
    else
        echo "  $d:"
        echo "$cert" | sed 's/^/    /'
    fi
done

# 5. 컨텐츠 일치 확인
echo ""
echo "📄 [5/5] 컨텐츠 일치 확인 (Pages URL 대비)"
ref_size=$(curl -sk --max-time 15 "https://$PAGES_URL/" | wc -c)
echo "  Reference (https://$PAGES_URL/): $ref_size bytes"
for d in "${DOMAINS[@]}"; do
    size=$(curl -sk --max-time 15 "https://$d/" | wc -c)
    if [[ "$size" -gt 1000 ]]; then
        diff=$((size - ref_size))
        echo "  https://$d/ → $size bytes (diff: $diff)"
    else
        echo "  https://$d/ → ❌ 응답 크기 비정상 ($size bytes)"
    fi
done

echo ""
echo "=================================="
echo "✅ 검증 완료"
echo "=================================="
