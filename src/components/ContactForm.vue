<template>
  <section class="contact-section">
    <div class="container">
      <h2 class="section-title">Contact Me</h2>
      <div class="content">
        <div class="code-block">
          <div class="mac-frame">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <pre><code class="language-python">
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

print("🎉 Success unlocked! Keep coding, keep thriving.")
          </code></pre>
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
          hljs.highlightBlock(block);
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
  padding: 60px 0;
  background-color: #130042b0;
  color: #fff;

  .section-title {
    text-align: center;
    font-size: 38px;
    font-weight: 800;
    margin-bottom: 50px;
    color: #00eaff;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: #00eaff;
      border-radius: 2px;
    }
  }

  .content {
    display: flex;
    gap: 30px;

    @media screen and (max-width: 768px) {
      flex-direction: column;
    }

    .code-block {
      flex: 1;
      background: #1a1b26;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
      overflow-x: auto;

      .mac-frame {
        display: flex;
        gap: 8px;
        margin-bottom: 10px;

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          display: inline-block;
        }
        .red {
          background: #ff5f56;
        }
        .yellow {
          background: #ffbd2e;
        }
        .green {
          background: #27c93f;
        }
      }

      pre {
        margin: 0;
        color: #a9b1d6;
        font-family: "Fira Code", monospace;
        font-size: 14px;

        code {
          display: block;
          white-space: pre-wrap;
        }
      }
    }

    .contact-form {
      flex: 1;

      .form-group {
        margin-bottom: 20px;

        label {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 5px;
          display: block;
        }

        .form-control {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;

          &:focus {
            border-color: #5161ce;
            outline: none;
          }
        }
      }

  .btn {
        width: 100%;
        padding: 10px;
        color: cyan;
        border-radius: 4px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        text-align: center;

        &:hover {
          color: #000;
        }
      }
    }
  }
}
</style>
