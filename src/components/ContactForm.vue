<template>
  <section class="contact-section">
    <div class="container">
      <h2 class="section-title scroll-animate" style="animation-delay: 0s">
        Get In Touch
      </h2>
      
      <div class="contact-content">
        <!-- Animated Code Block -->
        <div class="code-block-wrapper scroll-animate" style="animation-delay: 0.2s">
          <div class="mac-frame">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <div class="code-content">
            <pre><code class="language-python" v-if="true">{{ codeSnippet }}</code></pre>
          </div>
        </div>
        
        <!-- Contact Form -->
        <form @submit.prevent="handleSubmit" class="contact-form-wrapper scroll-animate" style="animation-delay: 0.4s">
          <div class="form-group">
            <label for="name" class="form-label">
              <i class="fas fa-user"></i>
              <span>Your Name</span>
            </label>
            <input
              type="text"
              id="name"
              v-model="formData.name"
              class="form-input"
              placeholder="Enter your name"
              required
              aria-required="true"
            />
          </div>
          
          <div class="form-group">
            <label for="email" class="form-label">
              <i class="fas fa-envelope"></i>
              <span>Email Address</span>
            </label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              class="form-input"
              placeholder="Enter your email"
              required
              aria-required="true"
            />
          </div>
          
          <div class="form-group">
            <label for="message" class="form-label">
              <i class="fas fa-comment-dots"></i>
              <span>Your Message</span>
            </label>
            <textarea
              id="message"
              v-model="formData.message"
              class="form-input textarea-input"
              placeholder="Your message..."
              required
              aria-required="true"
              rows="5"
            ></textarea>
          </div>
          
          <div class="button-group">
            <button 
              type="submit" 
              class="btn btn-submit"
              :disabled="isSubmitting"
            >
              <div class="btn-content">
                <i :class="isSubmitting ? 'fas fa-spinner fa-spin' : 'fas fa-paper-plane'"></i>
                <span>{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
              </div>
            </button>
            
            <div v-if="submitStatus" :class="['status-message', submitStatus.type]">
              {{ submitStatus.message }}
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import emailjs from 'emailjs-com';

import hljs from "highlight.js";
import "highlight.js/styles/sunburst.css";

export default {
  name: "ContactForm",
  data() {
    return {
      formData: {
        name: "",
        email: "",
        message: "",
      },
      isSubmitting: false,
      submitStatus: null,
      codeSnippet: `# Developer Wisdom in Code
while success := False:
    try:
        work_hard()
        learn_new_skills()
        debug_life()
        success = True
    except Challenges as c:
        print(f"Facing: {c}. Trying again!")\n        continue\n\nprint("🎉 Success unlocked!")`,
      },
    };
  },
  computed: {
    hasMessage() {
      return this.formData.message.length > 0;
    }
  },
  mounted() {
    this.highlightCode();
  },
  methods: {
    highlightCode() {
      this.$nextTick(() => {
        document.querySelectorAll("pre code").forEach((block) => {
          hljs.highlightElement(block);
        });
      });
    },
    handleSubmit() {
      if (!this.validateForm()) {
        this.showStatus('error', 'Please fill in all fields.');
        return;
      }
      
      this.isSubmitting = true;
      this.submitStatus = null;

      const templateParams = {
        from_name: this.formData.name,
        email: this.formData.email,
        message: this.formData.message,
        date: new Date().toLocaleString()
      };

      emailjs.send('service_8pwhtg8', 'template_8xqxhek', templateParams, 'rbVHw88fdxyR_mx4D')
        .then((response) => {
          this.showStatus('success', 'Thank you, ' + this.formData.name + '! Your message has been sent successfully.');
          this.resetForm();
        })
        .catch((error) => {
          this.showStatus('error', 'Failed to send the message. Please try again later.');
          console.error('EmailJS Error:', error);
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    },
    validateForm() {
      const { name, email, message } = this.formData;
      if (!name?.trim() || !email?.trim() || !message?.trim()) {
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        this.showStatus('error', 'Please enter a valid email address.');
        return false;
      }
      return true;
    },
    resetForm() {
      this.formData = { name: "", email: "", message: "" };
    },
    showStatus(type, message) {
      this.submitStatus = { type, message };
      
      setTimeout(() => {
        this.submitStatus = null;
      }, 5000);
    }
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/colors.scss";

.contact-section {
  min-height: 100vh;
  padding: 100px 20px;
  background: var(--bg-section-gradient);
  
  @media (max-width: 991px) {
    padding: 80px 20px;
  }
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 3rem;
  position: relative;
  text-align: center;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: var(--primary-color);
    box-shadow: 0 0 15px var(--primary-color);
    border-radius: 2px;
  }
}

.contact-content {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.code-block-wrapper {
  flex: 1;
  min-width: 300px;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
  
  .mac-frame {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
    padding: 0 12px;
    align-items: flex-start;
    
    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      display: inline-block;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      
      &.red { background: var(--mac-dot-red); }
      &.yellow { background: var(--mac-dot-yellow); }
      &.green { background: var(--mac-dot-green); }
    }
  }
  
  .code-content {
    background: rgba(0, 0, 0, 0.6);
    border-radius: 12px;
    padding: 20px 15px;
    backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    }
  }
  
  pre {
    margin: 0;
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
    font-size: 0.9rem;
    color: #e0e0e0;
    overflow-x: auto;
    display: flex;
    
    code {
      white-space: pre;
    }
  }
  
  /* Syntax highlighting overrides */
  code.language-python {
    color: #e0e0e0;
  }
  
  .hljs {
    background: transparent !important;
  }
}

.contact-form-wrapper {
  flex: 1;
  min-width: 300px;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  
  @media (max-width: 768px) {
    max-width: 100%;
    flex: 100%;
    max-width: none;
  }
}

.form-group {
  margin-bottom: 25px;
  
  .form-label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-light);
    margin-bottom: 10px;
    
    i {
      color: var(--primary-color);
      transition: all 0.3s ease;
    }
  }
  
  .form-input {
    width: 100%;
    padding: 16px 20px;
    font-size: 1rem;
    font-family: inherit;
    color: var(--text-light);
    background: var(--input-bg);
    border: 2px solid var(--input-border);
    border-radius: 12px;
    transition: all 0.3s ease;
    
    &::placeholder {
      color: var(--input-placeholder);
    }
    
    &:hover {
      border-color: rgba(255, 255, 255, 0.3);
    }
    
    &:focus {
      border-color: var(--input-focus-border);
      box-shadow: 0 0 0 4px rgba(255, 123, 137, 0.1);
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }
    
    &.textarea-input {
      min-height: 150px;
      resize: vertical;
      line-height: 1.6;
    }
  }
}

