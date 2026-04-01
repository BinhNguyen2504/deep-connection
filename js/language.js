/* ========================================
   DEEP CONNECTION — Language Toggle
   ======================================== */
/* eslint-disable no-undef */

DC.LANGUAGES = {
  vi: {
    flag: '🇻🇳',
    flagSvg:
      '<svg viewBox="0 0 30 20" width="26" height="18"><rect width="30" height="20" fill="#DA251D"/><path d="M0,-1 .588,.809 -.951,-.309 .951,-.309 -.588,.809Z" fill="#FFFF00" transform="translate(15,10) scale(5)"/></svg>',
    label: 'Việt',
  },
  zh: {
    flag: '🇨🇳',
    flagSvg:
      '<svg viewBox="0 0 30 20" width="26" height="18"><rect width="30" height="20" fill="#DE2910"/><path d="M0,-1 .588,.809 -.951,-.309 .951,-.309 -.588,.809Z" fill="#FFDE00" transform="translate(6.5,6.5) scale(3.5)"/><path d="M0,-1 .588,.809 -.951,-.309 .951,-.309 -.588,.809Z" fill="#FFDE00" transform="translate(13,3) scale(1.1)"/><path d="M0,-1 .588,.809 -.951,-.309 .951,-.309 -.588,.809Z" fill="#FFDE00" transform="translate(15.5,5.5) scale(1.1)"/><path d="M0,-1 .588,.809 -.951,-.309 .951,-.309 -.588,.809Z" fill="#FFDE00" transform="translate(15.5,9) scale(1.1)"/><path d="M0,-1 .588,.809 -.951,-.309 .951,-.309 -.588,.809Z" fill="#FFDE00" transform="translate(13,11.5) scale(1.1)"/></svg>',
    label: '中文',
  },
  ja: {
    flag: '🇯🇵',
    flagSvg:
      '<svg viewBox="0 0 30 20" width="26" height="18"><rect width="30" height="20" fill="#FFFFFF"/><rect width="30" height="20" fill="none" stroke="#E0E0E0" stroke-width=".4"/><circle cx="15" cy="10" r="5.5" fill="#BC002D"/></svg>',
    label: '日本語',
  },
};

DC.LANG_ORDER = ['vi', 'zh', 'ja'];

