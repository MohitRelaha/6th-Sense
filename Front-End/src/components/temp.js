

            fetch(`http://localhost:3005/tracks/${id}`).then(response => {
                // response.body is a readable stream.
                // Calling getReader() gives us exclusive access to
                // the stream's content
                var reader = response.body.getReader();
                var bytesReceived = 0;
              
                // read() returns a promise that resolves
                // when a value has been received
                return reader.read().then(function processResult(result) {
                  // Result objects contain two properties:
                  // done  - true if the stream has already given
                  //         you all its data.
                  // value - some data. Always undefined when
                  //         done is true.
                  if (result.done) {
                    console.log("Fetch complete" + response.json());
                   /* var blob = new Blob([response.value], { type: 'audio/mp3' });
                var url = window.URL.createObjectURL(blob)
                console.log('URL = ' + url)
                window.audio = new Audio();
                window.audio.src = url;
                window.audio.play();*/
                    return;
                  }
              
                  // result.value for fetch streams is a Uint8Array
                  bytesReceived += result.value.length;
                  console.log('Received', bytesReceived, 'bytes of data so far');
              
                  // Read some more, and call this function again
                  return reader.read().then(processResult);
                });
              }).then((response) => {
                // response.value for fetch streams is a Uint8Array
               /* var blob = new Blob([response.value], { type: 'audio/mp3' });
                var url = window.URL.createObjectURL(blob)
                console.log('URL = ' + url)
                window.audio = new Audio();
                window.audio.src = url;
                window.audio.play();
                */
               console.log(response)
              })
              .catch((error) => {
               console.log('ERROR')
              });


