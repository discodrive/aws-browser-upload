<div class="wrap">
    <h2>Upload a file to AWS S3</h2>
    <br/>
    <form id="fileupload" action="#" method="post" enctype="multipart/form-data">
        File to upload to S3:

        <input type="hidden" id="MAX_FILE_SIZE" name="MAX_FILE_SIZE" value="30000000" />
        <input type="file" name="file" id="fileupload-files">
        <br/>
        <input type="submit" value="Upload File to S3">
    </form>

    <div id="progress"></div>

    <script type="text/javascript">
        jQuery(document).ready(function($) {
            listFiles();
        });
    </script>

    <div id="app"></div>
</div>

