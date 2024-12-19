<template>
  <section class="contact-section">
  <meta name="description" content="Get in touch with Gemechis Chala for inquiries, collaborations, or to discuss potential projects. Connect through the contact form and follow his journey on various social media platforms.">
    <div class="container">
      <h2 class="section-title">Contact Me</h2>
      <div class="content">
        <div class="code-block">
          <div class="mac-frame">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
            <pre>
<code class="language-python">
# Developer Wisdom in Code
while success := False:
    try:
        work_hard()
        learn_new_skills()
        debug_life()
        success = True
    except Challenges as c:
        print(f"Facing: {c}. Trying again!")
        continue

print("🎉 Success unlocked!")
</code>
          </pre>
        </div>
        <form @submit.prevent="handleSubmit" class="contact-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              v-model="formData.name"
              class="form-control"
              placeholder="Enter your name"
              required
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              class="form-control"
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea
              id="message"
              v-model="formData.message"
              class="form-control"
              rows="5"
              placeholder="Your message"
              required
            ></textarea>
          </div>
          <button type="submit" class="btn btn-more">Send Message</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import emailjs from 'emailjs-com';

import hljs from "highlight.js";
import "highlight.js/styles/sunburst.css"; // Or Tokyonight theme if available

export default {
  name: "ContactForm",
  data() {
    return {
      formData: {
        name: "",
        email: "",
        message: "",
      },
    };
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
      if (this.validateForm()) {
        const templateParams = {
          from_name: this.formData.name,
          email: this.formData.email,
          message: this.formData.message,
          date: new Date().toLocaleString()
        };

        emailjs.send('service_8pwhtg8', 'template_8xqxhek', templateParams, 'rbVHw88fdxyR_mx4D')
          // eslint-disable-next-line
          .then((response) => {
            alert(`Thank you, ${this.formData.name}. Your message has been sent!`);
            this.resetForm();
          // eslint-disable-next-line
          }, (error) => {
            alert('Failed to send the message. Please try again.');
          });
      }
    },
    validateForm() {
      const { name, email, message } = this.formData;
      if (!name || !email || !message) {
        alert("Please fill in all the fields.");
        return false;
      }
      return true;
    },
    resetForm() {
      this.formData = {
        name: "",
        email: "",
        message: "",
      };
    },
  },
};
</script>

<style scoped lang="scss">
.contact-section {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(50, 0, 0, 0.4));
  padding: 4rem 1rem;
  color: colors.$white;

  .section-title {
    text-align: center;
    font-size: 3rem;
    font-weight: 700;
    color: colors.$primary-color;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: 50px;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 4px;
      background: colors.$primary-color;
      box-shadow: 0 0 8px colors.$primary-color, 0 0 15px colors.$primary-color;
      border-radius: 2px;
    }
  }

  .content {
    display: flex;
    gap: 40px;

    @media screen and (max-width: 768px) {
      flex-direction: column;
    }

    .code-block {
      flex: 1;
      background: rgba(255, 255, 255, 0.1); /* Glassmorphic effect */
      border: 1px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      padding: 20px;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      overflow-x: auto;

      .mac-frame {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;

        .dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
        }
        .red {
          background: #ff5f57;
        }
        .yellow {
          background: #ffbd2f;
        }
        .green {
          background: #28c940;
        }
      }

      pre {
        margin: 0;
        color: #e0e0e0;
        font-family: "Fira Code", monospace;
        font-size: 1rem;
        white-space: pre;
        overflow-x: auto;
        padding: 15px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        text-align: left;
        code {
          display: block;
          white-space: pre-wrap;
        }
      }
    }

    .contact-form {
      flex: 1;

      .form-group {
        margin-bottom: 25px;

        label {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 10px;
          display: block;
          color: #ffffff;
        }

        .form-control {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          font-size: 1rem;
          transition: all 0.3s ease;

          &:hover {
            border-color: colors.$primary-color;
          }

          &:focus {
            border-color: colors.$primary-color;
            outline: none;
            box-shadow: 0 0 10px colors.$primary-color;
          }
        }
      }

      .btn {
        display: inline-block;
        width: 100%;
        padding: 12px 15px;
        font-size: 1rem;
        font-weight: 700;
        text-transform: uppercase;
        color: #000000;
        background: colors.$primary-color;
        border-radius: 30px;
        transition: all 0.3s ease;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(255, 111, 97, 0.5);

        &:hover {
          background: colors.$button-hover-bg;
          box-shadow: 0 8px 30px rgba(255, 111, 97, 0.8);
          transform: translateY(-2px);
        }

        &:focus {
          outline: 2px solid #ffffff;
        }
      }
    }
  }
}
</style>