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

    /**
     * Upload a file to S3
     * @author Lee Aplin <lee@substrakt.com>
     * @return null
     */
    window.addFile = function() {
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

                ajaxRequest(data);
                // Success
                alert('Successfully uploaded file.');
            } else {
                alert('The filesize is too large, please upload a smaller file.');
            }
        }).on('httpUploadProgress', function(evt) {
            var progress   = (evt.loaded / evt.total) * 100;
            var background = parseInt(100 - progress);

            // Display percentage of upload rounded up to next
            // whole number for readability
            jQuery('#progress').html('<p style="background-position:'+ background +'% 0;">' + Math.ceil(progress) + '%</p>');
        }).send(function(err, data) { console.log(err, data) });
    }

    /**
     * Create a HTML block followed by a new line to output into a template
     * @author Lee Aplin <lee@substrakt.com>
     */
    window.getHtml = function(template) {
        return template.join('\n');
    }

    window.encodedFileName = function(name) {
        return String(name).replace(/ /g, '+').replace(/\&/g, '%26');
    };

    /**
     * Return a list of all files in the S3 bucket
     * @author Lee Aplin <lee@substrakt.com>
     */
    window.listFiles = function() {
        s3.listObjectsV2({Delimiter: '/'}, function(err, data) {

            console.log(data);

            if (err) {
                return alert('There was an error listing your files:' + err.message);
            } else {                
                var fileList = data.Contents.map(function(obj) {

                    console.log(obj);

                    var fileName = obj.Key;
    
                    return getHtml([
                        '<li>',
                            '<h4>' + fileName + '</h4> <strong>File URL:</strong> https://s3-' + bucketRegion + '.amazonaws.com/' + bucketName + '/' + encodedFileName(fileName) + ' | <span class="trash" onclick="deleteFile(\'' + fileName + '\')">Delete file</span>',
                        '</li>' 
                    ]);
                });
                var message = fileList.length ?
                    getHtml([
                        ''
                    ]) : 
                    '<p>You do not have any files.</p>';
                var htmlTemplate = [
                    '<h2 class="title">Files in your S3 bucket "' + bucketName +'"</h2>',
                    message,
                    '<ul class="filelist">',
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
    window.deleteFile = function(fileName) {
        s3.deleteObject({Key: fileName}, function(err, data) {
            if (err) {
                return alert('There was an error deleting your file:' + err.message);
            }
            alert('Successfully deleted ' + fileName);
        });
    }
    
    // Prevent default form submission and run the add file function
    jQuery('#fileupload').on('submit', function(e) {
        e.preventDefault();
        addFile();
    });

});

