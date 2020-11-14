var progress = document.getElementById('progress');
var progressBar = document.getElementById('progressbar');

function updateProgressBar(processed, total, elapsed, layersArray) {
  if (elapsed > 1000) {
    progress.style.display = 'block';
    progressBar.style.width = Math.round(processed / total * 100) + '%';
  }
  if (processed === total) {
    progress.style.display = 'none';
  }
}
