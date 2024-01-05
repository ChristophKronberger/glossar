<html>

<?php



$root = "../sites/";
$sucheingabe = strtolower($_GET["suchbegriff"]);
if (empty($sucheingabe)) {
    header("Location:" . $root . "pagenotfound.html");
    exit(0);
}

if (is_dir($root)) {
    // öffnen des Verzeichnisses
    if ($handle = opendir($root)) {
        // einlesen der Verzeichnisses
        while (($page = readdir($handle)) !== false) {

            if (str_contains($page, ".html")) {
                $meta_info = get_meta_tags($root . $page);
                if(isset($meta_info['keywords'])){
                $keywordarray = explode(",", $meta_info['keywords']);
                foreach ($keywordarray as $current) {
                    $currentKeyword = strtolower(trim($current));
                    if ($sucheingabe === $currentKeyword) {
                        echo $currentKeyword; echo " gefunden";
                        header("Location:" . $root . $page);
                        exit(0);
                    }
                }
            }
            }
        }
        if(!headers_sent()){
            header("Location:" . $root . "pagenotfound.html");
        } 
        closedir($handle);
    }
    echo "<br>";
}
echo "</ol>";


?>

</html>