/* IntelliCALL solution page content (VI / EN / NL). VI = the design copy verbatim.
 * Scenario utterances stay in the language the caller actually speaks (EN guest, NL↔VI meeting, KR hotel guest,
 * VI callers) in every UI language; only labels, titles, chips and the italic translation lines are localised.
 * Message order per scenario: [caller, IntelliCALL].
 */
(function () {
  var D = window.IFD_I18N_DICT;

  // Hero card + section 03 conversation: English on purpose, identical in every language.
  var HERO_Q = 'Can I book a car to the airport at 5 a.m.?';
  var HERO_A = 'Of course, Mr. Tanaka. A car for room 1208 at 5:00. Would you like breakfast boxes for the trip?';
  var JSON_LINE = '{ "intent": "airport_transfer", "room": 1208, "sentiment": 0.92 }';
  var CALL3 = [
    'Hi, can I book a car to the airport at 5 a.m. tomorrow?',
    'Of course, Mr. Tanaka. A car for room 1208 at 5:00 a.m. Would you like breakfast boxes for the trip?',
    'Yes, two please.',
    'All set. You’ll receive an SMS confirmation shortly. Have a good night!'
  ];
  // Original utterances
  var U = {
    cc: ['Đơn DH2048 của tôi sao giao trễ ba ngày rồi?', 'Đơn đang ở kho Đà Nẵng. Em chuyển giao hỏa tốc trước 11 giờ sáng mai cho anh nhé?'],
    mt: ['Kunnen we de go-live verplaatsen naar de 15e?', 'Được, nhưng mình cần chốt UAT trước thứ Sáu.'],
    tr: ['Mình muốn đặt tour 3 ngày cho 2 người cuối tuần này.', 'Còn chỗ chuyến sáng thứ Sáu, xe đón tận khách sạn lúc 7 giờ. Em giữ 2 chỗ cho mình nhé?'],
    fb: ['Can I book a table for four tonight at 7 pm?', 'Confirmed by the window, David. I’ve noted a vegetarian guest.'],
    ht: ['수건 두 장 더 주실 수 있나요?', '네, 10분 안에 객실로 가져다 드리겠습니다.'],
    cl: ['Chị muốn dời lịch khám thứ Năm sang tuần sau.', 'Bác sĩ Lâm còn trống 9 giờ thứ Ba tuần sau, chị chọn giờ này nhé?']
  };
  function msgs(k, who, tr) {
    tr = tr || [];
    return [{ who: who[0], text: U[k][0], tr: tr[0] || '' }, { who: who[1], text: U[k][1], tr: tr[1] || '' }];
  }

  D.vi.intellicall = {
    title: 'IntelliCALL — Infodation AI Studio',
    crumbStudio: 'AI STUDIO', crumbSol: 'GIẢI PHÁP', crumbCat: 'DỊCH VỤ &amp; CSKH',
    eyebrow: 'HỒ SƠ GIẢI PHÁP · TRỢ LÝ GIỌNG NÓI AI',
    tagline: 'Biến mỗi cuộc hội thoại thành hành động tức thì.',
    lead: 'Trợ lý giọng nói AI trò chuyện tự nhiên theo thời gian thực, đa ngôn ngữ, hiểu tri thức của doanh nghiệp và thực hiện tác vụ ngay trên hệ thống nghiệp vụ.',
    heroTags: ['ASR', 'LLM + RAG', 'TTS mô phỏng vật lý', 'ISO/IEC 27001'],
    heroDemo: 'Nghe thử các kịch bản', heroProfile: 'Hồ sơ giải pháp',
    call: {
      incoming: 'Cuộc gọi đến, hotline resort', time: '23:15', guest: 'Khách · EN', agent: 'IntelliCALL',
      q: HERO_Q, a: HERO_A, json: JSON_LINE,
      langL: 'Ngôn ngữ', langV: 'English', moodL: 'Cảm xúc', moodV: 'Tích cực, 92%', intentL: 'Ý định', intentV: 'Đặt xe sân bay'
    },
    pillars: [
      { t: 'Đa ngôn ngữ', d: 'Phục vụ khách quốc tế bằng chính ngôn ngữ của họ.' },
      { t: 'Thời gian thực', d: 'Hội thoại tự nhiên, biểu cảm, không phải chờ.' },
      { t: 'Tích hợp nghiệp vụ', d: 'Thực hiện tác vụ trực tiếp trên CRM, PMS và lịch hẹn.' }
    ],
    s01: {
      label: '01 · BÀI TOÁN', title: 'Mỗi cuộc gọi bị bỏ lỡ là một khách hàng có thể mất.',
      lead: 'Dù ở ngành nào, doanh nghiệp dịch vụ đều gặp cùng một nhóm vấn đề tại điểm chạm giọng nói với khách hàng.',
      problems: [
        { t: 'Cuộc gọi nhỡ', d: 'Giờ cao điểm, buổi tối và cuối tuần không ai nghe máy: mất khách, mất doanh thu.' },
        { t: 'Rào cản ngôn ngữ', d: 'Khách hàng và đối tác quốc tế không được phục vụ bằng ngôn ngữ của họ.' },
        { t: 'Tổng đài quá tải', d: 'Câu hỏi lặp lại chiếm phần lớn thời lượng của nhân viên.' },
        { t: 'Chất lượng không đồng đều', d: 'Trải nghiệm phụ thuộc kỹ năng và trạng thái của từng người.' },
        { t: 'Dữ liệu hội thoại bị bỏ phí', d: 'Nội dung cuộc gọi không được ghi nhận, phân tích và khai thác.' },
        { t: 'IntelliCALL trả lời', d: 'Một voice agent luôn sẵn sàng, đa ngôn ngữ, nhất quán và ghi nhận mọi cuộc gọi.' }
      ],
      day: 'Cuộc gọi không dừng lại lúc 17 giờ. Buổi tối, cuối tuần và giờ cao điểm là lúc khách hàng dễ bị bỏ lỡ nhất, và cũng là lúc IntelliCALL phát huy giá trị rõ nhất.',
      office: 'Giờ hành chính 08:00–17:00'
    },
    s02: {
      label: '02 · ỨNG DỤNG THEO NGÀNH', title: 'Một voice agent, sáu nghiệp vụ thực tế.',
      lead: 'Chọn một ngành để xem IntelliCALL trả lời khách, tra cứu hệ thống và thực hiện tác vụ ngay trong cuộc gọi.',
      tabsAria: 'Kịch bản theo ngành', replay: '↻ Phát lại', note: 'Hội thoại là kịch bản minh họa.',
      scen: {
        cc: { label: 'Contact center', title: 'Tra cứu đơn hàng và nâng cấp giao hỏa tốc', sub: 'Contact center · tiếng Việt',
          msgs: msgs('cc', ['Khách', 'IntelliCALL']), chips: ['Tra cứu CRM', 'Cập nhật đơn', 'SMS xác nhận'] },
        mt: { label: 'Thông dịch cuộc họp', title: 'Họp dự án Hà Lan – Việt Nam', sub: 'Dịch giọng nói hai chiều NL ↔ VI',
          msgs: msgs('mt', ['Pieter · NL', 'Lan · VI'], ['→ VI: Mình có thể dời go-live sang ngày 15 không?', '→ NL: Ja, maar we moeten de UAT vóór vrijdag afronden.']),
          chips: ['Dịch hai chiều', 'Nhận diện người nói', 'Biên bản song ngữ'] },
        tr: { label: 'Du lịch và lữ hành', title: 'Tư vấn và giữ chỗ tour Nha Trang – Đà Lạt', sub: 'Du lịch · tiếng Việt',
          msgs: msgs('tr', ['Khách', 'IntelliCALL']), chips: ['Giữ chỗ', 'Xác nhận qua Zalo'] },
        fb: { label: 'Nhà hàng và F&amp;B', title: 'Đặt bàn và ghi chú món chay', sub: 'F&amp;B · tiếng Anh',
          msgs: msgs('fb', ['Khách · EN', 'IntelliCALL']), chips: ['Tạo đặt bàn', 'Nhắc lịch 18:00'] },
        ht: { label: 'Khách sạn và resort', title: 'Yêu cầu buồng phòng bằng tiếng Hàn', sub: 'Khách sạn · tiếng Hàn',
          msgs: msgs('ht', ['Khách · KR', 'IntelliCALL'], ['Cho tôi thêm hai khăn tắm được không?', 'Vâng, sẽ mang lên phòng trong 10 phút.']),
          chips: ['Housekeeping', 'Phòng 1205'] },
        cl: { label: 'Smart clinic', title: 'Đổi lịch khám nha khoa', sub: 'Phòng khám · tiếng Việt',
          msgs: msgs('cl', ['Bệnh nhân', 'IntelliCALL']), chips: ['Cập nhật lịch hẹn', 'SMS nhắc trước 1 ngày'] }
      }
    },
    s03: {
      label: '03 · BÊN TRONG MỘT CUỘC GỌI', title: '23:15, hotline resort. Không ai phải trực máy.',
      guest: 'Khách · EN', msgs: CALL3,
      behindT: 'Phía sau cuộc gọi',
      behind: [
        { t: 'Nhận diện ngôn ngữ', d: 'Tiếng Anh, chuyển sang ngữ cảnh phục vụ tương ứng.' },
        { t: 'Xác định ý định', d: 'Đặt xe ra sân bay, kèm suất ăn sáng mang đi.' },
        { t: 'Tra cứu hệ thống PMS', d: 'Phòng 1208, tên khách, ngày trả phòng.' },
        { t: 'Tạo yêu cầu nghiệp vụ', d: 'Gửi Concierge và F&amp;B đúng bộ phận.' },
        { t: 'Thông báo và ghi nhận', d: 'SMS xác nhận, lưu CRM, cảm xúc tích cực.' }
      ],
      result: '<strong>Kết quả:</strong> yêu cầu được xử lý trọn vẹn ngay trong cuộc gọi, nhân viên ca đêm chỉ nhận việc đã được chuẩn hóa.'
    },
    s04: {
      label: '04 · NỀN TẢNG CÔNG NGHỆ', title: 'Từ lời nói đến hành động, trên một nền tảng.',
      lead: 'Từ lúc khách cất lời đến khi tác vụ được thực hiện trong hệ thống của doanh nghiệp, mọi bước đều chạy trên một nền tảng duy nhất.',
      channelsT: 'KÊNH TIẾP NHẬN', channels: ['Hotline / SIP', 'Website widget', 'Zalo OA', 'Thiết bị trong phòng', 'Họp trực tuyến'],
      systemsT: 'HỆ THỐNG NGHIỆP VỤ', systems: ['CRM', 'PMS / booking', 'Lịch hẹn', 'SMS / thông báo', 'Agent / supervisor'],
      stages: [
        { tag: 'ASR', t: 'Nhận dạng giọng nói', d: 'Đa ngôn ngữ, chống nhiễu, cho phép khách ngắt lời (barge-in) như hội thoại bình thường.' },
        { tag: 'LLM + RAG', t: 'Hiểu và suy luận', d: 'Xác định ý định, truy xuất tri thức doanh nghiệp và quản lý hội thoại.' },
        { tag: 'TÍCH HỢP API', t: 'Hành động và phân tích', d: 'Gọi vào CRM, PMS, lịch hẹn, phân tích cảm xúc, chuyển nhân viên kèm tóm tắt.' },
        { tag: 'TTS', t: 'Giọng nói mô phỏng vật lý', d: 'Trả lời bằng động cơ thanh quản nhân tạo 3D do R&amp;D Infodation phát triển.' }
      ],
      know: '<strong>Doanh nghiệp kiểm soát tri thức.</strong> Dịch vụ, chính sách, bảng giá và FAQ do doanh nghiệp cung cấp và quản lý, nên câu trả lời luôn bám sát thông tin chính thức.',
      feats: [
        { t: 'Phân tích cảm xúc', d: 'Mỗi cuộc gọi được chấm điểm ngay khi diễn ra, khách không hài lòng được phát hiện sớm.' },
        { t: 'Transcript và tóm tắt', d: 'Bản ghi tra cứu được của mọi cuộc hội thoại, kèm tóm tắt các ý chính.' },
        { t: 'Chuyển nhân viên', d: 'Khi cần người xử lý, cuộc gọi được chuyển cho đội ngũ kèm đầy đủ ngữ cảnh.' }
      ]
    },
    s05: {
      label: '05 · ĐIỂM KHÁC BIỆT', title: 'Giọng nói mô phỏng vật lý.',
      lead: 'Thay vì để mạng nơ-ron dự đoán trực tiếp từng mẫu âm thanh, IntelliCALL mô phỏng chính cơ chế phát âm của con người, nên giọng nói biến đổi sắc thái tự nhiên theo nội dung và cảm xúc.',
      chainAT: 'TTS NEURAL TRUYỀN THỐNG', chainBT: 'INTELLICALL',
      chainA: [
        { t: 'Văn bản đầu vào', d: 'văn bản cần đọc' },
        { t: 'Mô hình âm học', d: 'Tacotron, FastSpeech' },
        { t: 'Mel-spectrogram', d: 'đặc trưng phổ' },
        { t: 'Neural vocoder', d: 'WaveNet, HiFi-GAN' },
        { t: 'Âm thanh', d: 'dễ nhiễu pha' }
      ],
      chainB: [
        { t: 'Văn bản + ngữ điệu', d: 'mục tiêu ngữ điệu' },
        { t: 'Kinematic mapping', d: 'mạng nơ-ron gọn nhẹ' },
        { t: 'Tham số vật lý', d: 'áp suất, độ căng, hình dạng' },
        { t: 'Thanh quản 3D', d: 'mô phỏng vật lý' },
        { t: 'Giọng tự nhiên', d: 'giàu sắc thái' }
      ],
      tonesT: 'Giọng nói biểu cảm theo ngữ cảnh:', tones: ['Vui vẻ', 'Đồng cảm', 'Nghiêm túc', 'Hơi thở, độ khàn'],
      stats: [
        { v: '−38%', d: 'độ trễ tổng hợp giọng nói đầu–cuối (thử nghiệm nội bộ, 2026)' },
        { v: 'Ít méo pha', d: 'giảm rõ rệt nhiễu pha đặc trưng của neural vocoder' },
        { v: 'Ổn định', d: 'trong môi trường đông người, nhiều tạp âm (ITE HCMC 2026)' }
      ],
      note: 'Số liệu từ thử nghiệm nội bộ của đội ngũ R&amp;D Infodation. Chỉ số trên kịch bản và hạ tầng thực tế của doanh nghiệp được đo và xác nhận trong giai đoạn pilot.'
    },
    s06: {
      label: '06 · KINH NGHIỆM THỰC TẾ', title: 'Không chỉ là bản trình diễn.',
      iteT: 'TRÌNH DIỄN TẠI ITE HCMC 2026', iteX: 'khách tham quan đăng ký tìm hiểu thêm sau khi nghe trực tiếp, hệ thống ổn định giữa hội chợ đông người.',
      dailyT: 'DÙNG HẰNG NGÀY TẠI INFODATION', dailyH: 'Thông dịch các cuộc họp Hà Lan – Việt Nam', dailyX: 'theo mô hình One Team.',
      link: 'Trải nghiệm ngay tại infodation.ai/intellicall'
    },
    s07: {
      label: '07 · BẢO MẬT DỮ LIỆU', title: 'Hội thoại là tài sản của doanh nghiệp.',
      items: [
        { t: 'ISO/IEC 27001:2022', d: 'Hệ thống quản lý an toàn thông tin được TÜV NORD đánh giá định kỳ hằng năm.' },
        { t: 'NDA trước tiên', d: 'Ký thỏa thuận bảo mật trước khi tiếp nhận bất kỳ dữ liệu hội thoại nào.' },
        { t: 'Triển khai on-premise', d: 'Có phương án triển khai trên hạ tầng của doanh nghiệp, dữ liệu mẫu được xóa sau pilot theo yêu cầu.' }
      ]
    },
    s08: {
      label: '08 · CÁCH CHÚNG TÔI LÀM VIỆC', title: 'Bắt đầu nhỏ, đo trên chính cuộc gọi của bạn.',
      steps: [
        { t: '1 · Khám phá', time: '1 TUẦN', d: 'Phân tích kịch bản cuộc gọi, tri thức và hệ thống hiện có, đo các chỉ số baseline, demo trên chính nghiệp vụ của bạn.' },
        { t: '2 · Pilot', time: '2–4 TUẦN', d: 'Vận hành trên một kênh hoặc một kịch bản, đánh giá theo KPI đã thống nhất.' },
        { t: '3 · Mở rộng', time: 'THEO PHẠM VI', d: 'Mở rộng kịch bản, kênh và tích hợp, đào tạo và hỗ trợ vận hành.' }
      ],
      kpis: [
        { t: 'Tỷ lệ tự xử lý', d: 'Tỷ lệ cuộc gọi IntelliCALL xử lý trọn vẹn mà không cần nhân viên.' },
        { t: 'Tỷ lệ cuộc gọi nhỡ', d: 'Tỷ lệ cuộc gọi đến không được trả lời.' },
        { t: 'Thời gian chờ', d: 'Thời gian khách phải chờ trước khi được trả lời.' },
        { t: 'Thời gian xử lý (AHT)', d: 'Thời gian trung bình để xử lý một cuộc gọi từ đầu đến cuối.' },
        { t: 'CSAT', d: 'Điểm hài lòng của khách, thu thập sau cuộc gọi.' }
      ]
    },
    s09: {
      label: '09 · HỒ SƠ GIẢI PHÁP', title: 'Mang về cho cả đội cùng xem.',
      text: 'Bài toán, sáu kịch bản theo ngành, nền tảng công nghệ, giọng nói mô phỏng vật lý và cách triển khai, gói gọn trong 9 trang.',
      coverAlt: 'Bìa hồ sơ giải pháp IntelliCALL', view: 'Xem online', download: 'Tải PDF', request: 'Yêu cầu qua email →',
      mailSubject: 'Hồ sơ giải pháp IntelliCALL',
      alsoProfile: 'Kèm theo: Hồ sơ năng lực Infodation Việt Nam →'
    },
    cta: {
      label: 'BƯỚC TIẾP THEO', title1: 'Bắt đầu với', title2: '60 phút.',
      lead: 'Một buổi trao đổi để hiểu các cuộc hội thoại hiện tại và nghe IntelliCALL xử lý chính kịch bản của doanh nghiệp. Sau đó, Infodation gửi đề xuất pilot với phạm vi, KPI và chi phí cụ thể.',
      emailL: 'EMAIL', phoneL: 'ĐIỆN THOẠI',
      formTitle: 'Đặt lịch 60 phút', name: 'Họ và tên', email: 'Email công ty', industry: 'Ngành của bạn',
      industries: ['Contact center', 'Thông dịch cuộc họp', 'Du lịch và lữ hành', 'Nhà hàng và F&amp;B', 'Khách sạn và resort', 'Smart clinic', 'Khác'],
      calls: 'Số cuộc gọi mỗi ngày (ước tính)', callsPh: 'ví dụ: 300 cuộc gọi',
      submit: 'Gửi yêu cầu', nda: 'Ký NDA trước khi tiếp nhận bất kỳ dữ liệu hội thoại nào.'
    }
  };

  D.en.intellicall = {
    title: 'IntelliCALL — Infodation AI Studio',
    crumbStudio: 'AI STUDIO', crumbSol: 'SOLUTIONS', crumbCat: 'SERVICE &amp; CUSTOMER CARE',
    eyebrow: 'SOLUTION PROFILE · AI VOICE ASSISTANT',
    tagline: 'Turn every conversation into immediate action.',
    lead: 'An AI voice assistant that holds natural, real-time conversations in multiple languages, understands your company’s knowledge and carries out tasks directly in your business systems.',
    heroTags: ['ASR', 'LLM + RAG', 'Physics-based TTS', 'ISO/IEC 27001'],
    heroDemo: 'Listen to the scenarios', heroProfile: 'Solution profile',
    call: {
      incoming: 'Incoming call, resort hotline', time: '23:15', guest: 'Guest · EN', agent: 'IntelliCALL',
      q: HERO_Q, a: HERO_A, json: JSON_LINE,
      langL: 'Language', langV: 'English', moodL: 'Sentiment', moodV: 'Positive, 92%', intentL: 'Intent', intentV: 'Airport transfer'
    },
    pillars: [
      { t: 'Multilingual', d: 'Serve international guests in their own language.' },
      { t: 'Real time', d: 'Natural, expressive conversation with no waiting.' },
      { t: 'Business integration', d: 'Carries out tasks directly in your CRM, PMS and scheduling.' }
    ],
    s01: {
      label: '01 · THE PROBLEM', title: 'Every missed call is a customer you could lose.',
      lead: 'Whatever the industry, service businesses run into the same set of problems wherever customers reach them by voice.',
      problems: [
        { t: 'Missed calls', d: 'Nobody picks up at peak times, in the evening or at the weekend: lost customers, lost revenue.' },
        { t: 'Language barriers', d: 'International customers and partners are not served in their own language.' },
        { t: 'Overloaded call centre', d: 'Repetitive questions take up most of your staff’s time.' },
        { t: 'Inconsistent quality', d: 'The experience depends on each agent’s skills and state of mind.' },
        { t: 'Wasted conversation data', d: 'What is said on calls is never captured, analysed or put to use.' },
        { t: 'IntelliCALL answers', d: 'One voice agent that is always available, multilingual, consistent and records every call.' }
      ],
      day: 'Calls don’t stop at 5 p.m. Evenings, weekends and peak hours are when customers are most easily missed, and exactly when IntelliCALL proves its value.',
      office: 'Office hours 08:00–17:00'
    },
    s02: {
      label: '02 · BY INDUSTRY', title: 'One voice agent, six real-world use cases.',
      lead: 'Pick an industry to see IntelliCALL answer customers, look things up in your systems and complete tasks during the call.',
      tabsAria: 'Scenarios by industry', replay: '↻ Replay', note: 'Conversations are illustrative scenarios.',
      scen: {
        cc: { label: 'Contact center', title: 'Order lookup and express delivery upgrade', sub: 'Contact center · Vietnamese',
          msgs: msgs('cc', ['Customer', 'IntelliCALL'], ['My order DH2048 is three days late. What’s going on?', 'Your order is at our Da Nang warehouse. Shall I upgrade it to express delivery before 11 a.m. tomorrow?']),
          chips: ['CRM lookup', 'Order updated', 'SMS confirmation'] },
        mt: { label: 'Meeting interpretation', title: 'Dutch–Vietnamese project meeting', sub: 'Two-way speech translation NL ↔ VI',
          msgs: msgs('mt', ['Pieter · NL', 'Lan · VI'], ['→ EN: Can we move the go-live to the 15th?', '→ EN: Yes, but we need to sign off UAT before Friday.']),
          chips: ['Two-way interpretation', 'Speaker recognition', 'Bilingual minutes'] },
        tr: { label: 'Travel and tourism', title: 'Advice and booking for a Nha Trang – Da Lat tour', sub: 'Travel · Vietnamese',
          msgs: msgs('tr', ['Customer', 'IntelliCALL'], ['I’d like to book a 3-day tour for 2 people this weekend.', 'There are seats on Friday morning’s departure, with hotel pick-up at 7. Shall I hold 2 seats for you?']),
          chips: ['Seats held', 'Confirmation via Zalo'] },
        fb: { label: 'Restaurants and F&amp;B', title: 'Table booking with a vegetarian note', sub: 'F&amp;B · English',
          msgs: msgs('fb', ['Guest · EN', 'IntelliCALL']), chips: ['Booking created', 'Reminder at 18:00'] },
        ht: { label: 'Hotels and resorts', title: 'Housekeeping request in Korean', sub: 'Hotel · Korean',
          msgs: msgs('ht', ['Guest · KR', 'IntelliCALL'], ['Could I have two more towels, please?', 'Certainly, we’ll bring them to your room within 10 minutes.']),
          chips: ['Housekeeping', 'Room 1205'] },
        cl: { label: 'Smart clinic', title: 'Rescheduling a dental appointment', sub: 'Clinic · Vietnamese',
          msgs: msgs('cl', ['Patient', 'IntelliCALL'], ['I’d like to move my Thursday appointment to next week.', 'Dr. Lâm has a slot at 9 a.m. next Tuesday. Shall I book that for you?']),
          chips: ['Appointment updated', 'SMS reminder 1 day ahead'] }
      }
    },
    s03: {
      label: '03 · INSIDE A CALL', title: '23:15, resort hotline. Nobody has to man the phone.',
      guest: 'Guest · EN', msgs: CALL3,
      behindT: 'Behind the call',
      behind: [
        { t: 'Language detection', d: 'English; switches to the matching service context.' },
        { t: 'Intent recognition', d: 'Car to the airport, plus breakfast boxes to go.' },
        { t: 'PMS lookup', d: 'Room 1208, guest name, check-out date.' },
        { t: 'Service request created', d: 'Routed to Concierge and F&amp;B, the right departments.' },
        { t: 'Notify and record', d: 'SMS confirmation, logged in CRM, positive sentiment.' }
      ],
      result: '<strong>Result:</strong> the request is handled end to end during the call; the night shift only receives standardised tasks.'
    },
    s04: {
      label: '04 · TECHNOLOGY PLATFORM', title: 'From speech to action, on one platform.',
      lead: 'From the moment a customer starts speaking until the task is completed in your systems, every step runs on a single platform.',
      channelsT: 'INTAKE CHANNELS', channels: ['Hotline / SIP', 'Website widget', 'Zalo OA', 'In-room device', 'Online meetings'],
      systemsT: 'BUSINESS SYSTEMS', systems: ['CRM', 'PMS / booking', 'Scheduling', 'SMS / notifications', 'Agent / supervisor'],
      stages: [
        { tag: 'ASR', t: 'Speech recognition', d: 'Multilingual and noise-robust, and lets callers interrupt (barge-in) just like in a normal conversation.' },
        { tag: 'LLM + RAG', t: 'Understanding and reasoning', d: 'Identifies intent, retrieves your company knowledge and manages the dialogue.' },
        { tag: 'API INTEGRATION', t: 'Action and analysis', d: 'Calls into CRM, PMS and scheduling, analyses sentiment, and hands over to staff with a summary.' },
        { tag: 'TTS', t: 'Physics-based voice', d: 'Responds through a 3D artificial larynx engine developed by Infodation R&amp;D.' }
      ],
      know: '<strong>You control the knowledge.</strong> Services, policies, price lists and FAQs are supplied and managed by your company, so answers always stay true to your official information.',
      feats: [
        { t: 'Sentiment analysis', d: 'Every call is scored as it happens, so dissatisfied customers are spotted early.' },
        { t: 'Transcripts and summaries', d: 'A searchable record of every conversation, with a summary of the key points.' },
        { t: 'Handover to staff', d: 'When a person is needed, the call is passed to your team with full context.' }
      ]
    },
    s05: {
      label: '05 · WHAT SETS IT APART', title: 'A physics-based voice.',
      lead: 'Instead of having a neural network predict every audio sample directly, IntelliCALL simulates the way humans actually produce speech, so the voice shifts in nuance naturally with content and emotion.',
      chainAT: 'TRADITIONAL NEURAL TTS', chainBT: 'INTELLICALL',
      chainA: [
        { t: 'Input text', d: 'text to be spoken' },
        { t: 'Acoustic model', d: 'Tacotron, FastSpeech' },
        { t: 'Mel spectrogram', d: 'spectral features' },
        { t: 'Neural vocoder', d: 'WaveNet, HiFi-GAN' },
        { t: 'Audio', d: 'prone to phase noise' }
      ],
      chainB: [
        { t: 'Text + prosody', d: 'prosody targets' },
        { t: 'Kinematic mapping', d: 'lightweight neural network' },
        { t: 'Physical parameters', d: 'pressure, tension, shape' },
        { t: '3D larynx', d: 'physical simulation' },
        { t: 'Natural voice', d: 'rich in nuance' }
      ],
      tonesT: 'An expressive voice that adapts to context:', tones: ['Cheerful', 'Empathetic', 'Serious', 'Breath, huskiness'],
      stats: [
        { v: '−38%', d: 'end-to-end speech synthesis latency (internal testing, 2026)' },
        { v: 'Less phase distortion', d: 'markedly less of the phase noise typical of neural vocoders' },
        { v: 'Stable', d: 'in crowded, noisy environments (ITE HCMC 2026)' }
      ],
      note: 'Figures from internal testing by the Infodation R&amp;D team. Metrics on your own scenarios and infrastructure are measured and confirmed during the pilot.'
    },
    s06: {
      label: '06 · PROVEN IN PRACTICE', title: 'More than a demo.',
      iteT: 'SHOWCASED AT ITE HCMC 2026', iteX: 'visitors signed up to learn more after hearing it live, with the system running reliably on a crowded trade-fair floor.',
      dailyT: 'USED DAILY AT INFODATION', dailyH: 'Interpreting Dutch–Vietnamese meetings', dailyX: 'as part of our One Team model.',
      link: 'Try it now at infodation.ai/intellicall'
    },
    s07: {
      label: '07 · DATA SECURITY', title: 'Your conversations belong to your business.',
      items: [
        { t: 'ISO/IEC 27001:2022', d: 'Information security management system audited annually by TÜV NORD.' },
        { t: 'NDA first', d: 'We sign a non-disclosure agreement before receiving any conversation data.' },
        { t: 'On-premise deployment', d: 'Can run on your own infrastructure; sample data is deleted after the pilot on request.' }
      ]
    },
    s08: {
      label: '08 · HOW WE WORK', title: 'Start small, measured on your own calls.',
      steps: [
        { t: '1 · Discovery', time: '1 WEEK', d: 'Analyse your call scenarios, knowledge and existing systems, measure baseline metrics and demo on your own business processes.' },
        { t: '2 · Pilot', time: '2–4 WEEKS', d: 'Run on one channel or one scenario, evaluated against the agreed KPIs.' },
        { t: '3 · Scale up', time: 'BY SCOPE', d: 'Expand scenarios, channels and integrations, with training and operational support.' }
      ],
      kpis: [
        { t: 'Self-service rate', d: 'Share of calls IntelliCALL handles end to end without staff.' },
        { t: 'Missed-call rate', d: 'Share of incoming calls that go unanswered.' },
        { t: 'Waiting time', d: 'How long callers wait before they are answered.' },
        { t: 'Handling time (AHT)', d: 'Average time to handle a call from start to finish.' },
        { t: 'CSAT', d: 'Customer satisfaction score, collected after the call.' }
      ]
    },
    s09: {
      label: '09 · SOLUTION PROFILE', title: 'Take it back to share with your team.',
      text: 'The problem, six industry scenarios, the technology platform, the physics-based voice and how we roll it out, all in 9 pages.',
      coverAlt: 'IntelliCALL solution profile cover', view: 'View online', download: 'Download PDF', request: 'Request by email →',
      mailSubject: 'IntelliCALL solution profile',
      alsoProfile: 'Also available: Infodation Vietnam company profile →'
    },
    cta: {
      label: 'NEXT STEP', title1: 'Start with', title2: '60 minutes.',
      lead: 'One session to understand your current conversations and hear IntelliCALL handle your own scenarios. Infodation then sends you a pilot proposal with concrete scope, KPIs and costs.',
      emailL: 'EMAIL', phoneL: 'PHONE',
      formTitle: 'Book 60 minutes', name: 'Full name', email: 'Work email', industry: 'Your industry',
      industries: ['Contact center', 'Meeting interpretation', 'Travel and tourism', 'Restaurants and F&amp;B', 'Hotels and resorts', 'Smart clinic', 'Other'],
      calls: 'Calls per day (estimate)', callsPh: 'e.g. 300 calls',
      submit: 'Send request', nda: 'We sign an NDA before receiving any conversation data.'
    }
  };

  D.nl.intellicall = {
    title: 'IntelliCALL — Infodation AI Studio',
    crumbStudio: 'AI STUDIO', crumbSol: 'OPLOSSINGEN', crumbCat: 'SERVICE &amp; KLANTCONTACT',
    eyebrow: 'OPLOSSINGSPROFIEL · AI-SPRAAKASSISTENT',
    tagline: 'Maak van elk gesprek direct actie.',
    lead: 'Een AI-spraakassistent die in realtime natuurlijke gesprekken voert in meerdere talen, de kennis van uw organisatie begrijpt en taken direct uitvoert in uw bedrijfssystemen.',
    heroTags: ['ASR', 'LLM + RAG', 'Fysiek gemodelleerde TTS', 'ISO/IEC 27001'],
    heroDemo: 'Beluister de scenario’s', heroProfile: 'Oplossingsprofiel',
    call: {
      incoming: 'Inkomend gesprek, hotline resort', time: '23:15', guest: 'Gast · EN', agent: 'IntelliCALL',
      q: HERO_Q, a: HERO_A, json: JSON_LINE,
      langL: 'Taal', langV: 'Engels', moodL: 'Sentiment', moodV: 'Positief, 92%', intentL: 'Intentie', intentV: 'Vervoer naar luchthaven'
    },
    pillars: [
      { t: 'Meertalig', d: 'Help internationale gasten in hun eigen taal.' },
      { t: 'Realtime', d: 'Natuurlijke, expressieve gesprekken zonder wachttijd.' },
      { t: 'Koppeling met uw processen', d: 'Voert taken direct uit in CRM, PMS en agenda.' }
    ],
    s01: {
      label: '01 · HET PROBLEEM', title: 'Elk gemist gesprek is een klant die u kunt verliezen.',
      lead: 'In welke branche ook: dienstverleners lopen tegen dezelfde problemen aan op het moment dat klanten hen telefonisch benaderen.',
      problems: [
        { t: 'Gemiste gesprekken', d: 'Piekuren, avonden en weekenden zonder dat iemand opneemt: klanten en omzet gaan verloren.' },
        { t: 'Taalbarrières', d: 'Internationale klanten en partners worden niet in hun eigen taal geholpen.' },
        { t: 'Overbelaste klantenservice', d: 'Terugkerende vragen slokken het grootste deel van de tijd van medewerkers op.' },
        { t: 'Wisselende kwaliteit', d: 'De ervaring hangt af van de vaardigheden en de dagvorm van elke medewerker.' },
        { t: 'Onbenutte gespreksdata', d: 'Wat er in gesprekken gezegd wordt, wordt niet vastgelegd, geanalyseerd of benut.' },
        { t: 'IntelliCALL als antwoord', d: 'Eén voice agent die altijd beschikbaar is, meertalig en consistent, en elk gesprek vastlegt.' }
      ],
      day: 'Gesprekken stoppen niet om 17.00 uur. Avonden, weekenden en piekuren zijn de momenten waarop klanten het snelst gemist worden, en precies dan bewijst IntelliCALL zijn waarde.',
      office: 'Kantooruren 08:00–17:00'
    },
    s02: {
      label: '02 · PER BRANCHE', title: 'Eén voice agent, zes praktijkscenario’s.',
      lead: 'Kies een branche en zie hoe IntelliCALL klanten te woord staat, systemen raadpleegt en taken uitvoert tijdens het gesprek.',
      tabsAria: 'Scenario’s per branche', replay: '↻ Opnieuw afspelen', note: 'De gesprekken zijn illustratieve scenario’s.',
      scen: {
        cc: { label: 'Contact center', title: 'Order opzoeken en upgraden naar spoedlevering', sub: 'Contact center · Vietnamees',
          msgs: msgs('cc', ['Klant', 'IntelliCALL'], ['Mijn order DH2048 is al drie dagen te laat. Hoe kan dat?', 'Uw order ligt in ons magazijn in Da Nang. Zal ik hem omzetten naar spoedlevering vóór 11 uur morgenochtend?']),
          chips: ['CRM-opzoeking', 'Order bijgewerkt', 'Sms-bevestiging'] },
        mt: { label: 'Tolken bij vergaderingen', title: 'Nederlands-Vietnamees projectoverleg', sub: 'Spraakvertaling in twee richtingen NL ↔ VI',
          msgs: msgs('mt', ['Pieter · NL', 'Lan · VI'], ['→ VI: Mình có thể dời go-live sang ngày 15 không?', '→ NL: Ja, maar we moeten de UAT vóór vrijdag afronden.']),
          chips: ['Tolken in twee richtingen', 'Sprekerherkenning', 'Tweetalige notulen'] },
        tr: { label: 'Reizen en toerisme', title: 'Advies en reservering voor een tour Nha Trang – Da Lat', sub: 'Reizen · Vietnamees',
          msgs: msgs('tr', ['Klant', 'IntelliCALL'], ['Ik wil dit weekend een driedaagse tour voor 2 personen boeken.', 'Er is nog plaats op het vertrek van vrijdagochtend, met ophalen bij uw hotel om 7 uur. Zal ik 2 plaatsen voor u vasthouden?']),
          chips: ['Plaatsen vastgehouden', 'Bevestiging via Zalo'] },
        fb: { label: 'Restaurants en F&amp;B', title: 'Tafelreservering met vegetarische notitie', sub: 'F&amp;B · Engels',
          msgs: msgs('fb', ['Gast · EN', 'IntelliCALL']), chips: ['Reservering aangemaakt', 'Herinnering om 18:00'] },
        ht: { label: 'Hotels en resorts', title: 'Housekeepingverzoek in het Koreaans', sub: 'Hotel · Koreaans',
          msgs: msgs('ht', ['Gast · KR', 'IntelliCALL'], ['Mag ik nog twee handdoeken?', 'Natuurlijk, we brengen ze binnen 10 minuten naar uw kamer.']),
          chips: ['Housekeeping', 'Kamer 1205'] },
        cl: { label: 'Smart clinic', title: 'Tandartsafspraak verzetten', sub: 'Kliniek · Vietnamees',
          msgs: msgs('cl', ['Patiënt', 'IntelliCALL'], ['Ik wil mijn afspraak van donderdag naar volgende week verzetten.', 'Dokter Lâm heeft volgende week dinsdag om 9 uur nog plek. Zal ik die voor u vastleggen?']),
          chips: ['Afspraak bijgewerkt', 'Sms-herinnering 1 dag vooraf'] }
      }
    },
    s03: {
      label: '03 · BINNEN IN EEN GESPREK', title: '23:15, hotline van het resort. Niemand hoeft de telefoon te bemannen.',
      guest: 'Gast · EN', msgs: CALL3,
      behindT: 'Achter het gesprek',
      behind: [
        { t: 'Taalherkenning', d: 'Engels; schakelt over naar de bijbehorende servicecontext.' },
        { t: 'Intentie bepalen', d: 'Vervoer naar de luchthaven, plus ontbijtboxen voor onderweg.' },
        { t: 'Opzoeken in het PMS', d: 'Kamer 1208, naam van de gast, vertrekdatum.' },
        { t: 'Serviceverzoek aanmaken', d: 'Doorgezet naar Concierge en F&amp;B, de juiste afdelingen.' },
        { t: 'Melden en vastleggen', d: 'Sms-bevestiging, opgeslagen in CRM, positief sentiment.' }
      ],
      result: '<strong>Resultaat:</strong> het verzoek wordt volledig afgehandeld tijdens het gesprek; de nachtdienst ontvangt alleen nog gestandaardiseerde taken.'
    },
    s04: {
      label: '04 · TECHNOLOGIEPLATFORM', title: 'Van spraak naar actie, op één platform.',
      lead: 'Vanaf het moment dat een klant begint te praten tot de taak in uw systemen is uitgevoerd, draait elke stap op één en hetzelfde platform.',
      channelsT: 'INTAKEKANALEN', channels: ['Hotline / SIP', 'Websitewidget', 'Zalo OA', 'Apparaat op de kamer', 'Online vergaderingen'],
      systemsT: 'BEDRIJFSSYSTEMEN', systems: ['CRM', 'PMS / boekingen', 'Agenda', 'Sms / notificaties', 'Agent / supervisor'],
      stages: [
        { tag: 'ASR', t: 'Spraakherkenning', d: 'Meertalig en ruisbestendig, en bellers kunnen onderbreken (barge-in) zoals in een normaal gesprek.' },
        { tag: 'LLM + RAG', t: 'Begrijpen en redeneren', d: 'Bepaalt de intentie, haalt kennis uit uw organisatie op en stuurt het gesprek.' },
        { tag: 'API-INTEGRATIE', t: 'Actie en analyse', d: 'Roept CRM, PMS en agenda aan, analyseert sentiment en draagt over aan een medewerker met samenvatting.' },
        { tag: 'TTS', t: 'Fysiek gemodelleerde stem', d: 'Antwoordt via een 3D-model van een kunstmatig strottenhoofd, ontwikkeld door Infodation R&amp;D.' }
      ],
      know: '<strong>U houdt de regie over de kennis.</strong> Diensten, beleid, prijslijsten en FAQ’s worden door uw organisatie aangeleverd en beheerd, zodat antwoorden altijd aansluiten op de officiële informatie.',
      feats: [
        { t: 'Sentimentanalyse', d: 'Elk gesprek krijgt direct een score, zodat ontevreden klanten vroeg worden opgemerkt.' },
        { t: 'Transcript en samenvatting', d: 'Een doorzoekbaar verslag van elk gesprek, met een samenvatting van de kernpunten.' },
        { t: 'Doorverbinden met een medewerker', d: 'Is er een mens nodig, dan gaat het gesprek met volledige context naar uw team.' }
      ]
    },
    s05: {
      label: '05 · HET VERSCHIL', title: 'Een fysiek gemodelleerde stem.',
      lead: 'In plaats van een neuraal netwerk elk audiosample direct te laten voorspellen, simuleert IntelliCALL hoe mensen werkelijk spraak voortbrengen. Zo kleurt de stem natuurlijk mee met inhoud en emotie.',
      chainAT: 'TRADITIONELE NEURALE TTS', chainBT: 'INTELLICALL',
      chainA: [
        { t: 'Invoertekst', d: 'voor te lezen tekst' },
        { t: 'Akoestisch model', d: 'Tacotron, FastSpeech' },
        { t: 'Mel-spectrogram', d: 'spectrale kenmerken' },
        { t: 'Neurale vocoder', d: 'WaveNet, HiFi-GAN' },
        { t: 'Audio', d: 'gevoelig voor faseruis' }
      ],
      chainB: [
        { t: 'Tekst + intonatie', d: 'intonatiedoelen' },
        { t: 'Kinematic mapping', d: 'compact neuraal netwerk' },
        { t: 'Fysieke parameters', d: 'druk, spanning, vorm' },
        { t: '3D-strottenhoofd', d: 'fysieke simulatie' },
        { t: 'Natuurlijke stem', d: 'rijk aan nuance' }
      ],
      tonesT: 'Een expressieve stem die zich aanpast aan de context:', tones: ['Vrolijk', 'Empathisch', 'Serieus', 'Ademhaling, heesheid'],
      stats: [
        { v: '−38%', d: 'end-to-end latentie van spraaksynthese (interne test, 2026)' },
        { v: 'Minder fasevervorming', d: 'duidelijk minder van de faseruis die typisch is voor neurale vocoders' },
        { v: 'Stabiel', d: 'in drukke, rumoerige omgevingen (ITE HCMC 2026)' }
      ],
      note: 'Cijfers uit interne tests van het R&amp;D-team van Infodation. Resultaten op uw eigen scenario’s en infrastructuur worden gemeten en bevestigd tijdens de pilot.'
    },
    s06: {
      label: '06 · BEWEZEN IN DE PRAKTIJK', title: 'Meer dan een demo.',
      iteT: 'GEDEMONSTREERD OP ITE HCMC 2026', iteX: 'bezoekers meldden zich na een live demonstratie aan voor meer informatie, terwijl het systeem stabiel draaide op een drukke beurs.',
      dailyT: 'DAGELIJKS IN GEBRUIK BIJ INFODATION', dailyH: 'Tolken bij Nederlands-Vietnamese vergaderingen', dailyX: 'binnen ons One Team-model.',
      link: 'Probeer het nu op infodation.ai/intellicall'
    },
    s07: {
      label: '07 · DATABEVEILIGING', title: 'Uw gesprekken zijn eigendom van uw organisatie.',
      items: [
        { t: 'ISO/IEC 27001:2022', d: 'Managementsysteem voor informatiebeveiliging, jaarlijks geaudit door TÜV NORD.' },
        { t: 'Eerst een NDA', d: 'We tekenen een geheimhoudingsovereenkomst voordat we gespreksdata ontvangen.' },
        { t: 'On-premise implementatie', d: 'Kan op uw eigen infrastructuur draaien; voorbeelddata wordt na de pilot op verzoek verwijderd.' }
      ]
    },
    s08: {
      label: '08 · ZO WERKEN WIJ', title: 'Klein beginnen, gemeten op uw eigen gesprekken.',
      steps: [
        { t: '1 · Verkennen', time: '1 WEEK', d: 'Analyse van uw gespreksscenario’s, kennis en bestaande systemen, een nulmeting van de kerncijfers en een demo op uw eigen processen.' },
        { t: '2 · Pilot', time: '2–4 WEKEN', d: 'Draait op één kanaal of één scenario, beoordeeld op de afgesproken KPI’s.' },
        { t: '3 · Opschalen', time: 'OP BASIS VAN SCOPE', d: 'Meer scenario’s, kanalen en integraties, met training en operationele ondersteuning.' }
      ],
      kpis: [
        { t: 'Zelfafhandelingsgraad', d: 'Aandeel gesprekken dat IntelliCALL volledig afhandelt zonder medewerker.' },
        { t: 'Percentage gemiste gesprekken', d: 'Aandeel inkomende gesprekken dat niet wordt beantwoord.' },
        { t: 'Wachttijd', d: 'Hoe lang bellers wachten voordat ze te woord worden gestaan.' },
        { t: 'Afhandeltijd (AHT)', d: 'Gemiddelde tijd om een gesprek van begin tot eind af te handelen.' },
        { t: 'CSAT', d: 'Klanttevredenheidsscore, verzameld na het gesprek.' }
      ]
    },
    s09: {
      label: '09 · OPLOSSINGSPROFIEL', title: 'Neem het mee voor het hele team.',
      text: 'Het probleem, zes branchescenario’s, het technologieplatform, de fysiek gemodelleerde stem en de aanpak, samengevat in 9 pagina’s.',
      coverAlt: 'Omslag van het IntelliCALL-oplossingsprofiel', view: 'Online bekijken', download: 'PDF downloaden', request: 'Aanvragen per e-mail →',
      mailSubject: 'Oplossingsprofiel IntelliCALL',
      alsoProfile: 'Ook beschikbaar: bedrijfsprofiel Infodation Vietnam →'
    },
    cta: {
      label: 'VOLGENDE STAP', title1: 'Begin met', title2: '60 minuten.',
      lead: 'Eén sessie om uw huidige gesprekken te begrijpen en IntelliCALL uw eigen scenario’s te horen afhandelen. Daarna stuurt Infodation u een pilotvoorstel met concrete scope, KPI’s en kosten.',
      emailL: 'E-MAIL', phoneL: 'TELEFOON',
      formTitle: 'Plan 60 minuten', name: 'Volledige naam', email: 'Zakelijk e-mailadres', industry: 'Uw branche',
      industries: ['Contact center', 'Tolken bij vergaderingen', 'Reizen en toerisme', 'Restaurants en F&amp;B', 'Hotels en resorts', 'Smart clinic', 'Anders'],
      calls: 'Gesprekken per dag (schatting)', callsPh: 'bijv. 300 gesprekken',
      submit: 'Verstuur aanvraag', nda: 'We tekenen een NDA voordat we gespreksdata ontvangen.'
    }
  };
})();