.button-group {
  margin-top: 40px;
  position: relative;
  min-height: 60px;
  
  .btn-submit {
    width: 100%;
    padding: 18px 30px;
    font-size: 1.1rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--dark-overlay);
    background: var(--primary-color);
    border: none;
    border-radius: 50px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    
    .btn-content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      position: relative;
      z-index: 1;
    }
    
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0;
      height: 0;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      transition: width 0.6s ease, height 0.6s ease;
      z-index: 0;
    }
    
    &:hover:not(:disabled) {
      transform: translateY(-3px);
      box-shadow: 
        0 15px 35px rgba(255, 123, 137, 0.4),
        0 0 20px rgba(255, 123, 137, 0.3);
      
      &::before {
        width: 300px;
        height: 300px;
      }
      
      i {
        transform: translateX(5px);
      }
      
      span {
        transform: translateX(5px);
      }
    }
    
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
  
  .status-message {
    position: absolute;
    bottom: -70px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 24px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    animation: slideUpAlert 0.4s ease;
    max-width: 90%;
    text-align: center;
    z-index: 10;
    
    &.success {
      background: rgba(16, 185, 129, 0.2);
      color: var(--success-color);
      border: 1px solid var(--success-color);
    }
    
    &.error {
      background: rgba(239, 68, 68, 0.2);
      color: var(--danger-color);
      border: 1px solid var(--danger-color);
    }
  }
}

/* Animations */
@keyframes slideUpAlert {
  from {
    opacity: 0;
    transform: translate(-50%, 20px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .contact-content {
    gap: 30px;
  }
  
  .code-content pre {
    font-size: 0.8rem;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-input {
    padding: 14px 16px;
    font-size: 0.95rem;
  }
}
</style>
