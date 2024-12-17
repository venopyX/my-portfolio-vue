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
  padding: 60px 0;
  background-color: colors.$contact-form-bg;
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
      background: colors.$mac-border-color;
      padding: 10px;
      border-radius: 8px;
      box-shadow: 0 0 20px colors.$box-shadow-color;
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
          background: colors.$mac-dot-red;
        }
        .yellow {
          background: colors.$mac-dot-yellow;
        }
        .green {
          background: colors.$mac-dot-green;
        }
      }

      pre {
        margin: 0;
        color: colors.$text-color-light;
        font-family: "Fira Code", monospace;
        font-size: 14px;
        white-space: pre;
        overflow-x: auto;
        padding: 10px;
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
          border: 1px solid colors.$light-grey;
          border-radius: 4px;

          &:focus {
            border-color: colors.$primary-dark;
            outline: none;
          }
        }
      }

      .btn {
        width: 100%;
        padding: 10px;
        color: colors.$button-bg;
        border-radius: 4px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        text-align: center;

        &:hover {
          color: colors.$black;
          background-color: colors.$button-hover-bg;
        }
      }
    }
  }
}
</style>