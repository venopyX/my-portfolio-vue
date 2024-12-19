<template>
  <div class="add-blog-form">
    <h2>Add a New Blog Post</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="formData.title" required />
      </div>
      <div class="form-group">
        <label for="excerpt">Excerpt</label>
        <textarea id="excerpt" v-model="formData.excerpt" required></textarea>
      </div>
      <div class="form-group">
        <label for="image">Image URL</label>
        <input type="text" id="image" v-model="formData.image" required />
      </div>
      <div class="form-group">
        <label for="content">Content (Markdown)</label>
        <textarea id="content" v-model="formData.content" required></textarea>
      </div>
      <div class="form-group">
        <label for="date">Date</label>
        <input type="date" id="date" v-model="formData.date" required />
      </div>
      <div class="form-group">
        <label for="category">Category</label>
        <input type="text" id="category" v-model="formData.category" required />
      </div>
      <div class="form-group">
        <label for="author">Author</label>
        <input type="text" id="author" v-model="formData.author" required />
      </div>
      <button type="submit" class="btn btn-primary">Add Blog Post</button>
    </form>
  </div>
</template>

<script>
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  name: "AddBlogForm",
  data() {
    return {
      formData: {
        title: "",
        excerpt: "",
        image: "",
        content: "",
        date: "",
        category: "",
        author: "",
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const slug = this.generateSlug(this.formData.title);
        const blogData = {
          ...this.formData,
          slug,
        };
        await addDoc(collection(db, "blogPost"), blogData);
        alert("Blog post added successfully!");
        this.resetForm();
      } catch (error) {
        console.error("Error adding blog post:", error);
        alert("Failed to add blog post. Please try again.");
      }
    },
    generateSlug(title) {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    },
    resetForm() {
      this.formData = {
        title: "",
        excerpt: "",
        image: "",
        content: "",
        date: "",
        category: "",
        author: "",
      };
    },
  },
};
</script>

<style scoped>
.add-blog-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(145deg, #1f1c47, #302b63);
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  font-family: "Poppins", sans-serif;
  color: #f0f0f0;
  text-align: center;
}

.add-blog-form h2 {
  font-size: 2rem;
  font-weight: bold;
  color: #ff6ec7;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 0.9rem;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: 0.95rem;
  color: #333;
  background: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  background: #ffffff;
  box-shadow: 0 4px 15px rgba(255, 110, 199, 0.4);
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.btn {
  padding: 12px 20px;
  border: none;
  border-radius: 24px;
  background: linear-gradient(145deg, #ff6ec7, #ffcce4);
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(255, 110, 199, 0.4);
}

.btn:active {
  transform: scale(0.95);
}
</style>