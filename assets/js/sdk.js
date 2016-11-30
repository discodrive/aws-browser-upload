jQuery(document).ready(function($) {

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

    function addPodcast() {
        var podcasts = document.getElementById('podcastupload-files').files;
        if (!podcasts.length) {
            return alert('Please choose a file to upload.');
        }
        var file = podcasts[0];
        var fileName = file.name;

        s3.upload({
            Key: fileName,
            Body: file,
            ACL: 'public-read'
        }, function(err,data) {
            if(err) {
                return alert('There was an error uploading your file', err.message);
            }
            alert('Successfully uploaded file.');
        });
    }

    jQuery('#podcastupload').on('submit', function(e) {
        e.preventDefault();
        addPodcast();
    });

});

