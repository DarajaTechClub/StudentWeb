// Daraja QnA Chatbot - FAQ Bot
// Simple chatbot to answer frequently asked questions

const FAQ_DATABASE = {
  'admission': {
    questions: ['how do i apply', 'admission process', 'how to join', 'application', 'apply to daraja'],
    answer: 'For admission inquiries, please email us at info@daraja-academy.org with your academic records and motivation letter. Applications are reviewed on a rolling basis. We welcome applications from talented girls across Kenya.'
  },
  'fees': {
    questions: ['tuition', 'fees', 'cost', 'how much', 'scholarship', 'free', 'tuition free'],
    answer: 'Daraja Academy is a fully sponsored school, meaning tuition is completely free for all admitted students. We provide free, high-quality education to talented girls from underserved communities. Your only responsibility is to bring your dedication to learning!'
  },
  'location': {
    questions: ['where', 'location', 'address', 'how to get there', 'directions', 'naibor', 'nanyuki'],
    answer: 'We are located in Naibor, near Nanyuki in Laikipia County, Kenya. Our full address is Nanyuki-Rumuruti Road, Naibor, Laikipia County. For detailed directions, please visit our Contact Us page or email us at info@daraja-academy.org.'
  },
  'contact': {
    questions: ['contact', 'phone', 'email', 'reach out', 'phone number', 'how to contact'],
    answer: 'You can reach us at:\n📧 Email: info@daraja-academy.org\n📍 Address: P.O. Box 1590 - 10400, Nanyuki, Kenya\nFeel free to reach out with any questions!'
  },
  'founding': {
    questions: ['founded', 'when was it started', 'history', 'establishment', 'founders', 'jenni', 'jason doherty'],
    answer: 'Daraja Academy was founded in 2009 by Jenni and Jason Doherty. It was established to provide free, world-class secondary education to talented girls from underserved communities. We have impacted over 1,000 young women since our inception.'
  },
  'vision': {
    questions: ['vision', 'mission', 'goals', 'purpose', 'what is your mission'],
    answer: 'Our Vision: To empower young women through quality education and mentorship, enabling them to become confident leaders, innovators, and agents of positive change.\n\nOur Mission: To provide accessible, world-class secondary education to talented girls, fostering academic excellence, critical thinking, and strong character values.'
  },
  'boarding': {
    questions: ['boarding', 'hostel', 'accommodation', 'residential', 'live on campus', 'do you board', 'do girls stay'],
    answer: 'Yes, Daraja Academy is an all-girls boarding secondary school. Students live on campus with comprehensive support services including accommodation, meals, pastoral care, and a supportive community environment.'
  },
  'curriculum': {
    questions: ['subjects', 'curriculum', 'courses', 'what do you teach', 'programs', 'subjects offered'],
    answer: 'We follow the Kenyan secondary school curriculum with a focus on academic excellence, critical thinking, and character development. For specific details about our programs, please visit our Programs section or email us at info@daraja-academy.org.'
  },
  'visits': {
    questions: ['visit', 'campus tour', 'schedule a visit', 'see the school', 'open day', 'visiting hours', 'can i visit'],
    answer: 'We welcome visits to our campus! Please contact us at info@daraja-academy.org to schedule a tour. We\'ll be happy to show you our facilities and discuss how Daraja can support your educational journey.'
  },
  'students': {
    questions: ['how many students', 'student population', 'enrollment', 'number of students', 'how many girls'],
    answer: 'We currently have over 500 students at Daraja Academy. Our students come from over 30 counties across Kenya, representing diverse backgrounds and communities. Each student receives personalized attention and support to help them succeed.'
  },
  'wish': {
    questions: ['wish', 'women in science', 'wish program', 'stem', 'science program'],
    answer: 'WISH (Women in Science and Humanities) is our flagship program designed to inspire girls to pursue careers in STEM and related fields. It includes mentorship, hands-on workshops, and access to technology resources to develop critical skills and confidence in science and technology.'
  },
  'transition': {
    questions: ['transition', 'transition learning', 'transition program', 'academic support'],
    answer: 'Our Transition Learning program provides comprehensive support to help students smoothly transition between educational levels. It includes intensive academic preparation, strong foundations in core subjects, and personalized guidance from experienced educators.'
  },
  'technology': {
    questions: ['screens', 'interactive classroom', 'technology', 'digital learning', 'classroom technology', 'screens in class'],
    answer: 'Our classrooms are equipped with interactive screens and digital learning tools that provide an engaging, modern learning environment. Students benefit from multimedia instruction, collaborative learning, and real-time feedback to enhance comprehension and retention.'
  },
  'staff': {
    questions: ['staff', 'teachers', 'how many teachers', 'faculty', 'who teaches'],
    answer: 'Daraja Academy has over 50 dedicated staff members committed to providing excellent education and pastoral care. Our team includes experienced teachers, support staff, and counselors who are passionate about empowering our students.'
  }
};

