jQuery(document).ready(function($) {

    // One click to clipboard
    // Uses clipboard.js library
    var clipboard = new Clipboard('.clipboard_btn');

    // Bucket options
    var bucketName = abu_options.bucketName;
    var bucketRegion = abu_options.bucketRegion;

    var config = new AWS.Config({
      accessKeyId: abu_options.accessKey, 
      secretAccessKey: abu_options.secretKey, 
      region: bucketRegion
    });
    

    AWS.config.update(config);

    // Create a new S3 Bucket object
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

        // If no file i s selected display a message
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
            // Max file size is set in a hidden field in file-upload.php
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

    /**
     * Encode the filename to match S3 naming conventions
     * @author Lee Aplin <lee@substrakt.com>
     */
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
                        '<tr>',
                            '<td>',
                                '<h4>' + fileName + '</h4> <strong>File URL:</strong> <input id="url" value="https://s3-' + bucketRegion + '.amazonaws.com/' + bucketName + '/' + encodedFileName(fileName) + '" /> ' + 
                                '<span class="clipboard_btn" data-clipboard-target="#url"><i class="fa fa-clipboard" aria-hidden="true" title="Copy to clipboard"></i></span>' +
                                '<span class="trash" onclick="deleteFile(\'' + fileName + '\')"><i class="fa fa-trash-o" aria-hidden="true" title="Delete file"></i></span>',
                            '</td>',
                        '</tr>' 
                    ]);
                });
                var message = fileList.length ?
                    getHtml([
                        '<p>Click on <i class="fa fa-clipboard" aria-hidden="true"></i> to copy the url or <i class="fa fa-trash-o" aria-hidden="true"></i> to delete the file</p>'
                    ]) : 
                    '<p>You do not have any files.</p>';
                var htmlTemplate = [
                    '<table class="wp-list-table widefat fixed striped">',
                        '<thead>',
                            '<tr>',
                                '<td><h2 class="title">Files in your S3 bucket "' + bucketName +'"</h2></td>',
                            '</tr>',
                        '</thead>',
                        '<tbody id="the-list">',
                            '<tr>',
                                '<td>' + message + '</td>',
                            '</tr>',
                            getHtml(fileList),
                        '</tbody>',
                    '</table>'
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

