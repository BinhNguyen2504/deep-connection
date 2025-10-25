
const categories = {
  past: {
    title: 'Quá khứ & Trải nghiệm',
    questions: [
      {
        vi: 'Kỷ niệm đẹp nhất của bạn từ thời thơ ấu là gì?',
        en: 'What is your fondest childhood memory?',
      },
      {
        vi: 'Trải nghiệm nào trong quá khứ đã định hình bạn nhiều nhất?',
        en: 'What past experience has shaped you the most?',
      },
      {
        vi: 'Ký ức tuổi thơ nào khiến bạn vui nhất khi nghĩ về?',
        en: 'What childhood memory makes you happiest when you think about it?',
      },
      {
        vi: 'Ai là người có ảnh hưởng lớn nhất đến bạn khi bạn lớn lên?',
        en: 'Who was the biggest influence on you growing up?',
      },
      {
        vi: 'Thất bại hoặc sai lầm nào đã dạy bạn nhiều điều nhất?',
        en: 'What failure or mistake taught you the most?',
      },
      {
        vi: 'Điều gì bạn từng rất tin tưởng nhưng bây giờ thì không còn nữa?',
        en: "What is something you used to believe strongly in, but don't anymore?",
      },
      {
        vi: 'Kỷ niệm nào về gia đình bạn mà bạn trân trọng nhất?',
        en: 'What family memory do you cherish the most?',
      },
      {
        vi: 'Quan niệm về tình yêu của bạn đã thay đổi như thế nào so với trước đây?',
        en: 'How has your idea of love changed from what it used to be?',
      },
      {
        vi: 'Khoảnh khắc nào trong quá khứ của chúng ta mà bạn muốn sống lại nhất?',
        en: 'What moment from our past would you love to relive?',
      },
    ],
  },

  present: {
    title: 'Hiện tại & Cảm xúc',
    questions: [
      {
        vi: 'Điều gì khiến bạn cảm thấy hạnh phúc nhất ngay lúc này?',
        en: 'What is making you happiest right now?',
      },
      {
        vi: 'Bạn đang cảm thấy biết ơn điều gì trong cuộc sống hiện tại?',
        en: 'What are you grateful for in your life at this moment?',
      },
      {
        vi: 'Điều gì gần đây khiến bạn thực sự tự hào về bản thân?',
        en: 'What recently made you feel really proud of yourself?',
      },
      {
        vi: 'Trong một ngày tồi tệ, điều gì có thể ngay lập tức khiến bạn cảm thấy tốt hơn?',
        en: 'On a bad day, what can instantly make you feel better?',
      },
      {
        vi: 'Bạn cảm thấy được yêu thương nhất khi nào?',
        en: 'When do you feel most loved?',
      },
      {
        vi: 'Nỗi sợ hãi phi lý trí lớn nhất của bạn là gì?',
        en: 'What is your biggest irrational fear?',
      },
      {
        vi: 'Điều gì trong cuộc sống hiện tại khiến bạn cảm thấy biết ơn nhất?',
        en: 'What in your current life makes you feel most grateful?',
      },
      {
        vi: 'Điều gì về mối quan hệ của chúng ta ở hiện tại khiến bạn hạnh phúc nhất?',
        en: 'What about our relationship, right now, makes you happiest?',
      },
      {
        vi: 'Ngôn ngữ tình yêu chính của bạn là gì, và bạn có cảm thấy được yêu theo cách đó không?',
        en: 'What is your primary love language, and do you feel loved in that way?',
      },
      {
        vi: 'Điều gì nhỏ nhặt tôi làm mà bạn vô tình lại rất thích?',
        en: 'What is a small, random thing I do that you secretly love?',
      },
    ],
  },

  future: {
    title: 'Tương lai & Ước mơ',
    questions: [
      {
        vi: 'Ước mơ lớn nhất bạn muốn đạt được trong 5 năm tới là gì?',
        en: 'What is your biggest dream to achieve in the next 5 years?',
      },
      {
        vi: 'Bạn tưởng tượng cuộc sống lý tưởng của mình sẽ như thế nào?',
        en: 'What does your ideal life look like?',
      },
      {
        vi: 'Nếu tiền bạc không phải là vấn đề, bạn sẽ dành thời gian của mình để làm gì?',
        en: "If money wasn't an issue, what would you spend your time doing?",
      },
      {
        vi: 'Bạn hình dung cuộc sống của mình sẽ như thế nào trong 5 năm tới?',
        en: 'How do you picture your life in 5 years?',
      },
      {
        vi: 'Mục tiêu lớn nhất mà bạn đang cố gắng đạt được là gì?',
        en: 'What is the biggest goal you are currently trying to achieve?',
      },
      {
        vi: 'Bạn muốn được nhớ đến như một người như thế nào?',
        en: 'How do you want to be remembered?',
      },
      {
        vi: 'Trải nghiệm nào bạn nhất định muốn chúng ta có cùng nhau?',
        en: 'What is one experience you definitely want us to have together?',
      },
      {
        vi: 'Một thói quen mới nào bạn muốn chúng ta cùng nhau xây dựng?',
        en: "What is one new habit you'd like us to build together?",
      },
      {
        vi: 'Bạn có nỗi sợ hãi nào về tương lai của chúng ta không? Chúng ta có thể làm gì để xoa dịu nó?',
        en: 'Do you have any fears about our future? What can we do to soothe them?',
      },
    ],
  },

  values: {
    title: 'Giá trị & Quan điểm sống',
    questions: [
      {
        vi: 'Ba giá trị cốt lõi mà bạn không bao giờ thỏa hiệp là gì?',
        en: 'What are three core values you never compromise on?',
      },
      {
        vi: 'Theo bạn, ý nghĩa của một cuộc sống trọn vẹn là gì?',
        en: 'In your opinion, what is the meaning of a fulfilling life?',
      },
      {
        vi: 'Đối với bạn, định nghĩa về một "cuộc sống thành công" là gì?',
        en: "What is your definition of a 'successful life'?",
      },
      {
        vi: 'Điều gì bạn sẽ không bao giờ thỏa hiệp (dù trong hoàn cảnh nào)?',
        en: 'What is something you would never compromise on (under any circumstances)?',
      },
      {
        vi: 'Bạn nghĩ điều gì làm nên một mối quan hệ bền vững?',
        en: 'What do you think makes a strong relationship?',
      },
      {
        vi: 'Nếu có thể thay đổi một điều trên thế giới, bạn sẽ thay đổi điều gì?',
        en: 'If you could change one thing in the world, what would it be?',
      },
      {
        vi: 'Điều gì quan trọng hơn: Hạnh phúc hay Sự nghiệp?',
        en: 'What is more important: Happiness or Career?',
      },
      {
        vi: 'Giá trị chung nào bạn nghĩ là quan trọng nhất để chúng ta cùng nhau vun đắp?',
        en: 'What shared value do you think is most important for us to build together?',
      },
      {
        vi: 'Đâu là lằn ranh "không thể tha thứ" (deal-breaker) của bạn trong một mối quan hệ?',
        en: 'What is your biggest deal-breaker in a relationship?',
      },
    ],
  },

  relationship: {
    title: 'Chúng ta & Mối quan hệ',
    questions: [
      {
        vi: 'Kỷ niệm yêu thích nhất của bạn về chúng ta là gì?',
        en: 'What is your favorite memory of us?',
      },
      {
        vi: 'Điều gì ở em/anh khiến bạn cảm thấy được yêu thương và trân trọng nhất?',
        en: 'What do I do that makes you feel the most loved and appreciated?',
      },
      {
        vi: 'Bạn nghĩ điểm mạnh lớn nhất của chúng ta với tư cách là một cặp đôi là gì?',
        en: 'What do you think our biggest strength is as a couple?',
      },
      {
        vi: 'Theo bạn, chúng ta có thể làm gì để thấu hiểu nhau sâu sắc hơn?',
        en: 'What is one thing we could do to understand each other more deeply?',
      },
      {
        vi: "Bạn cảm thấy tự hào nhất về 'chúng ta' khi nào?",
        en: "When do you feel most proud of 'us'?",
      },
      {
        vi: 'Lần gần đây nhất bạn cảm thấy thực sự "kết nối" với tôi là khi nào?',
        en: "When was the last time you felt truly 'connected' to me?",
      },
    ],
  },

};