DC.TRANSLATIONS = {
  vi: {
    // Card
    tapToFlip: 'Chạm để lật',
    tagLight: 'nhẹ nhàng',
    tagMedium: 'thú vị',
    tagDeep: 'sâu sắc',
    tagSensitive: 'nhạy cảm',
    // Home
    questions: 'câu hỏi',
    homeSubtitle: 'Chọn một chủ đề để bắt đầu cuộc trò chuyện về tình yêu',
    homeFooter: 'Chạm để chọn · Vuốt để khám phá',
    // Play
    swipeHint: '← Vuốt để đổi câu hỏi →',
    btnPrev: 'Trước',
    tapHint: 'Chạm vào thẻ để lật · Vuốt sang để đổi câu',
    // Completion modal
    completionTitle: 'Hết bài rồi!',
    completionText: 'Bạn đã đi qua tất cả câu hỏi trong chủ đề này.',
    btnPlayAgain: 'Chơi lại',
    btnChangeTopic: 'Đổi chủ đề',
    btnContributeQuestion: '✍️ Đóng góp câu hỏi',
    // Info screen
    infoTitle: 'Giới thiệu',
    infoTagline: 'Khám phá tình yêu qua từng lá bài',
    infoAboutTitle: 'Về ứng dụng',
    infoAboutText:
      'Deep Connection là bộ bài hội thoại dành cho các cặp đôi — từ những cuộc trò chuyện đầu tiên đến những chủ đề sâu sắc hơn. Mỗi lá bài là một câu hỏi giúp hai người hiểu nhau hơn, vượt qua những cuộc nói chuyện bề mặt thường ngày.',
    infoHowTitle: 'Cách chơi',
    infoStep1: 'Chọn một chủ đề phù hợp với giai đoạn của hai bạn',
    infoStep2: 'Chạm vào thẻ để lật và đọc câu hỏi',
    infoStep3: 'Cả hai cùng trả lời — không có đáp án đúng hay sai',
    infoStep4: 'Vuốt sang để chuyển câu hỏi tiếp theo',
    infoContributeTitle: 'Đóng góp câu hỏi',
    infoContributeText:
      'Bạn có câu hỏi hay muốn chia sẻ? Hãy đóng góp để giúp các cặp đôi khác có thêm nhiều cuộc trò chuyện ý nghĩa.',
    infoContributeCta: '✍️ Gửi câu hỏi của bạn',
    infoAuthorTitle: 'Tác giả',
    infoAuthorText: 'Thiết kế & phát triển bởi',
    // Contribute modal
    contributeTitle: 'Đóng góp câu hỏi',
    contributeDesc: 'Chia sẻ câu hỏi của bạn để giúp các cặp đôi khác',
    contributeCategoryLabel: 'Chủ đề',
    contributeCategoryPlaceholder: '— Chọn chủ đề —',
    contributeViLabel: 'Câu hỏi tiếng Việt',
    contributeViPlaceholder: 'Nhập câu hỏi bằng tiếng Việt...',
    contributeEnLabel: 'Câu hỏi tiếng Anh',
    contributeNameLabel: 'Tên của bạn',
    contributeNamePlaceholder: 'Ẩn danh',
    contributeSubmit: 'Gửi câu hỏi',
    contributeCancel: 'Hủy',
    optional: 'tùy chọn',
    // Contribute validation
    validateViRequired: 'Vui lòng nhập câu hỏi tiếng Việt',
    validateViMinLength: 'Câu hỏi tiếng Việt cần ít nhất 10 ký tự',
    validateViMaxWords: 'Câu hỏi không được quá 25 từ (hiện tại: {n} từ)',
    contributeCooldown: 'Vui lòng đợi {n}s trước khi gửi tiếp',
    contributeSending: 'Đang gửi câu hỏi...',
    contributeSuccess: 'Cảm ơn bạn! Câu hỏi đã được gửi thành công.',
    contributeError:
      'Không thể gửi. Vui lòng kiểm tra kết nối mạng và thử lại.',
    contributeNoCategory: 'không chọn',
    contributeAnonymous: 'Ẩn danh',
    // Cover
    coverSubtitle: 'Khám phá tình yêu qua từng lá bài',
    coverStartHint: 'Chạm để bắt đầu',
    coverFooter: 'Một bộ bài cho những trái tim muốn kết nối sâu hơn',
    // Settings
    settingsTitle: 'Cài đặt',
    settingsTheme: 'Giao diện',
    settingsThemeSub: 'Sáng / Tối',
    settingsSound: 'Âm thanh',
    settingsSoundSub: 'Hiệu ứng âm thanh',
    settingsLang: 'Ngôn ngữ',
    settingsLangSub: 'Chạm để đổi ngôn ngữ',
    settingsFontSize: 'Cỡ chữ',
    settingsFontSizeSub: 'Kích thước chữ trên lá bài',
    settingsFontSizeSmall: 'Nhỏ',
    settingsFontSizeMedium: 'Vừa',
    settingsFontSizeLarge: 'Lớn',
    // Error
    loadError:
      '⚠️ Không thể tải dữ liệu. Vui lòng kiểm tra lại các file trong thư mục <code>data/.',
  },
  zh: {
    tapToFlip: '点击翻转',
    tagLight: '轻松',
    tagMedium: '有趣',
    tagDeep: '深刻',
    tagSensitive: '敏感',
    questions: '个问题',
    homeSubtitle: '选择一个主题，开始一段关于爱情的对话',
    homeFooter: '点击选择 · 滑动探索',
    swipeHint: '← 滑动切换问题 →',
    btnPrev: '上一题',
    tapHint: '点击卡片翻转 · 滑动切换问题',
    completionTitle: '全部完成！',
    completionText: '你已经回答了这个主题的所有问题。',
    btnPlayAgain: '再玩一次',
    btnChangeTopic: '换主题',
    btnContributeQuestion: '✍️ 贡献问题',
    infoTitle: '关于',
    infoTagline: '通过每张牌探索爱情',
    infoAboutTitle: '关于应用',
    infoAboutText:
      'Deep Connection 是一款为情侣设计的对话卡牌游戏——从初次对话到更深层的话题。每张牌都是一个帮助两个人超越日常闲聊、更深入了解彼此的问题。',
    infoHowTitle: '玩法',
    infoStep1: '选择一个适合你们阶段的主题',
    infoStep2: '点击卡片翻转并阅读问题',
    infoStep3: '两人一起回答——没有对错之分',
    infoStep4: '滑动切换到下一个问题',
    infoContributeTitle: '贡献问题',
    infoContributeText:
      '有好问题想分享？贡献你的问题，帮助其他情侣拥有更多有意义的对话。',
    infoContributeCta: '✍️ 提交你的问题',
    infoAuthorTitle: '作者',
    infoAuthorText: '设计与开发',
    contributeTitle: '贡献问题',
    contributeDesc: '分享你的问题，帮助其他情侣',
    contributeCategoryLabel: '主题',
    contributeCategoryPlaceholder: '— 选择主题 —',
    contributeViLabel: '越南语问题',
    contributeViPlaceholder: '输入越南语问题...',
    contributeEnLabel: '英语问题',
    contributeNameLabel: '你的名字',
    contributeNamePlaceholder: '匿名',
    contributeSubmit: '提交问题',
    contributeCancel: '取消',
    optional: '可选',
    validateViRequired: '请输入越南语问题',
    validateViMinLength: '越南语问题至少需要10个字符',
    validateViMaxWords: '问题不能超过25个词（当前：{n}个词）',
    contributeCooldown: '请等待{n}秒后再提交',
    contributeSending: '正在提交问题...',
    contributeSuccess: '谢谢！问题已成功提交。',
    contributeError: '提交失败，请检查网络连接后重试。',
    contributeNoCategory: '未选择',
    contributeAnonymous: '匿名',
    coverSubtitle: '通过每张牌探索爱情',
    coverStartHint: '点击开始',
    coverFooter: '一副为想要更深连接的心灵而准备的牌',
    settingsTitle: '设置',
    settingsTheme: '主题',
    settingsThemeSub: '明亮 / 暗黑',
    settingsSound: '声音',
    settingsSoundSub: '音效',
    settingsLang: '语言',
    settingsLangSub: '点击切换语言',
    settingsFontSize: '字体大小',
    settingsFontSizeSub: '卡片上的字体大小',
    settingsFontSizeSmall: '小',
    settingsFontSizeMedium: '中',
    settingsFontSizeLarge: '大',
    loadError: '⚠️ 无法加载数据。请检查 <code>data/ 文件夹。',
  },
  ja: {
    tapToFlip: 'タップしてめくる',
    tagLight: 'やさしい',
    tagMedium: 'おもしろい',
    tagDeep: '深い',
    tagSensitive: 'デリケート',
    questions: '問',
    homeSubtitle: 'テーマを選んで、愛についての会話を始めましょう',
    homeFooter: 'タップして選択 · スワイプして探索',
    swipeHint: '← スワイプして質問を変更 →',
    btnPrev: '前へ',
    tapHint: 'タップしてめくる · スワイプして次の質問へ',
    completionTitle: '全問完了！',
    completionText: 'このテーマのすべての質問を終えました。',
    btnPlayAgain: 'もう一度',
    btnChangeTopic: 'テーマを変更',
    btnContributeQuestion: '✍️ 質問を投稿',
    infoTitle: '紹介',
    infoTagline: 'カードを通じて愛を探求',
    infoAboutTitle: 'アプリについて',
    infoAboutText:
      'Deep Connection はカップルのための会話カードゲームです——初めての会話からより深いテーマまで。各カードは、日常の雑談を超えてお互いをより深く理解するための質問です。',
    infoHowTitle: '遊び方',
    infoStep1: 'お二人の段階に合ったテーマを選びましょう',
    infoStep2: 'カードをタップしてめくり、質問を読みましょう',
    infoStep3: '二人で答えましょう——正解も不正解もありません',
    infoStep4: 'スワイプして次の質問へ',
    infoContributeTitle: '質問を投稿',
    infoContributeText:
      '共有したい質問がありますか？投稿して、他のカップルがより意味のある会話をする手助けをしましょう。',
    infoContributeCta: '✍️ あなたの質問を送る',
    infoAuthorTitle: '作者',
    infoAuthorText: 'デザイン＆開発',
    contributeTitle: '質問を投稿',
    contributeDesc: 'あなたの質問を共有して、他のカップルを応援しましょう',
    contributeCategoryLabel: 'テーマ',
    contributeCategoryPlaceholder: '— テーマを選択 —',
    contributeViLabel: 'ベトナム語の質問',
    contributeViPlaceholder: 'ベトナム語で質問を入力...',
    contributeEnLabel: '英語の質問',
    contributeNameLabel: 'あなたの名前',
    contributeNamePlaceholder: '匿名',
    contributeSubmit: '質問を送信',
    contributeCancel: 'キャンセル',
    optional: '任意',
    validateViRequired: 'ベトナム語の質問を入力してください',
    validateViMinLength: 'ベトナム語の質問は10文字以上必要です',
    validateViMaxWords: '質問は25語以内にしてください（現在：{n}語）',
    contributeCooldown: '{n}秒後に再送信してください',
    contributeSending: '質問を送信中...',
    contributeSuccess: 'ありがとうございます！質問が正常に送信されました。',
    contributeError:
      '送信できませんでした。ネットワーク接続を確認して再試行してください。',
    contributeNoCategory: '未選択',
    contributeAnonymous: '匿名',
    coverSubtitle: 'カードを通じて愛を探求',
    coverStartHint: 'タップして始める',
    coverFooter: '深いつながりを求める二つの心のためのカードデッキ',
    settingsTitle: '設定',
    settingsTheme: 'テーマ',
    settingsThemeSub: 'ライト / ダーク',
    settingsSound: 'サウンド',
    settingsSoundSub: '効果音',
    settingsLang: '言語',
    settingsLangSub: 'タップして言語を変更',
    settingsFontSize: '文字サイズ',
    settingsFontSizeSub: 'カードの文字サイズ',
    settingsFontSizeSmall: '小',
    settingsFontSizeMedium: '中',
    settingsFontSizeLarge: '大',
    loadError:
      '⚠️ データを読み込めませんでした。<code>data/ フォルダを確認してください。',
  },
};

