jQuery(document).ready(function($) {

    // REFACTOR SETUP TO USE ENV VARIABLES HERE
    // CREATE AN OPTIONS PAGE. IF OPTIONS SET USE THEM, OTHERWISE REVERT TO CONSTANTS IN WP-CONFIG

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

    // // Create a progress bar
    // var o = document.getElementById('progress');
    // var progress = o.appendChild(document.createElement('p'));
    // progress.appendChild(document.createTextNode('upload ' + file.name));

    // // Calculate progress
    // s3.upload.addEventListener('progress', function(e){
    //     var pc = parseInt(100 - (e.loaded / e.total * 100));
    //     progress.style.backgroundPosition = pc + '% 0';
    // }, false);

    // // File received/failed
    // s3.onreadystatechange = function(e) {
    //     if (s3.readyState == 4) {
    //         progress.className = (s3.status == 200 ? "success" : "failure");
    //     }
    // };


    /**
     * Upload a file to S3
     * @author Lee Aplin <lee@substrakt.com>
     * @return null
     */
    function addFile() {
        var files = document.getElementById('fileupload-files').files;
        if (!files.length) {
            return alert('Please choose a file to upload.');
        }
        var file = files[0];
        var fileName = file.name;
        
        s3.upload({
            Key: fileName,
            Body: file,
            ACL: 'public-read'
        }, function(err,data) {
            if (s3.upload && file.size <= document.getElementById("MAX_FILE_SIZE").value) {
                if(err) {
                    // Failure message
                    return alert('There was an error uploading your file', err.message);
                }

                // Success
                alert('Successfully uploaded file.');
            } else {
                alert('The filesize is too large, please upload a smaller file.');
            }
        });
    }

    function getHtml(template) {
        return template.join('\n');
    }

    /**
     * Return a list of all files in the S3 bucket
     * @author Lee Aplin <lee@substrakt.com>
     * @return null
     */
    window.listFiles = function listFiles() {
        s3.listObjectsV2({Delimiter: '/'}, function(err, data) {
            if (err) {
                return alert('There was an error listing your files:' + err.message);
            } else {
                //document.getElementById('app').innerHTML = data.Contents[0].Key;
                
                var fileList = data.Contents.map(function(obj) {
                    var fileName = obj.Key;
                    return getHtml([
                        '<li>',
                            fileName + ' <span onclick="deleteFile(\'' + fileName + '\')">X</span>',
                        '</li>' 
                    ]);
                });
                var message = fileList.length ?
                    getHtml([
                        '<p>Click on the X to delete the file.</p>'
                    ]) : 
                    '<p>You do not have any files.</p>';
                var htmlTemplate = [
                    '<h2>Uploaded Files</h2>',
                    message,
                    '<ul>',
                        getHtml(fileList),
                    '</ul>'
                ]
                document.getElementById('app').innerHTML = getHtml(htmlTemplate);
            }
        });
    }

    /**
     * Delete a file from the S3 bucket
     * @author Lee Aplin <lee@substrakt.com>
     * @return null
     */
    window.deleteFile = function deleteFile(fileName) {
        s3.deleteObject({Key: fileName}, function(err, data) {
            if (err) {
                return alert('There was an error deleting your file:' + err.message);
            }
            alert('Successfully delete file.');
        });
    }
    
    // Prevent default form submission and run the add file function
    jQuery('#fileupload').on('submit', function(e) {
        e.preventDefault();
        addFile();
    });

});

