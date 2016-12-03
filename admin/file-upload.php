<div class="wrap">
    <h2>Upload a file to AWS S3</h2>
    <form id="fileupload" action="#" method="post" enctype="multipart/form-data">
        <table class="form-table">
            <tbody>
                <tr>
                    <th scope="row"><label for="file">Choose a file to upload:</label></th>
                    <td>
                        <input type="hidden" id="MAX_FILE_SIZE" name="MAX_FILE_SIZE" value="30000000" />
                        <input type="file" name="file" id="fileupload-files">
                    </td>
                </tr>
            </tbody>
        </table>
        
        <p class="submit"><input type="submit" value="Upload File to S3" class="button button-primary"></p>
    </form>

    <div id="progress"></div>

    <script type="text/javascript">
        jQuery(document).ready(function($) {
            listFiles();
        });
    </script>

    <div id="app"></div>
</div>

