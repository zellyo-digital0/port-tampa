document.addEventListener("DOMContentLoaded", async function () {
  const allBlogsDiv = document.getElementById("allblogs");
  const loadMoreButton = document.getElementById("allblogsbuton");

  let initialBlogCount = 6; // Number of blogs initially displayed

  // Function to create HTML structure for a single blog post
  function createBlogPostHTML(blog) {
    const postDiv = document.createElement("div");
    postDiv.classList.add("col-lg-4", "col-md-6", "col-sm-6");

    postDiv.innerHTML = `
        <div class="lt_post">
          <img src="${
            blog.thumbnail
          }" class="img-fluid w-100" alt="latest_post" />
          <div class="ltpost_content">
            <h5>${blog.category}</h5>
            <h4>${blog.title}</h4>
            <p>${
              blog.description.length > 250
                ? blog.description.slice(0, 150) + "..."
                : blog.description
            }</p>
            <a href="blogpost.html?id=${
              blog.id
            }" class="btn btn-read">Read more</a>
          </div>
        </div>
      `;

    return postDiv;
  }

  // Function to fetch data from the server
  async function fetchDataAndRender() {
    try {
      const response = await fetch("https://port-tampa-backend.vercel.app/");
      const data = await response.json();

      // Clear existing blog posts
      allBlogsDiv.innerHTML = "";

      // Render new blog posts
      data.slice(0, initialBlogCount).forEach((blog) => {
        const blogPostHTML = createBlogPostHTML(blog);
        allBlogsDiv.appendChild(blogPostHTML);
      });

      // If all blogs are initially displayed, hide the "Load More" button
      if (initialBlogCount >= data.length) {
        loadMoreButton.style.display = "none";
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Function to load all blogs and hide the "Load More" button
  function loadAllBlogs() {
    initialBlogCount = Infinity; // Set the initial blog count to infinity to display all blogs
    fetchDataAndRender(); // Fetch and render all blogs
    loadMoreButton.style.display = "none"; // Hide the "Load More" button
  }

  // Event listener for the "Load More" button
  loadMoreButton.addEventListener("click", loadAllBlogs);

  // Call the function to fetch data and render initially
  await fetchDataAndRender();
});
