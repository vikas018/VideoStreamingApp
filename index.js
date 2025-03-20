let videosData = []

function fetchVideos() {
  if (videosData.length) return videosData
  return fetch('https://api.freeapi.app/api/v1/public/youtube/videos')
    .then((res) => res.json())
    .then((res) => res.data.data)
    .catch((err) => console.log(err))
}

function cardHTML(id, {title, channelTitle, thumbnails}) {
  return `
    <a href="https://www.youtube.com/watch?v=${id}" target="_blank">
      <img id="thumbnail" src="${thumbnails.standard.url}" />
      <h4 id="video-title">${title}</h4>
      <h6 id="video-channel-name">${channelTitle}</h6>
    </a>
  `
}

async function renderVideos(searchedValue) {
  const containerElement = document.getElementById('video-container')
  containerElement.textContent = ''
  videosData = await fetchVideos()
  videosData.forEach(video => { 
    const div = document.createElement('div')
    if (!searchedValue || video.items.snippet.title.toLowerCase().match(searchedValue.toLowerCase())) {
      div.id = 'card'
      div.innerHTML = cardHTML(video.items.id, video.items.snippet)
      containerElement.appendChild(div)
    }
  })
}

renderVideos()

function searchHandler(action) {
  const inputElement = document.getElementById('search-input')
  if (action) inputElement.value = ''
  renderVideos(inputElement.value)
}
