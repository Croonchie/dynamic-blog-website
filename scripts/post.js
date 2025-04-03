document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    if (postId === null) {
        alert("Post not found!");
        window.location.href = "index.html";
        return;
    }

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    if (postId >= posts.length) {
        alert("Invalid post ID!");
        window.location.href = "index.html";
        return;
    }

    const post = posts[postId];

    // Get elements
    const titleInput = document.getElementById("post-title");
    const contentInput = document.getElementById("post-content");
    const imageElement = document.getElementById("post-image");
    const dateElement = document.getElementById("post-date");
    const editButton = document.getElementById("edit-btn");
    const saveButton = document.getElementById("save-btn");
    const deleteButton = document.getElementById("delete-btn");

    // Set values
    titleInput.value = post.title;
    contentInput.value = post.content;
    dateElement.textContent = `Published on: ${new Date(post.createdAt).toLocaleString()}`;

    if (post.image) {
        imageElement.src = post.image;
        imageElement.style.display = "block";
    }

    // Edit mode toggle
    editButton.addEventListener("click", function () {
        titleInput.removeAttribute("readonly");
        contentInput.removeAttribute("readonly");
        editButton.style.display = "none";
        saveButton.style.display = "block";
    });

    // Save changes
    saveButton.addEventListener("click", function () {
        post.title = titleInput.value.trim();
        post.content = contentInput.value.trim();

        if (!post.title || !post.content) {
            alert("Title and content cannot be empty!");
            return;
        }

        posts[postId] = post;
        localStorage.setItem("posts", JSON.stringify(posts));

        alert("Post updated successfully!");
        location.reload();
    });

    // Delete post
    deleteButton.addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this post?")) {
            posts.splice(postId, 1);
            localStorage.setItem("posts", JSON.stringify(posts));
            alert("Post deleted successfully!");
            window.location.href = "index.html";
        }
    });
});


