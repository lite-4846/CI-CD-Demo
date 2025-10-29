@echo off 
cmd /c call "D:/iris-code/ci-cd-demo\angular@tmp\durable-dec7e49f\jenkins-main.bat" > "D:/iris-code/ci-cd-demo\angular@tmp\durable-dec7e49f\jenkins-log.txt" 2>&1
echo %ERRORLEVEL% > "D:/iris-code/ci-cd-demo\angular@tmp\durable-dec7e49f\jenkins-result.txt"
