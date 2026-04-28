#!/bin/bash
# Cloudflare 활성화 대기 스크립트
# 5분마다 koist.ai.kr SOA 레코드를 확인하여 Cloudflare 활성화 감지

DOMAIN="koist.ai.kr"
INTERVAL=300  # 5분
MAX_ATTEMPTS=288  # 24시간 (288 * 5분)

echo "=================================================="
echo "🔍 Cloudflare 활성화 자동 모니터링"
echo "   도메인: $DOMAIN"
echo "   확인 주기: ${INTERVAL}초 (5분)"
echo "   최대 대기: 24시간"
echo "=================================================="

for i in $(seq 1 $MAX_ATTEMPTS); do
    echo ""
    echo "[시도 $i/$MAX_ATTEMPTS] $(date '+%H:%M:%S')"
    
    # SOA 레코드 확인 (Cloudflare가 권한 응답하면 활성화 완료)
    SOA=$(curl -s -H 'Accept: application/dns-json' \
        "https://dns.google/resolve?name=$DOMAIN&type=SOA" \
        | python3 -c "
import sys, json
d = json.load(sys.stdin)
for a in d.get('Answer', []) + d.get('Authority', []):
    print(a.get('data', ''))
    break
")
    
    echo "  SOA: ${SOA:0:80}"
    
    if echo "$SOA" | grep -q "cloudflare"; then
        echo ""
        echo "🎉🎉🎉 활성화 완료! 🎉🎉🎉"
        echo "  Cloudflare가 $DOMAIN의 권위 응답을 시작했습니다."
        echo ""
        echo "다음 단계:"
        echo "  1. Cloudflare 대시보드에서 'Active' 상태 확인"
        echo "  2. Pages 프로젝트에 커스텀 도메인 연결"
        echo "  3. SSL 인증서 발급 대기 (5~15분)"
        exit 0
    else
        echo "  ⏳ 아직 가비아 SOA가 응답 중. 5분 후 재확인..."
    fi
    
    sleep $INTERVAL
done

echo ""
echo "⚠️ 24시간 내 활성화 미감지. Cloudflare 지원팀 문의 권장."
exit 1
