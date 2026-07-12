import React, { useState } from 'react';
import { 
  Trophy, Home, PanelsTopLeft, Target, ChartColumn, BookOpen, 
  Smartphone, Globe, ChevronRight, RefreshCw, CheckCircle2, XCircle, Info, Sparkles, HelpCircle
} from 'lucide-react';

// 다국어 텍스트 정의
const TRANSLATIONS = {
  ko: {
    nav: {
      home: '홈',
      court: '코트 가이드',
      serve: '서브 시뮬레이션',
      score: '스코어링',
      rules: '규칙 백과',
      quiz: '판정 퀴즈'
    },
    hero: {
      badge: '2025 BWF 공식 규정집 기반',
      title1: 'BADMINTON',
      title2: 'ACADEMY',
      subtitle: '배드민턴의 복잡한 서브 규칙과 코트 경계 판정을 인터랙티브하게 마스터하세요.'
    },
    footer: '© 2026 BADMINTON ACADEMY. BWF RULEBOOK INTERACTIVE LEARNING.',
    home: {
      core: '핵심 모듈',
      extra: '학습 및 테스트',
      cards: [
        {
          num: '01',
          title: '서브 시뮬레이터',
          desc: '단식과 복식의 서브 유효 범위(숏/롱 서비스 라인) 차이를 마우스 클릭으로 판정하고 학습합니다.',
          badge: 'SERVE',
          color: '#FF512F',
          gradient: 'from-[#FF512F] to-[#DD2476]',
          bg: 'from-[#140806] to-[#040201]',
          tab: 'serve'
        },
        {
          num: '02',
          title: '인터랙티브 코트',
          desc: '배드민턴 코트의 복잡한 라인명칭과 단식/복식 경기장 규격의 차이를 마우스 오버로 탐색합니다.',
          badge: 'COURT',
          color: '#F39C12',
          gradient: 'from-[#F39C12] to-[#F1C40F]',
          bg: 'from-[#140D06] to-[#040301]',
          tab: 'court'
        },
        {
          num: '03',
          title: '스코어링 시스템',
          desc: '21점 경기 진행, 듀스 룰, 그리고 점수(홀수/짝수)에 따른 서브 위치 변경 규칙을 한눈에 파악합니다.',
          badge: 'SCORE',
          color: '#38ef7d',
          gradient: 'from-[#11998e] to-[#38ef7d]',
          bg: 'from-[#06140B] to-[#010402]',
          tab: 'score'
        },
        {
          num: '04',
          title: '공식 룰 백과',
          desc: '세계배드민턴연맹(BWF)의 정식 규정들을 카테고리별로 알기 쉽게 정리한 룰북 브라우저.',
          badge: 'RULES',
          color: '#00c6ff',
          gradient: 'from-[#00c6ff] to-[#0072ff]',
          bg: 'from-[#060E1A] to-[#010205]',
          tab: 'rules'
        },
        {
          num: '05',
          title: '라인 판정 퀴즈',
          desc: '다양한 실전 서브/랠리 셔틀콕 낙하 시나리오를 바탕으로 올바른 판정(In/Out)을 맞히는 퀴즈.',
          badge: 'QUIZ',
          color: '#E100FF',
          gradient: 'from-[#7F00FF] to-[#E100FF]',
          bg: 'from-[#0F061A] to-[#030105]',
          tab: 'quiz'
        }
      ]
    },
    serve: {
      title: '서브 룰 시뮬레이터',
      desc: '코트 내부의 아무 곳이나 클릭하여 셔틀콕의 낙하지점을 테스트하세요. 단식/복식 및 점수(홀/짝)에 따라 유효 영역(IN)이 달라집니다.',
      singles: '단식 (Singles)',
      doubles: '복식 (Doubles)',
      scoreLabel: '현재 서버의 점수:',
      scoreDescOdd: '점수가 홀수이므로 [좌측]에서 서브를 넣고, 대각선인 상대 [우측] 영역으로 들어가야 합니다.',
      scoreDescEven: '점수가 짝수이므로 [우측]에서 서브를 넣고, 대각선인 상대 [좌측] 영역으로 들어가야 합니다.',
      in: '라인 안쪽 (IN) - 유효한 서브입니다!',
      outShort: '아웃 (Short) - 숏 서비스 라인에 미달했거나 네트에 걸렸습니다.',
      outLong: '아웃 (Long) - 서비스 라인 길이를 초과했습니다 (복식은 롱 서비스 라인 기준, 단식은 백 바운더리 라인 기준).',
      outWide: '아웃 (Wide) - 사이드라인 밖으로 나갔습니다.',
      outWrong: '아웃 (Wrong Court) - 대각선이 아닌 잘못된 방향의 서비스 코트에 떨어졌습니다.',
      reset: '다시 클릭하기',
      guideTitle: '서브 유효 범위 규칙 요약',
      singlesRule: '단식 서브: 길고 좁음 (Long & Narrow). 숏 서비스 라인부터 제일 끝선까지 유효하며, 좌우 폭은 안쪽 라인까지만 유효합니다.',
      doublesRule: '복식 서브: 짧고 넓음 (Short & Wide). 숏 서비스 라인부터 뒤에서 두 번째 선(복식 롱 서비스 라인)까지만 유효하며, 좌우 폭은 바깥 끝선까지 유효합니다.'
    },
    court: {
      title: '인터랙티브 코트 가이드',
      desc: '코트의 각 라인 영역에 마우스를 올리거나 탭하여 배드민턴 규격과 명칭을 상세하게 알아보세요.',
      lines: {
        net: '네트 (Net) - 높이 1.55m. 이 선을 넘겨 대각선 서비스 코트에 셔틀콕을 떨어뜨려야 서브가 시작됩니다.',
        shortServe: '숏 서비스 라인 (Short Service Line) - 네트로부터 1.98m 거리. 서브한 셔틀콕은 반드시 이 라인을 넘어가야 합니다.',
        doublesLong: '복식 롱 서비스 라인 (Doubles Long Service Line) - 끝선에서 0.76m 안쪽에 위치. 복식 서브 시 이 라인을 넘어가면 아웃입니다.',
        backBoundary: '백 바운더리 라인 / 단식 롱 서비스 라인 (Back Boundary Line) - 코트의 맨 끝 가로선. 단식 서브 및 일반 랠리 시 최종 경계선입니다.',
        centerLine: '센터라인 (Center Line) - 코트 좌우를 양분하는 중앙선. 점수에 따라 서브 구역(우측 짝수, 좌측 홀수)을 구분합니다.',
        singlesSide: '단식 사이드라인 (Singles Sideline) - 가로폭 5.18m 경계선. 단식 경기 중 이 라인을 벗어나면 아웃입니다.',
        doublesSide: '복식 사이드라인 (Doubles Sideline) - 가로폭 6.10m 경계선. 복식 경기 중 이 라인을 벗어나면 아웃입니다.'
      }
    },
    score: {
      title: '스코어링 & 랠리 규칙',
      desc: '배드민턴 경기의 점수 획득 방식과 진행 방식을 정리했습니다.',
      items: [
        {
          title: '21점제 및 3판 2선승제',
          content: '각 매치는 3게임 중 2게임을 먼저 이기는 쪽이 승리합니다. 매 게임은 21점을 먼저 얻는 편이 승리하게 됩니다.'
        },
        {
          title: '듀스 (Deuce) 룰',
          content: '20:20 동점이 될 경우, 2점을 먼저 앞서는 편이 승리합니다. 계속 동점이 이어지더라도 30점에 먼저 도달하는 편이 무조건 승리합니다.'
        },
        {
          title: '서버의 위치 변경 규칙',
          content: '서브권자가 랠리에서 이겨 점수를 얻으면 점수가 1점 올라가며, 점수가 짝수가 되면 오른쪽 코트, 홀수가 되면 왼쪽 코트로 자리를 옮겨 서브합니다.'
        },
        {
          title: '서브권의 이동 (사이드 아웃)',
          content: '리시브 팀이 랠리에서 이기면 1점을 획득하고 새로운 서브권을 가져옵니다. 이때 리시버는 자리를 바꾸지 않고, 현재 자신의 점수(짝/홀)에 맞는 위치에 있는 선수가 서브를 넣습니다.'
        },
        {
          title: '인터벌 및 코트 교대 규칙',
          content: '게임 중 한쪽이 11점에 도달하면 60초 이내의 휴식(인터벌)이 주어집니다. 각 게임 종료 후에는 2분의 인터벌이 주어지며, 파이널 3게임에서는 한쪽이 11점에 도달했을 때 코트를 맞바꿉니다.'
        }
      ]
    },
    rules: {
      title: 'BWF 공식 규칙 백과',
      desc: '세계배드민턴연맹 공식 룰북에 명시된 핵심 조항 및 규정입니다.',
      categories: [
        {
          name: '1. 경기장 및 시설',
          content: '코트는 직사각형으로 선의 두께는 40mm여야 합니다. 네트 지주의 높이는 코트 바닥으로부터 1.55m여야 하며, 복식 사이드라인 위에 수직으로 세워져야 합니다.'
        },
        {
          name: '2. 셔틀콕 규격',
          content: '셔틀콕은 16개의 깃털로 이루어져 있으며 무게는 4.74g에서 5.50g 사이여야 합니다. 베이스(코르크)의 지름은 25mm에서 28mm여야 합니다.'
        },
        {
          name: '3. 올바른 서브 자세',
          content: '서버와 리시버는 대각선 방향의 서비스 코트 안쪽에 양발을 대고 서 있어야 합니다. 라켓으로 셔틀콕을 치는 순간 셔틀콕 전체가 바닥으로부터 1.15m 이하에 있어야 하며, 라켓의 연속 전방 움직임이 지체(이중 동작 폴트)되어서는 안 됩니다.'
        },
        {
          name: '4. Let (재경기)',
          content: '예상치 못한 방해나 사고가 일어났을 때 선언됩니다. 레트가 선언되면 이전 서브 이후의 플레이는 무효가 되며, 서브를 넣었던 선수가 다시 서브를 넣습니다.'
        },
        {
          name: '5. 네트 터치 및 오버넷',
          content: '인플레이 상태에서 선수나 선수의 라켓이 네트에 닿으면 네트 터치 폴트입니다. 또한 셔틀콕이 네트를 넘어오기 전에 상대 진영에서 타구하면 오버넷 폴트입니다. (스윙 후 라켓이 넘어가는 것은 허용)'
        },
        {
          name: '6. 서브 시 네트 접촉',
          content: '배드민턴에서는 서브한 셔틀콕이 네트 상단을 스치고 가더라도 올바른 대각선 서비스 코트 내부에 들어가면 레트가 아닌 정상적인 유효 서브(IN)로 경기 진행됩니다.'
        }
      ]
    },
    quiz: {
      title: '라인 판정 실전 퀴즈',
      desc: '서브 또는 랠리 상황에서 셔틀콕 낙하지점을 보고 올바른 판정을 내리세요!',
      score: '점수:',
      correct: '정답입니다! 🎉',
      incorrect: '오답입니다. 다시 한번 룰을 생각해보세요. 😢',
      next: '다음 문제',
      results: '결과 보기',
      scoreResult: '당신의 점수는 {score} / 50 점입니다!',
      retry: '퀴즈 다시 풀기',
      perfect: '완벽합니다! 배드민턴 룰 마스터이시군요!',
      good: '좋은 점수입니다. 룰을 거의 완벽하게 파악하고 계시네요.',
      bad: '조금 더 연습이 필요해 보여요. 시뮬레이터를 다시 활용해보세요!'
    }
  },
  en: {
    nav: {
      home: 'Home',
      court: 'Court Guide',
      serve: 'Serve Simulation',
      score: 'Scoring',
      rules: 'Rules Info',
      quiz: 'Quiz'
    },
    hero: {
      badge: 'Based on 2025 BWF Official Rulebook',
      title1: 'BADMINTON',
      title2: 'ACADEMY',
      subtitle: 'Master the complex serve rules and court boundary judgments of badminton interactively.'
    },
    footer: '© 2026 BADMINTON ACADEMY. BWF RULEBOOK INTERACTIVE LEARNING.',
    home: {
      core: 'Core Modules',
      extra: 'Learning & Testing',
      cards: [
        {
          num: '01',
          title: 'Serve Simulator',
          desc: 'Click on the court to check serve boundaries (short/long serve lines) for singles and doubles.',
          badge: 'SERVE',
          color: '#FF512F',
          gradient: 'from-[#FF512F] to-[#DD2476]',
          bg: 'from-[#140806] to-[#040201]',
          tab: 'serve'
        },
        {
          num: '02',
          title: 'Interactive Court',
          desc: 'Explore badminton court line names and dimensions between singles and doubles by hovering.',
          badge: 'COURT',
          color: '#F39C12',
          gradient: 'from-[#F39C12] to-[#F1C40F]',
          bg: 'from-[#140D06] to-[#040301]',
          tab: 'court'
        },
        {
          num: '03',
          title: 'Scoring System',
          desc: 'Understand 21-point matches, deuce rules, and server side-switching according to scores.',
          badge: 'SCORE',
          color: '#38ef7d',
          gradient: 'from-[#11998e] to-[#38ef7d]',
          bg: 'from-[#06140B] to-[#010402]',
          tab: 'score'
        },
        {
          num: '04',
          title: 'Official Rulebook',
          desc: 'BWF official rules and guidelines simplified by category for quick browsing.',
          badge: 'RULES',
          color: '#00c6ff',
          gradient: 'from-[#00c6ff] to-[#0072ff]',
          bg: 'from-[#060E1A] to-[#010205]',
          tab: 'rules'
        },
        {
          num: '05',
          title: 'Judgment Quiz',
          desc: 'Test your line judgment skills with scenario-based serve and rally shuttlecock landings.',
          badge: 'QUIZ',
          color: '#E100FF',
          gradient: 'from-[#7F00FF] to-[#E100FF]',
          bg: 'from-[#0F061A] to-[#030105]',
          tab: 'quiz'
        }
      ]
    },
    serve: {
      title: 'Serve Rule Simulator',
      desc: 'Click anywhere inside the court to test the shuttlecock landing. The valid landing area (IN) changes based on singles/doubles and the server\'s score (odd/even).',
      singles: 'Singles',
      doubles: 'Doubles',
      scoreLabel: 'Current Server\'s Score:',
      scoreDescOdd: 'Since the score is ODD, serve from the [LEFT] court diagonally into the opponent\'s [RIGHT] receiver area.',
      scoreDescEven: 'Since the score is EVEN, serve from the [RIGHT] court diagonally into the opponent\'s [LEFT] receiver area.',
      in: 'Inside the Line (IN) - Valid Serve!',
      outShort: 'OUT (Short) - Did not cross the short service line or hit the net.',
      outLong: 'OUT (Long) - Exceeded the serve depth (Long service line for doubles, back boundary line for singles).',
      outWide: 'OUT (Wide) - Flew wide of the active sideline.',
      outWrong: 'OUT (Wrong Court) - Landed in the wrong side of the receiver\'s court (not diagonal).',
      reset: 'Click Again to Reset',
      guideTitle: 'Serve Boundary Summary',
      singlesRule: 'Singles Serve: Long & Narrow. Valid from the short service line to the very back boundary line, and sideways within the inner sideline.',
      doublesRule: 'Doubles Serve: Short & Wide. Valid from the short service line to the second-to-last line (doubles long serve line), and sideways out to the outer sideline.'
    },
    court: {
      title: 'Interactive Court Guide',
      desc: 'Hover or tap on court lines to learn badminton dimensions and boundary names in detail.',
      lines: {
        net: 'Net - Height 1.55m. The serve must cross this net diagonally into the opponent\'s service court.',
        shortServe: 'Short Service Line - 1.98m from the net. Any served shuttlecock must land behind this line.',
        doublesLong: 'Doubles Long Service Line - 0.76m inside the back boundary. A doubles serve landing behind this is OUT.',
        backBoundary: 'Back Boundary Line / Singles Long Service Line - The outermost horizontal line. Ultimate boundary for singles serves & all rallies.',
        centerLine: 'Center Line - Divides the court into left & right halves, determining serving positions.',
        singlesSide: 'Singles Sideline - Width 5.18m. Landings outside this line are OUT during singles matches.',
        doublesSide: 'Doubles Sideline - Width 6.10m. Landings outside this line are OUT during doubles matches.'
      }
    },
    score: {
      title: 'Scoring & Rally Rules',
      desc: 'Simplified BWF scoring system and match play rules.',
      items: [
        {
          title: '21 Points & Best of 3 Games',
          content: 'A match is played as the best of 3 games. A game is won by the first side to reach 21 points.'
        },
        {
          title: 'Deuce Rule',
          content: 'At 20-all, the side which gains a 2-point lead first wins the game. If the score becomes 29-all, the side scoring the 30th point wins.'
        },
        {
          title: 'Server Position Rule',
          content: 'When the serving side wins a rally, they score a point and the same server serves again from the alternate service court (right for even scores, left for odd scores).'
        },
        {
          title: 'Side-out (Service Transition)',
          content: 'If the receiving side wins a rally, they score a point and become the new serving side. Players do not swap positions; the player at the court corresponding to their score (even/odd) serves.'
        },
        {
          title: 'Intervals & Changing Ends',
          content: 'A 60-second interval is allowed when a side reaches 11 points in a game. A 2-minute interval is allowed between games. In the 3rd game, players change ends when a side reaches 11 points.'
        }
      ]
    },
    rules: {
      title: 'BWF Official Rulebook Wiki',
      desc: 'Core clauses and regulations from the BWF official handbooks.',
      categories: [
        {
          name: '1. Court and Equipment',
          content: 'The court shall be a rectangle laid out with lines 40mm wide. Posts shall be 1.55m high from the court surface and placed on the doubles sidelines.'
        },
        {
          name: '2. Shuttlecock Specifications',
          content: 'The shuttle shall have 16 feathers fixed in the base. It shall weigh between 4.74 and 5.50 grams. The base cork diameter must be 25mm to 28mm.'
        },
        {
          name: '3. Correct Service execution',
          content: 'Both server and receiver must stand within diagonally opposite service courts. At the impact, the whole shuttle must be below 1.15m from the court surface and the racket must move continuously forward.'
        },
        {
          name: '4. Let (Replay)',
          content: 'Called during unforeseen disruptions. If a let is called, play since the last service shall not count and the player who served shall serve again.'
        },
        {
          name: '5. Net Touch & Overnet',
          content: 'Touching the net with the body or racket during a rally is a fault. Hitting the shuttle before it crosses to your side is also a fault (though follow-through over the net is allowed).'
        },
        {
          name: '6. Net Contact on Serve',
          content: 'If a served shuttlecock clips the top of the net and lands in the correct diagonal service court, it is counted as a valid serve (IN) rather than a let.'
        }
      ]
    },
    quiz: {
      title: 'Line Judgment Practice Quiz',
      desc: 'Analyze the shuttlecock landing position in various situations and make the correct call!',
      score: 'Score:',
      correct: 'Correct! 🎉',
      incorrect: 'Wrong. Think about the rules again! 😢',
      next: 'Next Question',
      results: 'Show Results',
      scoreResult: 'Your score is {score} / 50 points!',
      retry: 'Retry Quiz',
      perfect: 'Perfect! You are a badminton rules master!',
      good: 'Great score! You understand the rules almost perfectly.',
      bad: 'Needs some practice. Try the simulator again!'
    }
  }
};

