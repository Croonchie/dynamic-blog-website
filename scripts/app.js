document.addEventListener("DOMContentLoaded", function () {
    const postList = document.getElementById("post-list");

    // Get posts from localStorage or initialize an empty array
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    if (posts.length === 0) {
        postList.innerHTML = "<p>No blog posts available.</p>";
    } else {
        posts.forEach((post, index) => {
            let li = document.createElement("li");
            li.innerHTML = `<a href="post.html?id=${index}">${post.title}</a>`;
            postList.appendChild(li);
        });
    }
});