class DarajaQnABot {
  constructor() {
    this.conversationHistory = [];
    this.isOpen = false;
  }

  // Find the best matching FAQ based on user input
  findAnswer(userInput) {
    const userLower = userInput.toLowerCase();
    
    for (const [key, faq] of Object.entries(FAQ_DATABASE)) {
      for (const keyword of faq.questions) {
        if (userLower.includes(keyword)) {
          return faq.answer;
        }
      }
    }
    
    return "I'm not sure about that. I can help with questions about:\n• Admission & Application\n• Fees & Scholarships\n• Location & Directions\n• Our History & Founders\n• Vision & Mission\n• Boarding Life\n• Curriculum & Programs (WISH, Transition Learning)\n• Technology & Interactive Classrooms\n• Visiting the Campus\n\nOr feel free to email us at info@daraja-academy.org";
  }

  // Display a message in the chat
  addMessage(sender, text) {
    this.conversationHistory.push({ sender, text, time: new Date() });
    this.renderChat();
  }

  // Send a message from the user
  sendMessage(text) {
    if (!text.trim()) return;
    
    this.addMessage('user', text);
    
    // Simulate a small delay for natural feel
    setTimeout(() => {
      const response = this.findAnswer(text);
      this.addMessage('bot', response);
    }, 500);
  }

  // Render the chat interface
  renderChat() {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    chatMessages.innerHTML = '';
    
    this.conversationHistory.forEach(msg => {
      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-message ${msg.sender}-message`;
      msgDiv.innerHTML = `<p>${this.escapeHtml(msg.text)}</p>`;
      chatMessages.appendChild(msgDiv);
    });
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Escape HTML to prevent injection
  escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
      '\n': '<br>'
    };
    return text.replace(/[&<>"'\n]/g, m => map[m]);
  }

  // Toggle chat window
  toggleChat() {
    this.isOpen = !this.isOpen;
    const chatWindow = document.getElementById('chat-window');
    const chatButton = document.getElementById('chat-button');
    
    if (chatWindow) {
      chatWindow.style.display = this.isOpen ? 'flex' : 'none';
    }
    if (chatButton) {
      chatButton.textContent = this.isOpen ? '✕' : '💬';
    }
    
    if (this.isOpen && this.conversationHistory.length === 0) {
      this.addMessage('bot', 'Hello! 👋 I\'m Daraja\'s FAQ Bot. I can help answer questions about admission, fees, our special programs (WISH, Transition Learning), technology, and more. What would you like to know about Daraja Academy?');
    }
  }

  // Initialize the chatbot
  init() {
    const inputField = document.getElementById('chat-input');
    const sendButton = document.getElementById('chat-send');
    const chatButton = document.getElementById('chat-button');
    
    if (inputField && sendButton) {
      sendButton.addEventListener('click', () => {
        const text = inputField.value;
        this.sendMessage(text);
        inputField.value = '';
        inputField.focus();
      });
      
      inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const text = inputField.value;
          this.sendMessage(text);
          inputField.value = '';
        }
      });
    }
    
    if (chatButton) {
      chatButton.addEventListener('click', () => this.toggleChat());
    }
  }
}

// Initialize the bot when the page loads
document.addEventListener('DOMContentLoaded', () => {
  window.darajaBot = new DarajaQnABot();
  window.darajaBot.init();
});
