document.addEventListener("DOMContentLoaded", async function () {
  // Extract the blog ID from the URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = parseInt(urlParams.get("id"));

  // Function to fetch data for a single blog post
  async function fetchSingleBlogPost(blogId) {
    try {
      const response = await fetch(
        `https://port-tampa-backend.vercel.app/blogs/${blogId}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  // Function to create HTML structure for a single blog post
  function createSingleBlogPostHTML(blog) {
    const singleBlogContainer = document.getElementById("singleBlog");

    singleBlogContainer.innerHTML = `
        <div class="col-md-12">
          <div class="post_field">
            <div class="featured_image">
              <img src="${
                blog.banner
              }" class="img-fluid w-100" alt="featured_image">
            </div>
            <div class="post_content pt-5">
              <h3>${blog.title}</h3>
              ${blog.description}
            </div>
            <!-- navigation of post -->
            <div class="navigation">
              <!-- Previous Post -->
              <div class="prev">
                <div class="previous_button">
                  ${
                    blog.id !== 1
                      ? `<a href="blogpost.html?id=${
                          blog.id - 1
                        }" class="btn-nav">Previous Post</a>`
                      : ""
                  }
                </div>
               
              </div>
              <!-- Next Post -->
              <div class="next text-end">
                <div class="next_button">
                  ${
                    blog.id !== 10
                      ? `<a href="blogpost.html?id=${
                          blog.id + 1
                        }" class="btn-nav">Next Post</a>`
                      : ""
                  }
                </div>
                
              </div>
            </div>
            <!-- share button -->
            <div class="share-buttons">
              <h4 class="pb-2">Share to Social Media</h4>
              <button onclick="shareOnFacebook()">
                <i class="fa-brands fa-facebook-f"></i>
              </button>
              <button onclick="shareOnInstagram()">
                <i class="fa-brands fa-instagram"></i>
              </button>
              <button onclick="shareOnTwitter()">
                <i class="fa-brands fa-twitter"></i>
              </button>
            </div>
          </div>
        </div>
      `;
  }

  // Function to create HTML structure for the top header of the post
  function createTopHeaderHTML(blog) {
    const postTopHeaderContainer = document.getElementById("post_top_header");

    postTopHeaderContainer.innerHTML = `
        <h2 class="post-title">${blog.title}</h2>
        <div class="breadcrumbs">
          <div class="blogpg" id="blogpg">
            <a href="blog.html" class="btn-nav"> Blog </a>
          </div>
          -
          <div class="post_category" id="post_category">
            <a href="#" class="btn-nav"> ${blog.category} </a>
          </div>
          -
          <div class="post_sm_title" id="post_sm_title">
            <p>${blog.title}</p>
          </div>
        </div>
      `;
  }

  // Fetch and render the single blog post and top header
  const singleBlogData = await fetchSingleBlogPost(blogId);
  if (singleBlogData) {
    createSingleBlogPostHTML(singleBlogData);
    createTopHeaderHTML(singleBlogData);
  }
});