DC.t = function t(key) {
  return (
    DC.TRANSLATIONS[DC.state.language][key] || DC.TRANSLATIONS.vi[key] || key
  );
};

DC.localizedName = function localizedName(obj) {
  return obj['name_' + DC.state.language] || obj.name_vi;
};

DC.localizedText = function localizedText(obj) {
  return obj['text_' + DC.state.language] || obj.text_vi;
};

DC.initLanguage = function initLanguage() {
  var saved = localStorage.getItem('dc-lang');
  if (saved && DC.LANGUAGES[saved]) {
    DC.state.language = saved;
  }
  DC.applyLanguage();
};

DC.applyLanguage = function applyLanguage() {
  var lang = DC.state.language;
  var flag = DC.LANGUAGES[lang].flag;
  document.documentElement.setAttribute('data-lang', lang);
  document.querySelectorAll('.lang-icon').forEach(function (el) {
    el.textContent = flag;
  });
  var r = DC.refs;
  // Home screen
  if (r.homeSubtitle) r.homeSubtitle.textContent = DC.t('homeSubtitle');
  if (r.homeFooter) r.homeFooter.textContent = DC.t('homeFooter');
  // Cover screen
  if (r.coverSubtitle) r.coverSubtitle.textContent = DC.t('coverSubtitle');
  if (r.coverStartHint) r.coverStartHint.textContent = DC.t('coverStartHint');
  if (r.coverFooter) r.coverFooter.textContent = DC.t('coverFooter');
  // Play screen
  if (r.swipeHintText) r.swipeHintText.textContent = DC.t('swipeHint');
  if (r.btnPrevLabel) r.btnPrevLabel.textContent = DC.t('btnPrev');
  if (r.tapHint) r.tapHint.textContent = DC.t('tapHint');
  // Completion modal
  if (r.modalResetTitle)
    r.modalResetTitle.textContent = DC.t('completionTitle');
  if (r.modalResetText) r.modalResetText.textContent = DC.t('completionText');
  if (r.btnReset) r.btnReset.textContent = DC.t('btnPlayAgain');
  if (r.btnHome) r.btnHome.textContent = DC.t('btnChangeTopic');
  if (r.btnContributeModal)
    r.btnContributeModal.textContent = DC.t('btnContributeQuestion');
  // Info screen
  if (r.infoHeaderTitle) r.infoHeaderTitle.textContent = DC.t('infoTitle');
  if (r.infoTagline) r.infoTagline.textContent = DC.t('infoTagline');
  if (r.infoAboutTitle) r.infoAboutTitle.textContent = DC.t('infoAboutTitle');
  if (r.infoAboutText) r.infoAboutText.textContent = DC.t('infoAboutText');
  if (r.infoHowTitle) r.infoHowTitle.textContent = DC.t('infoHowTitle');
  if (r.infoStep1) r.infoStep1.textContent = DC.t('infoStep1');
  if (r.infoStep2) r.infoStep2.textContent = DC.t('infoStep2');
  if (r.infoStep3) r.infoStep3.textContent = DC.t('infoStep3');
  if (r.infoStep4) r.infoStep4.textContent = DC.t('infoStep4');
  if (r.infoContributeTitle)
    r.infoContributeTitle.textContent = DC.t('infoContributeTitle');
  if (r.infoContributeText)
    r.infoContributeText.textContent = DC.t('infoContributeText');
  if (r.infoContributeCta)
    r.infoContributeCta.textContent = DC.t('infoContributeCta');
  if (r.infoAuthorTitle)
    r.infoAuthorTitle.textContent = DC.t('infoAuthorTitle');
  if (r.infoAuthorText)
    r.infoAuthorText.innerHTML =
      DC.t('infoAuthorText') + ' <strong>Bình Nguyễn</strong>';
  // Contribute modal
  if (r.contributeModalTitle)
    r.contributeModalTitle.textContent = DC.t('contributeTitle');
  if (r.contributeModalDesc)
    r.contributeModalDesc.textContent = DC.t('contributeDesc');
  if (r.contributeCategoryLabel)
    r.contributeCategoryLabel.textContent = DC.t('contributeCategoryLabel');
  if (r.contributeViLabel)
    r.contributeViLabel.innerHTML =
      DC.t('contributeViLabel') + ' <span class="required">*</span>';
  if (r.contributeEnLabel)
    r.contributeEnLabel.innerHTML =
      DC.t('contributeEnLabel') +
      ' <span class="optional">(' +
      DC.t('optional') +
      ')</span>';
  if (r.contributeNameLabel)
    r.contributeNameLabel.innerHTML =
      DC.t('contributeNameLabel') +
      ' <span class="optional">(' +
      DC.t('optional') +
      ')</span>';
  if (r.contributeVi)
    r.contributeVi.placeholder = DC.t('contributeViPlaceholder');
  if (r.contributeName)
    r.contributeName.placeholder = DC.t('contributeNamePlaceholder');
  if (r.btnContributeSubmit)
    r.btnContributeSubmit.textContent = DC.t('contributeSubmit');
  if (r.btnContributeCancel)
    r.btnContributeCancel.textContent = DC.t('contributeCancel');
  // Settings bottom sheet
  if (r.settingsTitle) r.settingsTitle.textContent = DC.t('settingsTitle');
  if (r.settingsThemeLabel)
    r.settingsThemeLabel.textContent = DC.t('settingsTheme');
  if (r.settingsThemeSublabel)
    r.settingsThemeSublabel.textContent = DC.t('settingsThemeSub');
  if (r.settingsSoundLabel)
    r.settingsSoundLabel.textContent = DC.t('settingsSound');
  if (r.settingsSoundSublabel)
    r.settingsSoundSublabel.textContent = DC.t('settingsSoundSub');
  if (r.settingsLangRowLabel)
    r.settingsLangRowLabel.textContent = DC.t('settingsLang');
  if (r.settingsLangSublabel)
    r.settingsLangSublabel.textContent = DC.t('settingsLangSub');
  // Font size
  if (r.settingsFontSizeLabel)
    r.settingsFontSizeLabel.textContent = DC.t('settingsFontSize');
  if (r.settingsFontSizeSublabel)
    r.settingsFontSizeSublabel.textContent = DC.t('settingsFontSizeSub');
  if (r.settingsFontSizeGroup) {
    var btns = r.settingsFontSizeGroup.querySelectorAll(
      '.settings-font-size-btn',
    );
    btns.forEach(function (btn) {
      var size = btn.getAttribute('data-size');
      if (size === 'small') btn.textContent = DC.t('settingsFontSizeSmall');
      if (size === 'medium') btn.textContent = DC.t('settingsFontSizeMedium');
      if (size === 'large') btn.textContent = DC.t('settingsFontSizeLarge');
    });
  }
};

DC.cycleLanguage = function cycleLanguage() {
  var idx = DC.LANG_ORDER.indexOf(DC.state.language);
  DC.state.language = DC.LANG_ORDER[(idx + 1) % DC.LANG_ORDER.length];
  localStorage.setItem('dc-lang', DC.state.language);
  DC.applyLanguage();

  // Always re-render categories so Home screen is up-to-date
  if (DC.state.categories && DC.state.categories.length) {
    DC.renderCategories();
  }

  // Always update play screen elements if a category is active
  var cat = DC.state.currentCategory;
  if (cat) {
    DC.refs.categoryLabel.textContent = cat.icon + ' ' + DC.localizedName(cat);
    if (DC.refs.screenPlay.classList.contains('active')) {
      DC.renderCards();
    }
  }
};
