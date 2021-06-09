/**
 * Window has error event - trigger browser about error info: file, line number, ...
 * Replace console.log to send to server. Use WebSocket
 */
window.addEventListener('error', function(e) {
    let stacktrace = e.stack;
    if (!stacktrace && e.error) {
        stacktrace = e.error.stack;
    }

    // For now, just print the error
    console.log(e.message + ', ' + e.filename + ', ' + e.lineno + ':' + e.colno)
    if (stacktrace) {
        console.log('Stacktrace: ' + stacktrace);
    }
});
