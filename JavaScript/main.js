var BookmarkNameInput = document.getElementById('BookmarkName');
var BookmarkURLInput = document.getElementById('BookmarkURL');
var AllBookmarks = [];

if (localStorage.getItem('bookmarkContainer') === null) {
  AllBookmarks = [];
} else {
  AllBookmarks = JSON.parse(localStorage.getItem('bookmarkContainer'));
  displayBookmarks();
}

function isValidURL(url) {
  var pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/;
  return pattern.test(url);
}

function addBookmark() {
  var name = BookmarkNameInput.value.trim();
  var url = BookmarkURLInput.value.trim();

  if (name === '' || url === '') {
    alert('Please fill in both fields.');
    return;
  }

  if (!isValidURL(url)) {
    alert('Please enter a valid URL (e.g. https://example.com)');
    return;
  }

  var bookmark = { name: name, url: url };
  AllBookmarks.push(bookmark);
  localStorage.setItem('bookmarkContainer', JSON.stringify(AllBookmarks));
  displayBookmarks();
  clearInputs();
}

function clearInputs() {
  BookmarkNameInput.value = '';
  BookmarkURLInput.value = '';
}

function displayBookmarks() {
  var cartona = '';
  for (var i = 0; i < AllBookmarks.length; i++) {
    cartona += `
      <tr>
        <td>${i + 1}</td>
        <td>${AllBookmarks[i].name}</td>
        <td>
          <a href="${fixURL(AllBookmarks[i].url)}" target="_blank" class="btn btn-success btn-sm">Visit</a>
        </td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteBookmark(${i})">Delete</button>
        </td>
      </tr>`;
  }
  document.getElementById('displayBookmarks').innerHTML = cartona;
}

function deleteBookmark(index) {
  AllBookmarks.splice(index, 1);
  localStorage.setItem('bookmarkContainer', JSON.stringify(AllBookmarks));
  displayBookmarks();
}

function fixURL(url) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return 'https://' + url;
  }
  return url;
}
