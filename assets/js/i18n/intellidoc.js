/* IntelliDOC page content (VI / EN / NL). VI is the design text verbatim; EN and NL are translations.
 * Invoice data values (serials, tax codes, company names) stay as on the sample documents.
 */
(function () {
  var D = window.IFD_I18N_DICT;

  D.vi.intellidoc = {
    metaDesc: 'IntelliDOC đọc hóa đơn, hợp đồng, hồ sơ và nhiều loại chứng từ khác, lấy đúng các trường dữ liệu cần thiết, đối chiếu với chứng từ liên quan rồi đưa kết quả vào hệ thống của doanh nghiệp.',
    crumb: { aria: 'Breadcrumb', studio: 'AI STUDIO', sol: 'GIẢI PHÁP', cat: 'TÀI CHÍNH', name: 'INTELLIDOC' },
    eyebrowTag: 'HỒ SƠ GIẢI PHÁP', eyebrow: 'AI XỬ LÝ CHỨNG TỪ',
    h1: 'IntelliDOC',
    sub: 'Đọc, trích xuất và đối chiếu chứng từ, thay cho nhập liệu thủ công.',
    lead: 'IntelliDOC đọc hóa đơn, hợp đồng, hồ sơ và nhiều loại chứng từ khác, lấy đúng các trường dữ liệu cần thiết, đối chiếu với chứng từ liên quan rồi đưa kết quả vào hệ thống của doanh nghiệp.',
    heroDemo: 'Dùng thử ngay', heroProfile: 'Hồ sơ giải pháp',
    inv: {
      title: 'HÓA ĐƠN GIÁ TRỊ GIA TĂNG', dateL: 'Ngày', date: '12 tháng 09 năm 2026', serialL: 'Ký hiệu', noL: 'Số',
      sellerL: 'Đơn vị bán:', seller: 'Công ty TNHH Dịch vụ ABC', taxL: 'Mã số thuế:', addr: 'Địa chỉ: 12 Lê Lợi, Quận 1, TP. Hồ Chí Minh',
      cols: ['Hàng hóa, dịch vụ', 'SL', 'Đơn giá', 'Thành tiền'],
      rows: [['Dịch vụ vệ sinh văn phòng', '1', '8.000.000', '8.000.000'], ['Vật tư tiêu hao', '1', '4.000.000', '4.000.000']],
      vatL: 'Thuế GTGT 8%:', vat: '960.000', totalL: 'Tổng cộng:', total: '12.960.000',
      stamp: 'ĐÃ ĐỐI CHIẾU', fieldsH: 'TRƯỜNG TRÍCH XUẤT', confH: 'ĐỘ TIN CẬY',
      extracted: [['Số hóa đơn', '0002231'], ['Mã số thuế', '0312345678'], ['Tổng tiền', '12.960.000']]
    },
    stats: [
      { v: '7–10×', l: 'nhanh hơn cho mỗi hóa đơn' },
      { v: '8.373 giờ', n: 8373, s: ' giờ', l: 'tiết kiệm mỗi năm tại một khách hàng' },
      { v: '97–99%', l: 'độ chính xác trích xuất trên hơn 5.000 hóa đơn mẫu' },
      { v: '6 quốc gia', n: 6, s: ' quốc gia', l: 'đã triển khai' }
    ],
    problem: {
      label: '01 · BÀI TOÁN', titleA: 'Hàng nghìn chứng từ, ', titleB: 'nhập tay từng dòng.',
      lead: 'Mỗi hóa đơn phải gõ lại, kiểm tra mã số thuế, đối chiếu với đơn hàng. Làm thủ công vừa chậm vừa dễ sai, và chi phí tăng theo khối lượng chứng từ.',
      manualL: 'THỦ CÔNG', manualV: '8 bước', manualX: '210–300 giây mỗi hóa đơn',
      withL: 'VỚI INTELLIDOC', withV: '3 bước', withX: 'Tải lên, kiểm tra, lưu · dưới 30 giây',
      points: [
        { t: 'AI làm phần lặp lại', x: 'Đọc, gõ và đối chiếu hàng nghìn chứng từ.' },
        { t: 'Con người kiểm soát', x: 'Chỉ xem lại các trường AI chưa chắc chắn.' },
        { t: 'Kết quả nhất quán', x: 'Cùng một chuẩn, không phụ thuộc người làm.' }
      ]
    },
    how: {
      label: '02 · CÁCH HOẠT ĐỘNG', title: 'IntelliDOC xử lý một chứng từ thế nào.',
      steps: [
        { t: 'Tiếp nhận', d: 'Ảnh chụp, PDF hoặc bản scan, gửi từ điện thoại, email hay hệ thống.' },
        { t: 'Đọc và nhận diện', d: 'Nhận diện loại chứng từ và vùng dữ liệu, kể cả khi mỗi nơi một mẫu.' },
        { t: 'Trích xuất', d: 'Lấy đúng các trường cần thiết: số hóa đơn, ngày, mã số thuế, tổng tiền.' },
        { t: 'Đối chiếu', d: 'So với đơn đặt hàng, phiếu nhận hàng và quy tắc nghiệp vụ, cảnh báo khi lệch.' },
        { t: 'Đưa vào hệ thống', d: 'Dữ liệu JSON chuẩn hóa, đưa vào ERP hoặc ứng dụng nội bộ qua API.' }
      ]
    },
    demo: {
      label: '03 · DÙNG THỬ NGAY', title: 'Chọn một chứng từ, xem AI xử lý.',
      lead: 'AI trích xuất các trường dữ liệu kèm độ tin cậy. Trường nào AI chưa chắc chắn sẽ được đánh dấu để người kiểm tra.',
      tabsAria: 'Chứng từ mẫu', sample: 'dữ liệu minh họa', resultT: 'Kết quả trích xuất',
      notRun: 'Chưa chạy', status: 'Đã trích xuất {n} trường · {p} cần kiểm tra', sent: '✓ Đã gửi dữ liệu vào ERP qua API (mô phỏng)',
      prompt: 'Bấm để IntelliDOC đọc chứng từ bên trái.', run: 'Chạy IntelliDOC',
      confirm: 'Xác nhận', handled: 'Đã xử lý', reviewed: '✓ Đã xem',
      retry: 'Thử lại', save: 'Lưu vào ERP →', saved: '✓ Đã lưu vào ERP', needConfirm: 'Xác nhận trường cần kiểm tra',
      ctaText: 'Muốn thấy IntelliDOC xử lý <strong>chứng từ của chính bạn</strong>?', ctaBtn: 'Đặt buổi demo 60 phút',
      docs: {
        inv: { label: 'Hóa đơn GTGT', title: 'HÓA ĐƠN GIÁ TRỊ GIA TĂNG',
          json: '{ "loai": "hoa_don", "ky_hieu": "1C26TAA", "so": "0002231",\n  "mst_ban": "0312345678", "thue_suat": 0.08, "tong_tien": 12960000 }',
          fields: [['Ký hiệu', '1C26TAA'], ['Số hóa đơn', '0002231'], ['Ngày', '12/09/2026'], ['Đơn vị bán', 'Công ty TNHH Dịch vụ ABC'], ['Mã số thuế', '0312 345 678'], ['Thuế suất', '8%'], ['Tổng tiền', '12.960.000 đ']] },
        con: { label: 'Hợp đồng', title: 'HỢP ĐỒNG DỊCH VỤ',
          json: '{ "loai": "hop_dong", "ngay_het_han": "2027-03-31",\n  "gia_tri": 1250000000, "can_kiem_tra": ["phu_luc_02"] }',
          fields: [['Loại hợp đồng', 'Hợp đồng dịch vụ'], ['Giá trị', '1.250.000.000 đ'], ['Ngày hiệu lực', '01/04/2026'], ['Ngày hết hạn', '31/03/2027'], ['Phụ lục 02', 'Điều chỉnh đơn giá']] },
        match: { label: 'Đối chiếu 3 chứng từ', title: 'HÓA ĐƠN · ĐƠN ĐẶT HÀNG · PHIẾU NHẬN HÀNG',
          json: '{ "doi_chieu": "lech", "ma_hang": "VT-0187",\n  "chenh_lech_so_luong": 2, "trang_thai": "cho_duyet" }',
          fields: [['Mã hàng', 'VT-0187 · Giấy A4'], ['Số lượng trên đơn đặt hàng', '120 thùng'], ['Số lượng trên phiếu nhận', '118 thùng'], ['Số lượng trên hóa đơn', '120 thùng'], ['Kết quả đối chiếu', 'Lệch 2 thùng']] }
      }
    },
    uses: {
      label: '04 · ỨNG DỤNG THEO PHÒNG BAN', title: 'Bắt đầu từ một nghiệp vụ, rồi mở rộng.',
      lead: 'Mỗi phòng ban có bộ trường dữ liệu và quy trình riêng. IntelliDOC được cấu hình theo nhu cầu thực tế, thay vì áp một mẫu chung cho tất cả.',
      now: 'Hiện tại:', with: 'Với IntelliDOC:', measured: 'THỰC TẾ ĐO ĐƯỢC', pilot: 'ĐO TRONG PILOT',
      cases: [
        { dept: 'Kế toán – Tài chính', title: 'Hóa đơn chi phí nhân viên', now: 'Hóa đơn ăn uống, taxi, tiếp khách nộp bằng giấy hoặc ảnh, kế toán phải nhập tay và kiểm tra mã số thuế.', with: 'Nhân viên chụp hóa đơn, IntelliDOC đọc số hóa đơn, ngày, mã số thuế, tổng tiền và gửi qua API vào quy trình thanh toán.', result: 'hơn 210 giây → dưới 30 giây mỗi hóa đơn' },
        { dept: 'Kế toán phải trả', title: 'Hóa đơn nhà cung cấp nhiều mẫu', now: 'Hàng trăm nhà cung cấp, mỗi nơi một mẫu hóa đơn, rule phải cập nhật mỗi khi có mẫu mới.', with: 'AI tự nhận diện và trích xuất các trường cần thiết từ mọi mẫu, không cần viết thêm rule.', result: 'hơn 300 giây → dưới 30 giây mỗi hóa đơn' },
        { dept: 'Mua hàng – Tài chính', title: 'Đối chiếu hóa đơn với đơn đặt hàng', now: 'Sai lệch số lượng, đơn giá giữa hóa đơn, PO và phiếu nhận hàng thường chỉ được phát hiện sau khi đã thanh toán.', with: 'Tự động đối chiếu ba chứng từ và cảnh báo người phụ trách trước khi phê duyệt.', result: 'số sai lệch phát hiện được, thời gian đối chiếu' },
        { dept: 'Pháp chế – Hành chính', title: 'Theo dõi thời hạn hợp đồng', now: 'Hợp đồng và phụ lục nằm rải rác, ngày hết hạn và nghĩa vụ dễ bị bỏ sót.', with: 'Trích xuất thời hạn, ngày hết hạn, giá trị và nghĩa vụ, nhắc trước khi đến hạn gia hạn.', result: 'số hợp đồng được số hóa, độ chính xác trích xuất' },
        { dept: 'Xuất nhập khẩu – Logistics', title: 'Chứng từ xuất nhập khẩu đa ngôn ngữ', now: 'Vận đơn, tờ khai hải quan, C/O đến từ nhiều đối tác, bằng nhiều ngôn ngữ, nhập tay chậm và dễ sai.', with: 'Trích xuất từ nhiều định dạng, nhiều ngôn ngữ và đưa vào hệ thống theo đúng cấu trúc cần thiết.', result: 'độ chính xác trích xuất, thời gian xử lý' }
      ]
    },
    proven: {
      label: '05 · KINH NGHIỆM THỰC TẾ', title: 'Số liệu thật từ một dự án đang vận hành.',
      lead: 'Khách hàng là một doanh nghiệp có đội ngũ 3.000 nhân viên kinh doanh. Số liệu do chính khách hàng đo trước và sau khi đưa IntelliDOC vào vận hành.',
      barsAT: 'Thời gian xử lý mỗi hóa đơn', barsBT: 'Tổng giờ xử lý mỗi năm (2025)',
      barsA: [
        { label: 'Hóa đơn chi phí nhân viên', before: 'hơn 210 giây', after: 'dưới 30 giây' },
        { label: 'Hóa đơn nhà cung cấp', before: 'hơn 300 giây', after: 'dưới 30 giây' }
      ],
      barsB: [
        { label: 'Hóa đơn chi phí nhân viên', before: '4.605 giờ', after: '657 giờ' },
        { label: 'Hóa đơn nhà cung cấp', before: '4.916 giờ', after: '491 giờ' }
      ],
      saveL: 'TIẾT KIỆM MỖI NĂM', saveV: '8.373 giờ', saveS: ' giờ',
      saveX: 'Nhanh hơn 7–10 lần cho mỗi hóa đơn. Thao tác giảm từ 8 bước còn 3 bước, đồng thời bổ sung thêm các trường dữ liệu mà các bộ phận cần.',
      facts: [
        { v: '97–99%', l: 'độ chính xác trích xuất, đo trên hơn 5.000 hóa đơn mẫu' },
        { v: '~5 giây', l: 'thời gian AI xử lý một hóa đơn, chưa gồm bước người kiểm tra' },
        { v: 'Hàng nghìn', l: 'yêu cầu đồng thời đã được kiểm thử' }
      ],
      countriesL: 'Đã triển khai tại 6 quốc gia:',
      countries: ['Việt Nam', 'Philippines', 'Hàn Quốc', 'Campuchia', 'Myanmar', 'Ấn Độ']
    },
    work: {
      label: '06 · CÁCH CHÚNG TÔI LÀM VIỆC', title: 'Bắt đầu nhỏ, đo trên chứng từ thật.',
      phases: [
        { t: 'Khám phá', time: '1–2 tuần', x: 'Tìm hiểu quy trình và hệ thống hiện tại, xem chứng từ thật, xác định dữ liệu cần lấy.' },
        { t: 'Pilot', time: '3–4 tuần', x: 'Chạy trên dữ liệu thật theo phạm vi đã thống nhất, đo độ chính xác và thời gian xử lý.' },
        { t: 'Triển khai', time: 'Sau pilot', x: 'Tích hợp vào hệ thống và ứng dụng, đào tạo, hỗ trợ và mở rộng phạm vi.' }
      ],
      kpiT: 'KPI đo trong pilot',
      kpis: [
        { t: 'Độ chính xác từng trường', x: 'Tỷ lệ trường được trích xuất đúng so với chứng từ gốc.' },
        { t: 'Thời gian xử lý mỗi chứng từ', x: 'Từ lúc tải lên đến khi dữ liệu được lưu vào hệ thống.' },
        { t: 'Tỷ lệ trường cần người kiểm tra', x: 'Phần trăm trường AI chưa đủ chắc chắn.' },
        { t: 'Giờ công tiết kiệm', x: 'So sánh trước và sau, trên cùng khối lượng chứng từ.' }
      ]
    },
    security: {
      label: '07 · BẢO MẬT DỮ LIỆU', title: 'Chứng từ là tài sản của doanh nghiệp.',
      items: [
        { t: 'ISO/IEC 27001:2022', x: 'Hệ thống quản lý an toàn thông tin được TÜV NORD đánh giá định kỳ hằng năm.' },
        { t: 'Ký NDA trước khi nhận dữ liệu', x: 'Thỏa thuận bảo mật được ký trước khi Infodation tiếp nhận bất kỳ chứng từ nào.' },
        { t: 'Triển khai on-premise', x: 'Có phương án cài đặt trên hạ tầng của khách hàng, dữ liệu mẫu được xóa sau pilot theo yêu cầu.' }
      ]
    },
    profile: {
      label: '08 · HỒ SƠ GIẢI PHÁP', title: 'Mang về cho cả đội cùng xem.',
      text: 'Bài toán, cách hoạt động, ứng dụng theo phòng ban, số liệu thực tế và cam kết bảo mật, gói gọn trong 9 trang.',
      view: 'Xem online', download: 'Tải PDF', request: 'Yêu cầu qua email', mailSubject: 'Hồ sơ giải pháp IntelliDOC',
      also: 'Kèm theo: Hồ sơ năng lực Infodation Việt Nam →', coverAlt: 'Bìa hồ sơ giải pháp IntelliDOC'
    },
    cta: {
      label: 'BƯỚC TIẾP THEO', titleA: 'Bắt đầu với', titleB: '60 phút.',
      lead: 'Một buổi trao đổi để hiểu quy trình xử lý chứng từ hiện tại và xem IntelliDOC xử lý chính chứng từ mẫu của doanh nghiệp. Sau đó, Infodation gửi đề xuất pilot với phạm vi, KPI và chi phí cụ thể.',
      emailL: 'EMAIL', phoneL: 'ĐIỆN THOẠI'
    },
    form: {
      title: 'Đặt lịch 60 phút', name: 'Họ và tên', email: 'Email công ty', doctype: 'Loại chứng từ cần xử lý',
      types: ['Hóa đơn chi phí nhân viên', 'Hóa đơn nhà cung cấp', 'Đối chiếu hóa đơn – đơn đặt hàng', 'Hợp đồng', 'Chứng từ xuất nhập khẩu', 'Khác'],
      volume: 'Khối lượng mỗi tháng (ước tính)', volumePh: 'ví dụ: 2.000 hóa đơn',
      submit: 'Gửi yêu cầu', note: 'Ký NDA trước khi tiếp nhận bất kỳ chứng từ nào.'
    }
  };

  D.en.intellidoc = {
    metaDesc: 'IntelliDOC reads invoices, contracts, records and many other business documents, extracts exactly the fields you need, checks them against related documents and delivers the result into your company systems.',
    crumb: { aria: 'Breadcrumb', studio: 'AI STUDIO', sol: 'SOLUTIONS', cat: 'FINANCE', name: 'INTELLIDOC' },
    eyebrowTag: 'SOLUTION PROFILE', eyebrow: 'DOCUMENT PROCESSING AI',
    h1: 'IntelliDOC',
    sub: 'Reads, extracts and matches documents, instead of manual data entry.',
    lead: 'IntelliDOC reads invoices, contracts, records and many other business documents, extracts exactly the fields you need, checks them against related documents and delivers the result into your company systems.',
    heroDemo: 'Try it now', heroProfile: 'Solution profile',
    inv: {
      title: 'VAT INVOICE', dateL: 'Date', date: '12 September 2026', serialL: 'Serial', noL: 'No.',
      sellerL: 'Seller:', seller: 'Công ty TNHH Dịch vụ ABC', taxL: 'Tax code:', addr: 'Address: 12 Le Loi, District 1, Ho Chi Minh City',
      cols: ['Goods, services', 'Qty', 'Unit price', 'Amount'],
      rows: [['Office cleaning service', '1', '8,000,000', '8,000,000'], ['Consumables', '1', '4,000,000', '4,000,000']],
      vatL: 'VAT 8%:', vat: '960,000', totalL: 'Total:', total: '12,960,000',
      stamp: 'MATCHED', fieldsH: 'EXTRACTED FIELD', confH: 'CONFIDENCE',
      extracted: [['Invoice no.', '0002231'], ['Tax code', '0312345678'], ['Total', '12,960,000']]
    },
    stats: [
      { v: '7–10×', l: 'faster per invoice' },
      { v: '8,373 hours', n: 8373, s: ' hours', l: 'saved per year at a single client' },
      { v: '97–99%', l: 'extraction accuracy across more than 5,000 sample invoices' },
      { v: '6 countries', n: 6, s: ' countries', l: 'in production' }
    ],
    problem: {
      label: '01 · THE PROBLEM', titleA: 'Thousands of documents, ', titleB: 'typed in line by line.',
      lead: 'Every invoice has to be retyped, its tax code checked and matched against the order. Doing it by hand is slow and error-prone, and the cost grows with every extra document.',
      manualL: 'MANUAL', manualV: '8 steps', manualX: '210–300 seconds per invoice',
      withL: 'WITH INTELLIDOC', withV: '3 steps', withX: 'Upload, review, save · under 30 seconds',
      points: [
        { t: 'AI does the repetitive work', x: 'Reading, typing and matching thousands of documents.' },
        { t: 'People stay in control', x: 'They only review the fields the AI is unsure about.' },
        { t: 'Consistent results', x: 'One standard, whoever does the work.' }
      ]
    },
    how: {
      label: '02 · HOW IT WORKS', title: 'How IntelliDOC handles a document.',
      steps: [
        { t: 'Intake', d: 'Photos, PDFs or scans, sent from a phone, by email or from another system.' },
        { t: 'Read and recognise', d: 'Identifies the document type and data regions, even when every supplier uses its own layout.' },
        { t: 'Extract', d: 'Picks out exactly the fields you need: invoice number, date, tax code, total.' },
        { t: 'Match', d: 'Checks against the purchase order, goods receipt and business rules, and flags any mismatch.' },
        { t: 'Deliver to your systems', d: 'Normalised JSON data, sent to your ERP or internal applications via API.' }
      ]
    },
    demo: {
      label: '03 · TRY IT NOW', title: 'Pick a document, watch the AI work.',
      lead: 'The AI extracts each data field with a confidence score. Any field it is not sure about is flagged for a person to check.',
      tabsAria: 'Sample documents', sample: 'sample data', resultT: 'Extraction result',
      notRun: 'Not run yet', status: '{n} fields extracted · {p} to review', sent: '✓ Data sent to the ERP via API (simulated)',
      prompt: 'Click to let IntelliDOC read the document on the left.', run: 'Run IntelliDOC',
      confirm: 'Confirm', handled: 'Handled', reviewed: '✓ Reviewed',
      retry: 'Try again', save: 'Save to ERP →', saved: '✓ Saved to ERP', needConfirm: 'Confirm the flagged fields',
      ctaText: 'Want to see IntelliDOC handle <strong>your own documents</strong>?', ctaBtn: 'Book a 60-minute demo',
      docs: {
        inv: { label: 'VAT invoice', title: 'VAT INVOICE',
          json: '{ "type": "invoice", "serial": "1C26TAA", "number": "0002231",\n  "seller_tax_code": "0312345678", "vat_rate": 0.08, "total": 12960000 }',
          fields: [['Serial', '1C26TAA'], ['Invoice no.', '0002231'], ['Date', '12/09/2026'], ['Seller', 'Công ty TNHH Dịch vụ ABC'], ['Tax code', '0312 345 678'], ['VAT rate', '8%'], ['Total', '12,960,000 VND']] },
        con: { label: 'Contract', title: 'SERVICE CONTRACT',
          json: '{ "type": "contract", "expiry_date": "2027-03-31",\n  "value": 1250000000, "needs_review": ["annex_02"] }',
          fields: [['Contract type', 'Service contract'], ['Value', '1,250,000,000 VND'], ['Effective date', '01/04/2026'], ['Expiry date', '31/03/2027'], ['Annex 02', 'Unit price adjustment']] },
        match: { label: '3-way match', title: 'INVOICE · PURCHASE ORDER · GOODS RECEIPT',
          json: '{ "match": "mismatch", "item_code": "VT-0187",\n  "quantity_difference": 2, "status": "pending_approval" }',
          fields: [['Item code', 'VT-0187 · A4 paper'], ['Quantity on purchase order', '120 boxes'], ['Quantity on goods receipt', '118 boxes'], ['Quantity on invoice', '120 boxes'], ['Match result', '2 boxes short']] }
      }
    },
    uses: {
      label: '04 · USE CASES BY DEPARTMENT', title: 'Start with one process, then scale.',
      lead: 'Every department has its own data fields and workflow. IntelliDOC is configured around how you actually work, rather than forcing one template on everyone.',
      now: 'Today:', with: 'With IntelliDOC:', measured: 'MEASURED IN PRODUCTION', pilot: 'MEASURED IN PILOT',
      cases: [
        { dept: 'Accounting – Finance', title: 'Employee expense invoices', now: 'Meal, taxi and entertainment receipts arrive on paper or as photos; accountants type them in and check every tax code by hand.', with: 'Employees snap the invoice; IntelliDOC reads the invoice number, date, tax code and total and sends them via API into the payment workflow.', result: 'over 210 seconds → under 30 seconds per invoice' },
        { dept: 'Accounts payable', title: 'Supplier invoices in many layouts', now: 'Hundreds of suppliers, each with its own invoice layout; rules must be updated whenever a new layout appears.', with: 'The AI recognises any layout and extracts the required fields, with no extra rules to write.', result: 'over 300 seconds → under 30 seconds per invoice' },
        { dept: 'Purchasing – Finance', title: 'Matching invoices with purchase orders', now: 'Quantity and price differences between invoice, PO and goods receipt are often only found after payment.', with: 'Automatically matches all three documents and alerts the owner before approval.', result: 'discrepancies caught, matching time' },
        { dept: 'Legal – Administration', title: 'Tracking contract deadlines', now: 'Contracts and annexes are scattered; expiry dates and obligations are easily missed.', with: 'Extracts terms, expiry dates, values and obligations, and sends a reminder before renewal is due.', result: 'contracts digitised, extraction accuracy' },
        { dept: 'Import–export – Logistics', title: 'Multilingual trade documents', now: 'Bills of lading, customs declarations and certificates of origin arrive from many partners in many languages; manual entry is slow and error-prone.', with: 'Extracts from many formats and languages and loads the data into your systems in exactly the structure you need.', result: 'extraction accuracy, processing time' }
      ]
    },
    proven: {
      label: '05 · PROVEN IN PRACTICE', title: 'Real numbers from a live project.',
      lead: 'The client is a company with a sales force of 3,000 people. The figures were measured by the client itself, before and after putting IntelliDOC into production.',
      barsAT: 'Processing time per invoice', barsBT: 'Total processing hours per year (2025)',
      barsA: [
        { label: 'Employee expense invoices', before: 'over 210 seconds', after: 'under 30 seconds' },
        { label: 'Supplier invoices', before: 'over 300 seconds', after: 'under 30 seconds' }
      ],
      barsB: [
        { label: 'Employee expense invoices', before: '4,605 hours', after: '657 hours' },
        { label: 'Supplier invoices', before: '4,916 hours', after: '491 hours' }
      ],
      saveL: 'SAVED PER YEAR', saveV: '8,373 hours', saveS: ' hours',
      saveX: '7–10 times faster per invoice. Steps reduced from 8 to 3, while capturing additional data fields the departments need.',
      facts: [
        { v: '97–99%', l: 'extraction accuracy, measured on more than 5,000 sample invoices' },
        { v: '~5 seconds', l: 'AI processing time per invoice, excluding human review' },
        { v: 'Thousands', l: 'of concurrent requests tested' }
      ],
      countriesL: 'In production in 6 countries:',
      countries: ['Vietnam', 'Philippines', 'South Korea', 'Cambodia', 'Myanmar', 'India']
    },
    work: {
      label: '06 · HOW WE WORK', title: 'Start small, measure on real documents.',
      phases: [
        { t: 'Discovery', time: '1–2 weeks', x: 'Understand your current process and systems, look at real documents, define the data to capture.' },
        { t: 'Pilot', time: '3–4 weeks', x: 'Run on real data within the agreed scope, measuring accuracy and processing time.' },
        { t: 'Roll-out', time: 'After the pilot', x: 'Integration into your systems and applications, training, support and a wider scope.' }
      ],
      kpiT: 'KPIs measured in the pilot',
      kpis: [
        { t: 'Field-level accuracy', x: 'Share of fields extracted correctly compared with the source document.' },
        { t: 'Processing time per document', x: 'From upload until the data is saved in your system.' },
        { t: 'Share of fields needing review', x: 'Percentage of fields the AI is not confident enough about.' },
        { t: 'Working hours saved', x: 'Before versus after, on the same document volume.' }
      ]
    },
    security: {
      label: '07 · DATA SECURITY', title: 'Your documents are your company’s assets.',
      items: [
        { t: 'ISO/IEC 27001:2022', x: 'Information security management system audited annually by TÜV NORD.' },
        { t: 'NDA signed before we receive data', x: 'A non-disclosure agreement is signed before Infodation receives a single document.' },
        { t: 'On-premise deployment', x: 'Can be installed on your own infrastructure; sample data is deleted after the pilot on request.' }
      ]
    },
    profile: {
      label: '08 · SOLUTION PROFILE', title: 'Take it back to your team.',
      text: 'The problem, how it works, use cases by department, real-world results and our security commitments, all in 9 pages.',
      view: 'View online', download: 'Download PDF', request: 'Request by email', mailSubject: 'IntelliDOC solution profile',
      also: 'Also included: Infodation Vietnam company profile →', coverAlt: 'IntelliDOC solution profile cover'
    },
    cta: {
      label: 'NEXT STEP', titleA: 'Start with', titleB: '60 minutes.',
      lead: 'One conversation to understand how you process documents today, and to watch IntelliDOC handle your own sample documents. Afterwards, Infodation sends a pilot proposal with a concrete scope, KPIs and cost.',
      emailL: 'EMAIL', phoneL: 'PHONE'
    },
    form: {
      title: 'Book 60 minutes', name: 'Full name', email: 'Work email', doctype: 'Documents to process',
      types: ['Employee expense invoices', 'Supplier invoices', 'Invoice – purchase order matching', 'Contracts', 'Import–export documents', 'Other'],
      volume: 'Monthly volume (estimate)', volumePh: 'e.g. 2,000 invoices',
      submit: 'Send request', note: 'We sign an NDA before receiving any document.'
    }
  };

  D.nl.intellidoc = {
    metaDesc: 'IntelliDOC leest facturen, contracten, dossiers en vele andere documenten, haalt precies de benodigde velden eruit, controleert ze tegen bijbehorende documenten en zet het resultaat direct in uw bedrijfssystemen.',
    crumb: { aria: 'Kruimelpad', studio: 'AI STUDIO', sol: 'OPLOSSINGEN', cat: 'FINANCE', name: 'INTELLIDOC' },
    eyebrowTag: 'OPLOSSINGSPROFIEL', eyebrow: 'AI VOOR DOCUMENTVERWERKING',
    h1: 'IntelliDOC',
    sub: 'Leest, extraheert en matcht documenten, in plaats van handmatig invoeren.',
    lead: 'IntelliDOC leest facturen, contracten, dossiers en vele andere documenten, haalt precies de benodigde velden eruit, controleert ze tegen bijbehorende documenten en zet het resultaat direct in uw bedrijfssystemen.',
    heroDemo: 'Probeer het nu', heroProfile: 'Oplossingsprofiel',
    inv: {
      title: 'BTW-FACTUUR', dateL: 'Datum', date: '12 september 2026', serialL: 'Reeks', noL: 'Nr.',
      sellerL: 'Verkoper:', seller: 'Công ty TNHH Dịch vụ ABC', taxL: 'Btw-nummer:', addr: 'Adres: 12 Le Loi, District 1, Ho Chi Minhstad',
      cols: ['Goederen, diensten', 'Aantal', 'Prijs', 'Bedrag'],
      rows: [['Kantoorschoonmaak', '1', '8.000.000', '8.000.000'], ['Verbruiksartikelen', '1', '4.000.000', '4.000.000']],
      vatL: 'Btw 8%:', vat: '960.000', totalL: 'Totaal:', total: '12.960.000',
      stamp: 'GEMATCHT', fieldsH: 'GEËXTRAHEERD VELD', confH: 'BETROUWBAARHEID',
      extracted: [['Factuurnr.', '0002231'], ['Btw-nummer', '0312345678'], ['Totaal', '12.960.000']]
    },
    stats: [
      { v: '7–10×', l: 'sneller per factuur' },
      { v: '8.373 uur', n: 8373, s: ' uur', l: 'per jaar bespaard bij één klant' },
      { v: '97–99%', l: 'extractienauwkeurigheid op meer dan 5.000 voorbeeldfacturen' },
      { v: '6 landen', n: 6, s: ' landen', l: 'in productie' }
    ],
    problem: {
      label: '01 · HET VRAAGSTUK', titleA: 'Duizenden documenten, ', titleB: 'regel voor regel overgetypt.',
      lead: 'Elke factuur moet opnieuw worden ingetypt, het btw-nummer gecontroleerd en gematcht met de order. Handwerk is traag en foutgevoelig, en de kosten groeien mee met het aantal documenten.',
      manualL: 'HANDMATIG', manualV: '8 stappen', manualX: '210–300 seconden per factuur',
      withL: 'MET INTELLIDOC', withV: '3 stappen', withX: 'Uploaden, controleren, opslaan · binnen 30 seconden',
      points: [
        { t: 'AI doet het repetitieve werk', x: 'Duizenden documenten lezen, intypen en matchen.' },
        { t: 'Mensen houden de regie', x: 'Zij controleren alleen de velden waarover de AI twijfelt.' },
        { t: 'Consistente resultaten', x: 'Eén standaard, ongeacht wie het werk doet.' }
      ]
    },
    how: {
      label: '02 · HOE HET WERKT', title: 'Zo verwerkt IntelliDOC een document.',
      steps: [
        { t: 'Ontvangen', d: 'Foto’s, pdf’s of scans, verstuurd vanaf een telefoon, per e-mail of vanuit een ander systeem.' },
        { t: 'Lezen en herkennen', d: 'Herkent het documenttype en de datagebieden, ook als elke leverancier een eigen opmaak gebruikt.' },
        { t: 'Extraheren', d: 'Haalt precies de benodigde velden eruit: factuurnummer, datum, btw-nummer, totaalbedrag.' },
        { t: 'Matchen', d: 'Vergelijkt met inkooporder, ontvangstbon en bedrijfsregels, en waarschuwt bij afwijkingen.' },
        { t: 'Naar uw systemen', d: 'Genormaliseerde JSON-data, via API naar uw ERP of interne applicaties.' }
      ]
    },
    demo: {
      label: '03 · PROBEER HET NU', title: 'Kies een document, zie de AI aan het werk.',
      lead: 'De AI extraheert elk dataveld met een betrouwbaarheidsscore. Velden waarover de AI twijfelt, worden gemarkeerd zodat een mens ze controleert.',
      tabsAria: 'Voorbeelddocumenten', sample: 'voorbeelddata', resultT: 'Extractieresultaat',
      notRun: 'Nog niet uitgevoerd', status: '{n} velden geëxtraheerd · {p} te controleren', sent: '✓ Data via API naar het ERP verzonden (gesimuleerd)',
      prompt: 'Klik om IntelliDOC het document links te laten lezen.', run: 'Start IntelliDOC',
      confirm: 'Bevestigen', handled: 'Afgehandeld', reviewed: '✓ Gecontroleerd',
      retry: 'Opnieuw', save: 'Opslaan in ERP →', saved: '✓ Opgeslagen in ERP', needConfirm: 'Bevestig de gemarkeerde velden',
      ctaText: 'Wilt u IntelliDOC <strong>uw eigen documenten</strong> zien verwerken?', ctaBtn: 'Plan een demo van 60 minuten',
      docs: {
        inv: { label: 'Btw-factuur', title: 'BTW-FACTUUR',
          json: '{ "type": "invoice", "serial": "1C26TAA", "number": "0002231",\n  "seller_tax_code": "0312345678", "vat_rate": 0.08, "total": 12960000 }',
          fields: [['Reeks', '1C26TAA'], ['Factuurnummer', '0002231'], ['Datum', '12-09-2026'], ['Verkoper', 'Công ty TNHH Dịch vụ ABC'], ['Btw-nummer', '0312 345 678'], ['Btw-tarief', '8%'], ['Totaalbedrag', '12.960.000 VND']] },
        con: { label: 'Contract', title: 'DIENSTVERLENINGSOVEREENKOMST',
          json: '{ "type": "contract", "expiry_date": "2027-03-31",\n  "value": 1250000000, "needs_review": ["annex_02"] }',
          fields: [['Soort contract', 'Dienstverleningsovereenkomst'], ['Waarde', '1.250.000.000 VND'], ['Ingangsdatum', '01-04-2026'], ['Einddatum', '31-03-2027'], ['Bijlage 02', 'Aanpassing eenheidsprijs']] },
        match: { label: '3-wegmatch', title: 'FACTUUR · INKOOPORDER · ONTVANGSTBON',
          json: '{ "match": "mismatch", "item_code": "VT-0187",\n  "quantity_difference": 2, "status": "pending_approval" }',
          fields: [['Artikelcode', 'VT-0187 · A4-papier'], ['Aantal op inkooporder', '120 dozen'], ['Aantal op ontvangstbon', '118 dozen'], ['Aantal op factuur', '120 dozen'], ['Matchresultaat', '2 dozen verschil']] }
      }
    },
    uses: {
      label: '04 · TOEPASSINGEN PER AFDELING', title: 'Begin met één proces, breid daarna uit.',
      lead: 'Elke afdeling heeft eigen datavelden en werkprocessen. IntelliDOC wordt ingericht op hoe u echt werkt, in plaats van één sjabloon voor iedereen.',
      now: 'Nu:', with: 'Met IntelliDOC:', measured: 'GEMETEN IN PRODUCTIE', pilot: 'GEMETEN IN PILOT',
      cases: [
        { dept: 'Boekhouding – Finance', title: 'Declaratiefacturen van medewerkers', now: 'Bonnen voor maaltijden, taxi’s en representatie komen op papier of als foto binnen; de boekhouding typt ze over en controleert elk btw-nummer.', with: 'Medewerkers fotograferen de factuur; IntelliDOC leest factuurnummer, datum, btw-nummer en totaal en stuurt ze via API naar het betaalproces.', result: 'meer dan 210 seconden → minder dan 30 seconden per factuur' },
        { dept: 'Crediteurenadministratie', title: 'Leveranciersfacturen in vele opmaken', now: 'Honderden leveranciers met elk een eigen factuuropmaak; bij elke nieuwe opmaak moeten regels worden bijgewerkt.', with: 'De AI herkent elke opmaak en haalt de benodigde velden eruit, zonder extra regels te schrijven.', result: 'meer dan 300 seconden → minder dan 30 seconden per factuur' },
        { dept: 'Inkoop – Finance', title: 'Facturen matchen met inkooporders', now: 'Verschillen in aantal en prijs tussen factuur, inkooporder en ontvangstbon worden vaak pas na betaling ontdekt.', with: 'Matcht de drie documenten automatisch en waarschuwt de verantwoordelijke vóór goedkeuring.', result: 'gevonden afwijkingen, doorlooptijd van het matchen' },
        { dept: 'Juridisch – Administratie', title: 'Contracttermijnen bewaken', now: 'Contracten en bijlagen liggen verspreid; einddata en verplichtingen worden makkelijk gemist.', with: 'Extraheert looptijd, einddatum, waarde en verplichtingen, en herinnert tijdig vóór de verlengingsdatum.', result: 'gedigitaliseerde contracten, extractienauwkeurigheid' },
        { dept: 'Import-export – Logistiek', title: 'Meertalige handelsdocumenten', now: 'Cognossementen, douaneaangiften en certificaten van oorsprong komen van veel partners in veel talen; handmatig invoeren is traag en foutgevoelig.', with: 'Extraheert uit vele formaten en talen en zet de data in precies de structuur die uw systemen nodig hebben.', result: 'extractienauwkeurigheid, verwerkingstijd' }
      ]
    },
    proven: {
      label: '05 · BEWEZEN IN DE PRAKTIJK', title: 'Echte cijfers uit een lopend project.',
      lead: 'De klant is een bedrijf met een salesteam van 3.000 medewerkers. De cijfers zijn door de klant zelf gemeten, vóór en na de ingebruikname van IntelliDOC.',
      barsAT: 'Verwerkingstijd per factuur', barsBT: 'Totaal aantal verwerkingsuren per jaar (2025)',
      barsA: [
        { label: 'Declaratiefacturen van medewerkers', before: 'meer dan 210 seconden', after: 'minder dan 30 seconden' },
        { label: 'Leveranciersfacturen', before: 'meer dan 300 seconden', after: 'minder dan 30 seconden' }
      ],
      barsB: [
        { label: 'Declaratiefacturen van medewerkers', before: '4.605 uur', after: '657 uur' },
        { label: 'Leveranciersfacturen', before: '4.916 uur', after: '491 uur' }
      ],
      saveL: 'BESPAARD PER JAAR', saveV: '8.373 uur', saveS: ' uur',
      saveX: '7 tot 10 keer sneller per factuur. Van 8 naar 3 handelingen, terwijl er extra datavelden bijkomen die de afdelingen nodig hebben.',
      facts: [
        { v: '97–99%', l: 'extractienauwkeurigheid, gemeten op meer dan 5.000 voorbeeldfacturen' },
        { v: '~5 seconden', l: 'verwerkingstijd van de AI per factuur, exclusief menselijke controle' },
        { v: 'Duizenden', l: 'gelijktijdige verzoeken getest' }
      ],
      countriesL: 'In productie in 6 landen:',
      countries: ['Vietnam', 'Filipijnen', 'Zuid-Korea', 'Cambodja', 'Myanmar', 'India']
    },
    work: {
      label: '06 · ZO WERKEN WIJ', title: 'Klein beginnen, meten op echte documenten.',
      phases: [
        { t: 'Verkenning', time: '1–2 weken', x: 'Uw huidige proces en systemen leren kennen, echte documenten bekijken, bepalen welke data nodig is.' },
        { t: 'Pilot', time: '3–4 weken', x: 'Draaien op echte data binnen de afgesproken scope, met meting van nauwkeurigheid en verwerkingstijd.' },
        { t: 'Implementatie', time: 'Na de pilot', x: 'Integratie in uw systemen en applicaties, training, ondersteuning en uitbreiding van de scope.' }
      ],
      kpiT: 'KPI’s gemeten in de pilot',
      kpis: [
        { t: 'Nauwkeurigheid per veld', x: 'Aandeel velden dat correct is geëxtraheerd ten opzichte van het brondocument.' },
        { t: 'Verwerkingstijd per document', x: 'Van upload tot de data in uw systeem is opgeslagen.' },
        { t: 'Aandeel velden voor controle', x: 'Percentage velden waarover de AI niet zeker genoeg is.' },
        { t: 'Bespaarde werkuren', x: 'Vóór en na vergeleken, bij hetzelfde documentvolume.' }
      ]
    },
    security: {
      label: '07 · DATABEVEILIGING', title: 'Uw documenten zijn bedrijfskapitaal.',
      items: [
        { t: 'ISO/IEC 27001:2022', x: 'Managementsysteem voor informatiebeveiliging, jaarlijks geaudit door TÜV NORD.' },
        { t: 'NDA vóór ontvangst van data', x: 'Er wordt een geheimhoudingsovereenkomst getekend voordat Infodation ook maar één document ontvangt.' },
        { t: 'On-premise implementatie', x: 'Installatie op uw eigen infrastructuur is mogelijk; voorbeelddata wordt na de pilot op verzoek verwijderd.' }
      ]
    },
    profile: {
      label: '08 · OPLOSSINGSPROFIEL', title: 'Neem het mee voor uw team.',
      text: 'Het vraagstuk, de werking, toepassingen per afdeling, praktijkcijfers en onze beveiligingsafspraken, samengevat in 9 pagina’s.',
      view: 'Online bekijken', download: 'Download pdf', request: 'Aanvragen per e-mail', mailSubject: 'Oplossingsprofiel IntelliDOC',
      also: 'Ook beschikbaar: bedrijfsprofiel Infodation Vietnam →', coverAlt: 'Omslag van het IntelliDOC-oplossingsprofiel'
    },
    cta: {
      label: 'VOLGENDE STAP', titleA: 'Begin met', titleB: '60 minuten.',
      lead: 'Eén gesprek om te begrijpen hoe u nu documenten verwerkt, en om IntelliDOC uw eigen voorbeelddocumenten te zien verwerken. Daarna stuurt Infodation een pilotvoorstel met concrete scope, KPI’s en kosten.',
      emailL: 'E-MAIL', phoneL: 'TELEFOON'
    },
    form: {
      title: 'Plan 60 minuten', name: 'Volledige naam', email: 'Zakelijk e-mailadres', doctype: 'Te verwerken documenten',
      types: ['Declaratiefacturen van medewerkers', 'Leveranciersfacturen', 'Matchen van factuur en inkooporder', 'Contracten', 'Import- en exportdocumenten', 'Overig'],
      volume: 'Volume per maand (schatting)', volumePh: 'bijv. 2.000 facturen',
      submit: 'Verstuur aanvraag', note: 'Wij tekenen een NDA voordat we documenten ontvangen.'
    }
  };
})();
