jQuery(document).ready(function($) {

    // REFACTOR SETUP TO USE ENV VARIABLES HERE

    var bucketName = 'royal-court-podcasts';
    var bucketRegion = 'eu-west-1';

    var config = new AWS.Config({
      accessKeyId: 'AKIAJPM664AWNNL6VUYA', secretAccessKey: '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', region: bucketRegion
    });

    AWS.config.update(config);

    var s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: {Bucket: bucketName}
    });

    /**
     * Upload a file to S3
     * @author Lee Aplin <lee@substrakt.com>
     * @return null
     */
    function addFile() {
        var filess = document.getElementById('filesupload-files').files;
        if (!filess.length) {
            return alert('Please choose a file to upload.');
        }
        var file = filess[0];
        var fileName = file.name;

        s3.upload({
            Key: fileName,
            Body: file,
            ACL: 'public-read'
        }, function(err,data) {
            if(err) {
                // Failure message
                return alert('There was an error uploading your file', err.message);
            }

            // Create a progress bar
            var o = $id('progress');
            var progress = o.appendChild(document.createElement('p'));
            progress.appendChild(document.createTextNode('upload ' + file.name));

            // Calculate progress
            s3.upload.addEventListener('progress', function(e){
                var pc = parseInt(100 - (e.loaded / e.total * 100));
                progress.style.backgroundPosition = pc + '% 0';
            }, false);

            // File received/failed
            s3.onreadystatechange = function(e) {
                if (s3.readyState == 4) {
                    progress.className = (s3.status == 200 ? "success" : "failure");
                }
            };

            // Send the file
            s3.open("POST", $id("upload").action, true);
            s3.setRequestHeader("X-FILENAME", file.name);
            s3.send(file);

            // Success
            alert('Successfully uploaded file.');
        });
    }

    function listFiles() {

    }

    jQuery('#fileupload').on('submit', function(e) {
        e.preventDefault();
        addFile();
    });

});

