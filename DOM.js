// Toggle between filter and add new article forms
function showFilter() {
    const filterForm = document.getElementById('filterContent');
    const newForm = document.getElementById('newContent');

    // Use getComputedStyle to correctly detect CSS-default display:block on first click
    const currentDisplay = window.getComputedStyle(filterForm).display;

    if (currentDisplay === 'none') {
        filterForm.style.display = 'block';
        newForm.style.display = 'none';
    } else {
        filterForm.style.display = 'none';
    }
}

function showAddNew() {
    const filterForm = document.getElementById('filterContent');
    const newForm = document.getElementById('newContent');

    // Toggle add new form visibility
    if (newForm.style.display === 'none' || newForm.style.display === '') {
        newForm.style.display = 'flex';
        filterForm.style.display = 'none';
    } else {
        newForm.style.display = 'none';
    }
}

// Filter articles based on checkbox state
function filterArticles() {
    const showOpinion = document.getElementById('opinionCheckbox').checked;
    const showRecipe = document.getElementById('recipeCheckbox').checked;
    const showUpdate = document.getElementById('updateCheckbox').checked;

    const articles = document.querySelectorAll('#articleList article');

    articles.forEach(article => {
        if (article.classList.contains('opinion')) {
            article.style.display = showOpinion ? '' : 'none';
        } else if (article.classList.contains('recipe')) {
            article.style.display = showRecipe ? '' : 'none';
        } else if (article.classList.contains('update')) {
            article.style.display = showUpdate ? '' : 'none';
        }
    });
}

// Add a new article to the list
function addNewArticle() {
    const title = document.getElementById('inputHeader').value.trim();
    const text = document.getElementById('inputArticle').value.trim();
    const opinionRadio = document.getElementById('opinionRadio').checked;
    const recipeRadio = document.getElementById('recipeRadio').checked;
    const lifeRadio = document.getElementById('lifeRadio').checked;

    // Validation
    if (!title) {
        alert('Please enter a title for the article.');
        return;
    }
    if (!text) {
        alert('Please enter text for the article.');
        return;
    }
    if (!opinionRadio && !recipeRadio && !lifeRadio) {
        alert('Please select an article type.');
        return;
    }

    // Determine type and label
    let type, label;
    if (opinionRadio) {
        type = 'opinion';
        label = 'Opinion';
    } else if (recipeRadio) {
        type = 'recipe';
        label = 'Recipe';
    } else {
        type = 'update';
        label = 'Update';
    }

    // Generate a unique ID
    const articleList = document.getElementById('articleList');
    const existingArticles = articleList.querySelectorAll('article');
    const newId = 'a' + (existingArticles.length + 1);

    // Create the new article element
    const newArticle = document.createElement('article');
    newArticle.classList.add(type);
    newArticle.id = newId;

    newArticle.innerHTML = `
        <span class="marker">${label}</span>
        <h2>${title}</h2>
        <p>${text}</p>
        <p><a href="moreDetails.html">Read more...</a></p>
    `;

    // Append to article list
    articleList.appendChild(newArticle);

    // Reset the form
    document.getElementById('inputHeader').value = '';
    document.getElementById('inputArticle').value = '';
    document.getElementById('opinionRadio').checked = false;
    document.getElementById('recipeRadio').checked = false;
    document.getElementById('lifeRadio').checked = false;

    // Hide the form after submission
    document.getElementById('newContent').style.display = 'none';

    // Make sure newly added article respects current filter state
    filterArticles();
}