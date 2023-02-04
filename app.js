function getClipboard() {
	var result = null;
	var textarea = document.getElementById('ta');
	textarea.value = '';
	textarea.select();

	if (document.execCommand('paste')) {
		result = textarea.value;
	} else {
		console.log('failed to get clipboard content');
	}

	textarea.value = '';
	return result;
}