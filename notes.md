Connecting your vscode to a sql server:
1. Download these dependencies:
-dotenv
-nodemon
-express
-cors
-mssql
2. Your config file will have your sql server info, so make a variable in the config called config that is an object with the keys: user(the username for auth), password(the password for auth), the server(the pc name or ip), database(the database in which to conect to), options(equals another object, we put our instance name in here), and the specified port the server is on
3. make an Operation.js file and in here use the require function in a variable to grab the file path of the config file
4. do the same thing for mssql
5. you can make an async function in operation.js that can grab the database with an await, using a method from the variable in the require for mssql called connect that grabs the config(server.connect(config))


How to connect a database locally:

1. On the computer with the main server, goto your sql database and right click the server
2. Click on properties of the server and on the window that pops up, click connections on the left hand side
3. Make sure "Allow Remote Connections to this Server" is checked
4. Now head to the Security tab and under Server Authentication, make sure that SQL Server and Windows Authentication Mode is checked
5. Click OK at the bottom and let the app restart
6. Now go to your Sql Server Configuration Manager (Path is This PC/C:/Windows/SysWOW64/SQLServerManager15)
7. In the Sql Server Configuration Manager, go to path SQL Server Network Configuration -> Protocols for SQLEXPRESS -> TCP/IP and double click TCP/IP
8. Make sure this protocol is enabled
9. In the TCP/IP window, head to IP Addresses and scroll all the way down to IPAll
10. Make sure Dynamic Ports is empty and that the TCP Port is your desired port
11. Now in SQL Server Configuration Manager, head to SQL Server Services and go to the SQL Server Browser Properties
12. Select the Service Tab and make sure that Start Mode is automatic
13. Let both the Server Browser and Server restart so the changes can be applied.
14. Next, head over to your Windows Firewall (In Systems and Security in the Control Panel) and select Allow Apps to Communicate through Windows Defender Firewall
15. Click Change Settings and click Allow another App
16. Go to path C:/Program Files (x86)/Microsoft SQL Server and search for SQLbrowser
17. When you add this app, make sure that it is checked as Public
18. Now head over to the Firewall Advanced Settings and on the right hand side, select New Rule.
19. In Rule Type, select Port
20. In Protocol and Ports, select TCP and do Specific local Ports and put in your desired port. 
21. In Action, select Allow the Connection
22. In Profile, just click Next, and then name your rule.
23. From here you can head over to your other machine and start your server. You must make sure that the ip address is the server name in your config file though, if you do not know your ip address, you can head over to command prompt and type 'ipconfig'