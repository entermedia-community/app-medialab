importPackage( Packages.com.openedit.util );
importPackage( Packages.java.util );
importPackage( Packages.java.lang );
importPackage( Packages.com.openedit.modules.update );

var appname = "medialab";

var zip = "http://dev.entermediasoftware.com/jenkins/job/app-" + appname + "/lastSuccessfulBuild/artifact/deploy/app-" + appname + ".zip";

var root = moduleManager.getBean("root").getAbsolutePath();
var eml = root + "/"  + appname;
var tmp = root + "/WEB-INF/tmp";

log.add("1. GET THE LATEST ZIP FILE");
var downloader = new Downloader();
downloader.download( zip, tmp + "/app.zip");

log.add("2. UNZIP WAR FILE");
var unziper = new ZipUtil();
unziper.unzip(  tmp + "/app.zip",  tmp );

var files = new FileUtils();
log.add("4. UPGRADE BASE DIR");
files.deleteAll( root + "/" + appname);
files.copyFiles( tmp + "/" + appname, root + "/" + appname);

log.add("5. CLEAN UP");
files.deleteAll(tmp);

log.add("6. UPGRADE COMPLETED");
