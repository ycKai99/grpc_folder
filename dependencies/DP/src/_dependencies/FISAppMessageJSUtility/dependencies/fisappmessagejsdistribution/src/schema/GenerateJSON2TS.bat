
 REM up to schema folder
 cd .. 

 REM up to src folder
 cd .. 

 REM Generate Typescript from JSON
 npx json2ts .\src\schema\FisAppMessageSchema.json .\src\types\fisappmessageschema.ts --unreachableDefinitions --no-enableConstEnums

set /p DUMMY=Hit ENTER to continue...

pause 