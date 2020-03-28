function tryLogin() {
	handle = document.getElementById('handle').value;
	if(handle.length > 0) {
		window.location.href = 'questions.html?handle=' + handle;
	} else {
		alert('digite seu handle')
	}
}