// 퀴즈 문제 정의 (10점씩 5문제 = 50점 만점)
const QUIZ_QUESTIONS = [
  {
    id: 1,
    type: 'singles',
    score: 0, 
    x: 35, 
    y: 65, 
    options: ['IN', 'OUT (Short)', 'OUT (Long)', 'OUT (Wide)', 'OUT (Wrong Court)'],
    answer: 'OUT (Short)',
    situationKo: '단식 서브 상황에서 점수가 0점일 때, 서브를 넣은 셔틀콕이 대각선 방향으로 날아갔으나 상대방 숏 서비스 라인에 미치지 못하고 네트 바로 앞에 떨어졌습니다. 올바른 판정은 무엇일까요?',
    situationEn: 'In a singles serve with score 0, the served shuttlecock traveled diagonally but fell short of the receiver\'s short service line, landing close to the net. What is the correct call?',
    explainKo: '점수가 0(짝수)이므로 오른쪽에서 서브를 넣어 대각선인 상대 왼쪽 코트로 보냈으나, 숏 서비스 라인(Y=90.2)보다 네트에 가깝게(Y=65) 떨어졌으므로 숏 서비스 폴트입니다.',
    explainEn: 'With score 0 (even), serving diagonally to the receiver\'s left court. However, it landed too close to the net (Y=65), failing to cross the short service line (Y=90.2).'
  },
  {
    id: 2,
    type: 'doubles',
    score: 3, 
    x: 78, 
    y: 48, 
    options: ['IN', 'OUT (Short)', 'OUT (Long)', 'OUT (Wide)', 'OUT (Wrong Court)'],
    answer: 'OUT (Long)',
    situationKo: '복식 서브 상황에서 점수가 3점일 때, 대각선 코트로 길게 날아간 셔틀콕이 백 바운더리 라인(맨 끝선) 바로 안쪽이지만, 복식 롱 서비스 라인(끝에서 두 번째 선)을 넘어 뒤쪽 구석에 떨어졌습니다. 올바른 판정은 무엇일까요?',
    situationEn: 'In a doubles serve with score 3, the shuttlecock flew deep diagonally, landing inside the back boundary line but crossing behind the doubles long service line. What is the correct call?',
    explainKo: '복식 경기에서 홀수 점수(3점) 서브는 대각선 상대 우측 코트(X > 50)로 유효하나, 복식 롱 서비스 라인(Y=50.6)보다 뒤쪽(Y=48)에 떨어졌으므로 아웃(Long)입니다.',
    explainEn: 'In doubles with score 3 (odd), the diagonal target is receiver\'s right (X > 50). However, the doubles serve must land in front of the doubles long service line (Y=50.6). Landed at Y=48, so it is OUT (Long).'
  },
  {
    id: 3,
    type: 'singles',
    score: 2, 
    x: 22, 
    y: 46, 
    options: ['IN', 'OUT (Short)', 'OUT (Long)', 'OUT (Wide)', 'OUT (Wrong Court)'],
    answer: 'OUT (Wide)',
    situationKo: '단식 서브 상황에서 점수가 2점일 때, 대각선 방향 깊숙이 들어간 셔틀콕이 세로 길이는 유효하나, 단식 사이드라인(안쪽 세로선)을 벗어나 복식 사이드라인 쪽에 떨어졌습니다. 올바른 판정은 무엇일까요?',
    situationEn: 'In a singles serve with score 2, the shuttlecock landed deep diagonally but fell outside the singles sideline (inner sideline), near the doubles sideline. What is the correct call?',
    explainKo: '단식 서브가 대각선(X < 50) 및 깊이(Y=46)는 통과했으나, 단식 사이드라인 경계선(X=24.1)보다 바깥인 X=22에 떨어졌으므로 아웃(Wide)입니다.',
    explainEn: 'Singles serve landed diagonally (X < 50) and deep enough (Y=46), but it landed outside the singles sideline (X=24.1) at X=22, so it is OUT (Wide).'
  },
  {
    id: 4,
    type: 'doubles',
    score: 4, 
    x: 22, 
    y: 60, 
    options: ['IN', 'OUT (Short)', 'OUT (Long)', 'OUT (Wide)', 'OUT (Wrong Court)'],
    answer: 'IN',
    situationKo: '복식 서브 상황에서 점수가 4점일 때, 대각선 방향으로 낮고 넓게 들어간 서브가 단식 사이드라인(안쪽선)을 넘고 복식 사이드라인(바깥선) 안쪽에 걸치며, 숏 라인과 복식 롱 라인 사이에 정상적으로 떨어졌습니다. 올바른 판정은 무엇일까요?',
    situationEn: 'In a doubles serve with score 4, the served shuttlecock went low and wide diagonally, landing between the singles and doubles sidelines, and between the short and doubles long service lines. What is the correct call?',
    explainKo: '복식 서브가 짝수 점수(4)에 맞추어 대각선 좌측 코트로 향했고, 복식 가로 범위(X=19.5~50) 및 세로 범위(Y=50.6~90.2) 내부에 안전하게 낙하했으므로 정답은 IN입니다.',
    explainEn: 'Doubles serve with score 4 (even) directed diagonally left, landing safely inside the doubles sideline (X=19.5) and between the serve lines (Y=60), so it is IN.'
  },
  {
    id: 5,
    type: 'singles',
    score: 1, 
    x: 42, 
    y: 50,
    options: ['IN', 'OUT (Short)', 'OUT (Long)', 'OUT (Wide)', 'OUT (Wrong Court)'],
    answer: 'OUT (Wrong Court)',
    situationKo: '단식 서브 상황에서 점수가 1점일 때, 대각선이 아닌 서버 바로 맞은편(직선 방향) 코트의 유효 깊이 안쪽에 셔틀콕이 떨어졌습니다. 올바른 판정은 무엇일까요?',
    situationEn: 'In a singles serve with score 1, the served shuttlecock landed inside the boundary but on the straight-ahead court rather than the diagonally opposite court. What is the correct call?',
    explainKo: '홀수 점수(1점)에서는 대각선 오른쪽 코트(X > 50)로 서브를 넣어야 하지만, 서버 바로 맞은편인 왼쪽 코트(X=42)에 셔틀콕이 떨어졌으므로 서비스 구역 위반 폴트입니다.',
    explainEn: 'With an odd score (1), the server must serve to the diagonal right court (X > 50). Since it landed on the left side (X=42), it is OUT (Wrong Court).'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'court' | 'serve' | 'score' | 'rules' | 'quiz'>('home');
  const [lang, setLang] = useState<'ko' | 'en'>('ko');
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);

  // 시뮬레이터 상태
  const [serveMode, setServeMode] = useState<'singles' | 'doubles'>('doubles');
  const [serverScore, setServerScore] = useState<number>(0);
  const [shuttlePos, setShuttlePos] = useState<{ x: number; y: number } | null>(null);
  const [serveResult, setServeResult] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  // 애니메이션용 상태
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animProgress, setAnimProgress] = useState<number>(0);
  const [startPos, setStartPos] = useState<{ x: number; y: number }>({ x: 65, y: 153.4 });
  const [targetPos, setTargetPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // 코트 가이드 호버 상태
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);

  // 퀴즈 상태
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [showQuizResults, setShowQuizResults] = useState<boolean>(false);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);

  const t = TRANSLATIONS[lang];

  // 배드민턴 서브 판정 엔진 (BWF 규격 스케일 기준)
  // X: 0 ~ 100, Y: 0 ~ 220 (네트는 Y = 110)
  const evaluateServe = (x: number, y: number, mode: 'singles' | 'doubles', score: number): string => {
    const isEven = score % 2 === 0;
    
    if (y >= 110) {
      return t.serve.outShort;
    }
    if (y > 90.2) {
      return t.serve.outShort;
    }
    if (y < 43) {
      return t.serve.outLong;
    }
    if (mode === 'doubles' && y < 50.6) {
      return t.serve.outLong;
    }

    if (isEven) {
      if (x > 50) {
        return t.serve.outWrong;
      }
      if (mode === 'singles') {
        if (x < 24.1) return t.serve.outWide;
      } else {
        if (x < 19.5) return t.serve.outWide;
      }
    } else {
      if (x < 50) {
        return t.serve.outWrong;
      }
      if (mode === 'singles') {
        if (x > 75.9) return t.serve.outWide;
      } else {
        if (x > 80.5) return t.serve.outWide;
      }
    }

    return t.serve.in;
  };

  const handleCourtClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isAnimating) return; // 이미 비행 중이면 무시

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 220;

    // 네트 아래쪽이나 코트 바깥 탭 제한
    if (clickY >= 110 || clickY < 10 || clickX < 5 || clickX > 95) return;

    // 출발 위치 설정 (서버 위치)
    const startX = serverScore % 2 === 0 ? 65 : 35;
    const startY = 153.4;

    setStartPos({ x: startX, y: startY });
    setTargetPos({ x: clickX, y: clickY });
    setShuttlePos(null);
    setServeResult(null);
    setIsAnimating(true);
    setAnimProgress(0);

    const duration = 900; // 0.9초 궤적 비행
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setAnimProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        setShuttlePos({ x: clickX, y: clickY });
        const result = evaluateServe(clickX, clickY, serveMode, serverScore);
        setServeResult(result);
      }
    };

    requestAnimationFrame(animate);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isAnimating) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 220;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
  };

  // 퀴즈 정답 제출
  const submitQuizAnswer = (option: string) => {
    if (hasAnswered) return;
    setSelectedQuizAnswer(option);
    setHasAnswered(true);
    
    const currentQuestion = QUIZ_QUESTIONS[currentQuizIndex];
    if (option === currentQuestion.answer) {
      setQuizScore(prev => prev + 10);
    }
  };

  const nextQuizQuestion = () => {
    setSelectedQuizAnswer(null);
    setHasAnswered(false);
    if (currentQuizIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      setShowQuizResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedQuizAnswer(null);
    setQuizScore(0);
    setShowQuizResults(false);
    setHasAnswered(false);
  };

  // 궤적 실시간 비행 상태 계산
  const getShuttleVisualPos = () => {
    if (!isAnimating) return null;
    
    const tVal = animProgress;
    const x = startPos.x + (targetPos.x - startPos.x) * tVal;
    const yShadow = startPos.y + (targetPos.y - startPos.y) * tVal;
    
    // 포물선 궤적 높이 z 추가 (최대 42)
    const z = 42 * 4 * tVal * (1 - tVal);
    const yShuttle = yShadow - z;
    
    // 크기 (원근감 표현: 높이 뜰 때 커졌다가 내려갈 때 작아짐)
    const scale = 1 + 0.6 * 4 * tVal * (1 - tVal);
    
    // 비행 방향에 따른 각도 계산
    const dx = targetPos.x - startPos.x;
    // 고도가 올라갔다 내려가는 기하학적 축을 y에 더하여 셔틀콕 각도 연출
    const dyVisual = (targetPos.y - startPos.y) - 42 * 4 * (1 - 2 * tVal);
    const deg = (Math.atan2(dyVisual, dx) * 180) / Math.PI;

    return { x, yShadow, yShuttle, scale, deg, z };
  };

  const shuttleData = getShuttleVisualPos();

  return (
    <div className={`min-h-screen bg-[#070A13] text-slate-100 font-sans transition-all duration-300 ${isMobileFrame ? 'max-w-[430px] mx-auto border-x border-slate-900 shadow-2xl relative' : ''}`}>
      
      {/* 1. 상단 네비게이션 */}
      <nav className="sticky top-0 z-50 bg-[#070A13]/90 backdrop-blur-md border-b border-slate-900 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* 로고 */}
          <button onClick={() => setActiveTab('home')} className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-[#00B4D8] to-[#0077B6] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,180,216,0.35)] group-hover:scale-105 transition-transform duration-300">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <span className="font-sporty font-extrabold text-white italic tracking-tighter text-sm uppercase group-hover:text-[#00B4D8] transition-colors">
              BWF Academy
            </span>
          </button>

          {/* 데스크톱 메뉴 */}
          <div className="hidden lg:flex items-center bg-slate-950/70 border border-slate-900/80 p-0.5 rounded-xl gap-0.5">
            {(['home', 'court', 'serve', 'score', 'rules', 'quiz'] as const).map((tab) => {
              const Icon = {
                home: Home,
                court: PanelsTopLeft,
                serve: Target,
                score: ChartColumn,
                rules: BookOpen,
                quiz: Trophy
              }[tab];
              
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                    activeTab === tab 
                      ? 'bg-[#00B4D8] text-white shadow-[0_0_12px_rgba(0,180,216,0.35)]' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.nav[tab]}</span>
                </button>
              );
            })}
          </div>

          {/* 다국어 & 뷰 토글 */}
          <div className="flex items-center gap-2">
            <div className="relative inline-flex items-center">
              <Globe className="absolute left-2.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value as 'ko' | 'en')}
                className="bg-slate-950/80 border border-slate-900 text-slate-200 rounded-lg pl-8 pr-6 py-1.5 text-[10px] font-black tracking-widest uppercase cursor-pointer hover:border-[#00B4D8]/50 hover:text-white transition-all duration-300 appearance-none focus:outline-none"
              >
                <option value="ko">KO</option>
                <option value="en">EN</option>
              </select>
            </div>
            <button 
              onClick={() => setIsMobileFrame(!isMobileFrame)}
              className={`p-1.5 rounded-lg border transition-all duration-300 flex items-center justify-center ${
                isMobileFrame ? 'bg-[#00B4D8]/20 border-[#00B4D8] text-[#00B4D8]' : 'bg-slate-950/70 border-slate-900 text-slate-400 hover:text-white'
              }`}
              title="모바일 프레임 토글"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 모바일 하단 네비게이션 */}
        <div className="lg:hidden flex items-center justify-around border-t border-slate-900 bg-[#070A13]/95 py-2">
          {(['court', 'serve', 'score', 'rules', 'quiz'] as const).map((tab) => {
            const Icon = {
              court: PanelsTopLeft,
              serve: Target,
              score: ChartColumn,
              rules: BookOpen,
              quiz: Trophy
            }[tab];
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex flex-col items-center gap-0.5 text-[9px] font-bold uppercase transition-all duration-300 ${
                  activeTab === tab ? 'text-[#00B4D8]' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.nav[tab]}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* 2. 본문 영역 */}
      <main className="max-w-6xl mx-auto px-4 py-8 pb-24">
        
        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <div>
            {/* 히어로 섹션 */}
            <div className="relative py-16 overflow-hidden flex flex-col justify-between items-center text-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#00B4D8]/5 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="z-10 max-w-3xl">
                <div className="inline-flex items-center justify-center bg-slate-950/80 border border-[#00B4D8]/20 px-4 py-1.5 rounded-full mb-6 shadow-[0_0_20px_rgba(0,180,216,0.05)]">
                  <Sparkles className="w-3.5 h-3.5 text-[#00B4D8] mr-2 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00B4D8]">{t.hero.badge}</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold italic uppercase tracking-tighter text-white mb-6 leading-none select-none font-sporty">
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">BADMINTON</span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] via-[#00F5FF] to-[#0077B6] drop-shadow-[0_0_20px_rgba(0,180,216,0.3)]">
                    {t.hero.title2}
                  </span>
                </h1>
                <p className="text-slate-400 text-sm md:text-base font-semibold tracking-tight max-w-xl mx-auto leading-relaxed">
                  {t.hero.subtitle}
                </p>
              </div>
            </div>

            {/* 카드 그리드 */}
            <div className="mt-12">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6 border-b border-slate-900 pb-3">{t.home.core}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {t.home.cards.map((card) => (
                  <button 
                    key={card.num}
                    onClick={() => setActiveTab(card.tab as any)}
                    className={`group relative text-left p-6 rounded-xl border transition-all duration-300 overflow-hidden h-[200px] flex flex-col justify-between bg-gradient-to-br ${card.bg}`}
                    style={{ borderColor: `${card.color}15` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${card.color}60`;
                      e.currentTarget.style.boxShadow = `0 0 25px ${card.color}25`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${card.color}15`;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <span className="absolute -bottom-6 -right-3 text-8xl font-black text-white/[0.015] select-none tracking-tighter group-hover:text-white/[0.035] transition-all duration-300 italic font-mono">
                      {card.num}
                    </span>
                    <div className="flex justify-between items-center w-full">
                      <div className="p-2 bg-slate-950/60 rounded-lg border border-slate-900 shadow-inner group-hover:border-slate-800 transition-colors">
                        <Target className="w-6 h-6 group-hover:scale-110 transition-transform" style={{ color: card.color }} />
                      </div>
                      <span className="text-[8px] font-black tracking-widest px-2.5 py-0.5 rounded-full border uppercase" style={{ color: card.color, backgroundColor: `${card.color}10`, borderColor: `${card.color}20` }}>
                        {card.badge}
                      </span>
                    </div>
                    <div className="z-10">
                      <h3 className="font-bold text-white text-lg mb-1 group-hover:text-opacity-95 tracking-tight uppercase italic" style={{ color: card.color }}>
                        {card.title}
                      </h3>
                      <p className="text-slate-400 text-xs leading-normal font-medium group-hover:text-slate-300 transition-colors">
                        {card.desc}
                      </p>
                    </div>
                    <div className={`absolute left-0 top-0 h-full w-1 transition-all duration-300 group-hover:w-1.5 bg-gradient-to-b ${card.gradient}`}></div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SERVE SIMULATOR */}
        {activeTab === 'serve' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold italic uppercase tracking-tight text-white mb-2 font-sporty">
                {t.serve.title}
              </h2>
              <p className="text-slate-400 text-xs max-w-xl mx-auto leading-relaxed">
                {t.serve.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* 왼쪽: 설정 & 상태 */}
              <div className="lg:col-span-4 bg-slate-950/60 border border-slate-900/80 p-5 rounded-xl flex flex-col gap-5">
                {/* 1. 단/복식 토글 */}
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">MODE</label>
                  <div className="flex bg-slate-950 border border-slate-900 p-1 rounded-lg">
                    <button 
                      onClick={() => { setServeMode('singles'); setShuttlePos(null); setServeResult(null); }}
                      className={`flex-1 py-2 text-center text-xs font-bold rounded-md transition-all duration-300 ${
                        serveMode === 'singles' ? 'bg-[#FF512F] text-white shadow-lg' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {t.serve.singles}
                    </button>
                    <button 
                      onClick={() => { setServeMode('doubles'); setShuttlePos(null); setServeResult(null); }}
                      className={`flex-1 py-2 text-center text-xs font-bold rounded-md transition-all duration-300 ${
                        serveMode === 'doubles' ? 'bg-[#FF512F] text-white shadow-lg' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {t.serve.doubles}
                    </button>
                  </div>
                </div>

                {/* 2. 서버 점수 조절 */}
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">{t.serve.scoreLabel}</label>
                  <div className="flex items-center justify-between bg-slate-950 border border-slate-900 rounded-lg p-2">
                    <button 
                      onClick={() => { setServerScore(prev => Math.max(0, prev - 1)); setShuttlePos(null); setServeResult(null); }}
                      className="w-8 h-8 rounded bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-white hover:bg-slate-800 transition-colors"
                    >
                      -
                    </button>
                    <span className="font-sporty font-black text-2xl text-[#00B4D8]">{serverScore}</span>
                    <button 
                      onClick={() => { setServerScore(prev => prev + 1); setShuttlePos(null); setServeResult(null); }}
                      className="w-8 h-8 rounded bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-white hover:bg-slate-800 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                    {serverScore % 2 === 0 ? t.serve.scoreDescEven : t.serve.scoreDescOdd}
                  </p>
                </div>

                {/* 3. 판정 결과 카드 */}
                <div className="border-t border-slate-900 pt-4 mt-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">JUDGMENT</label>
                  {serveResult ? (
                    <div className={`p-4 rounded-lg flex items-start gap-3 ${
                      serveResult === t.serve.in 
                        ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
                        : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
                    }`}>
                      {serveResult === t.serve.in ? <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
                      <div>
                        <span className="font-bold text-sm block">{serveResult}</span>
                        {shuttlePos && (
                          <span className="text-[10px] opacity-75 mt-1 block font-mono">
                            Coordinates: (X: {Math.round(shuttlePos.x)}, Y: {Math.round(shuttlePos.y)})
                          </span>
                        )}
                        <button 
                          onClick={() => { setShuttlePos(null); setServeResult(null); }}
                          className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold border border-current px-2.5 py-1 rounded hover:bg-white/5 transition-colors"
                        >
                          <RefreshCw className="w-3 h-3" />
                          {t.serve.reset}
                        </button>
                      </div>
                    </div>
                  ) : isAnimating ? (
                    <div className="p-4 rounded-lg bg-slate-900/40 border border-slate-900/60 text-[#00B4D8] text-xs flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4 animate-spin-slow" />
                      <span>셔틀콕이 날아가는 중입니다...</span>
                    </div>
                  ) : (
                    <div className="p-4 rounded-lg bg-slate-900/40 border border-slate-900/60 text-slate-500 text-xs flex items-center justify-center gap-2">
                      <Info className="w-4 h-4" />
                      <span>코트 위쪽 영역을 클릭해 서브를 날려보세요.</span>
                    </div>
                  )}
                </div>

                {/* 4. 서비스 룰 요약 가이드 */}
                <div className="bg-slate-900/40 border border-slate-900/60 rounded-lg p-3 text-[10px] text-slate-400">
                  <h4 className="font-bold text-slate-300 flex items-center gap-1 mb-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-[#00B4D8]" />
                    {t.serve.guideTitle}
                  </h4>
                  <p className="leading-relaxed">
                    {serveMode === 'singles' ? t.serve.singlesRule : t.serve.doublesRule}
                  </p>
                </div>
              </div>

              {/* 오른쪽: 인터랙티브 코트 SVG */}
              <div className="lg:col-span-8 flex flex-col items-center">
                <div className="relative w-full max-w-[340px] aspect-[1/2.2] bg-[#0c1424] rounded-xl p-3 border border-slate-800 shadow-[0_0_35px_rgba(0,180,216,0.06)] overflow-hidden">
                  
                  {/* 대화형 가이드 십자선 (마우스 호버 시 & 애니메이션 중이 아닐 때) */}
                  {mousePos && mousePos.y < 110 && !isAnimating && (
                    <div className="absolute inset-0 pointer-events-none z-20">
                      <div 
                        className="absolute left-0 right-0 border-t border-[#00B4D8]/20 border-dashed"
                        style={{ top: `${(mousePos.y / 220) * 100}%` }}
                      ></div>
                      <div 
                        className="absolute top-0 bottom-0 border-l border-[#00B4D8]/20 border-dashed"
                        style={{ left: `${mousePos.x}%` }}
                      ></div>
                      <div 
                        className="absolute w-2 h-2 bg-[#00F5FF]/70 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#00F5FF] opacity-60"
                        style={{ left: `${mousePos.x}%`, top: `${(mousePos.y / 220) * 100}%` }}
                      ></div>
                    </div>
                  )}

                  <svg 
                    viewBox="0 0 100 220" 
                    className="w-full h-full text-slate-600 stroke-[1.5] cursor-crosshair select-none relative z-10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    onClick={handleCourtClick}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* 1. 배경 코트 색상 (그린 톤 오버레이) */}
                    <rect x="19.5" y="43" width="61" height="134" fill="#0f1f33" stroke="none" />
                    
                    {/* 2. 서브 수신자 타겟 코트 영역 (대각선 타겟 반투명 네온 하이라이트) */}
                    {serverScore % 2 === 0 ? (
                      <rect 
                        x={serveMode === 'singles' ? "24.1" : "19.5"} 
                        y={serveMode === 'singles' ? "43" : "50.6"} 
                        width={serveMode === 'singles' ? "25.9" : "30.5"} 
                        height={serveMode === 'singles' ? "47.2" : "39.6"} 
                        fill="rgba(0, 180, 216, 0.08)" 
                        className="stroke-[#00B4D8]/30 stroke-[0.8]"
                      />
                    ) : (
                      <rect 
                        x="50" 
                        y={serveMode === 'singles' ? "43" : "50.6"} 
                        width={serveMode === 'singles' ? "25.9" : "30.5"} 
                        height={serveMode === 'singles' ? "47.2" : "39.6"} 
                        fill="rgba(0, 180, 216, 0.08)" 
                        className="stroke-[#00B4D8]/30 stroke-[0.8]"
                      />
                    )}

                    {/* 3. 코트 메인 라인 */}
                    <rect x="19.5" y="43" width="61" height="134" fill="none" stroke="currentColor" className="text-slate-800" />
                    <line x1="24.1" y1="43" x2="24.1" y2="177" className={`${serveMode === 'singles' ? 'stroke-[#00B4D8]' : 'stroke-slate-800'} transition-colors`} />
                    <line x1="75.9" y1="43" x2="75.9" y2="177" className={`${serveMode === 'singles' ? 'stroke-[#00B4D8]' : 'stroke-slate-800'} transition-colors`} />
                    {serveMode === 'doubles' && (
                      <>
                        <line x1="19.5" y1="43" x2="19.5" y2="177" stroke="#00B4D8" />
                        <line x1="80.5" y1="43" x2="80.5" y2="177" stroke="#00B4D8" />
                      </>
                    )}
                    <line x1="19.5" y1="110" x2="80.5" y2="110" stroke="#FF512F" strokeWidth="2" strokeDasharray="3 2" />
                    <line x1="19.5" y1="90.2" x2="80.5" y2="90.2" stroke="white" strokeWidth="1.2" />
                    <line x1="19.5" y1="129.8" x2="80.5" y2="129.8" stroke="white" strokeWidth="1.2" />
                    <line x1="19.5" y1="50.6" x2="80.5" y2="50.6" className={`${serveMode === 'doubles' ? 'stroke-white' : 'stroke-slate-800'} transition-colors`} strokeWidth="1" />
                    <line x1="19.5" y1="169.4" x2="80.5" y2="169.4" className={`${serveMode === 'doubles' ? 'stroke-white' : 'stroke-slate-800'} transition-colors`} strokeWidth="1" />
                    <line x1="19.5" y1="43" x2="80.5" y2="43" stroke="white" strokeWidth="1.2" />
                    <line x1="19.5" y1="177" x2="80.5" y2="177" stroke="white" strokeWidth="1.2" />
                    <line x1="50" y1="43" x2="50" y2="90.2" stroke="white" strokeWidth="0.8" />
                    <line x1="50" y1="129.8" x2="50" y2="177" stroke="white" strokeWidth="0.8" />

                    {/* 4. 캐릭터 위치 표시 (서버 & 리시버) */}
                    {serverScore % 2 === 0 ? (
                      <circle cx="65" cy="153.4" r="3.5" fill="#00B4D8" className={isAnimating ? "" : "animate-pulse"} />
                    ) : (
                      <circle cx="35" cy="153.4" r="3.5" fill="#00B4D8" className={isAnimating ? "" : "animate-pulse"} />
                    )}

                    {serverScore % 2 === 0 ? (
                      <circle cx="35" cy="66.8" r="3" fill="#A3E635" className="opacity-80" />
                    ) : (
                      <circle cx="65" cy="66.8" r="3" fill="#A3E635" className="opacity-80" />
                    )}

                    {/* 5. 3D 포물선 비행 궤적 애니메이션 시뮬레이션 */}
                    {isAnimating && shuttleData && (
                      <>
                        {/* 셔틀콕의 바닥 그림자 (Shadow) */}
                        <ellipse 
                          cx={shuttleData.x} 
                          cy={shuttleData.yShadow} 
                          rx={Math.max(1, 2.5 * (1 - shuttleData.z / 60))} 
                          ry={Math.max(0.5, 1.2 * (1 - shuttleData.z / 60))} 
                          fill="black" 
                          opacity={0.35 * (1 - shuttleData.z / 50)} 
                        />
                        {/* 포물선 비행 궤적 잔상 라인 */}
                        <path 
                          d={`M ${startPos.x} ${startPos.y} Q ${(startPos.x + targetPos.x) / 2} ${((startPos.y + targetPos.y) / 2) - 35} ${targetPos.x} ${targetPos.y}`} 
                          fill="none" 
                          stroke="rgba(0, 180, 216, 0.25)" 
                          strokeWidth="1.2" 
                          strokeDasharray="2 3" 
                        />
                        {/* 날아가고 있는 셔틀콕 모양 (SVG 방향 각도 회전) */}
                        <g transform={`translate(${shuttleData.x}, ${shuttleData.yShuttle}) scale(${shuttleData.scale}) rotate(${shuttleData.deg + 90})`}>
                          {/* 셔틀콕 깃털날개 */}
                          <path d="M-3,-3 L-5,-11 L5,-11 L3,-3 Z" fill="rgba(241, 245, 249, 0.85)" stroke="white" strokeWidth="0.4" />
                          <line x1="-1.5" y1="-3" x2="-2.2" y2="-11" stroke="rgba(255,255,255,0.4)" strokeWidth="0.4" />
                          <line x1="0" y1="-3" x2="0" y2="-11" stroke="rgba(255,255,255,0.4)" strokeWidth="0.4" />
                          <line x1="1.5" y1="-3" x2="2.2" y2="-11" stroke="rgba(255,255,255,0.4)" strokeWidth="0.4" />
                          {/* 콕 헤드 */}
                          <path d="M-3,-3 C-3,0.8 3,0.8 3,-3 Z" fill="#00B4D8" />
                          <path d="M-3,-3 L3,-3" stroke="#FF512F" strokeWidth="0.6" />
                        </g>
                      </>
                    )}

                    {/* 6. 착지 완료 후 꽂힌 셔틀콕 시각화 */}
                    {shuttlePos && !isAnimating && (
                      <g transform={`translate(${shuttlePos.x}, ${shuttlePos.y}) rotate(180)`}>
                        {/* 콕이 바닥에 꽂힌 형태로 렌더링 (거꾸로 180도 회전) */}
                        <path d="M-3,-3 L-5,-11 L5,-11 L3,-3 Z" fill="rgba(241, 245, 249, 0.9)" stroke="white" strokeWidth="0.4" />
                        <line x1="-1.5" y1="-3" x2="-2.2" y2="-11" stroke="rgba(255,255,255,0.4)" strokeWidth="0.4" />
                        <line x1="0" y1="-3" x2="0" y2="-11" stroke="rgba(255,255,255,0.4)" strokeWidth="0.4" />
                        <line x1="1.5" y1="-3" x2="2.2" y2="-11" stroke="rgba(255,255,255,0.4)" strokeWidth="0.4" />
                        <path d="M-3,-3 C-3,0.8 3,0.8 3,-3 Z" fill={serveResult === t.serve.in ? "#38ef7d" : "#FF512F"} />
                        <path d="M-3,-3 L3,-3" stroke="white" strokeWidth="0.6" />
                      </g>
                    )}
                  </svg>

                  {/* NET 배지 라벨 */}
                  <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF512F] text-white text-[8px] font-black tracking-widest px-2 py-0.5 rounded shadow z-30">
                    NET
                  </div>

                  {/* 범례 */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[8px] text-slate-400 bg-slate-950/90 border border-slate-900 rounded-lg p-2 pointer-events-none">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#00B4D8]"></div>
                      <span>SERVER</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#A3E635]"></div>
                      <span>RECEIVER</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
                      <span>TARGET</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COURT GUIDE */}
        {activeTab === 'court' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold italic uppercase tracking-tight text-white mb-2 font-sporty">
                {t.court.title}
              </h2>
              <p className="text-slate-400 text-xs max-w-xl mx-auto leading-relaxed">
                {t.court.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* 왼쪽 코트 */}
              <div className="lg:col-span-6 flex flex-col items-center">
                <div className="relative w-full max-w-[280px] aspect-[1/2] bg-[#0c1424] rounded-xl p-3 border border-slate-800">
                  <svg 
                    viewBox="0 0 100 200" 
                    className="w-full h-full text-slate-600 stroke-[1.8]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line 
                      x1="5" y1="100" x2="95" y2="100" 
                      stroke={hoveredLine === 'net' ? "#FF512F" : "#ef4444"} 
                      strokeWidth={hoveredLine === 'net' ? "4" : "2.5"} 
                      className="cursor-pointer transition-all duration-200"
                      onMouseEnter={() => setHoveredLine('net')}
                      onMouseLeave={() => setHoveredLine(null)}
                    />
                    <rect 
                      x="5" y="5" width="90" height="190" 
                      fill="none" 
                      stroke={hoveredLine === 'doublesSide' ? "#00F5FF" : "currentColor"} 
                      strokeWidth={hoveredLine === 'doublesSide' ? "3" : "1.8"}
                      className="cursor-pointer transition-all duration-200 text-slate-700"
                      onMouseEnter={() => setHoveredLine('doublesSide')}
                      onMouseLeave={() => setHoveredLine(null)}
                    />
                    <line 
                      x1="12" y1="5" x2="12" y2="195" 
                      stroke={hoveredLine === 'singlesSide' ? "#00B4D8" : "currentColor"} 
                      strokeWidth={hoveredLine === 'singlesSide' ? "3" : "1.8"}
                      className="cursor-pointer transition-all duration-200 text-slate-800"
                      onMouseEnter={() => setHoveredLine('singlesSide')}
                      onMouseLeave={() => setHoveredLine(null)}
                    />
                    <line 
                      x1="88" y1="5" x2="88" y2="195" 
                      stroke={hoveredLine === 'singlesSide' ? "#00B4D8" : "currentColor"} 
                      strokeWidth={hoveredLine === 'singlesSide' ? "3" : "1.8"}
                      className="cursor-pointer transition-all duration-200 text-slate-800"
                      onMouseEnter={() => setHoveredLine('singlesSide')}
                      onMouseLeave={() => setHoveredLine(null)}
                    />
                    <line 
                      x1="5" y1="70" x2="95" y2="70" 
                      stroke={hoveredLine === 'shortServe' ? "#fff" : "currentColor"} 
                      strokeWidth={hoveredLine === 'shortServe' ? "3" : "1.8"}
                      className="cursor-pointer transition-all duration-200 text-slate-500"
                      onMouseEnter={() => setHoveredLine('shortServe')}
                      onMouseLeave={() => setHoveredLine(null)}
                    />
                    <line 
                      x1="5" y1="130" x2="95" y2="130" 
                      stroke={hoveredLine === 'shortServe' ? "#fff" : "currentColor"} 
                      strokeWidth={hoveredLine === 'shortServe' ? "3" : "1.8"}
                      className="cursor-pointer transition-all duration-200 text-slate-500"
                      onMouseEnter={() => setHoveredLine('shortServe')}
                      onMouseLeave={() => setHoveredLine(null)}
                    />
                    <line 
                      x1="5" y1="15" x2="95" y2="15" 
                      stroke={hoveredLine === 'doublesLong' ? "#fff" : "currentColor"} 
                      strokeWidth={hoveredLine === 'doublesLong' ? "3" : "1.8"}
                      className="cursor-pointer transition-all duration-200 text-slate-800"
                      onMouseEnter={() => setHoveredLine('doublesLong')}
                      onMouseLeave={() => setHoveredLine(null)}
                    />
                    <line 
                      x1="5" y1="185" x2="95" y2="185" 
                      stroke={hoveredLine === 'doublesLong' ? "#fff" : "currentColor"} 
                      strokeWidth={hoveredLine === 'doublesLong' ? "3" : "1.8"}
                      className="cursor-pointer transition-all duration-200 text-slate-800"
                      onMouseEnter={() => setHoveredLine('doublesLong')}
                      onMouseLeave={() => setHoveredLine(null)}
                    />
                    <line 
                      x1="50" y1="5" x2="50" y2="70" 
                      stroke={hoveredLine === 'centerLine' ? "#fff" : "currentColor"} 
                      strokeWidth={hoveredLine === 'centerLine' ? "3" : "1.8"}
                      className="cursor-pointer transition-all duration-200 text-slate-500"
                      onMouseEnter={() => setHoveredLine('centerLine')}
                      onMouseLeave={() => setHoveredLine(null)}
                    />
                    <line 
                      x1="50" y1="130" x2="50" y2="195" 
                      stroke={hoveredLine === 'centerLine' ? "#fff" : "currentColor"} 
                      strokeWidth={hoveredLine === 'centerLine' ? "3" : "1.8"}
                      className="cursor-pointer transition-all duration-200 text-slate-500"
                      onMouseEnter={() => setHoveredLine('centerLine')}
                      onMouseLeave={() => setHoveredLine(null)}
                    />
                    <line 
                      x1="5" y1="5" x2="95" y2="5" 
                      stroke={hoveredLine === 'backBoundary' ? "#fff" : "currentColor"} 
                      strokeWidth={hoveredLine === 'backBoundary' ? "3" : "1.8"}
                      className="cursor-pointer transition-all duration-200 text-slate-500"
                      onMouseEnter={() => setHoveredLine('backBoundary')}
                      onMouseLeave={() => setHoveredLine(null)}
                    />
                    <line 
                      x1="5" y1="195" x2="95" y2="195" 
                      stroke={hoveredLine === 'backBoundary' ? "#fff" : "currentColor"} 
                      strokeWidth={hoveredLine === 'backBoundary' ? "3" : "1.8"}
                      className="cursor-pointer transition-all duration-200 text-slate-500"
                      onMouseEnter={() => setHoveredLine('backBoundary')}
                      onMouseLeave={() => setHoveredLine(null)}
                    />
                  </svg>
                </div>
              </div>

              {/* 오른쪽설명 */}
              <div className="lg:col-span-6 flex flex-col gap-4">
                {(['net', 'shortServe', 'doublesLong', 'backBoundary', 'centerLine', 'singlesSide', 'doublesSide'] as const).map((lineKey) => (
                  <div 
                    key={lineKey}
                    onMouseEnter={() => setHoveredLine(lineKey)}
                    onMouseLeave={() => setHoveredLine(null)}
                    className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      hoveredLine === lineKey 
                        ? 'bg-slate-900 border-[#00B4D8] shadow-[0_0_15px_rgba(0,180,216,0.1)] translate-x-1' 
                        : 'bg-slate-950/40 border-slate-900 text-slate-400'
                    }`}
                  >
                    <h3 className={`font-bold text-sm mb-1.5 transition-colors uppercase ${hoveredLine === lineKey ? 'text-[#00B4D8]' : 'text-slate-200'}`}>
                      {t.court.lines[lineKey].split(' - ')[0]}
                    </h3>
                    <p className="text-xs leading-normal">
                      {t.court.lines[lineKey].split(' - ')[1]}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: SCORING */}
        {activeTab === 'score' && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold italic uppercase tracking-tight text-white mb-2 font-sporty">
                {t.score.title}
              </h2>
              <p className="text-slate-400 text-xs max-w-xl mx-auto">
                {t.score.desc}
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {t.score.items.map((item, index) => (
                <div key={index} className="group relative p-6 rounded-xl border border-slate-900 bg-gradient-to-br from-[#060E1A] to-[#010205] overflow-hidden">
                  <div className="flex gap-4 items-start z-10 relative">
                    <span className="font-sporty font-black text-2xl text-[#38ef7d] italic opacity-50">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-200 text-lg mb-2 group-hover:text-[#38ef7d] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-0 top-0 h-full w-1 bg-[#38ef7d] scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: RULES WIKI */}
        {activeTab === 'rules' && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold italic uppercase tracking-tight text-white mb-2 font-sporty">
                {t.rules.title}
              </h2>
              <p className="text-slate-400 text-xs max-w-xl mx-auto">
                {t.rules.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.rules.categories.map((cat, index) => (
                <div key={index} className="p-6 rounded-xl border border-slate-900 bg-slate-950/60 flex flex-col justify-between hover:border-[#00c6ff]/40 transition-colors duration-300">
                  <div>
                    <h3 className="font-bold text-[#00c6ff] text-base mb-3 border-b border-slate-900 pb-2">
                      {cat.name}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {cat.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: QUIZ */}
        {activeTab === 'quiz' && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold italic uppercase tracking-tight text-white mb-2 font-sporty">
                {t.quiz.title}
              </h2>
              <p className="text-slate-400 text-xs max-w-xl mx-auto">
                {t.quiz.desc}
              </p>
            </div>

            {!showQuizResults ? (
              <div className="bg-slate-950/60 border border-slate-900/80 rounded-xl p-6 relative overflow-hidden">
                {/* 퀴즈 헤더 */}
                <div className="flex justify-between items-center mb-6 border-b border-slate-900 pb-4">
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                    QUESTION {currentQuizIndex + 1} OF {QUIZ_QUESTIONS.length}
                  </span>
                  <div className="flex items-center gap-1 text-[#E100FF]">
                    <Trophy className="w-4 h-4" />
                    <span className="font-sporty font-black text-sm">{quizScore} pt</span>
                  </div>
                </div>

                {/* 상황 가이드 */}
                <div className="bg-slate-900/60 border border-slate-900 rounded-lg p-4 mb-6 flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <span className="text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded bg-[#E100FF]/10 text-[#E100FF] border border-[#E100FF]/20">
                      {QUIZ_QUESTIONS[currentQuizIndex].type.toUpperCase()}
                    </span>
                    <span className="text-xs text-slate-400 font-bold">
                      서버 점수: {QUIZ_QUESTIONS[currentQuizIndex].score}점
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-normal">
                    {lang === 'ko' 
                      ? QUIZ_QUESTIONS[currentQuizIndex].situationKo
                      : QUIZ_QUESTIONS[currentQuizIndex].situationEn
                    }
                  </p>
                </div>

                {/* 미니 코트 맵 */}
                <div className="flex justify-center mb-6 bg-[#070A13] p-3 rounded-lg border border-slate-900/80">
                  <div className="w-[120px] aspect-[1/2.2]">
                    <svg viewBox="0 0 100 220" className="w-full h-full text-slate-700 stroke-[1.8]" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="19.5" y="43" width="61" height="134" fill="#0f1f33" stroke="none" />
                      
                      {/* 타겟 하이라이트 */}
                      {QUIZ_QUESTIONS[currentQuizIndex].score % 2 === 0 ? (
                        <rect x={QUIZ_QUESTIONS[currentQuizIndex].type === 'singles' ? "24.1" : "19.5"} y={QUIZ_QUESTIONS[currentQuizIndex].type === 'singles' ? "43" : "50.6"} width={QUIZ_QUESTIONS[currentQuizIndex].type === 'singles' ? "25.9" : "30.5"} height={QUIZ_QUESTIONS[currentQuizIndex].type === 'singles' ? "47.2" : "39.6"} fill="rgba(225, 0, 255, 0.05)" className="stroke-[#E100FF]/30 stroke-[0.8]" />
                      ) : (
                        <rect x="50" y={QUIZ_QUESTIONS[currentQuizIndex].type === 'singles' ? "43" : "50.6"} width={QUIZ_QUESTIONS[currentQuizIndex].type === 'singles' ? "25.9" : "30.5"} height={QUIZ_QUESTIONS[currentQuizIndex].type === 'singles' ? "47.2" : "39.6"} fill="rgba(225, 0, 255, 0.05)" className="stroke-[#E100FF]/30 stroke-[0.8]" />
                      )}

                      <rect x="19.5" y="43" width="61" height="134" fill="none" stroke="currentColor" className="text-slate-800" />
                      <line x1="24.1" y1="43" x2="24.1" y2="177" className={QUIZ_QUESTIONS[currentQuizIndex].type === 'singles' ? 'stroke-slate-500' : 'stroke-slate-900'} />
                      <line x1="75.9" y1="43" x2="75.9" y2="177" className={QUIZ_QUESTIONS[currentQuizIndex].type === 'singles' ? 'stroke-slate-500' : 'stroke-slate-900'} />
                      <line x1="19.5" y1="90.2" x2="80.5" y2="90.2" stroke="currentColor" strokeWidth="0.8" />
                      <line x1="19.5" y1="129.8" x2="80.5" y2="129.8" stroke="currentColor" strokeWidth="0.8" />
                      <line x1="19.5" y1="50.6" x2="80.5" y2="50.6" className={QUIZ_QUESTIONS[currentQuizIndex].type === 'doubles' ? 'stroke-slate-400' : 'stroke-slate-900'} />
                      <line x1="19.5" y1="169.4" x2="80.5" y2="169.4" className={QUIZ_QUESTIONS[currentQuizIndex].type === 'doubles' ? 'stroke-slate-400' : 'stroke-slate-900'} />
                      <line x1="19.5" y1="110" x2="80.5" y2="110" stroke="#FF512F" strokeDasharray="3 2" />
                      <line x1="19.5" y1="43" x2="80.5" y2="43" stroke="currentColor" />
                      <line x1="19.5" y1="177" x2="80.5" y2="177" stroke="currentColor" />
                      <line x1="50" y1="43" x2="50" y2="90.2" stroke="currentColor" strokeWidth="0.6" />
                      <line x1="50" y1="129.8" x2="50" y2="177" stroke="currentColor" strokeWidth="0.6" />

                      {/* 서버 위치 */}
                      {QUIZ_QUESTIONS[currentQuizIndex].score % 2 === 0 ? (
                        <circle cx="65" cy="153.4" r="3.5" fill="#00B4D8" />
                      ) : (
                        <circle cx="35" cy="153.4" r="3.5" fill="#00B4D8" />
                      )}

                      {/* 꽂힌 셔틀콕 렌더링 */}
                      <g transform={`translate(${QUIZ_QUESTIONS[currentQuizIndex].x}, ${QUIZ_QUESTIONS[currentQuizIndex].y}) rotate(180)`}>
                        <path d="M-3,-3 L-5,-11 L5,-11 L3,-3 Z" fill="rgba(241, 245, 249, 0.9)" stroke="white" strokeWidth="0.4" />
                        <circle cx="0" cy="-3" r="2.2" fill="#E100FF" />
                      </g>
                    </svg>
                  </div>
                </div>

                {/* 보기 옵션 선택 버튼 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {QUIZ_QUESTIONS[currentQuizIndex].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => submitQuizAnswer(opt)}
                      disabled={hasAnswered}
                      className={`p-3 rounded-lg border text-left text-xs font-bold transition-all duration-200 ${
                        selectedQuizAnswer === opt
                          ? opt === QUIZ_QUESTIONS[currentQuizIndex].answer
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-md'
                            : 'bg-rose-500/10 border-rose-500 text-rose-400 shadow-md'
                          : hasAnswered && opt === QUIZ_QUESTIONS[currentQuizIndex].answer
                            ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                            : 'bg-slate-900/60 border-slate-900 text-slate-300 hover:border-slate-800'
                      }`}
                    >
                      {opt === 'IN' ? t.serve.in.split(' - ')[0] : opt}
                    </button>
                  ))}
                </div>

                {/* 해설 및 다음버튼 */}
                {hasAnswered && (
                  <div className="border-t border-slate-900 pt-6 mt-4">
                    <div className={`p-4 rounded-lg mb-4 text-xs ${
                      selectedQuizAnswer === QUIZ_QUESTIONS[currentQuizIndex].answer 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/15' 
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/15'
                    }`}>
                      <span className="font-extrabold text-sm block mb-1">
                        {selectedQuizAnswer === QUIZ_QUESTIONS[currentQuizIndex].answer ? t.quiz.correct : t.quiz.incorrect}
                      </span>
                      <p className="leading-relaxed opacity-90">
                        {lang === 'ko' ? QUIZ_QUESTIONS[currentQuizIndex].explainKo : QUIZ_QUESTIONS[currentQuizIndex].explainEn}
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <button 
                        onClick={nextQuizQuestion}
                        className="px-6 py-2.5 bg-[#E100FF] hover:bg-[#c200dd] transition-colors rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(225,0,255,0.25)]"
                      >
                        <span>{currentQuizIndex < QUIZ_QUESTIONS.length - 1 ? t.quiz.next : t.quiz.results}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // 결과 페이지
              <div className="bg-slate-950/60 border border-slate-900/80 rounded-xl p-8 text-center flex flex-col items-center gap-6">
                <div className="w-16 h-16 bg-[#E100FF]/10 rounded-full flex items-center justify-center border border-[#E100FF]/20 shadow-[0_0_30px_rgba(225,0,255,0.15)] text-[#E100FF]">
                  <Trophy className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-sporty font-black italic text-3xl text-white mb-2 uppercase">
                    QUIZ COMPLETED!
                  </h3>
                  <p className="text-xl font-bold text-[#E100FF] font-sporty">
                    {t.quiz.scoreResult.replace('{score}', String(quizScore))}
                  </p>
                  <p className="text-slate-400 text-xs mt-3 max-w-sm leading-relaxed mx-auto">
                    {quizScore === 50 ? t.quiz.perfect : quizScore >= 30 ? t.quiz.good : t.quiz.bad}
                  </p>
                </div>
                <button 
                  onClick={resetQuiz}
                  className="px-8 py-3 bg-[#E100FF] hover:bg-[#c200dd] text-xs font-black uppercase tracking-widest rounded-lg flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(225,0,255,0.2)]"
                >
                  <RefreshCw className="w-4 h-4 animate-spin-slow" />
                  <span>{t.quiz.retry}</span>
                </button>
              </div>
            )}
          </div>
        )}

      </main>

      {/* 3. 푸터 */}
      <footer className="absolute bottom-0 left-0 right-0 py-6 border-t border-slate-900/40 text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
        {t.footer}
      </footer>

    </div>
  );
}
